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
    detail: 'Building pixel-perfect UIs with React 18, Vite\'s blazing build system, TailwindCSS utility classes, and TypeScript for type safety.',
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

function SkillRow({ group, isOpen, onToggle, triggerBars }) {
  const barsRef = useRef(null)

  useEffect(() => {
    if (isOpen && barsRef.current) {
      setTimeout(() => {
        barsRef.current?.querySelectorAll('.bar-fill').forEach((el) => {
          el.style.width = el.dataset.level + '%'
        })
      }, 120)
    }
  }, [isOpen, triggerBars])

  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
      <button
        data-hover
        onClick={onToggle}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          alignItems: 'center',
          padding: '1.25rem 0',
          textAlign: 'left',
        }}
      >
        <div>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: 'clamp(1.2rem, 4vw, 2.5rem)',
              color: 'var(--white)',
              letterSpacing: '-0.01em',
            }}
          >
            {group.category}
          </span>
        </div>
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.3)',
            transition: 'transform 0.3s ease, color 0.2s ease',
            transform: isOpen ? 'rotate(45deg)' : 'none',
          }}
        >
          +
        </span>
      </button>

      <div
        style={{
          maxHeight: isOpen ? '320px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.5s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <div ref={barsRef} style={{ paddingBottom: '2rem' }}>
          <p style={{ fontWeight: 300, fontSize: '0.92rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            {group.detail}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem 2rem' }}>
            {group.skills.map((skill, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', fontWeight: 300 }}>
                    {skill.name}
                  </span>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>
                    {skill.level}%
                  </span>
                </div>
                <div className="bar-track">
                  <div className="bar-fill" data-level={skill.level} />
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
        background: isDark ? '#1a1a1a' : 'var(--bg)',
        padding: 'clamp(3.5rem,7vw,7rem) 0', position: 'relative', zIndex: 1,
        transition: 'background 0.4s ease',
      }}
    >
      <div style={{ padding: '0 clamp(1.25rem, 4vw, 3.5rem)' }}>
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
            02 / Skills
          </span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
        </div>

        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 items-start">
          {/* Left — heading */}
          <div className="reveal reveal-d2">
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(2.8rem, 7vw, 6.5rem)',
                lineHeight: 0.92,
                color: 'var(--white)',
                letterSpacing: '0.01em',
                marginBottom: '1.5rem',
              }}
            >
              Full spectrum developer
            </h2>
            <p style={{ fontWeight: 300, fontSize: 'clamp(0.9rem, 2.5vw, 1rem)', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, maxWidth: '380px' }}>
              From circuit boards to cloud APIs. I thrive at every layer of the stack — and I pick the right tool for the job.
            </p>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.75rem', color: 'rgba(255,255,255,0.2)', marginTop: '2rem', letterSpacing: '0.08em' }}>
              // always learning · always building
            </p>
          </div>

          {/* Right — accordion skill list */}
          <div className="reveal reveal-d3">
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              {skillGroups.map((group, i) => (
                <SkillRow
                  key={i}
                  group={group}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                  triggerBars={openIndex === i}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}