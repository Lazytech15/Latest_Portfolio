import { useEffect, useRef, useState } from 'react'

const highlights = [
  {
    label: 'Web & Desktop',
    tech: 'React · Vite · Electron · TailwindCSS',
    detail: 'I build fast, beautiful web interfaces with React + Vite and TailwindCSS. For desktop, I use Electron to ship cross-platform apps with native OS integration — system trays, hotkeys, file watchers, and IPC bridges.',
  },
  {
    label: 'IoT & Embedded',
    tech: 'ESP32 · MQTT · Arduino C++ · Sensors',
    detail: 'I design and program ESP32 microcontrollers for real-world deployments — temperature sensors, soil moisture arrays, motion detectors, and energy monitors. Data flows via MQTT to Node.js brokers.',
  },
  {
    label: 'Mobile Apps',
    tech: 'React Native · Expo · AsyncStorage',
    detail: 'I build cross-platform iOS and Android apps using React Native and Expo. My apps support offline-first data sync, camera integration, push notifications, PDF export, and REST API connectivity.',
  },
  {
    label: 'Automation',
    tech: 'n8n · Webhooks · TypeScript · Pipelines',
    detail: 'I build n8n automation pipelines connecting Google Sheets, Slack, email, REST APIs, and IoT webhooks. I also write custom n8n nodes in TypeScript for complex workflows.',
  },
]

function useReveal(ref) {
  useEffect(() => {
    if (!ref.current) return
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
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
}

export default function About() {
  const sectionRef = useRef(null)
  const [expanded, setExpanded] = useState(null)
  useReveal(sectionRef)

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-white rounded-top-section"
      style={{ padding: 'clamp(3rem,6vw,6rem) 0 clamp(3rem,6vw,6rem)', marginTop: '-2rem', position: 'relative', zIndex: 2 }}
    >
      <div style={{ padding: '0 clamp(1.25rem, 4vw, 3.5rem)' }}>
        {/* Section label */}
        <div className="reveal reveal-d1 flex items-center gap-3 mb-12">
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.72rem',
              letterSpacing: '0.18em',
              color: 'rgba(0,0,0,0.35)',
              textTransform: 'uppercase',
            }}
          >
            01 / About Me
          </span>
          <div style={{ flex: 1, height: 1, background: 'rgba(0,0,0,0.08)' }} />
        </div>

        {/* Hero text + bio */}
        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 items-start mb-20">
          <div>
            <h2
              className="reveal reveal-d2"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(2.8rem, 8vw, 7rem)',
                lineHeight: 0.9,
                color: '#0a0a0a',
                letterSpacing: '0.01em',
                marginBottom: '2rem',
              }}
            >
              A full-stack dev who builds things that actually ship
            </h2>

            <div className="reveal reveal-d3 space-y-5">
              <p style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)', lineHeight: 1.75, color: 'rgba(0,0,0,0.65)', fontWeight: 300 }}>
                I work across the entire stack — from designing MySQL schemas and building PHP backends,
                to crafting pixel-perfect React interfaces, and programming ESP32 microcontrollers for
                IoT deployments. My projects span web, mobile, desktop, and hardware.
              </p>
              <p style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)', lineHeight: 1.75, color: 'rgba(0,0,0,0.65)', fontWeight: 300 }}>
                I also build automation workflows with n8n that connect APIs, trigger events,
                and eliminate repetitive work. If there's a problem to solve, I'll find the right tool
                — whether that's a soldering iron or a webhook.
              </p>
            </div>

            <div className="reveal reveal-d4 flex gap-4 mt-8 flex-wrap">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn btn-ghost-dark" style={{ fontSize: '0.85rem', padding: '10px 20px' }}>
                GitHub ↗
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="btn btn-ghost-dark" style={{ fontSize: '0.85rem', padding: '10px 20px' }}>
                LinkedIn ↗
              </a>
            </div>
          </div>

          {/* Stats column */}
          <div className="reveal reveal-d3 grid grid-cols-2 gap-px bg-[rgba(0,0,0,0.06)]">
            {[
              { value: '3+', label: 'Years Experience' },
              { value: '20+', label: 'Projects Shipped' },
              { value: '5+', label: 'Tech Domains' },
              { value: 'PHL', label: 'Philippines · Remote-Ready' },
            ].map((s, i) => (
              <div key={i} style={{ background: 'var(--white)', padding: 'clamp(1.25rem, 3vw, 2rem)' }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: '#0a0a0a', lineHeight: 1 }}>
                  {s.value}
                </div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.7rem', letterSpacing: '0.1em', color: 'rgba(0,0,0,0.4)', marginTop: '0.4rem', textTransform: 'uppercase' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Specialisms */}
        <div className="reveal reveal-d4">
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.72rem',
              letterSpacing: '0.18em',
              color: 'rgba(0,0,0,0.3)',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            Specialisms
          </p>
          <div>
            {highlights.map((h, i) => (
              <div
                key={i}
                data-hover
                onClick={() => setExpanded(expanded === i ? null : i)}
                style={{
                  borderTop: '1px solid rgba(0,0,0,0.08)',
                  padding: '1.25rem 0',
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  alignItems: 'start',
                  gap: '1rem',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: 'clamp(1.1rem, 3vw, 1.8rem)', color: '#0a0a0a' }}>
                      {h.label}
                    </span>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.68rem', color: 'rgba(0,0,0,0.35)', letterSpacing: '0.06em' }}>
                      {h.tech}
                    </span>
                  </div>
                  <div
                    style={{
                      maxHeight: expanded === i ? '140px' : '0',
                      overflow: 'hidden',
                      transition: 'max-height 0.4s cubic-bezier(0.16,1,0.3,1)',
                    }}
                  >
                    <p style={{ fontWeight: 300, fontSize: '0.92rem', color: 'rgba(0,0,0,0.55)', lineHeight: 1.6, paddingTop: '0.75rem' }}>
                      {h.detail}
                    </p>
                  </div>
                </div>
                <span style={{ fontSize: '1rem', color: 'rgba(0,0,0,0.3)', transition: 'transform 0.3s ease', transform: expanded === i ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                  +
                </span>
              </div>
            ))}
            <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }} />
          </div>
        </div>

        {/* Tags */}
        <div className="reveal reveal-d5 flex flex-wrap gap-2 mt-10">
          {['IoT Systems', 'Full Stack Web', 'Mobile Apps', 'Automation', 'Node.js', 'React Native'].map((tag) => (
            <span key={tag} className="tag-dark tag">{tag}</span>
          ))}
        </div>
      </div>
    </section>
  )
}