import { useEffect, useRef, useState, useCallback } from 'react'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'

// ─── Loading Screen ────────────────────────────────────────────────────────────
function LoadingScreen({ onDone }) {
  const [phase, setPhase] = useState('enter')
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 80)
    const holdTimer = setTimeout(() => { setPhase('exit'); clearInterval(interval) }, 2800)
    const doneTimer = setTimeout(() => { setPhase('done'); onDone() }, 3500)
    return () => { clearTimeout(holdTimer); clearTimeout(doneTimer); clearInterval(interval) }
  }, [onDone])

  if (phase === 'done') return null

  // Glitch offset values cycling through tick
  const glitchX  = [0, -3, 4, -2, 0, 3, -4, 0][tick % 8]
  const glitchX2 = [0, 4, -3, 0, 2, -4, 3, 0][tick % 8]
  const showGlitch = tick % 12 < 2

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 99999, display: 'flex', pointerEvents: 'none' }}>
      {/* Panel wipe strips */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} style={{
          flex: 1,
          background: i % 2 === 0 ? '#0a0a0a' : '#111',
          transform: phase === 'exit' ? 'translateY(-100%)' : 'translateY(0)',
          transition: 'transform 0.65s cubic-bezier(0.76,0,0.24,1)',
          transitionDelay: `${i * 0.06}s`,
          willChange: 'transform',
        }} />
      ))}

      {/* Center stage */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: phase === 'exit' ? 0 : 1,
        transition: 'opacity 0.35s ease',
      }}>
        <div style={{ position: 'relative', textAlign: 'center' }}>

          {/* ── Orbit ring ── */}
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            width: 260, height: 260,
            marginLeft: -130, marginTop: -130,
            border: '1px solid rgba(0,229,160,0.08)',
            borderRadius: '50%',
            animation: 'orbitSpin 12s linear infinite',
          }}>
            {/* Orbiting dot */}
            <div style={{
              position: 'absolute', top: -4, left: '50%', marginLeft: -4,
              width: 8, height: 8, borderRadius: '50%',
              background: '#00E5A0',
              boxShadow: '0 0 12px 4px rgba(0,229,160,0.6)',
            }} />
          </div>
          {/* Second orbit ring — counter rotate */}
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            width: 310, height: 310,
            marginLeft: -155, marginTop: -155,
            border: '1px solid rgba(0,229,160,0.04)',
            borderRadius: '50%',
            animation: 'orbitSpin 20s linear infinite reverse',
          }}>
            <div style={{
              position: 'absolute', top: -3, left: '50%', marginLeft: -3,
              width: 6, height: 6, borderRadius: '50%',
              background: 'rgba(255,255,255,0.4)',
              boxShadow: '0 0 8px 2px rgba(255,255,255,0.2)',
            }} />
          </div>

          {/* ── Main wordmark ── */}
          <div style={{ position: 'relative', display: 'inline-block', lineHeight: 1 }}>

            {/* Ghost / glitch layer 1 */}
            {showGlitch && (
              <div aria-hidden style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'baseline', justifyContent: 'center',
                transform: `translateX(${glitchX}px)`,
                clipPath: 'inset(30% 0 40% 0)',
                opacity: 0.6,
                mixBlendMode: 'screen',
                pointerEvents: 'none',
              }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 'clamp(2rem, 6vw, 3.6rem)', color: '#ff3366', letterSpacing: '-0.02em', fontWeight: 400 }}>e</span>
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(5rem, 14vw, 11rem)', color: '#ff3366', lineHeight: 0.85, letterSpacing: '0.01em' }}>Ablao</span>
              </div>
            )}
            {/* Ghost / glitch layer 2 */}
            {showGlitch && (
              <div aria-hidden style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'baseline', justifyContent: 'center',
                transform: `translateX(${glitchX2}px)`,
                clipPath: 'inset(55% 0 10% 0)',
                opacity: 0.5,
                mixBlendMode: 'screen',
                pointerEvents: 'none',
              }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 'clamp(2rem, 6vw, 3.6rem)', color: '#00aaff', letterSpacing: '-0.02em', fontWeight: 400 }}>e</span>
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(5rem, 14vw, 11rem)', color: '#00aaff', lineHeight: 0.85, letterSpacing: '0.01em' }}>Ablao</span>
              </div>
            )}

            {/* Real wordmark */}
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', position: 'relative' }}>
              {/* lowercase e — accent, mono */}
              <span style={{
                fontFamily: "'DM Mono', monospace",
                fontWeight: 400,
                fontSize: 'clamp(2rem, 6vw, 3.6rem)',
                color: '#00E5A0',
                letterSpacing: '-0.02em',
                animation: 'ePulse 2.4s ease-in-out infinite',
                display: 'inline-block',
              }}>e</span>
              {/* ABLAO — large Bebas */}
              {'Ablao'.split('').map((char, i) => (
                <span key={i} style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(5rem, 14vw, 11rem)',
                  color: '#f5f3ee',
                  lineHeight: 0.85,
                  letterSpacing: '0.01em',
                  display: 'inline-block',
                  animation: `letterFloat 2s ease-in-out infinite`,
                  animationDelay: `${i * 0.1}s`,
                }}>
                  {char}
                </span>
              ))}
            </div>
          </div>

          {/* ── Scan line that sweeps across the whole wordmark ── */}
          <div style={{
            position: 'absolute',
            top: 0, bottom: 0,
            left: 0, right: 0,
            overflow: 'hidden',
            pointerEvents: 'none',
          }}>
            <div style={{
              position: 'absolute',
              top: 0, bottom: 0,
              width: 2,
              background: 'linear-gradient(to bottom, transparent, rgba(0,229,160,0.7) 40%, rgba(0,229,160,0.7) 60%, transparent)',
              animation: 'scanAcross 1.6s cubic-bezier(0.4,0,0.6,1) infinite',
              boxShadow: '0 0 16px 6px rgba(0,229,160,0.25)',
            }} />
          </div>

          {/* ── Tag line ── */}
          <div style={{
            marginTop: '1.8rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
            animation: 'fadeInUp 0.6s ease forwards',
            animationDelay: '0.3s',
            opacity: 0,
          }}>
            <div style={{ height: 1, width: 28, background: 'rgba(0,229,160,0.4)' }} />
            <span style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.65rem',
              letterSpacing: '0.3em',
              color: 'rgba(255,255,255,0.3)',
              textTransform: 'uppercase',
            }}>
              Full Stack Developer
            </span>
            <div style={{ height: 1, width: 28, background: 'rgba(0,229,160,0.4)' }} />
          </div>

          {/* ── Progress bar ── */}
          <div style={{
            marginTop: '1.2rem',
            height: 1,
            background: 'rgba(255,255,255,0.07)',
            overflow: 'hidden',
            width: '100%',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to right, transparent, #00E5A0, transparent)',
              animation: 'shimmer 1.4s ease-in-out infinite',
            }} />
            <div style={{
              height: '100%',
              background: '#00E5A0',
              animation: 'loadBar 2.4s cubic-bezier(0.16,1,0.3,1) forwards',
              boxShadow: '0 0 8px rgba(0,229,160,0.8)',
            }} />
          </div>

          {/* ── Corner brackets ── */}
          {[
            { top: -16, left: -16, borderTop: '1.5px solid', borderLeft: '1.5px solid' },
            { top: -16, right: -16, borderTop: '1.5px solid', borderRight: '1.5px solid' },
            { bottom: -10, left: -16, borderBottom: '1.5px solid', borderLeft: '1.5px solid' },
            { bottom: -10, right: -16, borderBottom: '1.5px solid', borderRight: '1.5px solid' },
          ].map((s, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: 16, height: 16,
              borderColor: 'rgba(0,229,160,0.5)',
              animation: `bracketIn 0.5s ease forwards`,
              animationDelay: `${0.1 + i * 0.08}s`,
              opacity: 0,
              ...s,
            }} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes loadBar {
          from { width: 0%; }
          to   { width: 100%; }
        }
        @keyframes orbitSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes letterFloat {
          0%,100% { transform: translateY(0px); }
          50%     { transform: translateY(-5px); }
        }
        @keyframes ePulse {
          0%,100% { color: #00E5A0; text-shadow: 0 0 0px transparent; }
          50%     { color: #00ffa8; text-shadow: 0 0 24px rgba(0,229,160,0.8); }
        }
        @keyframes scanAcross {
          0%   { left: -2%; opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { left: 102%; opacity: 0; }
        }
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes bracketIn {
          from { opacity: 0; transform: scale(0.6); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  )
}

// ─── Section definitions ───────────────────────────────────────────────────────
const SECTIONS = [
  { id: 'hero',     label: 'Home',     number: '00', bg: '#0a0a0a',  tabBg: '#161616' },
  { id: 'about',    label: 'About',    number: '01', bg: '#f5f3ee',  tabBg: '#eceae4' },
  { id: 'skills',   label: 'Skills',   number: '02', bg: '#0a0a0a',  tabBg: '#161616' },
  { id: 'projects', label: 'Projects', number: '03', bg: '#f5f3ee',  tabBg: '#eceae4' },
  { id: 'contact',  label: 'Contact',  number: '04', bg: '#0a0a0a',  tabBg: '#161616' },
]

// ─── Vertical Right Nav (with integrated BackToTop) ───────────────────────────
function VerticalNav({ activeIndex, onNavigate, scrolled, showBackToTop }) {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [hovered, setHovered] = useState(false)

  return (
    <div style={{
      position: 'fixed',
      right: '2.2rem',
      top: '50%',
      transform: scrolled ? 'translateY(-50%) translateX(0)' : 'translateY(-50%) translateX(120%)',
      zIndex: 6000,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '2px',
      opacity: scrolled ? 1 : 0,
      pointerEvents: scrolled ? 'auto' : 'none',
      transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease',
    }}>
      {SECTIONS.map((section, i) => {
        const isActive = activeIndex === i
        const isHovered = hoveredIndex === i

        return (
          <button
            key={section.id}
            data-hover
            onClick={() => onNavigate(i)}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            aria-label={`Go to ${section.label}`}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '6px 0',
            }}
          >
            {/* Label pill */}
            <span style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.72rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: isActive ? '#00E5A0' : isHovered ? '#f5f3ee' : 'rgba(255,255,255,0.55)',
              opacity: isActive || isHovered ? 1 : 0.7,
              transform: isActive || isHovered ? 'translateX(0)' : 'translateX(4px)',
              transition: 'color 0.2s ease, opacity 0.2s ease, transform 0.25s ease',
              whiteSpace: 'nowrap',
              textShadow: '0 1px 8px rgba(0,0,0,0.9)',
              background: isActive
                ? 'rgba(0,229,160,0.12)'
                : isHovered
                ? 'rgba(255,255,255,0.08)'
                : 'rgba(0,0,0,0.45)',
              padding: '3px 10px',
              borderRadius: '100px',
              backdropFilter: 'blur(6px)',
              border: isActive
                ? '1px solid rgba(0,229,160,0.3)'
                : '1px solid rgba(255,255,255,0.06)',
            }}>
              <span style={{ color: isActive ? '#00E5A0' : 'rgba(255,255,255,0.35)', marginRight: 5, fontSize: '0.6rem' }}>
                {section.number}
              </span>
              {section.label}
            </span>

            {/* Indicator: line + dot */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 0, flexShrink: 0 }}>
              <div style={{
                height: '1.5px',
                background: isActive ? '#00E5A0' : isHovered ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.2)',
                width: isActive ? 28 : isHovered ? 16 : 10,
                transition: 'width 0.3s cubic-bezier(0.16,1,0.3,1), background 0.2s ease',
                borderRadius: 2,
              }} />
              <div style={{
                width: isActive ? 10 : isHovered ? 8 : 6,
                height: isActive ? 10 : isHovered ? 8 : 6,
                borderRadius: '50%',
                background: isActive ? '#00E5A0' : isHovered ? '#f5f3ee' : 'rgba(255,255,255,0.3)',
                border: isActive ? '2px solid rgba(0,229,160,0.3)' : '1.5px solid rgba(255,255,255,0.15)',
                transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
                flexShrink: 0,
                marginLeft: 4,
                boxShadow: isActive ? '0 0 8px rgba(0,229,160,0.5)' : 'none',
              }} />
            </div>
          </button>
        )
      })}

      {/* Back to Top — grouped below nav items */}
      <div style={{
        marginTop: '10px',
        paddingTop: '10px',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        justifyContent: 'flex-end',
        opacity: showBackToTop ? 1 : 0,
        transform: showBackToTop ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.85)',
        transition: 'opacity 0.35s ease, transform 0.35s cubic-bezier(0.16,1,0.3,1)',
        pointerEvents: showBackToTop ? 'auto' : 'none',
      }}>
        <button
          data-hover
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          aria-label="Back to top"
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            border: `1.5px solid ${hovered ? '#00E5A0' : 'rgba(255,255,255,0.18)'}`,
            background: hovered ? '#00E5A0' : 'rgba(10,10,10,0.75)',
            backdropFilter: 'blur(12px)',
            color: hovered ? '#0a0a0a' : 'rgba(255,255,255,0.65)',
            cursor: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'border-color 0.2s, background 0.2s, color 0.2s',
            boxShadow: hovered ? '0 0 16px rgba(0,229,160,0.35)' : '0 2px 16px rgba(0,0,0,0.4)',
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            style={{ transform: hovered ? 'translateY(-1px)' : 'none', transition: 'transform 0.2s ease' }}>
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}

