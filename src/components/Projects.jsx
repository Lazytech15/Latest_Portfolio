import { useEffect, useRef } from 'react'

import NFCAttendanceSystem from './projects/NFCAttendanceSystem'
import StockMasterPro from './projects/StockMasterPro'
import NeuralDesk from './projects/NeuralDesk'
import QuickTrackMobile from './projects/QuickTrackMobile'
import AutoFlowEngine from './projects/AutoFlowEngine'

const projects = [
  NFCAttendanceSystem,
  StockMasterPro,
  NeuralDesk,
  QuickTrackMobile,
  AutoFlowEngine
]

// ─── Projects section ────────────────────────────────────────────────────────
export default function Projects({ onOpenProject }) {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 70)
            })
          }
        })
      },
      { threshold: 0.05 }
    )
    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-white rounded-top-section"
      style={{ padding: 'clamp(3rem,6vw,6rem) 0 clamp(3.5rem,7vw,7rem)', position: 'relative', zIndex: 2 }}
    >
      <div style={{ padding: '0 clamp(1.25rem, 4vw, 3.5rem)' }}>
        {/* Label */}
        <div className="reveal reveal-d1 flex items-center gap-3 mb-16">
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.72rem',
              letterSpacing: '0.18em',
              color: 'rgba(0,0,0,0.3)',
              textTransform: 'uppercase',
            }}
          >
            03 / My Work
          </span>
          <div style={{ flex: 1, height: 1, background: 'rgba(0,0,0,0.07)' }} />
        </div>

        {/* Heading */}
        <div className="reveal reveal-d2 mb-4">
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(2.8rem, 8vw, 7rem)',
              lineHeight: 0.9,
              color: '#0a0a0a',
              letterSpacing: '0.01em',
            }}
          >
            Selected Projects
          </h2>
        </div>

        <p
          className="reveal reveal-d3"
          style={{
            fontWeight: 300,
            fontSize: '0.9rem',
            color: 'rgba(0,0,0,0.45)',
            fontFamily: "'DM Mono', monospace",
            letterSpacing: '0.06em',
            marginBottom: '3rem',
          }}
        >
          // Tap any project for full details
        </p>

        {/* Project list */}
        <div className="reveal reveal-d3">
          {projects.map((p, i) => (
            <div
              key={i}
              data-hover
              onClick={() => onOpenProject && onOpenProject(p)}
              className="project-row"
              style={{ gap: '1rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 'clamp(0.75rem, 2vw, 2rem)', flexWrap: 'wrap', minWidth: 0 }}>
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '0.72rem',
                    color: 'rgba(0,0,0,0.3)',
                    letterSpacing: '0.08em',
                    minWidth: '2.5rem',
                    flexShrink: 0,
                  }}
                >
                  {p.number}
                </span>
                <span className="project-row-title" style={{ minWidth: 0 }}>{p.title}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '0.7rem',
                    letterSpacing: '0.08em',
                    color: 'rgba(0,0,0,0.4)',
                  }}
                  className="hidden md:inline"
                >
                  {p.category}
                </span>
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '0.7rem',
                    color: p.status === 'Shipped' ? '#00b37a' : '#b38a00',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span
                    className="status-dot"
                    style={{ width: 5, height: 5, borderRadius: '50%', background: 'currentColor', display: 'inline-block', flexShrink: 0 }}
                  />
                  {p.status}
                </span>
                <span className="project-row-arrow" style={{ color: 'rgba(0,0,0,0.5)' }}>→</span>
              </div>
            </div>
          ))}
        </div>

        {/* View all */}
        <div className="reveal reveal-d4 flex justify-end mt-10">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn btn-ghost-dark">
            View all on GitHub ↗
          </a>
        </div>
      </div>
    </section>
  )
}