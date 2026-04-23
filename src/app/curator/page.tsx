'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Copy, Check, AtSign, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface Poem {
  id: string
  content: string
  author_name: string
  author_insta: string
  created_at: string
}

export default function CuratorPage() {
  const [poems, setPoems] = useState<Poem[]>([])
  const [copiedId, setCopiedId] = useState<string | null>(null)

  useEffect(() => {
    const fetchPoems = async () => {
      const { data } = await supabase
        .from('poems')
        .select('*')
        .order('created_at', { ascending: false })
      if (data) setPoems(data)
    }
    fetchPoems()
  }, [])

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <main className="container" style={{ padding: '4rem 2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4rem' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em' }}>
          <ArrowLeft size={16} /> Return to Space
        </Link>
        <h1 style={{ fontSize: '2.5rem', fontStyle: 'italic' }}>Curator's <span style={{ color: 'var(--accent)' }}>Archive</span></h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem', alignItems: 'center' }}>
        {poems.map((poem) => (
          <motion.div 
            key={poem.id} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%', maxWidth: '450px' }}
          >
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                onClick={() => copyToClipboard(`${poem.content}\n\n— ${poem.author_name}${poem.author_insta ? ` (${poem.author_insta})` : ''}`, poem.id)}
                style={{ 
                  background: 'var(--ink)', 
                  padding: '10px 24px', 
                  borderRadius: '0', 
                  color: copiedId === poem.id ? '#4ade80' : 'white',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                {copiedId === poem.id ? <><Check size={16} /> Copied to Archive</> : <><Copy size={16} /> Copy for Story</>}
              </button>
            </div>

            {/* The Story-Ready Card - parchment style */}
            <div 
              id={`story-card-${poem.id}`}
              style={{ 
                background: '#fefcf5',
                backgroundImage: 'url("/assets/parchment.png")',
                backgroundSize: 'cover',
                padding: '4rem 3rem',
                aspectRatio: '9/16',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                boxShadow: '0 30px 60px rgba(0,0,0,0.15)',
                position: 'relative',
                border: '1px solid rgba(0,0,0,0.05)'
              }}
            >
              <div style={{ 
                position: 'absolute', 
                top: '2rem', 
                fontSize: '0.8rem', 
                color: 'var(--accent)', 
                textTransform: 'uppercase', 
                letterSpacing: '0.3em',
                opacity: 0.6
              }}>
                Poem Space
              </div>
              
              <div style={{ 
                fontFamily: 'var(--font-serif)', 
                fontSize: '2rem', 
                lineHeight: '1.4',
                color: 'var(--ink)',
                marginBottom: '3rem',
                whiteSpace: 'pre-wrap',
                fontStyle: 'italic'
              }}>
                "{poem.content}"
              </div>

              <div style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--ink)' }}>
                — {poem.author_name}
              </div>
              
              {poem.author_insta && (
                <div style={{ color: 'var(--accent)', fontSize: '0.9rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <AtSign size={14} /> {poem.author_insta}
                </div>
              )}

              <div style={{ position: 'absolute', bottom: '2rem', fontSize: '0.7rem', opacity: 0.4, color: 'var(--ink)' }}>
                captured in the archive
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  )
}
