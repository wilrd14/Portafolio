import { useEffect } from 'react'

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

// Actualiza en el <head> los metadatos que el prerender ya dejó en el HTML,
// para que la navegación del lado del cliente mantenga título, canonical y robots coherentes.
export default function useSeo(meta, jsonLd) {
  const { title, description, url, image, imageAlt, robots, ogType, locale } = meta
  const ld = jsonLd ? JSON.stringify(jsonLd) : ''

  useEffect(() => {
    document.title = title
    setMeta('name', 'description', description)
    setMeta('name', 'robots', robots)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:type', ogType)
    setMeta('property', 'og:locale', locale)
    setMeta('property', 'og:image', image)
    setMeta('property', 'og:image:alt', imageAlt)
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', image)
    setMeta('name', 'twitter:image:alt', imageAlt)

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', url)

    const script = document.getElementById('ld-json')
    if (script && ld) script.textContent = ld
  }, [title, description, url, image, imageAlt, robots, ogType, locale, ld])
}
