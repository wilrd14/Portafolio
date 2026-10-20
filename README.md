<div align="center">

# Williams R. Villavizar Hdez

### Developer & Designer

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/williams-rafael/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/wilrd14)

</div>

---

## About

Personal developer portfolio built with React and designed with Apple-style aesthetics. Features a clean, minimal interface with smooth animations, dark/light mode, and bilingual support (ES/EN).

**Live:** [wilrd14.dev](https://wilrd14.dev/)

SEO e indexación: ver [docs/SEO.md](docs/SEO.md).

## Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | React 19, Vite 6, Tailwind CSS 4 |
| **Animations** | Motion (Framer Motion) |
| **Routing** | React Router 7 (prerender estático en el build) |
| **CMS** | Decap CMS |
| **Hosting** | Cloudflare Pages |
| **Contact Form** | Cloudflare Workers + Resend |

## Features

- Apple-style design system with clean typography
- Dark / Light mode toggle with system preference detection
- Bilingual support (Spanish / English) with persistent toggle
- Typewriter animation in hero section
- Scroll reveal animations
- Responsive design for all devices
- Admin panel for content management (Decap CMS)
- Contact form powered by Cloudflare Workers

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── layout/      # Header, Footer, Container
│   │   ├── sections/    # Hero, About, Skills, Projects, etc.
│   │   ├── effects/     # Typewriter, ScrollReveal
│   │   └── ui/          # BrandIcons
│   ├── context/         # ThemeContext, LanguageContext
│   ├── data/            # projects.json, experience.json, skills.json
│   ├── locales/         # es.json, en.json
│   └── pages/           # Home, ProjectDetail
├── public/
│   ├── admin/           # Decap CMS config
│   ├── images/          # Avatar, project screenshots, icons
│   └── locales/         # Locale files
├── workers/             # Cloudflare Workers
└── content/             # CMS content (Git-based)
```

## Environment Variables

```env
# Contact Form Worker
RESEND_API_KEY=your_key
CONTACT_EMAIL=your@email.com
```

## License

Private — All rights reserved.

---

<div align="center">
Made with React + Tailwind CSS
</div>
