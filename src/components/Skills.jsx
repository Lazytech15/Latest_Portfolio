import { useEffect, useRef, useState } from 'react'
import { useDarkMode } from '../DarkModeContext'

const skillGroups = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React / Vite', level: 95 },
      { name: 'TailwindCSS', level: 95 },
      { name: 'TypeScript', level: 75 },
      { name: 'HTML / CSS', level: 98 },
    ],
    detail: "Building pixel-perfect UIs with React 18, Vite's blazing build system, TailwindCSS utility classes, and TypeScript for type safety.",
  },
  {
    category: 'Backend & Database',
    skills: [
      { name: 'PHP', level: 80 },
      { name: 'Node.js', level: 82 },
      { name: 'MySQL', level: 85 },
      { name: 'REST APIs', level: 90 },
    ],
    detail: 'Server-side logic with PHP + Node.js, relational data with MySQL, RESTful APIs with proper auth flows.',
  },
  {
    category: 'IoT & Embedded',
    skills: [
      { name: 'ESP32', level: 88 },
      { name: 'Arduino C++', level: 80 },
      { name: 'MQTT', level: 82 },
      { name: 'WebSocket', level: 85 },
    ],
    detail: 'Programming ESP32 microcontrollers in C++, MQTT broker integration, real-time sensor telemetry, and custom hardware deployments.',
  },
  {
    category: 'Mobile & Desktop',
    skills: [
      { name: 'React Native', level: 85 },
      { name: 'Expo', level: 82 },
      { name: 'Electron', level: 80 },
      { name: 'IPC / Native APIs', level: 75 },
    ],
    detail: 'Cross-platform mobile with React Native + Expo, offline-first storage, native device APIs, and desktop apps with Electron.',
  },
  {
    category: 'Automation',
    skills: [
      { name: 'n8n', level: 88 },
      { name: 'Webhooks', level: 90 },
      { name: 'API Integration', level: 92 },
      { name: 'Data Pipelines', level: 80 },
    ],
    detail: 'n8n workflows connecting APIs, scheduled cron triggers, custom TypeScript nodes, webhook-driven pipelines, and IoT alert routing.',
  },
  {
    category: 'Tools & DevOps',
    skills: [
      { name: 'Git / GitHub', level: 92 },
      { name: 'Linux / CLI', level: 80 },
      { name: 'Figma', level: 72 },
      { name: 'Postman', level: 88 },
    ],
    detail: 'Git-based version control, Linux CLI, VS Code with custom configs, Figma for design handoff, Postman for API testing.',
  },
]

