import logo_nobackground from '../../public/ed_logo_noBackground.png'
import { useEffect, useRef, useState } from 'react'
import { useDarkMode } from '../DarkModeContext'

const ROLES = [
  'Full Stack Developer',
  'IoT Engineer',
  'Mobile App Builder',
  'Web Architect',
  'Digital Maker',
]

function useTypewriter(words) {
  const [display, setDisplay] = useState('')
  const state = useRef({ wi: 0, ci: 0, deleting: false })
  useEffect(() => {
    let timer
    const tick = () => {
      const { wi, ci, deleting } = state.current
      const word = words[wi]
      if (!deleting) {
        setDisplay(word.slice(0, ci + 1))
        if (ci + 1 === word.length) {
          state.current.deleting = true
          timer = setTimeout(tick, 1800)
        } else {
          state.current.ci++
          timer = setTimeout(tick, 80)
        }
      } else {
        setDisplay(word.slice(0, ci - 1))
        if (ci - 1 === 0) {
          state.current.deleting = false
          state.current.wi = (wi + 1) % words.length
          state.current.ci = 0
          timer = setTimeout(tick, 350)
        } else {
          state.current.ci--
          timer = setTimeout(tick, 45)
        }
      }
    }
    timer = setTimeout(tick, 600)
    return () => clearTimeout(timer)
  }, [words])
  return display
}

