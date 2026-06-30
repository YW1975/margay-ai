#!/usr/bin/env node
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { basename, join } from 'node:path'

// Multi-product docs site generator.
//
// Discovers every product under `docs/<product>/` that ships a `docs-inventory.json`
// plus at least one `<lang>/` directory of markdown, and renders each into
// `site/<product>/<lang>/`. The root `site/index.html` is a product index. Nothing
// here is hardcoded to a single product or brand — product display name, publisher
// brand, languages and nav all come from each product's own `docs-inventory.json`.
// (super-rll#20)

const root = process.cwd()
const docsBase = join(root, 'docs')
const outRoot = join(root, 'site')

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function inlineMarkdown(value, lang) {
  let html = escapeHtml(value)
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => {
    const safeHref = /\.md(#.*)?$/.test(href) ? href.replace(/\.md(#.*)?$/, '.html$1') : href
    return `<a href="${escapeHtml(safeHref)}">${label}</a>`
  })
  return html
}

function splitTableRow(line) {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map(cell => cell.trim())
}

function isTableDivider(line) {
  const cells = splitTableRow(line)
  return cells.length > 0 && cells.every(cell => /^:?-{3,}:?$/.test(cell))
}

function isTableRow(line) {
  return /^\s*\|.+\|\s*$/.test(line)
}

function renderTable(rows, lang) {
  const [header, , ...bodyRows] = rows
  const headerCells = splitTableRow(header)
  const body = bodyRows.map(row => splitTableRow(row))
  return [
    '<table>',
    '<thead>',
    `<tr>${headerCells.map(cell => `<th>${inlineMarkdown(cell, lang)}</th>`).join('')}</tr>`,
    '</thead>',
    '<tbody>',
    ...body.map(row => `<tr>${row.map(cell => `<td>${inlineMarkdown(cell, lang)}</td>`).join('')}</tr>`),
    '</tbody>',
    '</table>',
  ].join('\n')
}

