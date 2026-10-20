import { MapPin, Download } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import ScrollReveal from '../effects/ScrollReveal'
import Container from '../layout/Container'

export default function About() {
  const { t, language } = useLanguage()
  const cvHref = language === 'en' ? '/cv-en.pdf' : '/cv.pdf'
  const cvFileName = language === 'en' ? 'Williams-Villavizar-CV-EN.pdf' : 'Williams-Villavizar-CV.pdf'

  return (
    <section id="about" className="py-24 md:py-32 section-line">
      <Container>
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <ScrollReveal direction="left">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-dark-accent/40 to-dark-magenta/40 blur-md" aria-hidden="true" />
                <div className="relative w-64 h-64 rounded-full bg-surface dark:bg-dark-surface border border-border dark:border-dark-border overflow-hidden">
                  <img
                    src="/images/avatar.jpg"
                    alt="Williams R. Villavizar Hdez, desarrollador web en Santo Domingo"
                    width={1178}
                    height={883}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div>
            <ScrollReveal>
              <p className="label-mono mb-3">01 · {t('nav.about')}</p>
              <h2 className="text-3xl md:text-4xl text-text-primary dark:text-dark-text-primary mb-6">
                {t('about.title')}<span className="cursor" aria-hidden="true" />
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p className="text-text-secondary dark:text-dark-text-secondary text-lg leading-relaxed mb-8">
                {t('about.bio')}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="flex items-center gap-2 text-text-secondary dark:text-dark-text-secondary mb-8">
                <MapPin size={18} className="text-accent dark:text-dark-accent" />
                <span>{t('about.location')}</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <a
                href={cvHref}
                download={cvFileName}
                className="btn btn-primary"
              >
                <Download size={18} />
                {t('about.download_cv')}
              </a>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
