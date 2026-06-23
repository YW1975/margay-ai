#!/usr/bin/env node
import { existsSync } from 'node:fs'
import { readdir, readFile, stat } from 'node:fs/promises'
import { join, dirname } from 'node:path'

const root = process.cwd()
const docsRoot = join(root, 'docs', 'ccl')
const langs = ['en', 'zh', 'ja']
const errors = []

const fail = message => errors.push(message)
const readText = path => readFile(path, 'utf8')

async function markdownFiles(lang) {
  const entries = await readdir(join(docsRoot, lang))
  return entries.filter(name => name.endsWith('.md')).sort()
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
  if (/\/Users\/[^/\s]+\/Myprojects\/(ccl|margay|margay-ai|margay-gateway|margay-studio)/.test(text)) {
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

async function main() {
  const inventoryPath = join(docsRoot, 'docs-inventory.json')
  if (!existsSync(inventoryPath)) fail('docs/ccl/docs-inventory.json is missing')
  const inventory = JSON.parse(await readText(inventoryPath))

  for (const lang of langs) {
    if (!existsSync(join(docsRoot, lang))) fail(`missing docs/ccl/${lang}`)
  }

  const filesByLang = Object.fromEntries(await Promise.all(langs.map(async lang => [lang, await markdownFiles(lang)])))
  const baseline = filesByLang.en
  for (const lang of langs.slice(1)) {
    const missing = baseline.filter(file => !filesByLang[lang].includes(file))
    const extra = filesByLang[lang].filter(file => !baseline.includes(file))
    if (missing.length) fail(`${lang}: missing files ${missing.join(', ')}`)
    if (extra.length) fail(`${lang}: extra files ${extra.join(', ')}`)
  }

  for (const page of inventory.pages) {
    if (!baseline.includes(`${page.slug}.md`)) fail(`inventory page missing: ${page.slug}.md`)
  }
  for (const feature of inventory.feature_modules) {
    if (!inventory.pages.some(page => page.slug === feature.page)) fail(`feature ${feature.id}: page missing ${feature.page}`)
  }

  for (const file of baseline) {
    const markers = {}
    for (const lang of langs) {
      const path = join(docsRoot, lang, file)
      const text = await readText(path)
      const display = `docs/ccl/${lang}/${file}`
      checkText(text, display, lang)
      markers[lang] = sectionMarkers(text).join('|')
      for (const link of linksIn(text)) {
        if (!existsSync(join(dirname(path), link))) fail(`${display}: broken internal link ${link}`)
      }
    }
    if (file !== 'README.md' && new Set(Object.values(markers)).size !== 1) {
      fail(`${file}: section marker parity mismatch`)
    }
  }

  for (const file of await walk(docsRoot)) {
    if (file.endsWith('.map') || file.endsWith('.env') || /\.(pem|key|p12)$/.test(file)) fail(`forbidden publish file present: ${file}`)
  }

  if (errors.length) {
    console.error(errors.map(error => `ERROR ${error}`).join('\n'))
    process.exit(1)
  }
  console.log(`Docs check passed: ${baseline.length} files x ${langs.length} languages.`)
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
