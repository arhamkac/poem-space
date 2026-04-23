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
      
      <section style={{ 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        <Header />
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', alignItems: 'center', marginTop: '2rem' }}>
          <motion.button 
            onClick={() => setIsWriteOpen(true)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
            className="write-trigger-btn"
            style={{ 
              background: 'rgba(0, 0, 0, 0.4)', 
              color: '#e5c05b', 
              border: '1px solid rgba(229, 192, 91, 0.5)', 
              padding: 'clamp(1.5rem, 3vh, 2.5rem) clamp(2rem, 5vw, 6rem)',
              fontFamily: 'var(--font-cinzel)',
              fontWeight: 900,
              fontSize: 'clamp(0.9rem, 2vw, 1.3rem)',
              letterSpacing: 'clamp(0.2em, 3vw, 0.6em)',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
              textTransform: 'uppercase',
              position: 'relative',
              overflow: 'hidden',
              width: 'clamp(280px, 80vw, 600px)',
              textAlign: 'center'
            }}
            whileHover={{ 
              background: 'rgba(229, 192, 91, 0.1)', 
              scale: 1.02,
              letterSpacing: '0.8em',
              borderColor: '#e5c05b',
              boxShadow: '0 0 80px rgba(229, 192, 91, 0.2)'
            }}
            whileTap={{ scale: 0.98 }}
          >
            BEGIN WRITING
          </motion.button>

          <Link href="/archive">
            <motion.button 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              style={{ 
                background: 'rgba(0,0,0,0.4)', 
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                padding: '1.2rem 4rem',
                fontFamily: 'var(--font-cinzel)',
                fontSize: '0.75rem',
                letterSpacing: '0.4em',
                cursor: 'pointer',
                textTransform: 'uppercase',
                transition: 'all 0.4s ease',
                borderRadius: '2px',
                backdropFilter: 'blur(5px)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
              }}
              whileHover={{ 
                color: 'var(--gold)', 
                letterSpacing: '0.6em',
                background: 'rgba(0,0,0,0.6)',
                borderColor: 'rgba(229,192,91,0.3)'
              }}
            >
              EXPLORE THE ARCHIVE
            </motion.button>
          </Link>
        </div>
        
        <div style={{ 
          position: 'absolute', 
          bottom: '4rem', 
          opacity: 0.6, 
          letterSpacing: '0.8em', 
          fontSize: '0.6rem', 
          fontWeight: 900, 
          textTransform: 'uppercase',
          textShadow: '0 2px 10px rgba(0,0,0,1)',
          color: '#fff'
        }}>
          Established in Immortality
        </div>
      </section>

      <PoemForm 
        isOpen={isWriteOpen} 
        onClose={() => setIsWriteOpen(false)} 
        onPostCreated={() => {}} 
      />
      
    </main>
  )
}
