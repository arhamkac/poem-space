'use client'

import Header from '@/components/Header'
import PoemGallery from '@/components/PoemGallery'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function ArchivePage() {
  return (
    <main style={{ minHeight: '100vh', position: 'relative', background: 'transparent' }}>
      {/* THE MASTER BACKGROUND */}
      <div className="vibrant-desk"></div>

      <Header />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '8rem' }}>
          <h1 style={{ 
            fontFamily: 'var(--font-cinzel)', 
            fontSize: '4rem', 
            letterSpacing: '0.5em', 
            color: 'var(--gold)',
            textTransform: 'uppercase',
            marginBottom: '1rem'
          }}>
            The Archive
          </h1>
          <p style={{ opacity: 0.5, letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.8rem' }}>
            A collection of immortalized whispers
          </p>
        </div>

        <PoemGallery refreshKey={0} />

        <div style={{ textAlign: 'center', marginTop: '10rem', paddingBottom: '10rem' }}>
          <Link href="/">
            <motion.button 
              className="master-btn"
              whileHover={{ scale: 1.05, letterSpacing: '0.5em' }}
              style={{ padding: '2rem 5rem' }}
            >
              RETURN TO SANCTUARY
            </motion.button>
          </Link>
        </div>
      </div>

      <footer style={{ 
        padding: '6rem 0 4rem', 
        textAlign: 'center', 
        color: 'rgba(255,255,255,0.4)', 
        fontSize: '0.8rem',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(0,0,0,0.5)'
      }}>
        <div suppressHydrationWarning>© {new Date().getFullYear()} Poem Space. The Archive of Untold Whispers.</div>
      </footer>
    </main>
  )
}
