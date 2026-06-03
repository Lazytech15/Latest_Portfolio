import { useEffect, useRef, useState } from 'react'
import { useDarkMode } from '../DarkModeContext'

import NFCAttendanceSystem from './projects/NFCAttendanceSystem'
import StockMasterPro from './projects/StockMasterPro'
import NeuralDesk from './projects/NeuralDesk'
import QuickTrackMobile from './projects/QuickTrackMobile'
import AutoFlowEngine from './projects/AutoFlowEngine'
import VueSurLaMontagne from './projects/VueSurLaMontagne'

// images
import vuesurlamontagne from '../../public/project/vuesurlamontagne.png'
import inventorycontrol from '../../public/project/inventorycontrol.png'
import quicktrack from '../../public/project/quicktrack.jpg'
import nfcScanner from '../../public/project/nfcscanner.jpg'
import eatall from '../../public/project/eatall.png'

// Preview images mapped by project order — swap out as needed
const projectImages = [
  nfcScanner,       // 001 NFCAttendanceSystem
  inventorycontrol, // 002 StockMasterPro
  eatall,           // 003 NeuralDesk
  quicktrack,       // 004 QuickTrackMobile
  eatall,           // 005 AutoFlowEngine
  vuesurlamontagne, // 006 VueSurLaMontagne
]

const projects = [
  NFCAttendanceSystem,
  StockMasterPro,
  NeuralDesk,
  QuickTrackMobile,
  AutoFlowEngine,
  VueSurLaMontagne
]

// ─── Hover Peek Image ────────────────────────────────────────────────────────
function PeekImage({ src, visible, mouseX, mouseY }) {
  if (!src) return null

  const offset = { x: 32, y: -80 }
  const left = mouseX + offset.x
  const top = mouseY + offset.y

  return (
    <div
      style={{
        position: 'fixed',
        left,
        top,
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1) translateY(0px)' : 'scale(0.92) translateY(8px)',
        transition: 'opacity 0.22s cubic-bezier(0.22,1,0.36,1), transform 0.22s cubic-bezier(0.22,1,0.36,1)',
        willChange: 'transform, opacity',
      }}
    >
      <div
        style={{
          width: 'clamp(280px, 28vw, 480px)',
          aspectRatio: '16/10',
          borderRadius: '6px',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.25), 0 4px 16px rgba(0,0,0,0.15)',
          border: '1px solid rgba(255,255,255,0.08)',
          background: '#111',
        }}
      >
        <img
          src={src}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </div>
    </div>
  )
}

// ─── Projects section ────────────────────────────────────────────────────────
export default function Projects({ onOpenProject }) {
  const sectionRef = useRef(null)
  const { isDark } = useDarkMode()
  const dmText = isDark ? '#e8e8e8' : '#0a0a0a'
  const dmTextMuted = isDark ? 'rgba(232,232,232,0.45)' : 'rgba(0,0,0,0.45)'
  const dmTextSub = isDark ? 'rgba(232,232,232,0.3)' : 'rgba(0,0,0,0.3)'
  const dmBorder = isDark ? 'rgba(163,230,53,0.12)' : 'rgba(0,0,0,0.07)'

  const [peekSrc, setPeekSrc] = useState(null)
  const [peekVisible, setPeekVisible] = useState(false)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  const handleRowMouseEnter = (src) => {
    if (src) {
      setPeekSrc(src)
      setPeekVisible(true)
    }
  }

  const handleRowMouseLeave = () => {
    setPeekVisible(false)
  }

  useEffect(() => {
    const handleMouseMove = (e) => setMouse({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

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
      style={{
        padding: 'clamp(3rem,6vw,6rem) 0 clamp(3.5rem,7vw,7rem)', position: 'relative', zIndex: 2,
        background: isDark ? '#222222' : undefined,
        color: isDark ? '#e8e8e8' : undefined,
        transition: 'background 0.4s ease, color 0.4s ease',
      }}
    >
      {/* Global peek image — rendered once, follows mouse */}
      <PeekImage
        src={peekSrc}
        visible={peekVisible}
        mouseX={mouse.x}
        mouseY={mouse.y}
      />

      <div style={{ padding: '0 clamp(1.25rem, 4vw, 3.5rem)' }}>
        {/* Label */}
        <div className="reveal reveal-d1 flex items-center gap-3 mb-16">
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.72rem',
              letterSpacing: '0.18em',
              color: dmTextSub,
              textTransform: 'uppercase',
            }}
          >
            03 / My Work
          </span>
          <div style={{ flex: 1, height: 1, background: dmBorder }} />
        </div>

        {/* Heading */}
        <div className="reveal reveal-d2 mb-4">
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(2.8rem, 8vw, 7rem)',
              lineHeight: 0.9,
              color: dmText,
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
            color: dmTextMuted,
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
              onMouseEnter={() => handleRowMouseEnter(projectImages[i])}
              onMouseLeave={handleRowMouseLeave}
              className="project-row"
              style={{ gap: '1rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 'clamp(0.75rem, 2vw, 2rem)', flexWrap: 'wrap', minWidth: 0 }}>
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '0.72rem',
                    color: dmTextSub,
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
                    color: dmTextSub,
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
                <span className="project-row-arrow" style={{ color: isDark ? 'rgba(163,230,53,0.6)' : 'rgba(0,0,0,0.5)' }}>→</span>
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