import { useLanguage } from '../../context/LanguageContext'
import ScrollReveal from '../effects/ScrollReveal'
import Container from '../layout/Container'
import skillsData from '../../data/skills.json'

const iconMap = {
  react: '/images/icons/tech/react.svg',
  nextjs: '/images/icons/tech/nextjs.svg',
  typescript: '/images/icons/tech/typescript.svg',
  vite: '/images/icons/tech/vite.svg',
  tailwind: '/images/icons/tech/tailwind.svg',
  motion: '/images/icons/tech/motion.svg',
  javascript: '/images/icons/tech/javascript.svg',
  html: '/images/icons/tech/html.svg',
  css: '/images/icons/tech/css.svg',
  nodejs: '/images/icons/tech/nodejs.svg',
  express: '/images/icons/tech/express.svg',
  supabase: '/images/icons/tech/supabase.svg',
  sqlite: '/images/icons/tech/sqlite.svg',
  tauri: '/images/icons/tech/tauri.svg',
  git: '/images/icons/tech/git.svg',
  docker: '/images/icons/tech/docker.svg',
  cloudflare: '/images/icons/tech/cloudflare.svg',
  figma: '/images/icons/tech/figma.svg',
  paypal: '/images/icons/tech/paypal.svg',
  decap: '/images/icons/tech/decap.svg',
  design: '/images/icons/tech/design.svg',
  responsive: '/images/icons/tech/responsive.svg',
}

// Un solo acento dominante (cian): todas las categorías comparten estilo
const categoryStyle = {
  bg: 'bg-accent/10 dark:bg-dark-accent/10',
  border: 'border-border dark:border-dark-border',
}

export default function Skills() {
  const { t } = useLanguage()

  return (
    <section id="skills" className="py-24 md:py-32 section-line">
      <Container>
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl text-text-primary dark:text-dark-text-primary mb-16 text-center">
            {t('skills.title')}<span className="cursor" aria-hidden="true" />
          </h2>
        </ScrollReveal>

        <div className="space-y-16">
          {Object.entries(skillsData).map(([category, skills], catIdx) => (
            <ScrollReveal key={category} delay={catIdx * 0.1}>
              <h3 className="label-mono mb-6">
                {t(`skills.categories.${category}`)}
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {skills.map((skill) => {
                  const color = categoryStyle
                  const iconSrc = iconMap[skill.icon]
                  return (
                    <div
                      key={skill.name}
                      className={`group flex items-center gap-3 p-4 rounded-xl bg-surface dark:bg-dark-surface border ${color.border} transition-all duration-300 hover:-translate-y-0.5 hover:border-accent dark:hover:border-dark-accent cursor-default`}
                    >
                      <div className={`flex-shrink-0 w-10 h-10 rounded-lg ${color.bg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                        {iconSrc ? (
                          <img src={iconSrc} alt={skill.name} width={24} height={24} loading="lazy" className="w-6 h-6 object-contain brightness-0 dark:brightness-0 dark:invert" />
                        ) : (
                          <span className="text-lg font-bold text-text-secondary dark:text-dark-text-secondary">
                            {skill.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <span className="text-sm font-medium text-text-primary dark:text-dark-text-primary truncate">
                        {skill.name}
                      </span>
                    </div>
                  )
                })}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