function markdownToHtml(markdown, lang) {
  const lines = markdown.split(/\r?\n/)
  const html = []
  let inList = false
  let inCode = false
  const closeList = () => {
    if (inList) {
      html.push('</ul>')
      inList = false
    }
  }

  for (let index = 0; index < lines.length; index += 1) {
    const raw = lines[index]
    const line = raw.trimEnd()
    if (line.startsWith('```')) {
      closeList()
      if (inCode) {
        html.push('</code></pre>')
        inCode = false
      } else {
        html.push('<pre><code>')
        inCode = true
      }
      continue
    }
    if (inCode) {
      html.push(`${escapeHtml(raw)}\n`)
      continue
    }
    if (!line || line.startsWith('<!--')) {
      closeList()
      continue
    }
    if (/^<a id="[a-z0-9-]+"><\/a>$/.test(line.trim())) {
      closeList()
      html.push(line.trim())
      continue
    }
    if (isTableRow(line) && lines[index + 1] && isTableDivider(lines[index + 1])) {
      closeList()
      const tableRows = [line, lines[index + 1]]
      index += 2
      while (index < lines.length && isTableRow(lines[index])) {
        tableRows.push(lines[index])
        index += 1
      }
      index -= 1
      html.push(renderTable(tableRows, lang))
      continue
    }
    const heading = /^(#{1,3})\s+(.+)$/.exec(line)
    if (heading) {
      closeList()
      const level = heading[1].length
      const text = inlineMarkdown(heading[2], lang)
      const id = heading[2].toLowerCase().replace(/[^a-z0-9\u3040-\u30ff\u3400-\u9fff]+/g, '-').replace(/^-|-$/g, '')
      html.push(`<h${level} id="${escapeHtml(id)}">${text}</h${level}>`)
      continue
    }
    if (line.startsWith('> ')) {
      closeList()
      html.push(`<blockquote>${inlineMarkdown(line.slice(2), lang)}</blockquote>`)
      continue
    }
    if (line.startsWith('- ')) {
      if (!inList) {
        html.push('<ul>')
        inList = true
      }
      html.push(`<li>${inlineMarkdown(line.slice(2), lang)}</li>`)
      continue
    }
    closeList()
    html.push(`<p>${inlineMarkdown(line, lang)}</p>`)
  }
  closeList()
  if (inCode) html.push('</code></pre>')
  return html.join('\n')
}

const SITE_STYLE = `:root { color-scheme: light dark; --bg: #f8faf9; --fg: #13201a; --muted: #5d6f67; --line: #d8e2dc; --link: #145f45; --panel: #ffffff; }
    @media (prefers-color-scheme: dark) { :root { --bg: #111714; --fg: #edf6f1; --muted: #9eb0a8; --line: #2d3a34; --link: #7ee0b2; --panel: #18211d; } }
    * { box-sizing: border-box; }
    body { margin: 0; font: 16px/1.65 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: var(--fg); background: var(--bg); }
    header { border-bottom: 1px solid var(--line); background: var(--panel); position: sticky; top: 0; z-index: 2; }
    .top { max-width: 1240px; margin: 0 auto; padding: 14px 20px; display: flex; gap: 18px; align-items: center; justify-content: space-between; }
    .brand { font-weight: 700; letter-spacing: 0; }
    .brand a { color: inherit; text-decoration: none; }
    .langs { display: flex; gap: 10px; }
    .langs a { color: var(--link); text-decoration: none; font-weight: 600; }
    .langs a[aria-current="page"] { color: var(--fg); }
    .layout { max-width: 1240px; margin: 0 auto; display: grid; grid-template-columns: 280px minmax(0, 1fr); gap: 34px; padding: 26px 20px 56px; }
    nav { border-right: 1px solid var(--line); padding-right: 22px; }
    nav a { display: block; color: var(--link); text-decoration: none; padding: 5px 0; }
    main { max-width: 840px; }
    h1 { font-size: clamp(2rem, 4vw, 3rem); line-height: 1.1; margin: 0 0 18px; }
    h2 { margin-top: 36px; border-top: 1px solid var(--line); padding-top: 24px; }
    h3 { margin-top: 26px; }
    code { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: .92em; background: color-mix(in srgb, var(--line) 45%, transparent); padding: 1px 5px; border-radius: 4px; }
    pre { overflow: auto; padding: 16px; border: 1px solid var(--line); background: var(--panel); }
    table { width: 100%; border-collapse: collapse; margin: 18px 0 28px; display: block; overflow-x: auto; }
    th, td { border: 1px solid var(--line); padding: 9px 11px; text-align: left; vertical-align: top; }
    th { background: color-mix(in srgb, var(--line) 32%, transparent); }
    blockquote { margin: 0 0 24px; padding: 12px 16px; border-left: 4px solid var(--line); color: var(--muted); background: color-mix(in srgb, var(--panel) 74%, transparent); }
    a { color: var(--link); }
    .products { list-style: none; padding: 0; margin: 28px 0; display: grid; gap: 14px; }
    .products li { border: 1px solid var(--line); border-radius: 10px; padding: 16px 18px; background: var(--panel); }
    .products a { font-weight: 700; font-size: 1.1rem; text-decoration: none; }
    .products .langhint { color: var(--muted); margin-left: 10px; font-size: .9rem; font-weight: 400; }
    @media (max-width: 800px) { .layout { display: block; padding-top: 18px; } nav { border-right: 0; border-bottom: 1px solid var(--line); padding: 0 0 18px; margin-bottom: 24px; } .top { align-items: flex-start; flex-direction: column; } }`

function pageShell({ title, body, nav, lang, product }) {
  // Language switcher scoped to THIS product's languages, linking within the product.
  const langLinks = product.langs
    .map(code => `<a ${code === lang ? 'aria-current="page"' : ''} href="../${code}/index.html">${code.toUpperCase()}</a>`)
    .join('')
  const brandText = escapeHtml(`${product.displayName} Docs`)
  return `<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)} | ${escapeHtml(product.publisher)}</title>
  <style>
    ${SITE_STYLE}
  </style>
</head>
<body>
  <header><div class="top"><div class="brand"><a href="../../index.html">${brandText}</a></div><div class="langs">${langLinks}</div></div></header>
  <div class="layout">
    <nav aria-label="Documentation">${nav}</nav>
    <main>${body}</main>
  </div>
</body>
</html>
`
}

async function markdownFilesFor(productDir, lang) {
  return (await readdir(join(productDir, lang))).filter(name => name.endsWith('.md')).sort()
}

function navFilesFor(files, inventory) {
  if (!inventory?.pages) return files
  const visible = inventory.pages
    .filter(page => !page.nav_hidden)
    .map(page => `${page.slug}.md`)
    .filter(file => files.includes(file))
  return ['README.md', ...visible.filter(file => file !== 'README.md')]
}

// Discover every buildable product: a `docs/<product>/` dir with a docs-inventory.json
// and at least one `<lang>/` subdir of markdown. README-only stubs are skipped.
async function discoverProducts() {
  const entries = await readdir(docsBase, { withFileTypes: true })
  const products = []
  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    const dir = join(docsBase, entry.name)
    const inventoryPath = join(dir, 'docs-inventory.json')
    if (!existsSync(inventoryPath)) continue
    const inventory = JSON.parse(await readFile(inventoryPath, 'utf8'))
    const declaredLangs = Array.isArray(inventory.languages) ? inventory.languages : []
    const langs = declaredLangs.filter(lang => existsSync(join(dir, lang)))
    if (langs.length === 0) continue
    products.push({
      id: entry.name,
      dir,
      inventory,
      langs,
      displayName: inventory.product || entry.name,
      publisher: inventory.publisher || inventory.product || entry.name,
      defaultLang: langs.includes('en') ? 'en' : langs[0],
    })
  }
  return products.sort((a, b) => a.id.localeCompare(b.id))
}

