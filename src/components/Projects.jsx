import { useEffect, useRef, useState } from 'react'
import { useDarkMode } from '../DarkModeContext'

import NFCAttendanceSystem from './projects/NFCAttendanceSystem'
import StockMasterPro from './projects/StockMasterPro'
import NeuralDesk from './projects/NeuralDesk'
import QuickTrackMobile from './projects/QuickTrackMobile'
import AutoFlowEngine from './projects/AutoFlowEngine'
import VueSurLaMontagne from './projects/VueSurLaMontagne'

import vuesurlamontagne from '../../public/project/vuesurlamontagne.png'
import inventorycontrol from '../../public/project/inventorycontrol.png'
import quicktrack from '../../public/project/quicktrack.jpg'
import nfcScanner from '../../public/project/nfcscanner.jpg'
import eatall from '../../public/project/eatall.png'

const projectImages = [
  nfcScanner,
  inventorycontrol,
  eatall,
  quicktrack,
  eatall,
  vuesurlamontagne,
]

const projects = [
  NFCAttendanceSystem,
  StockMasterPro,
  NeuralDesk,
  QuickTrackMobile,
  AutoFlowEngine,
  VueSurLaMontagne,
]

function PeekImage({ src, visible, mouseX, mouseY }) {
  if (!src) return null
  return (
    <div style={{
      position: 'fixed',
      left: mouseX + 32,
      top: mouseY - 80,
      pointerEvents: 'none',
      zIndex: 9999,
      opacity: visible ? 1 : 0,
      transform: visible ? 'scale(1) translateY(0px)' : 'scale(0.92) translateY(8px)',
      transition: 'opacity 0.22s cubic-bezier(0.22,1,0.36,1), transform 0.22s cubic-bezier(0.22,1,0.36,1)',
      willChange: 'transform, opacity',
    }}>
      <div style={{
        width: 'clamp(280px, 28vw, 480px)',
        aspectRatio: '16/10',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.25), 0 4px 16px rgba(0,0,0,0.15)',
        border: '1px solid rgba(0,0,0,0.12)',
        background: '#f5f3ee',
      }}>
        <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
    </div>
  )
}