function SkillRow({ group, isOpen, onToggle, fg, muted, subtle, border, borderStrong, acc }) {
  const barsRef = useRef(null)

  useEffect(() => {
    if (isOpen && barsRef.current) {
      setTimeout(() => {
        barsRef.current?.querySelectorAll('.bar-fill-sk').forEach((el) => {
          el.style.width = el.dataset.level + '%'
        })
      }, 120)
    }
  }, [isOpen])

  return (
    <div style={{ borderBottom: `0.5px solid ${border}` }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%', background: 'none', border: 'none',
          display: 'grid', gridTemplateColumns: '1fr auto',
          alignItems: 'center', padding: '1.25rem 0',
          textAlign: 'left', cursor: 'pointer',
        }}
      >
        <div style={{
          fontFamily: "'Bebas Neue', Impact, sans-serif",
          fontSize: 'clamp(1.6rem, 3vw, 2.8rem)',
          letterSpacing: '0.01em', color: fg, lineHeight: 1,
        }}>
          {group.category}
        </div>
        <div style={{
          width: 26, height: 26,
          border: `0.5px solid ${borderStrong}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          transition: 'background 0.2s, border-color 0.2s',
          background: isOpen ? acc : 'transparent',
        }}>
          <span style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '1rem', lineHeight: 1,
            color: isOpen ? '#0d0d0d' : subtle,
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1), color 0.2s',
            display: 'block',
          }}>+</span>
        </div>
      </button>

      <div style={{
        maxHeight: isOpen ? '360px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.5s cubic-bezier(0.16,1,0.3,1)',
      }}>
        <div ref={barsRef} style={{ paddingBottom: '2rem' }}>
          <p style={{
            fontWeight: 300, fontSize: '0.88rem',
            color: muted, lineHeight: 1.75, marginBottom: '1.5rem',
            borderLeft: `2px solid ${acc}`, paddingLeft: '1rem',
          }}>
            {group.detail}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem 2rem' }}>
            {group.skills.map((skill, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem', color: fg, fontWeight: 300 }}>
                    {skill.name}
                  </span>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.72rem', color: subtle }}>
                    {skill.level}%
                  </span>
                </div>
                <div style={{ height: 2, background: border, position: 'relative', overflow: 'hidden' }}>
                  <div
                    className="bar-fill-sk"
                    data-level={skill.level}
                    style={{
                      position: 'absolute', left: 0, top: 0, height: '100%',
                      width: '0%', background: acc,
                      transition: 'width 0.7s cubic-bezier(0.16,1,0.3,1)',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Skills() {
  const sectionRef = useRef(null)
  const [openIndex, setOpenIndex] = useState(null)
  const { isDark } = useDarkMode()

  /* ── DARK section (same slot as original) ── */
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
              setTimeout(() => el.classList.add('visible'), i * 80)
            })
          }
        })
      },
      { threshold: 0.06 }
    )
    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        background: bg,
        color: fg,
        fontFamily: "'DM Sans', sans-serif",
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 0.5s ease',
        paddingBottom: 'clamp(4rem, 8vw, 7rem)',
      }}
    >
      {/* Accent top rule */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: acc, zIndex: 10 }} />

      {/* Ghost watermark */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        right: '-2%', top: '5%',
        fontFamily: "'Bebas Neue', Impact, sans-serif",
        fontSize: 'clamp(100px, 16vw, 240px)',
        lineHeight: 0.85,
        color: 'transparent',
        WebkitTextStroke: '1px rgba(242,240,235,0.04)',
        userSelect: 'none', pointerEvents: 'none', zIndex: 0,
      }}>
        SKILLS
      </div>

      <div style={{
        position: 'relative', zIndex: 2,
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 3.5rem) 0',
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
            ↳ 02 / Skills
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
          {/* LEFT: Heading */}
          <div className="reveal reveal-d2">
            <div style={{ overflow: 'hidden', marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
              <h2 style={{
                fontFamily: "'Bebas Neue', Impact, sans-serif",
                fontSize: 'clamp(3rem, 7vw, 8rem)',
                fontWeight: 400, lineHeight: 0.88,
                letterSpacing: '-0.01em', color: fg, margin: 0,
              }}>
                Full Spectrum
              </h2>
              <h2 style={{
                fontFamily: "'Bebas Neue', Impact, sans-serif",
                fontSize: 'clamp(3rem, 7vw, 8rem)',
                fontWeight: 400, lineHeight: 0.88,
                color: 'transparent',
                WebkitTextStroke: `2px ${fg}`,
                margin: 0,
              }}>
                Developer.
              </h2>
            </div>
            <p style={{
              fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
              lineHeight: 1.85, color: muted, fontWeight: 300,
              margin: '0 0 1rem', maxWidth: 420,
            }}>
              From circuit boards to cloud APIs. I thrive at every layer of
              the stack — and pick the right tool for the job.
            </p>
            <p style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.72rem', color: subtle,
              letterSpacing: '0.1em', marginTop: '1.5rem',
            }}>
              // always learning · always building
            </p>
          </div>

          {/* RIGHT: Accordion */}
          <div className="reveal reveal-d3">
            <div style={{
              display: 'flex', alignItems: 'center', gap: '1rem',
              marginBottom: '1.25rem',
            }}>
              <span style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '0.6rem', letterSpacing: '0.25em',
                color: accText, textTransform: 'uppercase',
              }}>
                ↳ Categories
              </span>
              <div style={{ flex: 1, height: '0.5px', background: border }} />
            </div>
            <div style={{ borderTop: `0.5px solid ${border}` }}>
              {skillGroups.map((group, i) => (
                <SkillRow
                  key={i}
                  group={group}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                  fg={fg} muted={muted} subtle={subtle}
                  border={border} borderStrong={borderStrong} acc={acc}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
