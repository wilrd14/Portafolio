# SEO e indexación de wilrd14.dev

Nadie puede garantizar aparecer primero ni "recomendado en cada búsqueda". Lo técnico (esta rama) solo quita obstáculos y le da a Google la información correcta. El posicionamiento real depende de contenido, autoridad (enlaces de otros sitios) y tiempo: normalmente semanas o meses. Buscar tu nombre ("Williams Villavizar") es mucho más fácil que competir por "desarrollador web Santo Domingo".

## Qué se hizo en el código

| Área | Detalle |
|------|---------|
| `index.html` | Título y descripción en español con keywords reales (desarrollador web, Santo Domingo, República Dominicana, React, tiendas online), canonical, `lang="es-DO"`, robots, Open Graph, Twitter Cards, `og-image.png` (1200x630, ya existía), manifest y favicons. |
| Metadatos por ruta | `src/seo/` (`seo.json`, `meta.js`, `useSeo.js`). El mismo código genera los metadatos en el build y los actualiza en el navegador al navegar. Se quitó `react-helmet-async`. |
| Prerender | `scripts/prerender.mjs` corre tras `vite build` y genera `dist/index.html`, `dist/projects/<slug>/index.html` (7 proyectos) y `dist/404.html`, cada uno con su title, description, canonical, OG/Twitter, JSON-LD y un resumen del contenido real en el HTML (encabezados y enlaces). React lo reemplaza al cargar. |
| JSON-LD | Home: `WebSite`, `Person`, `ProfessionalService` (areaServed RD y Santo Domingo, servicios como `OfferCatalog`, `sameAs` con GitHub y LinkedIn) e `ItemList` de proyectos. Cada proyecto: `SoftwareApplication` + `BreadcrumbList`. Solo datos que ya existían en el repo. |
| 404 real | Se eliminó `_redirects` (`/* /index.html 200`). Cloudflare Pages ahora responde 404 con `404.html` (`noindex`) a rutas inexistentes. Nuevo `pages/NotFound.jsx` para rutas desconocidas. |
| `robots.txt` y `sitemap.xml` | Robots permite todo, bloquea `/admin/` y apunta al sitemap. El sitemap se genera en cada build con las rutas reales (home + proyectos de `projects.json`) y `lastmod` de la fecha del último commit. |
| `/admin` | `noindex` en `public/admin/index.html`, `Disallow` en robots y `X-Robots-Tag` en `_headers`. |
| Rendimiento | Preload de las fuentes críticas (Space Grotesk 700, Inter 400), `width`/`height`/`loading="lazy"`/`decoding="async"` en imágenes, alts descriptivos. |
| Accesibilidad/SEO | Un solo `h1` por página (en la home incluye "desarrollador web en Santo Domingo" como texto solo para lectores), jerarquía h1 > h2 > h3, y `<html lang>` cambia a `es-DO`/`en` según el idioma activo. |
| `public/_headers` | Caché inmutable de un año en `/assets/*`, revalidación en HTML, cabeceras básicas de seguridad. |

Notas técnicas y límites:

- El idioma EN comparte URL con ES (se cambia con un botón y `localStorage`), así que **no hay hreflang**: Google indexa la versión en español. Si quieres posicionar en inglés, haría falta `/en/` con URLs propias.
- Las descripciones de proyectos solo existen en español.
- Cloudflare Pages debe ejecutar `npm run build` (no solo `vite build`) para que corra el prerender. Verifica el comando de build en el proyecto `portfolio`.
- El contenido prerenderizado está oculto visualmente (clip de 1px) y coincide con lo que renderiza la app. No es hidden text engañoso, pero no sustituye al contenido visible: Google ejecuta el JS.
- El sitemap no incluye `priority`/`changefreq` útiles para Google; `lastmod` es la fecha del último commit global.

## Pasos que SOLO puedes hacer tú

### 1. Verificar el dominio en Google Search Console
1. Entra a https://search.google.com/search-console con tu cuenta de Google.
2. "Añadir propiedad" > **Dominio** > `wilrd14.dev`.
3. Google te da un registro TXT (`google-site-verification=...`). En Cloudflare: dominio `wilrd14.dev` > **DNS** > Records > Add record, Tipo `TXT`, Nombre `@`, Contenido el valor que te dio. Guarda y pulsa "Verificar" (puede tardar minutos).
4. Alternativa (propiedad "Prefijo de URL" `https://wilrd14.dev/`): añade `<meta name="google-site-verification" content="CODIGO" />` en el `<head>` de `index.html` (el script de prerender lo conserva en todas las páginas) o sube el archivo HTML de verificación a `public/`.