export default function Projects({ onOpenProject }) {
  const sectionRef = useRef(null)
  const { isDark } = useDarkMode()

  /* ── LIGHT section (same slot as original section-white) ── */
  const bg           = isDark ? '#222222' : '#f5f3ee'
  const fg           = isDark ? '#e8e8e8' : '#0a0a0a'
  const acc          = '#c8ff00'
  const accText      = isDark ? '#c8ff00' : '#0a0a0a'
  const muted        = isDark ? 'rgba(232,232,232,0.55)' : 'rgba(10,10,10,0.55)'
  const subtle       = isDark ? 'rgba(232,232,232,0.30)' : 'rgba(10,10,10,0.35)'
  const border       = isDark ? 'rgba(163,230,53,0.12)' : 'rgba(0,0,0,0.10)'
  const borderStrong = isDark ? 'rgba(163,230,53,0.25)' : 'rgba(0,0,0,0.20)'

  const [peekSrc, setPeekSrc] = useState(null)
  const [peekVisible, setPeekVisible] = useState(false)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

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
      className="rounded-top-section"
      style={{
        background: bg,
        color: fg,
        fontFamily: "'DM Sans', sans-serif",
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 0.5s ease, color 0.5s ease',
        paddingBottom: 'clamp(4rem, 8vw, 7rem)',
      }}
    >
      <PeekImage src={peekSrc} visible={peekVisible} mouseX={mouse.x} mouseY={mouse.y} />

      {/* Accent top rule */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: acc, zIndex: 10 }} />

      {/* Ghost watermark */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        left: '-2%', bottom: '-5%',
        fontFamily: "'Bebas Neue', Impact, sans-serif",
        fontSize: 'clamp(100px, 16vw, 240px)',
        lineHeight: 0.85,
        color: 'transparent',
        WebkitTextStroke: isDark ? '1px rgba(232,232,232,0.05)' : '1px rgba(10,10,10,0.05)',
        userSelect: 'none', pointerEvents: 'none', zIndex: 0,
      }}>
        WORK
      </div>

      <div style={{
        position: 'relative', zIndex: 2,
        padding: 'clamp(2rem, 4vw, 3.5rem) clamp(1.5rem, 4vw, 3.5rem) 0',
      }}>
        {/* Section label */}
        <div className="reveal reveal-d1" style={{
          display: 'flex', alignItems: 'center', gap: '1rem',
          marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
        }}>
          <span style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.62rem', letterSpacing: '0.25em',
            color: accText, textTransform: 'uppercase',
          }}>
            ↳ 03 / My Work
          </span>
          <div style={{ flex: 1, height: '0.5px', background: border }} />
        </div>

        {/* Heading */}
        <div className="reveal reveal-d2" style={{ marginBottom: '0.75rem' }}>
          <h2 style={{
            fontFamily: "'Bebas Neue', Impact, sans-serif",
            fontSize: 'clamp(2.5rem, 5.5vw, 6rem)',
            fontWeight: 400, lineHeight: 0.88,
            letterSpacing: '-0.01em', color: fg, margin: 0,
          }}>
            Selected
          </h2>
          <h2 style={{
            fontFamily: "'Bebas Neue', Impact, sans-serif",
            fontSize: 'clamp(2.5rem, 5.5vw, 6rem)',
            fontWeight: 400, lineHeight: 0.88,
            color: 'transparent',
            WebkitTextStroke: `2px ${fg}`,
            margin: 0,
          }}>
            Projects.
          </h2>
        </div>

        <p className="reveal reveal-d3" style={{
          fontFamily: "'DM Mono', monospace",
          fontWeight: 300, fontSize: '0.72rem',
          color: subtle, letterSpacing: '0.1em',
          marginBottom: '1.25rem',
        }}>
          // Tap any project for full details
        </p>

        {/* Project list */}
        <div className="reveal reveal-d3" style={{ borderTop: `0.5px solid ${border}` }}>
          {projects.map((p, i) => (
            <div
              key={i}
              onClick={() => onOpenProject && onOpenProject(p)}
              onMouseEnter={() => { if (projectImages[i]) { setPeekSrc(projectImages[i]); setPeekVisible(true) } }}
              onMouseLeave={() => setPeekVisible(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.9rem 0',
                borderBottom: `0.5px solid ${border}`,
                cursor: 'pointer',
                gap: '1rem',
                transition: 'padding-left 0.3s cubic-bezier(0.16,1,0.3,1)',
              }}
              onMouseOver={e => e.currentTarget.style.paddingLeft = '1.5rem'}
              onMouseOut={e => e.currentTarget.style.paddingLeft = '0'}
            >
              {/* Left: number + title */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.25rem', minWidth: 0, overflow: 'hidden' }}>
                <span style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '0.65rem', color: subtle,
                  letterSpacing: '0.1em', minWidth: '2rem', flexShrink: 0,
                }}>
                  {p.number}
                </span>
                <span style={{
                  fontFamily: "'Bebas Neue', Impact, sans-serif",
                  fontSize: 'clamp(1.2rem, 2.2vw, 2rem)',
                  letterSpacing: '0.01em', color: fg, lineHeight: 1,
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>
                  {p.title}
                </span>
              </div>

              {/* Right: category + status + arrow */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexShrink: 0 }}>
                <span style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '0.65rem', letterSpacing: '0.08em', color: subtle,
                  whiteSpace: 'nowrap',
                }}>
                  {p.category}
                </span>
                <span style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '0.65rem',
                  color: p.status === 'Shipped' ? '#00b37a' : '#b38a00',
                  display: 'flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap',
                }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'currentColor', display: 'inline-block', flexShrink: 0 }} />
                  {p.status}
                </span>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.9rem', color: acc }}>→</span>
              </div>
            </div>
          ))}
        </div>

        {/* View all CTA */}
        <div className="reveal reveal-d4" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
          <a
            href="https://github.com/Lazytech15"
            target="_blank" rel="noopener noreferrer"
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.72rem', letterSpacing: '0.14em',
              color: muted, textDecoration: 'none',
              textTransform: 'uppercase',
              border: `0.5px solid ${borderStrong}`,
              padding: '12px 26px',
              transition: 'color 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = fg; e.currentTarget.style.borderColor = fg }}
            onMouseLeave={e => { e.currentTarget.style.color = muted; e.currentTarget.style.borderColor = borderStrong }}
          >
            View all on GitHub ↗
          </a>
        </div>
      </div>
    </section>
  )
}
