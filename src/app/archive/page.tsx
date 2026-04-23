'use client'

import Header from '@/components/Header'
import PoemGallery from '@/components/PoemGallery'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function ArchivePage() {
  return (
    <main style={{ minHeight: '100vh', position: 'relative', background: 'transparent' }}>
      <div className="vignette"></div>

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