async function buildProduct(product) {
  const titles = {}
  const filesByLang = {}
  for (const lang of product.langs) {
    filesByLang[lang] = await markdownFilesFor(product.dir, lang)
    titles[lang] = {}
    for (const file of filesByLang[lang]) {
      const md = await readFile(join(product.dir, lang, file), 'utf8')
      titles[lang][file] = /^#\s+(.+)$/m.exec(md)?.[1] ?? basename(file, '.md')
    }
  }

  for (const lang of product.langs) {
    const langOut = join(outRoot, product.id, lang)
    await mkdir(langOut, { recursive: true })
    const nav = navFilesFor(filesByLang[lang], product.inventory)
      .map(file => {
        const href = file === 'README.md' ? 'index.html' : file.replace(/\.md$/, '.html')
        return `<a href="${href}">${escapeHtml(titles[lang][file])}</a>`
      })
      .join('\n')
    for (const file of filesByLang[lang]) {
      const markdown = await readFile(join(product.dir, lang, file), 'utf8')
      const title = titles[lang][file]
      const body = markdownToHtml(markdown, lang)
      const html = pageShell({ title, body, nav, lang, product })
      const target = file === 'README.md' ? 'index.html' : file.replace(/\.md$/, '.html')
      await writeFile(join(langOut, target), html, 'utf8')
    }
  }
}

async function readSiteConfig() {
  const path = join(docsBase, 'site.config.json')
  if (!existsSync(path)) return {}
  return JSON.parse(await readFile(path, 'utf8'))
}

function rootIndexHtml({ title, products }) {
  const items = products
    .map(p => `<li><a href="${p.id}/${p.defaultLang}/index.html">${escapeHtml(p.displayName)}</a><span class="langhint">${p.langs.map(l => l.toUpperCase()).join(' · ')}</span></li>`)
    .join('\n      ')
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <style>
    ${SITE_STYLE}
  </style>
</head>
<body>
  <header><div class="top"><div class="brand">${escapeHtml(title)}</div></div></header>
  <div class="layout" style="display:block">
    <main>
      <h1>${escapeHtml(title)}</h1>
      <p>Product documentation:</p>
      <ul class="products">
      ${items}
      </ul>
    </main>
  </div>
</body>
</html>
`
}

function redirectHtml(target) {
  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=${escapeHtml(target)}"><title>Redirecting…</title></head>
<body><p><a href="${escapeHtml(target)}">Continue to documentation</a></p></body>
</html>
`
}

async function main() {
  if (!existsSync(docsBase)) throw new Error(`Missing ${docsBase}`)
  const products = await discoverProducts()
  if (products.length === 0) throw new Error(`No buildable products under ${docsBase} (need docs-inventory.json + a <lang>/ dir)`)

  await rm(outRoot, { recursive: true, force: true })
  await mkdir(outRoot, { recursive: true })

  for (const product of products) await buildProduct(product)

  const siteConfig = await readSiteConfig()
  const siteTitle = siteConfig.title || `${products[0].publisher} Docs`

  // Root product index (replaces the old single-product 302 redirect).
  await writeFile(join(outRoot, 'index.html'), rootIndexHtml({ title: siteTitle, products }), 'utf8')

  // Optional back-compat: a previously-root product can keep its old `site/<lang>/`
  // URLs alive via redirect stubs, so external links don't 404 after the move to
  // `site/<product>/<lang>/`. Opt-in + explicit via docs/site.config.json — no
  // product is special-cased in code.
  const legacy = products.find(p => p.id === siteConfig.legacyRootProduct)
  if (legacy) {
    for (const lang of legacy.langs) {
      await mkdir(join(outRoot, lang), { recursive: true })
      await writeFile(join(outRoot, lang, 'index.html'), redirectHtml(`../${legacy.id}/${lang}/index.html`), 'utf8')
    }
  }

  console.log(`Built static site at ${outRoot} for ${products.length} product(s): ${products.map(p => `${p.id}[${p.langs.join('/')}]`).join(', ')}`)
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
