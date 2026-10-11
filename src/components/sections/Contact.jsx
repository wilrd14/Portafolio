import { useState } from 'react'
import { Mail, MapPin, Send } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons'
import { useLanguage } from '../../context/LanguageContext'
import ScrollReveal from '../effects/ScrollReveal'
import Container from '../layout/Container'

const contactLinks = [
  { icon: Mail, label: 'Email', value: 'williamsvillavizar204@gmail.com', href: 'mailto:williamsvillavizar204@gmail.com' },
  { icon: MapPin, label: 'Ubicación', valueKey: 'about.location', href: null },
  { icon: GithubIcon, label: 'GitHub', value: 'github.com/wilrd14', href: 'https://github.com/wilrd14' },
  { icon: LinkedinIcon, label: 'LinkedIn', value: 'linkedin.com/in/williams-rafael', href: 'https://www.linkedin.com/in/williams-rafael/' },
]

export default function Contact() {
  const { t } = useLanguage()

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle')

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')

    try {
      await fetch('https://portfolio-contact.williamsvillavizar204.workers.dev', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-24 md:py-32 section-line">
      <Container>
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl text-text-primary dark:text-dark-text-primary mb-16 text-center">
            {t('contact.title')}<span className="cursor" aria-hidden="true" />
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          <ScrollReveal direction="left">
            <div className="space-y-8">
              {contactLinks.map(({ icon: Icon, label, value, valueKey, href }) => {
                const displayValue = valueKey ? t(valueKey) : value
                const content = (
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 dark:bg-dark-accent/10 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                      <Icon size={22} className="text-accent dark:text-dark-accent" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-text-secondary dark:text-dark-text-secondary mb-1">{label}</p>
                      <p className="text-text-primary dark:text-dark-text-primary font-medium [overflow-wrap:anywhere]">{displayValue}</p>
                    </div>
                  </div>
                )

                return href ? (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="block transition-opacity hover:opacity-80">
                    {content}
                  </a>
                ) : (
                  <div key={label}>{content}</div>
                )
              })}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block label-mono !text-text-secondary dark:!text-dark-text-secondary mb-2">
                  {t('contact.name')}
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="field"
                />
              </div>

              <div>
                <label className="block label-mono !text-text-secondary dark:!text-dark-text-secondary mb-2">
                  {t('contact.email')}
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="field"
                />
              </div>

              <div>
                <label className="block label-mono !text-text-secondary dark:!text-dark-text-secondary mb-2">
                  {t('contact.subject')}
                </label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  className="field"
                >
                  <option value="" disabled>{t('contact.subject')}</option>
                  <option value="employment">{t('contact.subjects.employment')}</option>
                  <option value="freelance">{t('contact.subjects.freelance')}</option>
                  <option value="collaboration">{t('contact.subjects.collaboration')}</option>
                  <option value="other">{t('contact.subjects.other')}</option>
                </select>
              </div>

              <div>
                <label className="block label-mono !text-text-secondary dark:!text-dark-text-secondary mb-2">
                  {t('contact.message')}
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="field resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn btn-primary w-full"
              >
                <Send size={18} />
                {status === 'loading' ? '...' : t('contact.send')}
              </button>

              {status === 'success' && (
                <p className="text-center text-sm font-medium text-accent dark:text-dark-accent">
                  {t('contact.success')}
                </p>
              )}
              {status === 'error' && (
                <p className="text-center text-sm font-medium text-magenta dark:text-dark-magenta">
                  {t('contact.error')}
                </p>
              )}
            </form>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  )
}