// ─── Folder Tab ────────────────────────────────────────────────────────────────
function FolderTab({ number, label, tabBg, isDark }) {
  const textColor = isDark ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.6)'
  const numColor  = isDark ? 'rgba(255,255,255,0.3)'  : 'rgba(0,0,0,0.3)'
  const divColor  = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'
  const borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: '3rem',
        zIndex: 10,
        pointerEvents: 'none',
        transform: 'translateY(-100%)',
        display: 'flex',
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '9px 20px 11px',
        background: tabBg,
        borderRadius: '8px 8px 0 0',
        border: `1px solid ${borderColor}`,
        borderBottom: 'none',
        boxShadow: isDark
          ? 'inset 0 1px 0 rgba(255,255,255,0.06)'
          : 'inset 0 1px 0 rgba(255,255,255,0.8)',
      }}>
        {/* Number */}
        <span style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: '0.68rem',
          letterSpacing: '0.12em',
          color: numColor,
          textTransform: 'uppercase',
        }}>
          {number}
        </span>

        {/* Divider */}
        <div style={{ width: 1, height: 14, background: divColor }} />

        {/* Label */}
        <span style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: '0.75rem',
          letterSpacing: '0.14em',
          color: textColor,
          textTransform: 'uppercase',
          fontWeight: 500,
        }}>
          {label}
        </span>

        {/* Accent dot */}
        <div style={{
          width: 5,
          height: 5,
          borderRadius: '50%',
          background: '#00E5A0',
          opacity: 0.85,
          flexShrink: 0,
        }} />
      </div>
    </div>
  )
}

