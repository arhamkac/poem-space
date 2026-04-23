'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { X, AlertCircle, CheckCircle2, ArrowRight, ArrowLeft, Edit3 } from 'lucide-react'

export default function PoemForm({ isOpen, onClose, onPostCreated }: { isOpen: boolean, onClose: () => void, onPostCreated: () => void }) {
  const [step, setStep] = useState(1)
  const [poem, setPoem] = useState('')
  const [title, setTitle] = useState('')
  const [context, setContext] = useState('')
  const [name, setName] = useState('')
  const [insta, setInsta] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)
  
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const handleKeys = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeys)
    return () => window.removeEventListener('keydown', handleKeys)
  }, [isOpen, onClose])

  // Removed auto-sizing to allow flexbox and min-height to govern the writing area

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)
    
    if (!poem.trim() || !name.trim()) {
      setErrorMessage("Identity and manuscript are required.")
      return
    }

    setLoading(true)
    try {
      const { error } = await supabase
        .from('poems')
        .insert([{ 
          content: poem.trim(), 
          title: title.trim() || null, 
          context: context.trim() || null,
          author_name: name.trim(), 
          author_insta: insta.trim() || null 
        }])
      
      if (error) throw error
      
      setIsSuccess(true)
      onPostCreated()
      
      // Redirect to archive after showing the success message
      setTimeout(() => {
        setStep(1); setPoem(''); setTitle(''); setContext(''); setName(''); setInsta(''); setIsSuccess(false); 
        onClose()
        router.push('/archive?published=true')
      }, 2500)
    } catch (err: any) {
      setErrorMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  const progressWidth = (step / 3) * 100 + '%'

  // Styles moved to CSS classes or handled via clamp()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="sanctuary-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button className="cross-close-pro" onClick={onClose}><X size={40} /></button>
          
          <motion.div className="sanctuary-book" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <div className="book-header">
              <div className="progress-bar" style={{ width: progressWidth }}></div>
            </div>

            <div className="book-body">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div key="success" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '5rem', background: 'var(--paper)', width: '100%' }}>
                    <CheckCircle2 size={80} color="var(--gold)" />
                    <h1 className="h1-serif" style={{ marginTop: '2rem' }}>Immortalized</h1>
                    <p style={{ opacity: 0.5, letterSpacing: '0.2em', marginTop: '1rem', fontSize: '0.7rem' }}>YOUR WHISPER HAS BEEN SEALED IN THE ARCHIVE.</p>
                  </motion.div>
                ) : step === 1 ? (
                  <motion.div key="step1" className="step-container" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}>
                    <div className="sanctuary-page">
                      <span className="label-caps">Phase I</span>
                      <h1 className="h1-serif">The Spark</h1>
                      <div style={{ marginTop: '2rem' }}>
                        <span className="label-caps">Whisper a Title</span>
                        <input type="text" className="input-underline" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Unnamed Soul..." />
                      </div>
                      <div style={{ marginTop: '2rem' }}>
                        <span className="label-caps">The Backstory (Optional)</span>
                        <div className="backstory-frame">
                          <textarea className="hand-textarea" style={{ all: 'unset', width: '100%', fontFamily: 'var(--font-hand)', fontSize: 'clamp(1.2rem, 4vw, 1.6rem)', color: '#333', minHeight: '150px', display: 'block' }} value={context} onChange={(e) => setContext(e.target.value)} placeholder="What led you here?" />
                        </div>
                      </div>
                      <div className="page-footer-sticky">
                        <div />
                        <button className="primary-btn" onClick={() => setStep(2)}>
                          NEXT <ArrowRight size={16} style={{ marginLeft: '1rem' }} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ) : step === 2 ? (
                  <motion.div key="step2" className="step-container" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}>
                    <div className="sanctuary-page">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <span className="label-caps">Phase II</span>
                          <h1 className="h1-serif">The Manuscript</h1>
                        </div>
                        <button onClick={() => setStep(1)} className="secondary-btn">
                          <ArrowLeft size={14} style={{ marginRight: '0.5rem' }} /> BACK
                        </button>
                      </div>
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginTop: '1rem' }}>
                        <textarea 
                          ref={textareaRef} 
                          className="manuscript-editor" 
                          style={{ minHeight: '50vh' }}
                          value={poem} 
                          onChange={(e) => setPoem(e.target.value)} 
                          placeholder="Type your poem here... Let it flow like ink on old parchment." 
                          required 
                        />
                      </div>
                      <div className="page-footer-sticky">
                        <div style={{ fontSize: '0.6rem', color: '#999', fontWeight: 800 }}>{poem.length} CHARACTERS</div>
                        <button className="primary-btn" onClick={() => setStep(3)} disabled={!poem.trim()}>
                          REVIEW <ArrowRight size={16} style={{ marginLeft: '1rem' }} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="step3" className="step-container" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}>
                    <div className="sanctuary-page" style={{ overflowY: 'auto' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <span className="label-caps">Phase III</span>
                          <h1 className="h1-serif">The Seal</h1>
                        </div>
                        <button onClick={() => setStep(2)} className="secondary-btn">
                          <ArrowLeft size={14} style={{ marginRight: '0.5rem' }} /> RE-EDIT
                        </button>
                      </div>
                      
                      <div className="preview-small-frame" style={{ marginTop: '2rem', padding: '2.5rem', background: 'rgba(0,0,0,0.03)', borderLeft: '4px solid var(--gold)', maxHeight: '400px', overflowY: 'auto' }}>
                        <span className="label-caps" style={{ opacity: 0.4 }}>Final Proof</span>
                        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 900, marginTop: '1rem' }}>{title || 'Untitled Masterpiece'}</h2>
                        
                        {context && (
                          <div style={{ marginTop: '1.5rem', marginBottom: '2rem', padding: '1rem', background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '4px' }}>
                            <span className="label-caps" style={{ fontSize: '0.6rem', opacity: 0.5 }}>The Backstory</span>
                            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontStyle: 'italic', marginTop: '0.5rem', opacity: 0.7 }}>{context}</p>
                          </div>
                        )}

                        <div style={{ marginTop: '1.5rem' }}>
                          <span className="label-caps" style={{ fontSize: '0.6rem', opacity: 0.5 }}>The Manuscript</span>
                          <p style={{ marginTop: '0.5rem', whiteSpace: 'pre-wrap', opacity: 0.9, fontSize: '1rem', lineHeight: '1.8rem', fontFamily: 'var(--font-body)' }}>{poem}</p>
                        </div>

                        <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px dashed rgba(0,0,0,0.1)' }}>
                          <p style={{ fontFamily: 'var(--font-hand)', fontSize: '1.8rem', color: 'var(--ink)' }}>
                            {name || '— Anonymous'}
                          </p>
                          {insta && (
                            <p style={{ fontSize: '0.7rem', opacity: 0.5, marginTop: '0.2rem', fontFamily: 'var(--font-sans)', fontWeight: 800 }}>
                              {insta.startsWith('@') ? insta : `@${insta}`}
                            </p>
                          )}
                        </div>
                      </div>

                      <form onSubmit={handleSubmit} style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div>
                          <span className="label-caps">Your Identity</span>
                          <input type="text" className="input-underline" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name / Pen Name" required />
                        </div>
                        <div>
                          <span className="label-caps">Instagram (Optional)</span>
                          <input type="text" className="input-underline" value={insta} onChange={(e) => setInsta(e.target.value)} placeholder="@username" />
                        </div>
                        
                        <div className="page-footer-sticky" style={{ paddingBottom: '2rem', marginTop: '2rem' }}>
                          {errorMessage && <div style={{ color: '#ff4b4b', fontSize: '0.7rem', fontWeight: 800, marginBottom: '1rem' }}><AlertCircle size={14} style={{ marginRight: '0.5rem' }} /> {errorMessage}</div>}
                          <button type="submit" disabled={loading} className="primary-btn" style={{ width: '100%', padding: '1.8rem' }}>
                            {loading ? 'COMMITTING...' : 'COMMIT TO ARCHIVE'}
                          </button>
                        </div>
                      </form>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
