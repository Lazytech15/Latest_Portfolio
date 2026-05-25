import { useEffect, useRef, useState } from 'react'
import logo_nobackground from '../../public/ed_logo_noBackground.png'

export default function Contact() {
  const sectionRef = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

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

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{ background: 'var(--bg)', padding: 'clamp(3.5rem,7vw,7rem) 0 0', position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
    >
      <div style={{ padding: '0 clamp(1.25rem, 4vw, 3.5rem)', display: 'flex', flexDirection: 'column', gap: '0' }}>
        {/* Label */}
        <div className="reveal reveal-d1 flex items-center gap-3 mb-16" style={{ flexShrink: 0 }}>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.72rem',
              letterSpacing: '0.18em',
              color: 'rgba(255,255,255,0.25)',
              textTransform: 'uppercase',
            }}
          >
            04 / Contact
          </span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
        </div>

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-start">
          {/* Left */}
          <div>
            <h2
              className="reveal reveal-d2"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(2.8rem, 8vw, 7rem)',
                lineHeight: 0.9,
                color: 'var(--white)',
                letterSpacing: '0.01em',
                marginBottom: '1.5rem',
              }}
            >
              Let's build something remarkable together.
            </h2>

            <div className="reveal reveal-d3 space-y-1" style={{ marginBottom: '2.5rem' }}>
              {[
                { label: 'Email', value: 'youremail@example.com' },
                { label: 'Location', value: 'Philippines · Remote-Ready' },
                { label: 'Response', value: 'Usually within 24 hours' },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', gap: '1rem', padding: '0.75rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)', flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.7rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', minWidth: 80 }}>
                    {item.label}
                  </span>
                  <span style={{ fontWeight: 300, fontSize: '0.92rem', color: 'rgba(255,255,255,0.65)' }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="reveal reveal-d4 flex gap-3 flex-wrap">
              {[
                { name: 'GitHub', url: 'https://github.com/Lazytech15' },
                { name: 'LinkedIn', url: 'https://www.linkedin.com/in/emmanuel-ablao-06713b308' },
                { name: 'Email ↗', url: 'mailto:emmanuelablao16@gmail.com' },
              ].map((s) => (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ fontSize: '0.8rem', padding: '9px 18px' }}>
                  {s.name}
                </a>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="reveal reveal-d3">
            {submitted ? (
              <div style={{ padding: 'clamp(2rem,5vw,4rem) 2rem', textAlign: 'center', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8 }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '4rem', color: 'var(--accent)', lineHeight: 1 }}>✓</div>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.5rem', color: 'var(--white)', marginTop: '1rem' }}>Message Sent!</h3>
                <p style={{ fontWeight: 300, color: 'rgba(255,255,255,0.4)', marginTop: '0.5rem' }}>I'll get back to you soon.</p>
                <button
                  data-hover
                  onClick={() => setSubmitted(false)}
                  className="btn btn-ghost"
                  style={{ marginTop: '1.5rem' }}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                <div>
                  <label style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.68rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>
                    Name
                  </label>
                  <input
                    type="text"
                    className="field-input"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.68rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    className="field-input"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.68rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>
                    Message
                  </label>
                  <textarea
                    className="field-input"
                    placeholder="Tell me about your project..."
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    style={{ resize: 'none' }}
                  />
                </div>
                <button
                  data-hover
                  onClick={handleSubmit}
                  className="btn btn-fill-accent"
                  style={{ alignSelf: 'flex-start', fontSize: '0.9rem' }}
                >
                  Send Message
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer strip */}
      <div style={{ marginTop: '4rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0' }}>
        {/* Marquee */}
        <div style={{ overflow: 'hidden', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '1rem 0' }}>
          <div className="marquee-inner" style={{ gap: '3rem' }}>
            {Array(8).fill(['REACT', '·', 'VITE', '·', 'ESP32', '·', 'NODE.JS', '·', 'REACT NATIVE', '·', 'ELECTRON', '·', 'N8N', '·', 'MYSQL', '·']).flat().map((t, i) => (
              <span key={i} style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                color: t === '·' ? 'var(--accent)' : 'rgba(255,255,255,0.2)',
                textTransform: 'uppercase',
                padding: '0 0.5rem',
              }}>{t}</span>
            ))}
          </div>
        </div>

        {/* ↓ FIXED: Bottom row — full width, space-between on all screen sizes */}
        <div
          style={{
            padding: '1.25rem clamp(1.25rem, 4vw, 3.5rem)',
            display: 'flex',
            flexDirection: 'row',         // always row, never column
            alignItems: 'center',
            justifyContent: 'space-between', // spread items across full width
            gap: '1rem',
            flexWrap: 'wrap',             // wraps gracefully on very small screens
            width: '100%',
          }}
        >
          {/* Logo + name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <img src={logo_nobackground} alt="Logo" style={{ height: '1rem' }} />
            </div>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.04em' }}>EABLAO.DEV</span>
          </div>

          {/* Copyright */}
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.72rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.06em', margin: 0 }}>
            {new Date().getFullYear()} © All rights reserved
          </p>

          {/* Status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: "'DM Mono', monospace", fontSize: '0.72rem', color: 'rgba(255,255,255,0.25)' }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
            All systems operational
          </div>
        </div>
      </div>
    </section>
  )
}