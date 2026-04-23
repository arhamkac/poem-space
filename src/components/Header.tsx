'use client'

import { motion } from 'framer-motion'

export default function Header() {
  return (
    <header style={{ padding: '6rem 0 2rem', textAlign: 'center' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
      >
        <h1 style={{ 
          fontSize: '5rem', 
          color: 'white', 
          fontStyle: 'italic',
          textShadow: '0 10px 30px rgba(0,0,0,0.8)',
          letterSpacing: '-0.02em'
        }}>
          Poem <span style={{ color: 'var(--gold)' }}>Space</span>
        </h1>
        <p style={{ 
          color: 'rgba(255,255,255,0.7)', 
          fontSize: '1.2rem',
          marginTop: '1rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase'
        }}>
          The Collector of Untold Stories
        </p>
      </motion.div>
    </header>
  )
}
