'use client'

import { useState, useEffect, useRef } from 'react'
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

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [poem, step])

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
      
      setTimeout(() => {
        setStep(1); setPoem(''); setTitle(''); setContext(''); setName(''); setInsta(''); setIsSuccess(false); onClose()
      }, 2500)
    } catch (err: any) {
      setErrorMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  const progressWidth = step === 1 ? '50%' : '100%'

  // REUSABLE MASTERPIECE INPUT STYLES
  const inputBaseStyle: React.CSSProperties = {
    all: 'unset',
    width: '100%',
    fontFamily: 'var(--font-serif)',
    fontSize: '1.8rem',
    fontWeight: 900,
    color: 'var(--ink)',
    borderBottom: '2px solid #ddd',
    padding: '0.8rem 0',
    marginBottom: '1.5rem',
    display: 'block'
  }

  const handTextAreaStyle: React.CSSProperties = {
    all: 'unset',
    width: '100%',
    fontFamily: 'var(--font-hand)',
    fontSize: '1.6rem',
    color: '#333',
    minHeight: '120px',
    display: 'block'
  }

  const manuscriptStyle: React.CSSProperties = {
    all: 'unset',
    flex: 1,
    width: '100%',
    fontFamily: 'var(--font-body)',
    fontSize: '1.4rem',
    lineHeight: '2.4rem',
    color: 'var(--ink)',
    overflowY: 'auto',
    backgroundImage: 'repeating-linear-gradient(transparent, transparent 2.35rem, rgba(0,0,0,0.02) 2.4rem)',
    paddingRight: '1.5rem'
  }

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
                  <motion.div key="step1" style={{ display: 'flex', flex: 1, height: '100%' }} initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}>
                    <div className="sanctuary-page">
                      <span className="label-caps">Phase I</span>
                      <h1 className="h1-serif">The Spark</h1>
                      <div style={{ marginTop: '1rem' }}>
                        <span className="label-caps">Whisper a Title</span>
                        <input type="text" style={inputBaseStyle} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Unnamed Soul..." />
                      </div>
                      <div style={{ marginTop: '1rem' }}>
                        <span className="label-caps">The Backstory(Optional)</span>
                        <div className="backstory-frame">
                          <textarea style={handTextAreaStyle} value={context} onChange={(e) => setContext(e.target.value)} placeholder="What led you here?" />
                        </div>
                      </div>
                    </div>
                    <div className="sanctuary-page" style={{ borderLeft: '1px solid rgba(0,0,0,0.05)' }}>
                      <span className="label-caps">Phase II</span>
                      <h1 className="h1-serif">The Manuscript</h1>
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <textarea ref={textareaRef} style={manuscriptStyle as any} value={poem} onChange={(e) => setPoem(e.target.value)} placeholder="Begin your journey..." required />
                      </div>
                      <div className="page-footer-sticky">
                        <div style={{ fontSize: '0.6rem', color: '#999', fontWeight: 800 }}>{poem.length} CHARACTERS</div>
                        <button className="primary-btn" onClick={() => setStep(2)} disabled={!poem.trim()}>REVIEW <ArrowRight size={16} style={{ marginLeft: '1rem' }} /></button>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="step2" style={{ display: 'flex', flex: 1, height: '100%' }} initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}>
                    <div className="sanctuary-page">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <span className="label-caps">Phase III</span>
                          <h1 className="h1-serif">The Preview</h1>
                        </div>
                        <button onClick={() => setStep(1)} className="secondary-btn">
                          <Edit3 size={16} style={{ marginRight: '0.8rem' }} /> EDIT
                        </button>
                      </div>
                      
                      <div className="preview-body-container">
                        <h1 className="preview-title">{title || 'Untitled'}</h1>
                        {context && <div className="preview-context">"{context}"</div>}
                        <p className="preview-body">{poem}</p>
                        <div className="preview-signature" style={{ marginTop: 'auto', paddingBottom: '2rem' }}>
                          <div className="signature-ink">— {name || 'Anonymous'}</div>
                          {insta && <div className="insta-seal">@{insta.replace('@', '')}</div>}
                        </div>
                      </div>
                    </div>
                    <div className="sanctuary-page" style={{ borderLeft: '1px solid rgba(0,0,0,0.05)' }}>
                      <span className="label-caps">Final Phase</span>
                      <h1 className="h1-serif">The Seal</h1>
                      <form onSubmit={handleSubmit} style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem', flex: 1 }}>
                        <div><span className="label-caps">Your Identity</span><input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name / Pen Name" required style={inputBaseStyle} /></div>
                        <div><span className="label-caps">Instagram (Optional)</span><input type="text" value={insta} onChange={(e) => setInsta(e.target.value)} placeholder="@username" style={inputBaseStyle} /></div>
                        
                        <div className="page-footer-sticky">
                          {errorMessage && <div style={{ color: '#ff4b4b', fontSize: '0.7rem', fontWeight: 800 }}><AlertCircle size={14} style={{ marginRight: '0.5rem' }} /> {errorMessage}</div>}
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
