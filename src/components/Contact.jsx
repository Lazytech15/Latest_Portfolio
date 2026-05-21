import { useEffect, useRef, useState } from 'react'

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
      style={{ background: 'var(--bg)', padding: '7rem 2rem 5rem', position: 'relative', zIndex: 1 }}
    >
      <div className="px-6 lg:px-14">
        {/* Label */}
        <div className="reveal reveal-d1 flex items-center gap-3 mb-16">
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

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-20 items-start">
          {/* Left */}
          <div>
            <h2
              className="reveal reveal-d2"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(3.5rem, 8vw, 7rem)',
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
                <div key={item.label} style={{ display: 'flex', gap: '1.5rem', padding: '0.75rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.7rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', minWidth: 90 }}>
                    {item.label}
                  </span>
                  <span style={{ fontWeight: 300, fontSize: '0.95rem', color: 'rgba(255,255,255,0.65)' }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="reveal reveal-d4 flex gap-3">
              {[
                { name: 'GitHub', url: 'https://github.com' },
                { name: 'LinkedIn', url: 'https://linkedin.com' },
                { name: 'Email ↗', url: 'mailto:youremail@example.com' },
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
              <div style={{ padding: '4rem 2rem', textAlign: 'center', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8 }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '4rem', color: 'var(--accent)', lineHeight: 1 }}>✓</div>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.5rem', color: 'var(--white)', marginTop: '1rem' }}>Message Sent!</h3>
                <p style={{ fontWeight: 300, color: 'rgba(255,255,255,0.4)', marginTop: '0.5rem' }}>I'll get back to you soon.</p>
                <button
                  data-hover
                  onClick={() => setSubmitted(false)}
                  className="btn btn-ghost"
                  style={{ marginTop: '1.5rem', cursor: 'none' }}
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
                  style={{ alignSelf: 'flex-start', cursor: 'none', fontSize: '0.9rem' }}
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
    </section>
  )
}