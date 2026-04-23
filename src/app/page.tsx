'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import PoemForm from '@/components/PoemForm'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Home() {
  const [isWriteOpen, setIsWriteOpen] = useState(false)

  return (
    <main style={{ minHeight: '100vh', position: 'relative', background: 'transparent' }}>
      {/* THE MASTER BACKGROUND */}
      <div className="vibrant-desk"></div>
      
      <section style={{ 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        position: 'relative'
      }}>
        <Header />
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', alignItems: 'center' }}>
          {/* FORCED MASTERPIECE STYLE (Inlined to prevent any CSS glitches) */}
          <motion.button 
            onClick={() => setIsWriteOpen(true)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{ 
              background: 'rgba(0, 0, 0, 0.6)', 
              color: '#e5c05b', 
              border: '2px solid #e5c05b', 
              padding: '2rem 6rem',
              fontFamily: 'var(--font-cinzel)',
              fontWeight: 900,
              fontSize: '1.2rem',
              letterSpacing: '0.6em',
              cursor: 'pointer',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
              textTransform: 'uppercase'
            }}
            whileHover={{ 
              background: '#e5c05b', 
              color: '#000', 
              scale: 1.05,
              boxShadow: '0 0 50px rgba(229, 192, 91, 0.3)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            BEGIN WRITING
          </motion.button>

          <Link href="/archive">
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              style={{ 
                background: 'transparent', 
                border: '1px solid rgba(255,255,255,0.2)', 
                color: 'rgba(255,255,255,0.5)',
                padding: '1.2rem 4rem',
                fontFamily: 'var(--font-cinzel)',
                fontSize: '0.8rem',
                letterSpacing: '0.4em',
                cursor: 'pointer'
              }}
              whileHover={{ color: '#e5c05b', borderColor: '#e5c05b', letterSpacing: '0.6em' }}
            >
              EXPLORE THE ARCHIVE
            </motion.button>
          </Link>
        </div>
        
        <div style={{ position: 'absolute', bottom: '3rem', opacity: 0.3, letterSpacing: '0.5em', fontSize: '0.6rem', fontWeight: 900 }}>
          ESTABLISHED IN IMMORTALITY
        </div>
      </section>

      <PoemForm 
        isOpen={isWriteOpen} 
        onClose={() => setIsWriteOpen(false)} 
        onPostCreated={() => {}} 
      />
      
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
