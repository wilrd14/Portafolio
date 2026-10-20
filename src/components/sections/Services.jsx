import { Bot, CalendarCheck, DatabaseZap, Globe, Monitor, ShoppingCart } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import ScrollReveal from '../effects/ScrollReveal'
import Container from '../layout/Container'

const icons = [Globe, ShoppingCart, CalendarCheck, Monitor, DatabaseZap, Bot]

export default function Services() {
  const { t } = useLanguage()
  const services = t('services.items')

  return (
    <section id="services" className="py-24 md:py-32 section-line">
      <Container>
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl text-text-primary dark:text-dark-text-primary mb-16 text-center">
            {t('services.title')}<span className="cursor" aria-hidden="true" />
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.isArray(services) && services.map((service, index) => {
            const Icon = icons[index]
            return (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="card group p-8 h-full transition-all duration-300 hover:-translate-y-0.5 dark:hover:shadow-[var(--shadow-glow)]">
                  <div className="w-14 h-14 rounded-xl bg-accent/10 dark:bg-dark-accent/10 flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110">
                    <Icon size={28} className="text-accent dark:text-dark-accent" />
                  </div>
                  <h3 className="text-xl text-text-primary dark:text-dark-text-primary mb-3">
                    {service.title}
                  </h3>
                  <p className="text-text-secondary dark:text-dark-text-secondary leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
