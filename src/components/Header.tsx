'use client'

import { motion } from 'framer-motion'

export default function Header() {
  return (
    <header style={{ padding: 'clamp(3rem, 10vh, 6rem) 1rem 2rem', textAlign: 'center' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
      >
        <h1 style={{ 
          fontSize: 'clamp(2.5rem, 8vw, 5rem)', 
          color: 'white', 
          fontStyle: 'italic',
          textShadow: '0 4px 20px rgba(0,0,0,1), 0 0 50px rgba(0,0,0,0.5)',
          letterSpacing: '-0.02em',
          lineHeight: 1.1
        }}>
          Poem <span style={{ color: 'var(--gold)' }}>Space</span>
        </h1>
        <p style={{ 
          color: 'rgba(255,255,255,1)', 
          fontSize: 'clamp(0.8rem, 2vw, 1rem)',
          marginTop: '1.5rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          textShadow: '0 2px 10px rgba(0,0,0,1)',
          fontWeight: 500
        }}>
          The Collector of Untold Stories
        </p>
      </motion.div>
    </header>
  )
}