### 2. Enviar el sitemap
Search Console > **Sitemaps** > escribe `sitemap.xml` > Enviar. Debe decir "Correcto" con 8 URLs. Tras desplegar, comprueba que https://wilrd14.dev/sitemap.xml y https://wilrd14.dev/robots.txt cargan.

### 3. Solicitar indexación
Search Console > barra superior "Inspeccionar cualquier URL" > pega `https://wilrd14.dev/` > "Solicitar indexación". Repite con `https://wilrd14.dev/projects/wtech-store` y los demás proyectos. Hay un cupo diario pequeño; no hace falta repetirlo.

### 4. Bing y otros buscadores
En https://www.bing.com/webmasters puedes "Importar desde Google Search Console" (más rápido), enviar el sitemap y activar IndexNow si quieres. Bing alimenta también a DuckDuckGo y a Copilot.

### 5. Google Business Profile
Solo aplica si quieres aparecer como negocio local. Requisitos reales: Google exige una dirección física o un área de servicio verificable y verificación (llamada, correo o video). Un perfil "solo área de servicio" (oculta la dirección) es lo habitual para freelancers. Pendiente de ti: nombre comercial, categoría ("Desarrollador de sitios web"), teléfono, correo público y zona de servicio. No se agregó ningún teléfono, dirección ni reseña al sitio porque no existen en el repo. Cuando tengas el perfil, añade su URL a `sameAs` en `src/seo/seo.json`. No pidas ni inventes reseñas falsas.

### 6. Enlaces entrantes (backlinks) y perfiles
Es lo que más pesa a mediano plazo y no se puede automatizar.
- GitHub: en tu perfil y en el README de cada repo (Agendalo, Jarvis, WTech_Store, etc.) enlaza a https://wilrd14.dev y pon el campo "Website" del perfil.
- LinkedIn: añade el sitio en "Información de contacto" y en la sección Destacados; usa el mismo título "Desarrollador web en Santo Domingo".
- Enlaza el portafolio desde `w-tech.uk` y desde proyectos publicados.
- Directorios con criterio (no compres enlaces): Clutch, directorios de desarrolladores de RD, comunidades dev dominicanas, Product Hunt/Dev.to/Hashnode con artículos que enlacen a tus proyectos.
- Usa el mismo nombre ("Williams Villavizar") y la misma foto en todos los perfiles para que Google conecte la entidad.

### 7. Contenido
Google posiciona páginas, no promesas. Lo que más ayudaría: una página o sección por servicio con ejemplos reales, 2 o 3 artículos o casos de estudio (por ejemplo cómo hiciste la tienda con PayPal o la conciliación de pagos con pandas) y textos de proyecto más largos. Hoy cada proyecto es una descripción corta.

### 8. Medir
- Search Console > **Rendimiento**: consultas, clics, impresiones y posición. Revisa también **Páginas** (qué está indexado y por qué no).
- https://pagespeed.web.dev con `https://wilrd14.dev/` (móvil): vigila LCP, CLS e INP.
- Prueba los datos estructurados en https://search.google.com/test/rich-results y https://validator.schema.org.
- Vista previa social: https://www.opengraph.xyz o el depurador de Facebook/LinkedIn Post Inspector (fuerzan la recarga de la imagen).
- Busca `site:wilrd14.dev` en Google para ver qué hay indexado.

## Pendientes de datos tuyos
- Código de verificación de Search Console (si usas la etiqueta meta).
- Teléfono/WhatsApp o correo público si quieres mostrarlo y marcarlo como `contactPoint` (el correo de `wrangler.toml` no se publicó por ser privado).
- URL de Google Business Profile u otros perfiles reales para `sameAs`.
- Versión en inglés con URLs propias, si te interesa captar búsquedas en inglés.
- Mejor imagen social específica por proyecto (1200x630); hoy usan su captura.

## Cómo probarlo en local
```bash
npm run build      # vite build + prerender + sitemap
npm run preview    # revisa dist/ en http://localhost:4173
```
Revisa `dist/projects/jarvis/index.html` (title, canonical, JSON-LD), `dist/sitemap.xml` y `dist/404.html`.
