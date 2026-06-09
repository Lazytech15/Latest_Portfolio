import { useEffect, useRef, useState } from 'react'
import logo_nobackground from '../../public/ed_logo_noBackground.png'
import { useDarkMode } from '../DarkModeContext'

// ← Set this to your deployed worker URL after running `npx wrangler deploy`
const WORKER_URL = 'https://sendtouchemail.eablao.workers.dev'

export default function Contact() {
  const sectionRef = useRef(null)
  const { isDark } = useDarkMode()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  /* ── colors (unchanged) ── */
  const bg           = isDark ? '#1a1a1a' : '#0a0a0a'
  const fg           = '#f2f0eb'
  const acc          = '#c8ff00'
  const accText      = '#c8ff00'
  const muted        = 'rgba(242,240,235,0.55)'
  const subtle       = 'rgba(242,240,235,0.28)'
  const border       = 'rgba(242,240,235,0.10)'
  const borderStrong = 'rgba(242,240,235,0.20)'

  useEffect(() => {
    if (!sectionRef.current) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 90)
            })
          }
        })
      },
      { threshold: 0.07 }
    )
    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault?.()
    setError('')

    // Client-side validation
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Please fill in all fields.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid email address.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`${WORKER_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
        source: 'Portfolio — eablao.dev',
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong.')
      }

      setSubmitted(true)
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      setError(err.message || 'Failed to send. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        background: bg,
        color: fg,
        fontFamily: "'DM Sans', sans-serif",
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 0.5s ease',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Accent top rule */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: acc, zIndex: 10 }} />

      {/* Ghost watermark */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        right: '-2%', bottom: '-5%',
        fontFamily: "'Bebas Neue', Impact, sans-serif",
        fontSize: 'clamp(100px, 16vw, 240px)',
        lineHeight: 0.85,
        color: 'transparent',
        WebkitTextStroke: '1px rgba(242,240,235,0.04)',
        userSelect: 'none', pointerEvents: 'none', zIndex: 0,
      }}>
        CONTACT
      </div>

      <div style={{
        position: 'relative', zIndex: 2,
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 3.5rem) 0',
        flex: 1,
      }}>
        {/* Section label */}
        <div className="reveal reveal-d1" style={{
          display: 'flex', alignItems: 'center', gap: '1rem',
          marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
        }}>
          <span style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.62rem', letterSpacing: '0.25em',
            color: accText, textTransform: 'uppercase',
          }}>
            ↳ 04 / Contact
          </span>
          <div style={{ flex: 1, height: '0.5px', background: border }} />
        </div>

        {/* Main grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(2rem, 5vw, 5rem)',
          alignItems: 'start',
          marginBottom: 'clamp(3rem, 6vw, 5rem)',
        }}>
          {/* LEFT */}
          <div>
            <div className="reveal reveal-d2" style={{ overflow: 'hidden', marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
              <h2 style={{
                fontFamily: "'Bebas Neue', Impact, sans-serif",
                fontSize: 'clamp(3rem, 7vw, 8rem)',
                fontWeight: 400, lineHeight: 0.88,
                letterSpacing: '-0.01em', color: fg, margin: 0,
              }}>
                Let's Build
              </h2>
              <h2 style={{
                fontFamily: "'Bebas Neue', Impact, sans-serif",
                fontSize: 'clamp(3rem, 7vw, 8rem)',
                fontWeight: 400, lineHeight: 0.88,
                color: 'transparent',
                WebkitTextStroke: `2px ${fg}`,
                margin: 0,
              }}>
                Together.
              </h2>
            </div>

            <div className="reveal reveal-d3" style={{ marginBottom: '2.5rem' }}>
              {[
                { label: 'Email', value: 'emmanuelablao16@gmail.com' },
                { label: 'Location', value: 'Philippines · Remote-Ready' },
                { label: 'Response', value: 'Usually within 24 hours' },
              ].map((item) => (
                <div key={item.label} style={{
                  display: 'flex', gap: '1rem',
                  padding: '0.85rem 0',
                  borderBottom: `0.5px solid ${border}`,
                  flexWrap: 'wrap',
                }}>
                  <span style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '0.6rem', letterSpacing: '0.22em',
                    color: accText, textTransform: 'uppercase',
                    minWidth: 80,
                  }}>
                    {item.label}
                  </span>
                  <span style={{ fontWeight: 300, fontSize: '0.92rem', color: muted }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="reveal reveal-d4" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {[
                { name: 'GitHub →', url: 'https://github.com/Lazytech15' },
                { name: 'LinkedIn ↗', url: 'https://www.linkedin.com/in/emmanuel-ablao-06713b308' },
                { name: 'Email ↗', url: 'mailto:emmanuelablao16@gmail.com' },
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '0.72rem', letterSpacing: '0.14em',
                    color: muted, textDecoration: 'none',
                    textTransform: 'uppercase',
                    border: `0.5px solid ${borderStrong}`,
                    padding: '10px 20px',
                    transition: 'color 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = fg; e.currentTarget.style.borderColor = fg }}
                  onMouseLeave={e => { e.currentTarget.style.color = muted; e.currentTarget.style.borderColor = borderStrong }}
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT: form */}
          <div className="reveal reveal-d3">
            {submitted ? (
              <div style={{
                padding: 'clamp(2rem, 5vw, 4rem) 2rem',
                textAlign: 'center',
                border: `0.5px solid ${borderStrong}`,
              }}>
                <div style={{
                  fontFamily: "'Bebas Neue', Impact, sans-serif",
                  fontSize: '5rem', color: acc, lineHeight: 1,
                }}>✓</div>
                <h3 style={{
                  fontFamily: "'Bebas Neue', Impact, sans-serif",
                  fontSize: '2.8rem', color: fg, margin: '0.75rem 0 0.5rem',
                }}>Message Sent!</h3>
                <p style={{ fontWeight: 300, color: muted, fontSize: '0.9rem' }}>
                  I'll get back to you soon.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  style={{
                    marginTop: '1.5rem',
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '0.72rem', letterSpacing: '0.14em',
                    color: muted, background: 'transparent',
                    textTransform: 'uppercase',
                    border: `0.5px solid ${borderStrong}`,
                    padding: '10px 24px', cursor: 'pointer',
                    transition: 'color 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = fg; e.currentTarget.style.borderColor = fg }}
                  onMouseLeave={e => { e.currentTarget.style.color = muted; e.currentTarget.style.borderColor = borderStrong }}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {[
                  { id: 'name', label: 'Name', type: 'text', placeholder: 'Jose Dela Ramirez', key: 'name' },
                  { id: 'email', label: 'Email', type: 'email', placeholder: 'jose@example.com', key: 'email' },
                ].map((field) => (
                  <div key={field.id}>
                    <label style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: '0.6rem', letterSpacing: '0.22em',
                      color: accText, textTransform: 'uppercase',
                      display: 'block', marginBottom: '0.5rem',
                    }}>
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={form[field.key]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      className="field-input"
                      disabled={loading}
                    />
                  </div>
                ))}
                <div>
                  <label style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '0.6rem', letterSpacing: '0.22em',
                    color: accText, textTransform: 'uppercase',
                    display: 'block', marginBottom: '0.5rem',
                  }}>
                    Message
                  </label>
                  <textarea
                    placeholder="Tell me about your project..."
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="field-input"
                    style={{ resize: 'none' }}
                    disabled={loading}
                  />
                </div>

                {/* Error message */}
                {error && (
                  <p style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '0.72rem', color: '#ff6b6b',
                    margin: 0, letterSpacing: '0.05em',
                  }}>
                    ⚠ {error}
                  </p>
                )}

                <div>
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      background: loading ? 'rgba(200,255,0,0.5)' : acc,
                      color: '#0d0d0d',
                      fontFamily: "'DM Mono', monospace",
                      fontSize: '0.75rem', fontWeight: 700,
                      letterSpacing: '0.15em', textTransform: 'uppercase',
                      padding: '14px 32px', border: 'none',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      transition: 'transform 0.18s, box-shadow 0.18s',
                      opacity: loading ? 0.7 : 1,
                    }}
                    onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = 'translate(-3px,-3px)'; e.currentTarget.style.boxShadow = `4px 4px 0 ${fg}` }}}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translate(0,0)'; e.currentTarget.style.boxShadow = 'none' }}
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                    {!loading && (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer strip */}
      <div style={{ position: 'relative', zIndex: 2, borderTop: `0.5px solid ${border}` }}>
        {/* Marquee */}
        <div style={{ overflow: 'hidden', borderBottom: `0.5px solid ${border}`, padding: '1rem 0' }}>
          <div className="marquee-inner" style={{ gap: '3rem' }}>
            {Array(8).fill(['REACT', '·', 'VITE', '·', 'ESP32', '·', 'NODE.JS', '·', 'REACT NATIVE', '·', 'ELECTRON', '·', 'N8N', '·', 'MYSQL', '·']).flat().map((t, i) => (
              <span key={i} style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '0.65rem', letterSpacing: '0.2em',
                color: t === '·' ? acc : subtle,
                textTransform: 'uppercase', padding: '0 0.5rem',
              }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div style={{
          padding: '1.25rem clamp(1.5rem, 4vw, 3.5rem)',
          display: 'flex', flexDirection: 'row',
          alignItems: 'center', justifyContent: 'space-between',
          gap: '1rem', flexWrap: 'wrap',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 28, height: 28,
              border: `0.5px solid ${borderStrong}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
            }}>
              <img src={logo_nobackground} alt="Logo" style={{ height: '1rem', filter: 'brightness(1)' }} />
            </div>
            <span style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.72rem', color: subtle, letterSpacing: '0.1em',
            }}>EABLAO.DEV</span>
          </div>

          <p style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.68rem', color: subtle, letterSpacing: '0.06em', margin: 0,
          }}>
            {new Date().getFullYear()} © All rights reserved
          </p>

          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            fontFamily: "'DM Mono', monospace", fontSize: '0.68rem', color: subtle,
          }}>
            <span style={{
              width: 5, height: 5, borderRadius: '50%',
              background: acc, display: 'inline-block',
              boxShadow: `0 0 6px ${acc}`,
            }} />
            All systems operational
          </div>
        </div>
      </div>
    </section>
  )
}