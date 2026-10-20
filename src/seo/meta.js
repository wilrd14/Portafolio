// Metadatos SEO compartidos entre el cliente (useSeo) y el prerender (scripts/prerender.mjs).
// Funciones puras: reciben los datos como argumentos para poder usarse desde Node y desde el navegador.

const MAX_DESC = 160

export function truncate(text, max = MAX_DESC) {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  const cut = clean.slice(0, max - 1)
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[.,;:]$/, '') + '…'
}

export function absUrl(seo, path) {
  return /^https?:/.test(path) ? path : seo.siteUrl + path
}

export function homeMeta(seo, lang = 'es') {
  const h = seo.home[lang] || seo.home.es
  return {
    title: h.title,
    description: h.description,
    url: seo.siteUrl + '/',
    image: absUrl(seo, seo.image),
    imageAlt: `${seo.personName}, ${seo.jobTitle.toLowerCase()}`,
    robots: 'index,follow,max-image-preview:large',
    ogType: 'website',
    locale: lang === 'en' ? 'en_US' : 'es_DO',
  }
}

export function projectMeta(seo, project) {
  return {
    title: `${project.title} | Proyecto de Williams Villavizar`,
    description: truncate(project.description),
    url: `${seo.siteUrl}/projects/${project.slug}`,
    image: absUrl(seo, project.image),
    imageAlt: `Captura del proyecto ${project.title}`,
    robots: 'index,follow,max-image-preview:large',
    ogType: 'article',
    locale: 'es_DO',
  }
}

export function notFoundMeta(seo) {
  return {
    title: 'Página no encontrada | Williams Villavizar',
    description: 'La página que buscas no existe.',
    url: seo.siteUrl + '/',
    image: absUrl(seo, seo.image),
    imageAlt: seo.personName,
    robots: 'noindex,follow',
    ogType: 'website',
    locale: 'es_DO',
  }
}

const APP_CATEGORY = {
  fullstack: 'WebApplication',
  frontend: 'WebApplication',
  backend: 'DeveloperApplication',
  desktop: 'DesktopEnhancementApplication',
}

function personNode(seo) {
  return {
    '@type': 'Person',
    '@id': `${seo.siteUrl}/#person`,
    name: seo.personName,
    alternateName: 'wilrd14',
    url: seo.siteUrl + '/',
    image: absUrl(seo, '/images/avatar.jpg'),
    jobTitle: seo.jobTitle,
    address: {
      '@type': 'PostalAddress',
      addressLocality: seo.locality,
      addressCountry: seo.country,
    },
    sameAs: seo.sameAs,
    knowsAbout: seo.knowsAbout,
  }
}

function projectNode(seo, project) {
  const node = {
    '@type': 'SoftwareApplication',
    '@id': `${seo.siteUrl}/projects/${project.slug}#software`,
    name: project.title,
    description: project.description,
    applicationCategory: APP_CATEGORY[project.category] || 'WebApplication',
    inLanguage: 'es',
    image: absUrl(seo, project.image),
    keywords: project.tech.join(', '),
    url: project.liveUrl || `${seo.siteUrl}/projects/${project.slug}`,
    author: { '@id': `${seo.siteUrl}/#person` },
  }
  if (project.repoUrl) node.sameAs = [project.repoUrl]
  return node
}

export function homeJsonLd(seo, services = [], projects = []) {
  const service = {
    '@type': 'ProfessionalService',
    '@id': `${seo.siteUrl}/#service`,
    name: `${seo.siteName} - Desarrollo web`,
    url: seo.siteUrl + '/',
    image: absUrl(seo, seo.image),
    description: seo.home.es.description,
    founder: { '@id': `${seo.siteUrl}/#person` },
    address: {
      '@type': 'PostalAddress',
      addressLocality: seo.locality,
      addressCountry: seo.country,
    },
    areaServed: [
      { '@type': 'Country', name: seo.countryName },
      { '@type': 'City', name: seo.locality },
    ],
    sameAs: seo.sameAs,
    knowsAbout: seo.knowsAbout,
  }
  if (services.length) {
    service.hasOfferCatalog = {
      '@type': 'OfferCatalog',
      name: 'Servicios',
      itemListElement: services.map(s => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.title, description: s.description },
      })),
    }
  }
  const graph = [
    {
      '@type': 'WebSite',
      '@id': `${seo.siteUrl}/#website`,
      url: seo.siteUrl + '/',
      name: seo.siteName,
      inLanguage: ['es', 'en'],
      publisher: { '@id': `${seo.siteUrl}/#person` },
    },
    personNode(seo),
    service,
  ]
  if (projects.length) {
    graph.push({
      '@type': 'ItemList',
      '@id': `${seo.siteUrl}/#projects`,
      name: 'Proyectos',
      itemListElement: projects.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${seo.siteUrl}/projects/${p.slug}`,
        name: p.title,
      })),
    })
  }
  return { '@context': 'https://schema.org', '@graph': graph }
}

export function projectJsonLd(seo, project) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      personNode(seo),
      projectNode(seo, project),
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: seo.siteUrl + '/' },
          { '@type': 'ListItem', position: 2, name: project.title, item: `${seo.siteUrl}/projects/${project.slug}` },
        ],
      },
    ],
  }
}
