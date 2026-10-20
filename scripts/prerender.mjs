// Post-build: genera HTML estático por ruta (/, /projects/<slug>, 404), sitemap.xml.
// Cada HTML lleva sus propios metadatos, JSON-LD y un resumen del contenido real
// para que los buscadores y bots sin JavaScript vean algo útil. React lo reemplaza al montar.
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises'
import { execSync } from 'node:child_process'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  homeMeta, projectMeta, notFoundMeta, homeJsonLd, projectJsonLd,
} from '../src/seo/meta.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const readJson = async (p) => JSON.parse(await readFile(join(root, p), 'utf8'))

const seo = await readJson('src/seo/seo.json')
const es = await readJson('src/locales/es.json')
const projects = (await readJson('src/data/projects.json')).sort((a, b) => a.order - b.order)
const template = await readFile(join(dist, 'index.html'), 'utf8')

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// Fuentes críticas (peso 700 de Space Grotesk para los títulos e Inter 400 para el texto)
const assets = await readdir(join(dist, 'assets'))
const fontPreloads = ['space-grotesk-latin-700-normal', 'inter-latin-400-normal']
  .map(prefix => assets.find(f => f.startsWith(prefix) && f.endsWith('.woff2')))
  .filter(Boolean)
  .map(f => `    <link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin />`)

function headBlock(meta, jsonLd) {
  return [
    `    <title>${esc(meta.title)}</title>`,
    `    <meta name="description" content="${esc(meta.description)}" />`,
    `    <meta name="keywords" content="${esc(seo.keywords)}" />`,
    `    <meta name="author" content="${esc(seo.personName)}" />`,
    `    <meta name="robots" content="${meta.robots}" />`,
    `    <link rel="canonical" href="${meta.url}" />`,
    `    <meta property="og:type" content="${meta.ogType}" />`,
    `    <meta property="og:site_name" content="${esc(seo.siteName)}" />`,
    `    <meta property="og:locale" content="${meta.locale}" />`,
    `    <meta property="og:title" content="${esc(meta.title)}" />`,
    `    <meta property="og:description" content="${esc(meta.description)}" />`,
    `    <meta property="og:url" content="${meta.url}" />`,
    `    <meta property="og:image" content="${meta.image}" />`,
    ...(meta.image.endsWith(seo.image) ? [`    <meta property="og:image:width" content="${seo.imageWidth}" />`, `    <meta property="og:image:height" content="${seo.imageHeight}" />`] : []),
    `    <meta property="og:image:alt" content="${esc(meta.imageAlt)}" />`,
    `    <meta name="twitter:card" content="summary_large_image" />`,
    `    <meta name="twitter:title" content="${esc(meta.title)}" />`,
    `    <meta name="twitter:description" content="${esc(meta.description)}" />`,
    `    <meta name="twitter:image" content="${meta.image}" />`,
    `    <meta name="twitter:image:alt" content="${esc(meta.imageAlt)}" />`,
    ...fontPreloads,
    jsonLd ? `    <script type="application/ld+json" id="ld-json">${JSON.stringify(jsonLd)}</script>` : '',
  ].filter(Boolean).join('\n')
}

// Quita los metadatos del index.html de origen para reescribirlos por ruta.
function stripHead(html) {
  return html
    .replace(/\s*<title>[\s\S]*?<\/title>/g, '')
    .replace(/\s*<meta\s+(?:name|property)="(?:description|keywords|author|robots|og:[^"]*|twitter:[^"]*)"[^>]*>/g, '')
    .replace(/\s*<link\s+rel="canonical"[^>]*>/g, '')
    .replace(/\s*<script type="application\/ld\+json"[\s\S]*?<\/script>/g, '')
}

// Contenido real en texto plano accesible (oculto visualmente, sin display:none).
const hiddenStyle = 'position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap'

function homeBody() {
  const projectItems = projects.map(p =>
    `<li><h3><a href="/projects/${p.slug}">${esc(p.title)}</a></h3><p>${esc(p.description)}</p><p>${esc(p.tech.join(', '))}</p></li>`).join('')
  const serviceItems = es.services.items.map(s =>
    `<li><h3>${esc(s.title)}</h3><p>${esc(s.description)}</p></li>`).join('')
  const links = seo.sameAs.map(u => `<li><a href="${u}" rel="me noopener">${esc(u.replace('https://', '').replace('www.', ''))}</a></li>`).join('')
  return `<div style="${hiddenStyle}"><header><h1>${esc(es.hero.h1_prefix)} ${esc(es.hero.promise_1)} ${esc(es.hero.promise_2)}</h1></header><main><p>${esc(es.hero.subtitle)}</p><h2>${esc(es.about.title)}</h2><p>${esc(es.about.bio)}</p><h2>${esc(es.projects.title)}</h2><ul>${projectItems}</ul><h2>${esc(es.services.title)}</h2><ul>${serviceItems}</ul><h2>${esc(es.contact.title)}</h2><ul>${links}</ul></main></div>`
}

function projectBody(p) {
  const links = [
    p.liveUrl && `<li><a href="${p.liveUrl}" rel="noopener">${esc(es.projects.view_project)}</a></li>`,
    p.repoUrl && `<li><a href="${p.repoUrl}" rel="noopener">${esc(es.projects.view_code)}</a></li>`,
  ].filter(Boolean).join('')
  return `<div style="${hiddenStyle}"><main><p><a href="/">${esc(es.nav.home)}</a></p><h1>${esc(p.title)}</h1><p>${esc(p.description)}</p><p>${esc(p.tech.join(', '))}</p><ul>${links}</ul></main></div>`
}

function render(meta, jsonLd, body) {
  let html = stripHead(template)
  html = html.replace('</head>', `${headBlock(meta, jsonLd)}\n  </head>`)
  html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`)
  return html
}

const write = async (rel, content) => {
  const file = join(dist, rel)
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, content)
}

await write('index.html', render(homeMeta(seo, 'es'), homeJsonLd(seo, es.services.items, projects), homeBody()))
for (const p of projects) {
  await write(`projects/${p.slug}/index.html`, render(projectMeta(seo, p), projectJsonLd(seo, p), projectBody(p)))
}
// Cloudflare Pages sirve 404.html con estado 404 para rutas inexistentes (sin regla SPA en _redirects).
await write('404.html', render(notFoundMeta(seo), null, ''))

// sitemap.xml
let lastmod
try {
  lastmod = execSync('git log -1 --format=%cs', { cwd: root, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim()
} catch { /* sin git */ }
lastmod ||= new Date().toISOString().slice(0, 10)

const urls = [
  { loc: seo.siteUrl + '/', priority: '1.0' },
  ...projects.map(p => ({ loc: `${seo.siteUrl}/projects/${p.slug}`, priority: '0.7' })),
]
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${u.priority}</priority>\n  </url>`).join('\n')}
</urlset>
`
await write('sitemap.xml', sitemap)

console.log(`prerender: ${urls.length} rutas + 404.html + sitemap.xml (lastmod ${lastmod})`)
