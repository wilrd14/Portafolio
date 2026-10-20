import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import Skills from '../components/sections/Skills'
import Projects from '../components/sections/Projects'
import Experience from '../components/sections/Experience'
import Services from '../components/sections/Services'
import Contact from '../components/sections/Contact'
import { useLanguage } from '../context/LanguageContext'
import useSeo from '../seo/useSeo'
import { homeMeta, homeJsonLd } from '../seo/meta'
import seo from '../seo/seo.json'
import es from '../locales/es.json'
import projects from '../data/projects.json'

const jsonLd = homeJsonLd(seo, es.services.items, [...projects].sort((a, b) => a.order - b.order))

export default function Home() {
  const { language } = useLanguage()
  useSeo(homeMeta(seo, language), jsonLd)

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Services />
      <Contact />
    </>
  )
}
