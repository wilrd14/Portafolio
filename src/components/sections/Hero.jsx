import { ChevronDown } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import Typewriter from '../effects/Typewriter'
import ScrollReveal from '../effects/ScrollReveal'

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-20"
    >
      <div className="absolute inset-0 bg-grid pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.7fr_1fr] gap-12 items-center">
          <div className="min-w-0">
            <ScrollReveal>
              <p className="label-mono mb-6">
                <span className="text-text-secondary dark:text-dark-text-secondary">&gt;</span> wilrd14
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl leading-[1.05] text-text-primary dark:text-dark-text-primary mb-6">
                {t('hero.promise_1')}
                <br />
                <span className="text-accent dark:text-dark-accent sm:whitespace-nowrap">{t('hero.promise_2')}<span className="cursor" aria-hidden="true" /></span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-lg md:text-xl text-text-secondary dark:text-dark-text-secondary mb-3 max-w-xl leading-relaxed">
                {t('hero.subtitle')}
              </p>
              <div className="font-mono text-base md:text-lg mb-8 h-8 flex items-center">
                <span className="text-text-secondary dark:text-dark-text-secondary mr-2">
                  {t('hero.greeting')} Williams —
                </span>
                <Typewriter words={t('hero.titles')} />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a href="#projects" className="btn btn-primary">
                  {t('hero.cta_primary')}
                </a>
                <a href="#contact" className="btn btn-secondary">
                  {t('hero.cta_secondary')}
                </a>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border dark:border-dark-border">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime opacity-60 motion-reduce:hidden" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-lime" />
                </span>
                <span className="font-mono text-xs text-text-secondary dark:text-dark-text-secondary">
                  {t('hero.open_to_work')}
                </span>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.2} direction="right">
            <div className="hidden lg:flex justify-center">
              <img
                src="/brand/logo-monograma-color.svg"
                alt="Monograma W_ de Williams"
                className="w-full max-w-xs h-auto hidden dark:block drop-shadow-[0_0_40px_rgba(0,229,255,0.15)]"
              />
              <img
                src="/brand/logo-monograma-oscuro.svg"
                alt="Monograma W_ de Williams"
                className="w-full max-w-xs h-auto dark:hidden"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-text-secondary dark:text-dark-text-secondary hover:text-accent dark:hover:text-dark-accent transition-colors motion-safe:animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown size={28} />
      </a>
    </section>
  )
}
