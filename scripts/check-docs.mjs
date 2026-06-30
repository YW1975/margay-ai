#!/usr/bin/env node
import { existsSync } from 'node:fs'
import { readdir, readFile, stat } from 'node:fs/promises'
import { join, dirname } from 'node:path'

const root = process.cwd()
const docsBase = join(root, 'docs')
const errors = []

const fail = message => errors.push(message)
const readText = path => readFile(path, 'utf8')

async function markdownFiles(docsRoot, lang) {
  const entries = await readdir(join(docsRoot, lang))
  return entries.filter(name => name.endsWith('.md')).sort()
}

// Discover every buildable product: docs/<product>/ with a docs-inventory.json and
// at least one declared <lang>/ dir. README-only stubs are skipped. Generic across
// products/brands — nothing hardcoded to ccl. (super-rll#20)
async function discoverProducts() {
  const products = []
  for (const entry of await readdir(docsBase, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue
    const dir = join(docsBase, entry.name)
    const inventoryPath = join(dir, 'docs-inventory.json')
    if (!existsSync(inventoryPath)) continue
    const inventory = JSON.parse(await readText(inventoryPath))
    const declared = Array.isArray(inventory.languages) ? inventory.languages : []
    const langs = declared.filter(lang => existsSync(join(dir, lang)))
    if (langs.length === 0) continue
    const baselineLang = langs.includes('en') ? 'en' : langs[0]
    products.push({ id: entry.name, dir, inventory, langs, baselineLang })
  }
  return products.sort((a, b) => a.id.localeCompare(b.id))
}

function stripCode(text) {
  return text
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]*`/g, '')
    .replace(/\[[^\]]+\]\([^)]+\)/g, '')
}

function sectionMarkers(text) {
  return [...text.matchAll(/<!-- section: ([a-z0-9-]+) -->/g)].map(match => match[1])
}

function linksIn(text) {
  const results = []
  const withoutCode = stripCode(text)
  for (const match of withoutCode.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
    const target = match[1]
    if (/^(https?:|mailto:|#)/.test(target)) continue
    if (target.includes('://')) continue
    results.push(target.split('#')[0])
  }
  return results
}

function asciiRatio(line) {
  const letters = (line.match(/[A-Za-z]/g) ?? []).length
  const cjk = (line.match(/[\u3040-\u30ff\u3400-\u9fff]/g) ?? []).length
  const visible = line.replace(/\s/g, '').length
  if (visible === 0) return { letters: 0, cjk: 0 }
  return { letters: letters / visible, cjk: cjk / visible }
}

function checkText(text, file, lang) {
  if (/#\s*Claude Code/i.test(text) || /##\s*Claude Code/i.test(text) || /\bAnthropic\b/.test(text)) {
    fail(`${file}: forbidden public branding`)
  }
  if (/\/Users\/[^/\s]+\/Myprojects\/(ccl|margay|margay-ai|margay-studio|margay-gateway|cos|chief-of-staff|super-rll)/.test(text)) {
    fail(`${file}: private local path leaked`)
  }
  if (/\b(sk-[A-Za-z0-9_-]{12,}|gh[op]_[A-Za-z0-9_]{12,}|AKIA[0-9A-Z]{12,})\b/.test(text)) {
    fail(`${file}: secret-looking token leaked`)
  }
  const cleaned = stripCode(text)
  if (/\b(TODO|TBD)\b|untranslated|machine translation pending/.test(cleaned)) {
    fail(`${file}: translation placeholder marker`)
  }
  if (lang !== 'en') {
    for (const [index, raw] of cleaned.split('\n').entries()) {
      const line = raw.trim()
      if (line.length < 70 || /^(#|>|- \[|\||\s*$)/.test(line)) continue
      const ratio = asciiRatio(line)
      if (ratio.letters > 0.75 && ratio.cjk < 0.05) {
        fail(`${file}: likely untranslated English prose at line ${index + 1}`)
      }
    }
  }
}

async function walk(dir, out = []) {
  for (const entry of await readdir(dir)) {
    const path = join(dir, entry)
    const info = await stat(path)
    if (info.isDirectory()) await walk(path, out)
    else out.push(path)
  }
  return out
}

async function checkProduct(product) {
  const { id, dir: docsRoot, inventory, langs, baselineLang } = product

  const filesByLang = Object.fromEntries(await Promise.all(langs.map(async lang => [lang, await markdownFiles(docsRoot, lang)])))
  const baseline = filesByLang[baselineLang]
  for (const lang of langs.filter(l => l !== baselineLang)) {
    const missing = baseline.filter(file => !filesByLang[lang].includes(file))
    const extra = filesByLang[lang].filter(file => !baseline.includes(file))
    if (missing.length) fail(`${id}/${lang}: missing files ${missing.join(', ')}`)
    if (extra.length) fail(`${id}/${lang}: extra files ${extra.join(', ')}`)
  }

  for (const page of inventory.pages ?? []) {
    if (!baseline.includes(`${page.slug}.md`)) fail(`${id}: inventory page missing: ${page.slug}.md`)
  }
  for (const feature of inventory.feature_modules ?? []) {
    if (!(inventory.pages ?? []).some(page => page.slug === feature.page)) fail(`${id} feature ${feature.id}: page missing ${feature.page}`)
  }

  for (const file of baseline) {
    const markers = {}
    for (const lang of langs) {
      const path = join(docsRoot, lang, file)
      const text = await readText(path)
      const display = `docs/${id}/${lang}/${file}`
      checkText(text, display, lang)
      markers[lang] = sectionMarkers(text).join('|')
      for (const link of linksIn(text)) {
        if (!existsSync(join(dirname(path), link))) fail(`${display}: broken internal link ${link}`)
      }
    }
    if (file !== 'README.md' && new Set(Object.values(markers)).size !== 1) {
      fail(`${id}/${file}: section marker parity mismatch`)
    }
  }

  for (const file of await walk(docsRoot)) {
    if (file.endsWith('.map') || file.endsWith('.env') || /\.(pem|key|p12)$/.test(file)) fail(`forbidden publish file present: ${file}`)
  }

  return { id, files: baseline.length, langs: langs.length }
}

async function main() {
  const products = await discoverProducts()
  if (products.length === 0) fail(`no buildable products under docs/ (need docs-inventory.json + a <lang>/ dir)`)

  const summaries = []
  for (const product of products) summaries.push(await checkProduct(product))

  if (errors.length) {
    console.error(errors.map(error => `ERROR ${error}`).join('\n'))
    process.exit(1)
  }
  console.log(`Docs check passed: ${summaries.map(s => `${s.id} (${s.files} files x ${s.langs} lang)`).join(', ')}.`)
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