// ─── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const blobRef = useRef(null)
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const current = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const rafId = useRef(null)
  const scrollRafId = useRef(null)
  const cardRefs = useRef([])
  const cardOffsets = useRef([]) // absolute document Y for each card, computed at layout

  const [loadingDone, setLoadingDone] = useState(false)
  const [wiped, setWiped] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [navVisible, setNavVisible] = useState(false)
  const navIdleTimer = useRef(null)

  const setCardRef = (i) => (el) => { cardRefs.current[i] = el }

  // Compute scroll targets by summing scrollHeight of each card's INNER content div.
  // We CANNOT use offsetTop on sticky elements — they report 0 when stuck.
  // The true scroll position for card N is the sum of heights of cards 0..N-1.
  const computeOffsets = useCallback(() => {
    let cumulative = 0
    cardOffsets.current = cardRefs.current.map((card) => {
      const pos = cumulative
      if (card) {
        // Use the inner content div (first child) scrollHeight so we get the
        // full rendered height regardless of sticky transform
        const inner = card.querySelector('[data-card-inner]') || card
        cumulative += inner.scrollHeight
      }
      return pos
    })
  }, [])

  const handleLoadingDone = useCallback(() => {
    setLoadingDone(true)
    requestAnimationFrame(() => setTimeout(() => {
      setWiped(true)
      setTimeout(computeOffsets, 300)
    }, 60))
  }, [computeOffsets])

  const navigateToSection = useCallback((index) => {
    // Always recompute fresh — layout may have shifted
    computeOffsets()
    const offset = cardOffsets.current[index] ?? 0
    window.scrollTo({ top: offset, behavior: 'smooth' })
  }, [computeOffsets])

  // ── Global scroll-reveal re-trigger ─────────────────────────────────────────
  useEffect(() => {
    if (!loadingDone) return
    const timeout = setTimeout(() => {
      const els = document.querySelectorAll('.reveal')
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add('visible')
            else entry.target.classList.remove('visible')
          })
        },
        { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
      )
      els.forEach((el) => observer.observe(el))
      return () => observer.disconnect()
    }, 150)
    return () => clearTimeout(timeout)
  }, [loadingDone])

  // ── Active section tracking via scroll position vs section tops ─────────────
  // We read the real <section> element tops on every scroll tick.
  // These are NOT sticky so their getBoundingClientRect is always accurate.
  useEffect(() => {
    if (!loadingDone) return

    const getActive = () => {
      let active = 0
      SECTIONS.forEach((section, i) => {
        const el = section.id === 'hero'
          ? cardRefs.current[0]?.querySelector('section') || cardRefs.current[0]
          : document.getElementById(section.id)
        if (!el) return
        // If the top of this section is still above 55% viewport height, it's the current one
        const top = el.getBoundingClientRect().top
        if (top <= window.innerHeight * 0.55) active = i
      })
      return active
    }

    const onScroll = () => setActiveIndex(getActive())

    const timer = setTimeout(() => {
      setActiveIndex(getActive())
      window.addEventListener('scroll', onScroll, { passive: true })
    }, 600)

    return () => { clearTimeout(timer); window.removeEventListener('scroll', onScroll) }
  }, [loadingDone])

  // ── Stacked card visual effect + scroll/nav visibility ───────────────────────
  useEffect(() => {
    if (!loadingDone) return

    const SCALE_STEP = 0.025
    const PEEK_GAP = 8

    const updateCards = () => {
      const scrollY = window.scrollY
      const vh = window.innerHeight
      const cards = cardRefs.current

      // Visual stacking — getBoundingClientRect is fine for transforms (not for position)
      const stuckFlags = cards.map(card => {
        if (!card) return false
        return card.getBoundingClientRect().top <= 1
      })

      cards.forEach((card, i) => {
        if (!card) return
        const cardTop = card.getBoundingClientRect().top

        if (stuckFlags[i]) {
          let cardsAbove = 0
          for (let j = i + 1; j < cards.length; j++) {
            if (stuckFlags[j]) cardsAbove++
          }
          const scale = Math.max(0.82, 1 - cardsAbove * SCALE_STEP)
          const peekY = cardsAbove * PEEK_GAP
          const brightness = Math.max(0.5, 1 - cardsAbove * 0.07)
          const radius = Math.min(cardsAbove * 12, 32)
          card.style.transform = `translateY(${peekY}px) scale(${scale})`
          card.style.filter = cardsAbove > 0 ? `brightness(${brightness})` : 'brightness(1)'
          card.style.borderRadius = i > 0 && cardsAbove > 0
            ? `${radius}px ${radius}px 32px 32px`
            : i > 0 ? '20px 20px 32px 32px' : '0'
        } else {
          const progress = Math.max(0, Math.min(1, 1 - cardTop / vh))
          const slideY = (1 - progress) * 80
          const entryScale = 0.96 + progress * 0.04
          card.style.transform = `translateY(${slideY}px) scale(${entryScale})`
          card.style.filter = 'brightness(1)'
          card.style.borderRadius = i > 0 ? '20px 20px 32px 32px' : '0'
        }
      })

      setShowBackToTop(scrollY > 300)
      setNavVisible(true)
      clearTimeout(navIdleTimer.current)
      navIdleTimer.current = setTimeout(() => setNavVisible(false), 2500)
    }

    const onScroll = () => {
      cancelAnimationFrame(scrollRafId.current)
      scrollRafId.current = requestAnimationFrame(updateCards)
    }

    const initTimer = setTimeout(() => {
      updateCards()
      window.addEventListener('scroll', onScroll, { passive: true })
    }, 400)

    return () => {
      clearTimeout(initTimer)
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(scrollRafId.current)
    }
  }, [loadingDone])

  // ── Recompute card offsets on resize ────────────────────────────────────────
  useEffect(() => {
    if (!loadingDone) return
    window.addEventListener('resize', computeOffsets)
    return () => window.removeEventListener('resize', computeOffsets)
  }, [loadingDone, computeOffsets])

  // ── Right-edge hover to reveal nav ──────────────────────────────────────────
  useEffect(() => {
    const onMouseMove = (e) => {
      if (e.clientX >= window.innerWidth - 80) {
        setNavVisible(true)
        clearTimeout(navIdleTimer.current)
        navIdleTimer.current = setTimeout(() => setNavVisible(false), 2000)
      }
    }
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  // ── Cursor blob ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const onMove = (e) => { pos.current.x = e.clientX; pos.current.y = e.clientY }
    const onDown = () => blobRef.current?.classList.add('clicking')
    const onUp = () => blobRef.current?.classList.remove('clicking')
    const onEnter = () => blobRef.current?.classList.add('hovering')
    const onLeave = () => blobRef.current?.classList.remove('hovering')

    const tick = () => {
      current.current.x += (pos.current.x - current.current.x) * 0.12
      current.current.y += (pos.current.y - current.current.y) * 0.12
      if (blobRef.current) {
        blobRef.current.style.left = `${current.current.x}px`
        blobRef.current.style.top = `${current.current.y}px`
      }
      rafId.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    const attachHover = () => {
      document.querySelectorAll('a, button, [data-hover]').forEach((el) => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }
    attachHover()
    const mo = new MutationObserver(attachHover)
    mo.observe(document.body, { childList: true, subtree: true })
    rafId.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      cancelAnimationFrame(rafId.current)
      mo.disconnect()
    }
  }, [])

  const sectionComponents = [<Hero />, <About />, <Skills />, <Projects />, <Contact />]

  return (
    <>
      <LoadingScreen onDone={handleLoadingDone} />
      <div className={`page-wipe${wiped ? ' wiped' : ''}`} />
      <div ref={blobRef} className="cursor-blob" />

      <VerticalNav activeIndex={activeIndex} onNavigate={navigateToSection} scrolled={navVisible} showBackToTop={showBackToTop} />

      {/* No top Navbar — removed */}

      <main>
        {SECTIONS.map((section, i) => (
          <div
            key={section.id}
            ref={setCardRef(i)}
            data-stack-card={i}
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 10 + i,
              transformOrigin: 'top center',
              willChange: 'transform, filter, border-radius',
              overflow: 'visible',
              borderRadius: i > 0 ? '20px 20px 32px 32px' : 0,
            }}
          >
            {/* Folder tab — all except hero */}
            {i > 0 && (
              <FolderTab
                number={section.number}
                label={section.label}
                tabBg={section.tabBg}
                isDark={section.bg === '#0a0a0a'}
              />
            )}

            {/* Content — clipped separately so tab isn't clipped */}
            <div data-card-inner style={{ overflow: 'hidden', borderRadius: 'inherit' }}>
              {sectionComponents[i]}
            </div>
          </div>
        ))}
      </main>

      <style>{`
        @keyframes loadBar {
          from { transform: scaleX(0); transform-origin: left; }
          to   { transform: scaleX(1); transform-origin: left; }
        }

        [data-stack-card] {
          transition:
            transform 0.22s cubic-bezier(0.25, 0.46, 0.45, 0.94),
            filter 0.28s ease,
            border-radius 0.35s ease;
        }
      `}</style>
    </>
  )
}