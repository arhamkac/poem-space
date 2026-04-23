'use client'

import Header from '@/components/Header'
import PoemGallery from '@/components/PoemGallery'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

function ArchiveContent() {
  const searchParams = useSearchParams()
  const [showNotification, setShowNotification] = useState(false)

  useEffect(() => {
    if (searchParams.get('published') === 'true') {
      setShowNotification(true)
      const timer = setTimeout(() => setShowNotification(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [searchParams])

  return (
    <main style={{ minHeight: '100vh', position: 'relative', background: 'transparent' }}>
      <div className="vignette"></div>

      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 20, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{
              position: 'fixed',
              top: '2rem',
              left: '50%',
              x: '-50%',
              zIndex: 10000,
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(20px)',
              border: '1px solid var(--gold)',
              padding: '1rem 2rem',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
              color: 'var(--gold)',
              fontFamily: 'var(--font-cinzel)',
              fontWeight: 900,
              letterSpacing: '0.1em',
              fontSize: '0.8rem'
            }}
          >
            <CheckCircle2 size={20} />
            YOUR POEM HAS BEEN PUBLISHED
          </motion.div>
        )}
      </AnimatePresence>

      <Header />

      <div className="archive-container">
        <div style={{ textAlign: 'center', marginBottom: 'clamp(4rem, 10vh, 8rem)' }}>
          <h1 className="archive-title">
            The Archive
          </h1>
          <p style={{ opacity: 0.5, letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.8rem' }}>
            A collection of immortalized whispers
          </p>
        </div>

        <PoemGallery refreshKey={0} />

        <div style={{ textAlign: 'center', marginTop: 'clamp(5rem, 15vh, 10rem)', paddingBottom: 'clamp(5rem, 15vh, 10rem)' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <motion.button 
              className="master-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              RETURN TO SANCTUARY
            </motion.button>
          </Link>
        </div>
      </div>
    </main>
  )
}

export default function ArchivePage() {
  return (
    <Suspense fallback={null}>
      <ArchiveContent />
    </Suspense>
  )
}
