import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Container from '../components/layout/Container'
import useSeo from '../seo/useSeo'
import { notFoundMeta } from '../seo/meta'
import seo from '../seo/seo.json'

export default function NotFound() {
  useSeo(notFoundMeta(seo))

  return (
    <Container className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl mb-4">404<span className="cursor" aria-hidden="true" /></h1>
        <p className="text-text-secondary dark:text-dark-text-secondary mb-8">
          Página no encontrada
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-accent dark:text-dark-accent hover:underline"
        >
          <ArrowLeft size={16} />
          Volver al inicio
        </Link>
      </div>
    </Container>
  )
}