function usePhilippinesClock() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const update = () => {
      const now = new Date()
      const ph = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Manila' }))
      let h = ph.getHours()
      const ampm = h >= 12 ? 'PM' : 'AM'
      h = h % 12 || 12
      const mm = String(ph.getMinutes()).padStart(2, '0')
      const ss = String(ph.getSeconds()).padStart(2, '0')
      setTime(`${String(h).padStart(2, '0')}:${mm}:${ss} ${ampm}`)
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

/* ── Orbiting circles ── */
const ORBITS = [
  { size: 10, rxFactor: 0.40, ryFactor: 0.30, speed: 0.0035, phaseOffset: 0 },
  { size: 6,  rxFactor: 0.28, ryFactor: 0.22, speed: 0.006,  phaseOffset: Math.PI * 0.7 },
  { size: 14, rxFactor: 0.18, ryFactor: 0.38, speed: 0.0025, phaseOffset: Math.PI * 1.4 },
]

function OrbitingCircles({ isDark }) {
  const containerRef = useRef(null)
  const circleRefs = useRef([])
  const anglesRef = useRef(ORBITS.map(o => o.phaseOffset))
  const rafRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const animate = () => {
      ORBITS.forEach((orbit, i) => {
        const circle = circleRefs.current[i]
        if (!circle) return
        anglesRef.current[i] += orbit.speed
        const angle = anglesRef.current[i]
        const rx = container.offsetWidth  * orbit.rxFactor
        const ry = container.offsetHeight * orbit.ryFactor
        const cx = container.offsetWidth  / 2
        const cy = container.offsetHeight / 2
        const x = cx + rx * Math.cos(angle) - orbit.size / 2
        const y = cy + ry * Math.sin(angle) - orbit.size / 2
        circle.style.transform = `translate(${x}px, ${y}px)`
      })
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const fill = isDark ? '#ffffff' : '#0d0d0d'

  return (
    <div ref={containerRef} style={{
      position: 'absolute', inset: 0,
      pointerEvents: 'none', zIndex: 2, overflow: 'hidden',
    }}>
      {ORBITS.map((orbit, i) => (
        <div
          key={i}
          ref={el => circleRefs.current[i] = el}
          style={{
            position: 'absolute', top: 0, left: 0,
            width: orbit.size, height: orbit.size,
            borderRadius: '50%',
            background: fill,
            opacity: isDark ? 0.22 : 0.14,
            willChange: 'transform',
            transition: 'background 0.5s ease, opacity 0.5s ease',
          }}
        />
      ))}
    </div>
  )
}

/* ── Bouncing ball (DVD-style corner bounce) ── */
function BouncingBall({ isDark }) {
  const containerRef = useRef(null)
  const ballRef = useRef(null)
  const stateRef = useRef({
    x: 120, y: 120,
    vx: 2.2, vy: 1.6,
    size: 72,
  })
  const rafRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const ball = ballRef.current
    if (!container || !ball) return

    const animate = () => {
      const s = stateRef.current
      const W = container.offsetWidth
      const H = container.offsetHeight

      s.x += s.vx
      s.y += s.vy

      // Bounce off edges
      if (s.x <= 0) { s.x = 0; s.vx = Math.abs(s.vx) }
      if (s.x >= W - s.size) { s.x = W - s.size; s.vx = -Math.abs(s.vx) }
      if (s.y <= 0) { s.y = 0; s.vy = Math.abs(s.vy) }
      if (s.y >= H - s.size) { s.y = H - s.size; s.vy = -Math.abs(s.vy) }

      ball.style.transform = `translate(${s.x}px, ${s.y}px)`
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const fill = isDark ? '#ffffff' : '#0d0d0d'

  return (
    <div ref={containerRef} style={{
      position: 'absolute', inset: 0,
      pointerEvents: 'none', zIndex: 2, overflow: 'hidden',
    }}>
      <div ref={ballRef} style={{
        position: 'absolute', top: 0, left: 0,
        width: 72, height: 72,
        borderRadius: '50%',
        background: fill,
        opacity: isDark ? 0.10 : 0.08,
        willChange: 'transform',
        transition: 'background 0.5s ease, opacity 0.5s ease',
        /* soft glow */
        boxShadow: isDark
          ? '0 0 40px 12px rgba(255,255,255,0.06)'
          : '0 0 40px 12px rgba(0,0,0,0.05)',
      }} />
    </div>
  )
}


const NoiseSVG = () => (
  <svg
    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.04, zIndex: 1 }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#noise)" />
  </svg>
)

export default function Hero() {
  const roleText = useTypewriter(ROLES)
  const phTime = usePhilippinesClock()
  const { isDark, toggle } = useDarkMode()

  /* rotating accent word */
  const [accentIdx, setAccentIdx] = useState(0)
  const ACCENTS = ['systems.', 'experiences.', 'products.', 'ideas.']
  useEffect(() => {
    const id = setInterval(() => setAccentIdx(i => (i + 1) % ACCENTS.length), 2800)
    return () => clearInterval(id)
  }, [])

  /* letter-stagger for name */
  const NAME = 'EMMANUEL'
  const SURNAME = 'ABLAO'

  const bg   = isDark ? '#0d0d0d' : '#f2f0eb'
  const fg   = isDark ? '#f2f0eb' : '#0d0d0d'
  const acc  = '#c8ff00'           /* signature lime — decorative only */
  const accText = isDark ? '#c8ff00' : fg   /* text uses fg in light mode for readability */
  const muted = isDark ? 'rgba(242,240,235,0.50)' : 'rgba(13,13,13,0.60)'
  const border = isDark ? 'rgba(242,240,235,0.12)' : 'rgba(13,13,13,0.15)'
  const borderStrong = isDark ? 'rgba(242,240,235,0.25)' : 'rgba(13,13,13,0.30)'

  return (
    <section style={{
      background: bg,
      minHeight: '100vh',
      color: fg,
      fontFamily: "'DM Sans', sans-serif",
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
      transition: 'background 0.5s ease, color 0.5s ease',
    }}>

      <NoiseSVG />
      <OrbitingCircles isDark={isDark} />
      <BouncingBall isDark={isDark} />

      {/* ── Large ghost watermark ── */}
      <div aria-hidden="true" className="hero-ghost-watermark" style={{
        position: 'absolute',
        right: '2%',
        top: '20%',
        fontFamily: "'Bebas Neue', 'Impact', sans-serif",
        fontSize: 'clamp(120px, 18vw, 280px)',
        fontWeight: 900,
        color: 'transparent',
        WebkitTextStroke: isDark ? `1px ${borderStrong}` : `1px rgba(13,13,13,0.07)`,
        lineHeight: 0.85,
        userSelect: 'none',
        zIndex: 0,
        pointerEvents: 'none',
        animation: 'ghostDrift 14s ease-in-out infinite alternate',
        maxWidth: '100%',
        overflow: 'hidden',
      }}>
        DEV
      </div>

      {/* ── Horizontal accent rule (top) ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: 3, background: acc, zIndex: 20,
      }} />

      {/* ── Top Bar ── */}
      <nav className="hero-navbar" style={{
        position: 'relative', zIndex: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1.4rem 2rem',
        borderBottom: `0.5px solid ${border}`,
        animation: 'slideDown 0.7s cubic-bezier(0.16,1,0.3,1) both',
      }}>
        {/* Logo + wordmark */}
        <div className="hero-logo-wrap" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', minWidth: 0 }}>
          <img src={logo_nobackground} alt="ESA Logo" style={{
            height: 36, width: 'auto', flexShrink: 0,
            filter: isDark ? 'brightness(1)' : 'brightness(0)',
          }} />
          <span className="hero-wordmark" style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.8rem', letterSpacing: '0.18em',
            color: isDark ? 'rgba(242,240,235,0.55)' : 'rgba(13,13,13,0.65)',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}>
            EABLAO.DEV
          </span>
        </div>

        {/* Status pill + toggle */}
        <div className="hero-nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="hero-status-pill" style={{
            display: 'flex', alignItems: 'center', gap: 7,
            padding: '5px 12px',
            border: `0.5px solid ${borderStrong}`,
            borderRadius: 100,
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: '50%',
              background: acc,
              boxShadow: `0 0 8px ${acc}`,
              animation: 'pulse 2s ease-in-out infinite',
            }} />
            <span className="hero-status-pill-text" style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.67rem', letterSpacing: '0.13em',
              color: isDark ? 'rgba(242,240,235,0.60)' : 'rgba(13,13,13,0.70)',
              whiteSpace: 'nowrap',
            }}>
              AVAILABLE FOR WORK
            </span>
          </div>
          {/* Custom mode toggle — visible in both light and dark */}
          <button
            onClick={() => toggle()}
            aria-label="Toggle dark mode"
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '5px 10px 5px 6px',
              border: `1px solid ${borderStrong}`,
              borderRadius: 100,
              background: isDark ? 'rgba(242,240,235,0.08)' : 'rgba(13,13,13,0.08)',
              cursor: 'pointer',
              transition: 'background 0.2s, border-color 0.2s',
            }}
          >
            {/* Track */}
            <div style={{
              width: 28, height: 16, borderRadius: 8,
              background: isDark ? acc : 'rgba(13,13,13,0.20)',
              position: 'relative',
              transition: 'background 0.3s',
              flexShrink: 0,
            }}>
              <div style={{
                position: 'absolute',
                top: 2, left: isDark ? 14 : 2,
                width: 12, height: 12, borderRadius: '50%',
                background: isDark ? '#0d0d0d' : '#ffffff',
                transition: 'left 0.25s cubic-bezier(0.16,1,0.3,1)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
              }} />
            </div>
            <span style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.62rem', letterSpacing: '0.12em',
              color: isDark ? 'rgba(242,240,235,0.60)' : 'rgba(13,13,13,0.70)',
              userSelect: 'none',
            }}>
              {isDark ? 'DARK' : 'LIGHT'}
            </span>
          </button>
        </div>
      </nav>

      {/* ── Main grid ── */}
      <div className="hero-main-grid" style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: 'auto auto',
        position: 'relative',
        zIndex: 5,
      }}>

        {/* ─ LEFT COLUMN: Big stacked name + tagline ─ */}
        <div className="hero-left-col" style={{
          gridColumn: '1',
          gridRow: '1 / 3',
          padding: 'clamp(2rem, 5vw, 5rem) clamp(1.5rem, 3vw, 3rem)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          borderRight: `0.5px solid ${border}`,
          animation: 'fadeUp 0.9s 0.15s cubic-bezier(0.16,1,0.3,1) both',
        }}>
          {/* Index tag */}
          <div style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.62rem', letterSpacing: '0.25em',
            color: accText, marginBottom: '1.5rem',
            textTransform: 'uppercase',
          }}>
            ↳ PORTFOLIO — 2026
          </div>

          {/* Stacked name */}
          <div style={{ overflow: 'hidden', marginBottom: '0.1rem' }}>
            <h1 style={{
              fontFamily: "'Bebas Neue', 'Impact', sans-serif",
              fontSize: 'clamp(4rem, 9vw, 10rem)',
              fontWeight: 400,
              lineHeight: 0.88,
              letterSpacing: '-0.01em',
              margin: 0,
              color: fg,
              animation: 'riseUp 0.8s 0.3s cubic-bezier(0.16,1,0.3,1) both',
            }}>
              {NAME}
            </h1>
          </div>
          <div style={{ overflow: 'hidden', marginBottom: '2.5rem' }}>
            <h1 style={{
              fontFamily: "'Bebas Neue', 'Impact', sans-serif",
              fontSize: 'clamp(4rem, 9vw, 10rem)',
              fontWeight: 400,
              lineHeight: 0.88,
              letterSpacing: '-0.01em',
              margin: 0,
              /* Outline text for surname */
              color: 'transparent',
              WebkitTextStroke: `2px ${fg}`,
              animation: 'riseUp 0.8s 0.42s cubic-bezier(0.16,1,0.3,1) both',
            }}>
              {SURNAME}
            </h1>
          </div>

          {/* Rotating verb phrase */}
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(1rem, 2vw, 1.4rem)',
              fontWeight: 300,
              lineHeight: 1.5,
              color: muted,
              margin: 0,
            }}>
              I build end-to-end{' '}
              <span style={{
                color: fg, fontWeight: 600,
                borderBottom: `2px solid ${acc}`,
                paddingBottom: 1,
                transition: 'opacity 0.3s ease',
              }}>
                {ACCENTS[accentIdx]}
              </span>
            </p>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(0.85rem, 1.5vw, 1.1rem)',
              fontWeight: 300,
              color: muted,
              margin: '0.6rem 0 0',
              lineHeight: 1.7,
              maxWidth: 420,
            }}>
              From IoT hardware and embedded systems to cross-platform
              apps and web portals — with reliability at the core.
            </p>
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <a
              href="#contact"
              onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
              style={{
                display: 'inline-block',
                background: acc, color: '#0d0d0d',
                fontFamily: "'DM Mono', monospace",
                fontSize: '0.75rem', fontWeight: 700,
                letterSpacing: '0.15em', textTransform: 'uppercase',
                padding: '14px 32px', borderRadius: 0,
                border: 'none', textDecoration: 'none',
                transition: 'transform 0.18s, box-shadow 0.18s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-3px, -3px)'; e.currentTarget.style.boxShadow = `4px 4px 0 ${fg}` }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translate(0,0)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              Let's Work →
            </a>

            <a
              href="#projects"
              onClick={e => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) }}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '0.72rem', letterSpacing: '0.14em',
                color: muted, textDecoration: 'none',
                borderBottom: `1px solid ${borderStrong}`,
                paddingBottom: 2,
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = fg}
              onMouseLeave={e => e.currentTarget.style.color = muted}
            >
              See work ↓
            </a>
          </div>
        </div>

        {/* ─ RIGHT TOP: Role typewriter + metadata grid ─ */}
        <div className="hero-right-top" style={{
          gridColumn: '2',
          gridRow: '1',
          padding: 'clamp(2rem, 5vw, 5rem) clamp(1.5rem, 3vw, 3rem) 2rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          borderBottom: `0.5px solid ${border}`,
          animation: 'fadeUp 0.9s 0.3s cubic-bezier(0.16,1,0.3,1) both',
          minWidth: 0,
        }}>
          {/* Discipline display */}
          <div style={{
            fontFamily: "'Bebas Neue', 'Impact', sans-serif",
            fontSize: 'clamp(1.8rem, 3.5vw, 3.6rem)',
            lineHeight: 1.05,
            letterSpacing: '0.02em',
            color: fg,
            marginBottom: '0.25rem',
            wordBreak: 'break-word',
          }}>
            {roleText}
            <span style={{
              display: 'inline-block',
              width: 3, height: '0.8em',
              background: acc,
              marginLeft: 4,
              verticalAlign: 'middle',
              animation: 'blink 1s step-end infinite',
            }} />
          </div>

          <div style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.67rem', letterSpacing: '0.2em',
            color: isDark ? 'rgba(242,240,235,0.50)' : 'rgba(13,13,13,0.55)',
            textTransform: 'uppercase',
          }}>
            Current discipline
          </div>
        </div>

        {/* ─ RIGHT BOTTOM: Info grid ─ */}
        <div className="hero-info-grid" style={{
          gridColumn: '2',
          gridRow: '2',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr 1fr',
          animation: 'fadeUp 0.9s 0.45s cubic-bezier(0.16,1,0.3,1) both',
          minWidth: 0,
        }}>
          {/* Cell: Location */}
          <InfoCell
            label="BASED IN"
            value="Pililla, Rizal"
            sub="Philippines 🇵🇭"
            border={border} muted={muted} fg={fg} acc={acc} accText={accText}
            pos="tl"
          />
          {/* Cell: Clock */}
          <InfoCell
            label="LOCAL TIME"
            value={phTime}
            sub="Asia / Manila"
            border={border} muted={muted} fg={fg} acc={acc} accText={accText}
            pos="tr" mono
          />
          {/* Cell: Stack */}
          <InfoCell
            label="CORE STACK"
            value="React · PHP · ESP32"
            sub="+ IoT / Mobile / SQL"
            border={border} muted={muted} fg={fg} acc={acc} accText={accText}
            pos="bl"
          />
          {/* Cell: Status */}
          <InfoCell
            label="STATUS"
            value="Open to Remote"
            sub="IT Specialist @ JJC Eng."
            border={border} muted={muted} fg={fg} acc={acc} accText={accText}
            pos="br"
          />
        </div>
      </div>

      {/* ── Bottom strip ── */}
      <div className="hero-bottom-strip" style={{
        position: 'relative', zIndex: 10,
        borderTop: `0.5px solid ${border}`,
        padding: '0.85rem 2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        animation: 'slideUp 0.7s 0.6s cubic-bezier(0.16,1,0.3,1) both',
      }}>
        <div className="hero-social-links" style={{
          display: 'flex', gap: '2rem', alignItems: 'center',
        }}>
          {['GitHub', 'LinkedIn', 'Email'].map((link, i) => (
            <a key={i} href="#" style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.64rem', letterSpacing: '0.18em',
              color: isDark ? 'rgba(242,240,235,0.50)' : 'rgba(13,13,13,0.60)',
              textDecoration: 'none', textTransform: 'uppercase',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.color = acc}
              onMouseLeave={e => e.currentTarget.style.color = muted}
            >
              {link}
            </a>
          ))}
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          animation: 'scrollBounce 2.5s ease-in-out 1.2s infinite',
        }}>
          <span style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.62rem', letterSpacing: '0.2em',
            color: isDark ? 'rgba(242,240,235,0.45)' : 'rgba(13,13,13,0.55)',
            textTransform: 'uppercase',
          }}>
            Scroll
          </span>
          <div style={{
            width: 0, height: 0,
            borderLeft: '4px solid transparent',
            borderRight: '4px solid transparent',
            borderTop: `6px solid ${isDark ? 'rgba(242,240,235,0.45)' : 'rgba(13,13,13,0.55)'}`,
          }} />
        </div>
      </div>

      {/* ── Accent corner decoration ── */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        bottom: 50, left: 'calc(50% - 1px)',
        width: 1, height: '30vh',
        background: `linear-gradient(to bottom, ${border}, transparent)`,
        zIndex: 3,
        pointerEvents: 'none',
      }} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;600;700&family=DM+Mono:wght@400;500&display=swap');

        @keyframes slideDown   { from{opacity:0;transform:translateY(-16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideUp     { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeUp      { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes riseUp      { from{opacity:0;transform:translateY(60px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse       { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(0.85)} }
        @keyframes blink       { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes ghostDrift  { from{transform:translateY(0) rotate(-1deg)} to{transform:translateY(-30px) rotate(1deg)} }
        @keyframes scrollBounce{ 0%,100%{transform:translateY(0)} 50%{transform:translateY(5px)} }

        @media (max-width: 768px) {
          .hero-main-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto !important;
          }
          .hero-left-col {
            grid-column: 1 !important;
            grid-row: auto !important;
            border-right: none !important;
            padding: 2.5rem 1.25rem 2rem !important;
          }
          .hero-right-top {
            grid-column: 1 !important;
            grid-row: auto !important;
            padding: 1.75rem 1.25rem 1.5rem !important;
          }
          .hero-info-grid {
            grid-column: 1 !important;
            grid-row: auto !important;
          }
          .hero-ghost-watermark {
            font-size: clamp(70px, 22vw, 140px) !important;
            right: 4% !important;
            top: 8% !important;
          }
          .hero-navbar {
            padding: 1rem 1.25rem !important;
            flex-wrap: wrap !important;
            row-gap: 0.75rem !important;
          }
          .hero-wordmark {
            font-size: 0.66rem !important;
            letter-spacing: 0.1em !important;
          }
          .hero-nav-actions {
            gap: 0.6rem !important;
          }
          .hero-status-pill {
            padding: 5px 9px !important;
          }
          .hero-status-pill-text {
            font-size: 0.56rem !important;
            letter-spacing: 0.08em !important;
          }
          .hero-bottom-strip {
            padding: 0.85rem 1.25rem !important;
            flex-wrap: wrap !important;
            gap: 0.75rem !important;
          }
          .hero-social-links {
            gap: 1.1rem !important;
          }
        }

        @media (max-width: 420px) {
          .hero-status-pill-text {
            display: none !important;
          }
          .hero-info-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: none !important;
          }
          .hero-info-grid > div {
            border-left: none !important;
          }
        }
      `}</style>
    </section>
  )
}

/* ── Info cell sub-component ── */
function InfoCell({ label, value, sub, border, muted, fg, acc, accText, pos, mono }) {
  const isRight = pos?.includes('r')
  const isBottom = pos?.includes('b')
  return (
    <div style={{
      padding: 'clamp(1.2rem, 2.5vw, 2rem) clamp(1.2rem, 2.5vw, 2rem)',
      borderTop: isBottom ? `0.5px solid ${border}` : 'none',
      borderLeft: isRight ? `0.5px solid ${border}` : 'none',
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      transition: 'background 0.2s',
      minWidth: 0,
      overflow: 'hidden',
    }}
      onMouseEnter={e => e.currentTarget.style.background = `rgba(200,255,0,0.04)`}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      <div style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: '0.58rem', letterSpacing: '0.22em',
        color: accText, textTransform: 'uppercase',
        marginBottom: '0.5rem',
      }}>
        {label}
      </div>
      <div style={{
        fontFamily: mono ? "'DM Mono', monospace" : "'DM Sans', sans-serif",
        fontSize: mono ? 'clamp(0.78rem, 1.5vw, 1.1rem)' : 'clamp(0.9rem, 1.8vw, 1.25rem)',
        fontWeight: 600,
        color: fg,
        lineHeight: 1.2,
        letterSpacing: mono ? '0.05em' : 0,
        marginBottom: '0.2rem',
        whiteSpace: mono ? 'nowrap' : 'normal',
        overflow: mono ? 'hidden' : 'visible',
        textOverflow: mono ? 'clip' : 'unset',
      }}>
        {value}
      </div>
      <div style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: '0.64rem', letterSpacing: '0.1em',
        color: muted,
        opacity: 1,
      }}>
        {sub}
      </div>
    </div>
  )
}