import { useEffect, useRef, useState } from 'react'
import { useDarkMode } from '../DarkModeContext'

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

const STATS = [
  { value: '3+',  label: 'Years\nExperience' },
  { value: '20+', label: 'Projects\nShipped' },
  { value: '5+',  label: 'Tech\nDomains' },
  { value: 'PHL', label: 'Remote\nReady' },
]

const TAGS = ['IoT Systems', 'Full Stack Web', 'Mobile Apps', 'Automation', 'Node.js', 'React Native']

function useReveal(ref) {
  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 80)
            })
          }
        })
      },
      { threshold: 0.06 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
}

export default function About() {
  const sectionRef = useRef(null)
  const [expanded, setExpanded] = useState(null)
  const { isDark } = useDarkMode()
  useReveal(sectionRef)

  const bg           = isDark ? '#111111' : '#f2f0eb'
  const fg           = isDark ? '#f2f0eb' : '#0d0d0d'
  const acc          = '#c8ff00'
  const accText      = isDark ? '#c8ff00' : '#0d0d0d'
  const muted        = isDark ? 'rgba(242,240,235,0.55)' : 'rgba(13,13,13,0.58)'
  const subtle       = isDark ? 'rgba(242,240,235,0.28)' : 'rgba(13,13,13,0.35)'
  const border       = isDark ? 'rgba(242,240,235,0.10)' : 'rgba(13,13,13,0.12)'
  const borderStrong = isDark ? 'rgba(242,240,235,0.20)' : 'rgba(13,13,13,0.22)'
  const cardBg       = isDark ? '#1a1a1a' : '#e8e6e0'

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        background: bg,
        color: fg,
        fontFamily: "'DM Sans', sans-serif",
        position: 'relative',
        overflow: 'visible',
        transition: 'background 0.5s ease, color 0.5s ease',
        paddingBottom: 'clamp(4rem, 8vw, 7rem)',
      }}
    >
      {/* ── Accent top rule ── */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: acc, zIndex: 10 }} />

      {/* ── Ghost watermark ── */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        left: '-2%', bottom: '-5%',
        fontFamily: "'Bebas Neue', Impact, sans-serif",
        fontSize: 'clamp(100px, 16vw, 240px)',
        lineHeight: 0.85,
        color: 'transparent',
        WebkitTextStroke: isDark ? '1px rgba(242,240,235,0.05)' : '1px rgba(13,13,13,0.05)',
        userSelect: 'none',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
        maxWidth: '100%',
      }}>
        ABOUT
      </div>

      <div style={{
        position: 'relative', zIndex: 2,
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 3.5rem) 0',
      }}>

        {/* ── Section label ── */}
        <div className="reveal reveal-d1" style={{
          display: 'flex', alignItems: 'center', gap: '1rem',
          marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
        }}>
          <span style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.62rem', letterSpacing: '0.25em',
            color: accText, textTransform: 'uppercase',
          }}>
            ↳ 01 / About Me
          </span>
          <div style={{ flex: 1, height: '0.5px', background: border }} />
        </div>

        {/* ── Main grid: LEFT = headline + bio + CTAs | RIGHT = Specialisms ── */}
        <div style={{
          display: 'grid',
          // UPDATED: Using min() ensures it doesn't overflow on very small screens
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: 'clamp(2rem, 5vw, 5rem)',
          alignItems: 'start',
          marginBottom: 'clamp(3rem, 6vw, 5rem)',
        }}>

          {/* LEFT: Headline + bio + CTAs */}
          <div>
            <div className="reveal reveal-d2" style={{ overflow: 'hidden', marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
              <h2 style={{
                fontFamily: "'Bebas Neue', Impact, sans-serif",
                fontSize: 'clamp(3rem, 7vw, 8rem)',
                fontWeight: 400,
                lineHeight: 0.88,
                letterSpacing: '-0.01em',
                color: fg,
                margin: 0,
              }}>
                A Full-Stack Dev
              </h2>
              <h2 style={{
                fontFamily: "'Bebas Neue', Impact, sans-serif",
                fontSize: 'clamp(3rem, 7vw, 8rem)',
                fontWeight: 400,
                lineHeight: 0.88,
                color: 'transparent',
                WebkitTextStroke: `2px ${fg}`,
                margin: 0,
              }}>
                Who Ships.
              </h2>
            </div>

            <div className="reveal reveal-d3" style={{ marginBottom: '1.25rem' }}>
              <p style={{
                fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
                lineHeight: 1.85, color: muted, fontWeight: 300,
                margin: '0 0 1rem',
                maxWidth: 520,
              }}>
                I work across the entire stack — from designing MySQL schemas and
                building PHP backends, to crafting pixel-perfect React interfaces,
                and programming ESP32 microcontrollers for IoT deployments.
              </p>
              <p style={{
                fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
                lineHeight: 1.85, color: muted, fontWeight: 300,
                margin: 0,
                maxWidth: 520,
              }}>
                I also build automation workflows with n8n that connect APIs,
                trigger events, and eliminate repetitive work. If there's a
                problem to solve, I'll find the right tool — soldering iron or webhook.
              </p>
            </div>

            {/* CTAs */}
            <div className="reveal reveal-d4" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: '2rem' }}>
              <a
                href="https://github.com/Lazytech15"
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  background: acc, color: '#0d0d0d',
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '0.72rem', fontWeight: 700,
                  letterSpacing: '0.15em', textTransform: 'uppercase',
                  padding: '12px 26px', borderRadius: 0,
                  textDecoration: 'none',
                  transition: 'transform 0.18s, box-shadow 0.18s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-3px,-3px)'; e.currentTarget.style.boxShadow = `4px 4px 0 ${fg}` }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translate(0,0)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                GitHub →
              </a>
              <a
                href="https://www.linkedin.com/in/emmanuel-ablao-06713b308"
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  background: 'transparent', color: muted,
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase',
                  padding: '12px 26px', borderRadius: 0,
                  border: `1px solid ${borderStrong}`,
                  textDecoration: 'none',
                  transition: 'color 0.2s, border-color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = fg; e.currentTarget.style.borderColor = fg }}
                onMouseLeave={e => { e.currentTarget.style.color = muted; e.currentTarget.style.borderColor = borderStrong }}
              >
                LinkedIn ↗
              </a>
            </div>
          </div>

          {/* RIGHT: Specialisms accordion */}
          <div className="reveal reveal-d3" style={{ alignSelf: 'start' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '1rem',
              marginBottom: '1.25rem',
            }}>
              <span style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '0.6rem', letterSpacing: '0.25em',
                color: accText, textTransform: 'uppercase',
              }}>
                ↳ Specialisms
              </span>
              <div style={{ flex: 1, height: '0.5px', background: border }} />
            </div>

            <div>
              {highlights.map((h, i) => (
                <div
                  key={i}
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  style={{
                    borderTop: `0.5px solid ${border}`,
                    padding: '1.1rem 0',
                    cursor: 'pointer',
                    transition: 'background 0.15s',
                  }}
                >
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto',
                    alignItems: 'center',
                    gap: '1rem',
                  }}>
                    <div>
                      <div style={{
                        display: 'flex', alignItems: 'baseline',
                        gap: '0.75rem', flexWrap: 'wrap',
                        marginBottom: expanded === i ? '0.75rem' : 0,
                        transition: 'margin 0.3s',
                      }}>
                        <span style={{
                          fontFamily: "'Bebas Neue', Impact, sans-serif",
                          fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)',
                          letterSpacing: '0.01em',
                          color: fg,
                          lineHeight: 1,
                        }}>
                          {h.label}
                        </span>
                        <span style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: '0.58rem', color: subtle,
                          letterSpacing: '0.06em',
                        }}>
                          {h.tech}
                        </span>
                      </div>

                      <div style={{
                        maxHeight: expanded === i ? '160px' : '0',
                        overflow: 'hidden',
                        transition: 'max-height 0.4s cubic-bezier(0.16,1,0.3,1)',
                      }}>
                        <p style={{
                          fontWeight: 300,
                          fontSize: '0.88rem', color: muted,
                          lineHeight: 1.75, margin: 0,
                          borderLeft: `2px solid ${acc}`,
                          paddingLeft: '1rem',
                        }}>
                          {h.detail}
                        </p>
                      </div>
                    </div>

                    {/* Expand indicator */}
                    <div style={{
                      width: 26, height: 26,
                      border: `0.5px solid ${borderStrong}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'background 0.2s, border-color 0.2s',
                      background: expanded === i ? acc : 'transparent',
                    }}>
                      <span style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: '1rem', lineHeight: 1,
                        color: expanded === i ? '#0d0d0d' : subtle,
                        transform: expanded === i ? 'rotate(45deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1), color 0.2s',
                        display: 'block',
                      }}>
                        +
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <div style={{ borderTop: `0.5px solid ${border}` }} />
            </div>
          </div>
        </div>

        {/* ── Stats row — full width at the bottom ── */}
        <div className="reveal reveal-d4" style={{
          display: 'grid',
          // UPDATED: Allow items to stack on smaller screens instead of forcing 4 columns
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '1px',
          background: borderStrong,
          marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
        }}>
          {STATS.map((s, i) => (
            <div
              key={i}
              style={{
                background: bg,
                padding: 'clamp(1rem, 2.5vw, 1.75rem)',
                transition: 'background 0.2s',
                cursor: 'default',
              }}
              onMouseEnter={e => e.currentTarget.style.background = cardBg}
              onMouseLeave={e => e.currentTarget.style.background = bg}
            >
              <div style={{
                fontFamily: "'Bebas Neue', Impact, sans-serif",
                fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
                lineHeight: 1,
                color: fg,
                letterSpacing: '-0.01em',
                marginBottom: '0.35rem',
              }}>
                {s.value}
              </div>
              <div style={{ width: 22, height: 2, background: acc, marginBottom: '0.5rem' }} />
              <div style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '0.58rem', letterSpacing: '0.18em',
                color: subtle, textTransform: 'uppercase',
                lineHeight: 1.5,
                whiteSpace: 'pre-line',
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* ── Tags ── */}
        <div className="reveal reveal-d5" style={{
          display: 'flex', flexWrap: 'wrap', gap: 8,
          marginTop: 'clamp(1rem, 2vw, 1.5rem)',
        }}>
          {TAGS.map(tag => (
            <span
              key={tag}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '0.62rem', letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: muted,
                border: `0.5px solid ${borderStrong}`,
                padding: '6px 14px',
                borderRadius: 0,
                transition: 'color 0.2s, border-color 0.2s, background 0.2s',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#0d0d0d'
                e.currentTarget.style.background = acc
                e.currentTarget.style.borderColor = acc
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = muted
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.borderColor = borderStrong
              }}
            >
              {tag}
            </span>
          ))}
        </div>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;600&family=DM+Mono:wght@400;500&display=swap');
        
        /* Optional: Add custom responsive utility classes here if needed */
        @media (max-width: 768px) {
          .hide-on-mobile {
            display: none !important;
          }
        }
      `}</style>
    </section>
  )
}