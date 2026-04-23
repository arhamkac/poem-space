'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { ChevronLeft, ChevronRight, Bookmark, AlertCircle, BookOpen, Link2, Calendar } from 'lucide-react'

interface Poem {
  id: string
  title?: string
  content: string
  context?: string
  author_name: string
  author_insta: string
  created_at: string
}

export default function PoemGallery({ refreshKey }: { refreshKey: number }) {
  const [poems, setPoems] = useState<Poem[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [error, setError] = useState<string | null>(null)
  
  const poemsPerPage = 3

  useEffect(() => {
    async function fetchPoems() {
      setLoading(true)
      setError(null)
      try {
        const { data, error } = await supabase
          .from('poems')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) {
          if (error.message.includes("Could not find the table")) {
            setError("The Archive Table ('poems') hasn't been created in Supabase yet.")
          } else {
            throw error
          }
        } else {
          setPoems(data || [])
        }
      } catch (err: any) {
        console.error('Fetch Error:', err)
        setError("The archive database is currently silent.")
      } finally {
        setLoading(false)
      }
    }
    fetchPoems()
  }, [refreshKey])

  const totalPages = Math.ceil(poems.length / poemsPerPage)
  const currentPoems = poems.slice(page * poemsPerPage, (page + 1) * poemsPerPage)

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '10rem' }}>
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
        <BookOpen size={40} color="#e5c05b" />
      </motion.div>
    </div>
  )

  // Card styles moved to globals.css class 'poem-card'

  return (
    <div style={{ minHeight: '600px' }}>
      <AnimatePresence mode="wait">
        {error ? (
          <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '5rem 2rem', background: 'rgba(255,75,75,0.05)', borderRadius: '1rem', border: '1px solid rgba(255,75,75,0.2)' }}>
            <AlertCircle size={40} color="#ff4b4b" style={{ marginBottom: '1.5rem' }} />
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#ff4b4b' }}>Archive Connection Error</h2>
            <p style={{ marginTop: '0.5rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' }}>{error}</p>
          </motion.div>
        ) : poems.length === 0 ? (
          <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '10rem 2rem' }}>
            <Bookmark size={60} color="#e5c05b" style={{ opacity: 0.2, marginBottom: '2rem' }} />
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.3)' }}>The Archive is silent...</h2>
            <p style={{ marginTop: '1rem', color: 'rgba(255,255,255,0.15)', letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.7rem' }}>Immortalize the first whisper to see it here.</p>
          </motion.div>
        ) : (
          <motion.div key={page} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(2rem, 5vh, 5rem)' }}>
            {currentPoems.map((poem) => (
              <div key={poem.id} className="poem-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <span style={{ fontSize: '0.65rem', letterSpacing: '0.3em', color: '#8a6d25', fontWeight: 800, textTransform: 'uppercase' }}>Entry #{poem.id.slice(0,4)}</span>
                    <h2 className="poem-card-title">{poem.title || 'Untitled'}</h2>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(0,0,0,0.3)', fontSize: '0.75rem', fontWeight: 600 }}>
                    <Calendar size={14} /> {new Date(poem.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>

                {poem.context && (
                  <div style={{ background: 'rgba(0,0,0,0.03)', padding: 'clamp(1rem, 3vw, 2rem)', borderLeft: '4px solid #e5c05b', fontFamily: 'var(--font-hand)', fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', color: '#444', fontStyle: 'italic' }}>
                    "{poem.context}"
                  </div>
                )}

                <p className="poem-card-content">
                  {poem.content}
                </p>
                
                <div style={{ marginTop: '1.5rem', paddingTop: '2.5rem', borderTop: '1px solid rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div className="poem-card-author">
                    — {poem.author_name}
                  </div>
                  {poem.author_insta && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#8a6d25', fontSize: '0.85rem', fontWeight: 800 }}>
                      <Link2 size={16} /> @{poem.author_insta.replace('@', '')}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {totalPages > 1 && (
        <div className="pagination-container" style={{ display: 'flex', gap: '3rem', justifyContent: 'center', marginTop: '8rem', alignItems: 'center' }}>
          <button disabled={page === 0} onClick={() => setPage(p => p - 1)} style={{ all: 'unset', cursor: page === 0 ? 'default' : 'pointer', color: page === 0 ? 'rgba(255,255,255,0.1)' : '#e5c05b', transition: '0.3s' }}>
            <ChevronLeft size={40} />
          </button>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {Array.from({ length: totalPages }).map((_, i) => (
              <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: i === page ? '#e5c05b' : 'rgba(255,255,255,0.1)', transition: '0.3s' }} />
            ))}
          </div>
          <button disabled={page === totalPages - 1} onClick={() => setPage(p => p + 1)} style={{ all: 'unset', cursor: page === totalPages - 1 ? 'default' : 'pointer', color: page === totalPages - 1 ? 'rgba(255,255,255,0.1)' : '#e5c05b', transition: '0.3s' }}>
            <ChevronRight size={40} />
          </button>
        </div>
      )}
    </div>
  )
}
