import { useEffect, useRef, useState, useCallback } from 'react'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects, { projectsList } from './components/Projects'
import Resume from './components/Resume'
import Contact from './components/Contact'
import { useDarkMode } from './DarkModeContext'

// ─── Loading Screen ────────────────────────────────────────────────────────────
function LoadingScreen({ onDone }) {
  const [phase, setPhase]       = useState('beat')
  const [progress, setProgress] = useState(0)
  const row1Ref  = useRef(null)
  const row2Ref  = useRef(null)
  const row3Ref  = useRef(null)
  const rafRef   = useRef(null)
  const xRef     = useRef([0, 0, 0])
  const widthRef = useRef([0, 0, 0])
  const beatRef  = useRef({ last: 0, interval: 500, bpm: 120 })
  const phaseRef = useRef('beat')

  const DURATION = 3800

  const doBeat = useCallback(() => {
    const rows = [row1Ref.current, row2Ref.current, row3Ref.current]
    rows.forEach(row => {
      if (!row) return
      row.querySelectorAll('.ls-word').forEach(w => {
        if (Math.random() < 0.3) {
          w.classList.add('ls-hit')
          setTimeout(() => w.classList.remove('ls-hit'), 220)
        }
      })
    })
  }, [])

  useEffect(() => {
    const measure = () => {
      ;[row1Ref, row2Ref, row3Ref].forEach((ref, i) => {
        if (ref.current) {
          const inner = ref.current.querySelector('.ls-inner')
          if (inner) widthRef.current[i] = inner.scrollWidth / 3
        }
      })
    }
    const mTimer = setTimeout(measure, 60)
    const startTime = Date.now()
    beatRef.current.last = performance.now()

    const SPEEDS = [1.6, 1.1, 2.0]
    const DIRS   = [1, -1, 1]

    const tick = (now) => {
      if (phaseRef.current !== 'beat') return
      const elapsed = Date.now() - startTime
      setProgress(Math.min(100, (elapsed / DURATION) * 100))
      const speedMult = 1 + (elapsed / DURATION) * 2.2

      ;[row1Ref, row2Ref, row3Ref].forEach((ref, i) => {
        if (!ref.current) return
        const inner = ref.current.querySelector('.ls-inner')
        if (!inner || !widthRef.current[i]) return
        xRef.current[i] += DIRS[i] * SPEEDS[i] * speedMult
        if (DIRS[i] === 1  && xRef.current[i] > 0)                    xRef.current[i] -= widthRef.current[i]
        if (DIRS[i] === -1 && xRef.current[i] < -widthRef.current[i]) xRef.current[i] += widthRef.current[i]
        inner.style.transform = `translateX(${xRef.current[i]}px)`
      })

      const beat = beatRef.current
      if (now - beat.last >= beat.interval) {
        beat.last = now
        doBeat()
        beat.bpm = 100 + Math.sin(elapsed / 900) * 18 + (elapsed / DURATION) * 55
        beat.interval = 60000 / Math.max(55, beat.bpm)
      }

      if (elapsed >= DURATION) {
        phaseRef.current = 'zoomOut'
        setPhase('zoomOut')
        setTimeout(() => {
          phaseRef.current = 'done'
          setPhase('done')
          onDone()
        }, 800)
        return
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(rafRef.current); clearTimeout(mTimer) }
  }, [onDone, doBeat])

  if (phase === 'done') return null

  const ROWS = [
    { ref: row1Ref, words: ['EMMANUEL', '·', 'ABLAO', '·', 'DEV', '·', 'EMMANUEL', '·', 'ABLAO', '·', 'DEV', '·'],         colors: ['light','accent','light','muted','accent','muted','light','accent','light','muted','accent','muted'] },
    { ref: row2Ref, words: ['LOADING', '·', 'LOADING', '·', 'LOADING', '·', 'LOADING', '·', 'LOADING', '·'],       colors: ['dim','muted','dim','muted','dim','muted','dim','muted','dim','muted'] },
    { ref: row3Ref, words: ['IOT', '·', 'PHP', '·', 'FULLSTOCK', '·', 'DEVELOPER', '·', 'REACT', '·', 'TAILWIND', '·'], colors: ['light','accent','dim','accent','light','accent','dim','accent','light','accent','dim','accent'] },
  ]

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      pointerEvents: 'none', overflow: 'hidden',
      background: phase === 'zoomOut' ? 'transparent' : '#0a0a0a',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'flex-start', justifyContent: 'center',
        opacity: phase === 'zoomOut' ? 0 : 1,
        transition: 'opacity 0.15s ease',
      }}>
        {ROWS.map((row, ri) => (
          <div key={ri} ref={row.ref} style={{ width: '100%', overflow: 'hidden', lineHeight: ri === 1 ? 1.05 : 0.88 }}>
            <div className="ls-inner" style={{ display: 'inline-flex', whiteSpace: 'nowrap', willChange: 'transform' }}>
              {[0, 1, 2].map(rep =>
                row.words.map((word, wi) => (
                  <span
                    key={`${rep}-${wi}`}
                    className="ls-word"
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: ri === 1 ? 'clamp(32px, 9vw, 88px)' : 'clamp(44px, 13vw, 130px)',
                      letterSpacing: '0.02em',
                      padding: '0 0.18em',
                      display: 'inline-block',
                      willChange: 'transform, color',
                      color: row.colors[wi % row.colors.length] === 'accent' ? '#C4FF0E'
                           : row.colors[wi % row.colors.length] === 'light'  ? '#f5f3ee'
                           : row.colors[wi % row.colors.length] === 'dim'    ? '#3a3a3a'
                           : '#222',
                    }}
                  >
                    {word}
                  </span>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0,
        height: 3, width: `${progress}%`,
        background: '#C4FF0E',
        transition: 'width 0.1s linear',
        opacity: phase === 'zoomOut' ? 0 : 1,
      }} />

      <div style={{
        position: 'absolute', top: '1.6rem', left: '1.25rem',
        fontFamily: "'DM Mono', monospace",
        fontSize: '0.72rem', letterSpacing: '0.28em',
        color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase',
        opacity: phase === 'zoomOut' ? 0 : 1,
        transition: 'opacity 0.15s ease',
      }}>Loading</div>

      <div style={{
        position: 'absolute', top: '1.4rem', right: '1.25rem',
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: '1.1rem', letterSpacing: '0.1em',
        color: 'rgba(196,255,14,0.7)',
        opacity: phase === 'zoomOut' ? 0 : 1,
        transition: 'opacity 0.15s ease',
      }}>{Math.round(progress)}%</div>

      {phase === 'zoomOut' && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden',
        }}>
          <div style={{
            width: '300vmax', height: '300vmax',
            borderRadius: '50%',
            background: '#C4FF0E',
            animation: 'lsZoomOut 0.75s cubic-bezier(0.55,0,1,0.7) forwards',
            flexShrink: 0,
          }} />
        </div>
      )}

      <style>{`
        .ls-word { transition: color 0.05s; }
        .ls-hit {
          color: #C4FF0E !important;
          animation: lsHit 0.22s ease-out forwards;
        }
        @keyframes lsHit {
          0%   { transform: scaleY(1.3) scaleX(0.88); }
          55%  { transform: scaleY(0.88) scaleX(1.1); }
          100% { transform: scaleY(1) scaleX(1); }
        }
        @keyframes lsZoomOut {
          from { transform: scale(1); opacity: 1; }
          to   { transform: scale(0); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

// ─── Project Transition Screen ─────────────────────────────────────────────────
function ProjectTransitionScreen({ onPeakReached, onDone }) {
  const [visible, setVisible] = useState(true)
  const peakedRef = useRef(false)
  const doneRef   = useRef(false)

  useEffect(() => {
    const t1 = setTimeout(() => {
      if (!peakedRef.current) {
        peakedRef.current = true
        onPeakReached?.()  // swap navState while circle fully covers screen

        // ✅ KEY FIX: wait for the new view to fully paint before shrinking
        // 2 rAF calls = guaranteed 2 browser paint frames
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setTimeout(() => setVisible(false), 80) // extra 80ms buffer for heavy renders
          })
        })
      }
    }, 720) // matches ptWipeIn duration

    return () => clearTimeout(t1)
  }, [onPeakReached])

  useEffect(() => {
    if (!visible) {
      const t2 = setTimeout(() => {
        if (!doneRef.current) {
          doneRef.current = true
          onDone?.()
        }
      }, 700)
      return () => clearTimeout(t2)
    }
  }, [visible, onDone])

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99998,
      pointerEvents: 'none',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
    }}>
      <div style={{
        width: '300vmax', height: '300vmax',
        borderRadius: '50%',
        background: '#C4FF0E',
        flexShrink: 0,
        animation: visible
          ? 'ptWipeIn 0.72s cubic-bezier(0.22, 1, 0.36, 1) forwards'
          : 'ptWipeOut 0.65s cubic-bezier(0.4, 0, 0.2, 1) forwards',
      }} />
      <style>{`
        @keyframes ptWipeIn {
          0%   { transform: scale(0);    opacity: 0; }
          30%  { opacity: 1; }
          100% { transform: scale(1);    opacity: 1; }
        }
        @keyframes ptWipeOut {
          0%   { transform: scale(1);    opacity: 1; }
          40%  { transform: scale(0.55); opacity: 0.8; }
          75%  { transform: scale(0.12); opacity: 0.3; }
          100% { transform: scale(0);    opacity: 0; }
        }
      `}</style>
    </div>
  )
}

// ─── Project Page (Landing-page style tech showcase) ──────────────────────────
function ProjectPage({ project, onBack }) {
  const { isDark } = useDarkMode()
  const [mounted, setMounted] = useState(false)
  const [activeImg, setActiveImg] = useState(0)
  const [imgExpanded, setImgExpanded] = useState(false)
  const [carouselHover, setCarouselHover] = useState(false)
  const pageRef = useRef(null)

  // Theme tokens — the whole detail page reads from these instead of
  // hardcoded dark-only colors, so it now follows the site's dark-mode toggle.
  const ink = (o) => isDark ? `rgba(255,255,255,${o})` : `rgba(10,10,10,${o})`
  const text     = isDark ? '#f5f3ee' : '#0a0a0a'
  const pageBg   = isDark ? '#0d0d0d' : '#f5f3ee'
  const cardBg   = isDark ? '#161616' : '#ffffff'
  const topBarBg = isDark ? 'rgba(13,13,13,0.88)' : 'rgba(245,243,238,0.88)'

  // Normalise: support both `images` array and legacy `image` single
  const images = project.images
    ? project.images
    : project.image
    ? [project.image]
    : []

  const hasImages = images.length > 0

  useEffect(() => {
    setActiveImg(0)
    window.scrollTo({ top: 0 })
    requestAnimationFrame(() => setMounted(true))
  }, [project])

  // Scroll-in reveal for this page's own sections. The site-wide reveal
  // observer only scans elements present when it first runs, so a project
  // page mounted later (after opening a project) needs its own observer.
  useEffect(() => {
    const container = pageRef.current
    if (!container) return
    const els = container.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [project])

  // Keyboard handling — safe to re-run on imgExpanded changes since it
  // no longer resets activeImg or scroll position.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (imgExpanded) setImgExpanded(false)
        else onBack()
      }
      if (imgExpanded) return
      if (e.key === 'ArrowRight') setActiveImg(i => Math.min(i + 1, images.length - 1))
      if (e.key === 'ArrowLeft')  setActiveImg(i => Math.max(i - 1, 0))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [imgExpanded, onBack, images.length])

  // Auto-advance the hero coverflow carousel
  useEffect(() => {
    if (images.length <= 1 || imgExpanded || carouselHover) return
    const id = setInterval(() => {
      setActiveImg(i => (i + 1) % images.length)
    }, 3200)
    return () => clearInterval(id)
  }, [images.length, imgExpanded, carouselHover, project])

  const heroImg = hasImages ? images[activeImg] : null

  return (
    <div ref={pageRef} style={{
      minHeight: '100vh',
      background: pageBg,
      color: text,
      opacity: mounted ? 1 : 0,
      transform: mounted ? 'none' : 'translateY(24px)',
      transition: 'opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1)',
    }}>

      {/* ── Sticky top bar ── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0.85rem clamp(1.25rem, 4vw, 3rem)',
        background: topBarBg, backdropFilter: 'blur(14px)',
        borderBottom: `1px solid ${ink(0.06)}`,
      }}>
        <button
          data-hover onClick={onBack}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.45rem',
            background: cardBg, border: `1px solid ${ink(0.18)}`,
            borderRadius: 100, padding: '7px 16px 7px 12px',
            color: text,
            fontFamily: "'DM Mono', monospace", fontSize: '0.75rem',
            letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'none',
            boxShadow: '0 4px 14px rgba(0,0,0,0.18)',
            transition: 'border-color 0.18s, color 0.18s, background 0.18s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#C4FF0E'; e.currentTarget.style.color = '#C4FF0E'; e.currentTarget.style.background = 'rgba(196,255,14,0.06)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = ink(0.18); e.currentTarget.style.color = text; e.currentTarget.style.background = cardBg }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.14em', color: ink(0.25), textTransform: 'uppercase' }}>
            {project.number}
          </span>
          <span style={{ width: 1, height: 10, background: ink(0.12) }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.12em', color: ink(0.25), textTransform: 'uppercase' }}>
            {project.category}
          </span>
        </div>

        <span style={{
          fontFamily: "'DM Mono', monospace", fontSize: '0.65rem',
          color: project.status === 'Shipped' ? '#00b37a' : '#b38a00',
          display: 'flex', alignItems: 'center', gap: 5,
        }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />
          {project.status}
        </span>
      </div>

      {/* ══════════════════════════ HERO ══════════════════════════ */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        padding: 'clamp(2.5rem, 6vw, 5rem) clamp(1.25rem, 4vw, 3rem) clamp(3rem, 6vw, 5rem)',
        borderBottom: `1px solid ${ink(0.06)}`,
      }}>
        {/* Ghost number watermark */}
        <div aria-hidden="true" style={{
          position: 'absolute', right: 'clamp(-2rem, -1vw, 1rem)', top: '-4%',
          fontFamily: "'Bebas Neue', Impact, sans-serif",
          fontSize: 'clamp(120px, 20vw, 280px)', lineHeight: 0.8,
          color: 'transparent', WebkitTextStroke: `1px ${ink(0.05)}`,
          userSelect: 'none', pointerEvents: 'none', zIndex: 0,
        }}>
          {project.number}
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1180, margin: '0 auto' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem',
          }}>
            <span style={{
              fontFamily: "'DM Mono', monospace", fontSize: '0.68rem',
              letterSpacing: '0.2em', color: '#C4FF0E', textTransform: 'uppercase',
              border: '1px solid rgba(196,255,14,0.3)', borderRadius: 100,
              padding: '5px 14px', background: 'rgba(196,255,14,0.06)',
            }}>
              {project.category}
            </span>
            <span style={{
              fontFamily: "'DM Mono', monospace", fontSize: '0.65rem',
              color: project.status === 'Shipped' ? '#00b37a' : '#b38a00',
              display: 'flex', alignItems: 'center', gap: 5,
            }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />
              {project.status} · {project.year}
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(3rem, 8.5vw, 7rem)',
            lineHeight: 0.88, color: text,
            letterSpacing: '0.01em', margin: '0 0 1.25rem', maxWidth: 920,
          }}>
            {project.title}
          </h1>

          <p style={{
            fontWeight: 300, fontSize: 'clamp(1rem, 1.6vw, 1.3rem)',
            color: ink(0.55), lineHeight: 1.6, margin: '0 0 2.25rem',
            maxWidth: 640,
          }}>
            {project.description}
          </p>

          {/* Hero showcase — moving coverflow carousel through all project images */}
          {heroImg ? (
            <div
              onMouseEnter={() => setCarouselHover(true)}
              onMouseLeave={() => setCarouselHover(false)}
              style={{
                position: 'relative', width: '100%',
                height: 'clamp(360px, 50vw, 620px)',
                margin: '0 auto',
              }}
            >
              <div style={{
                position: 'relative', width: '100%', height: '100%',
                overflow: 'hidden', borderRadius: 16,
              }}>
                {images.map((img, i) => {
                  let diff = i - activeImg
                  const n = images.length
                  if (diff > n / 2) diff -= n
                  if (diff < -n / 2) diff += n
                  const abs = Math.abs(diff)
                  const isActive = diff === 0
                  if (abs > 1) return null
                  return (
                    <div
                      key={i}
                      onClick={() => (isActive ? setImgExpanded(true) : setActiveImg(i))}
                      style={{
                        position: 'absolute', top: '50%', left: '50%',
                        width: isActive ? '68%' : '48%',
                        height: '100%',
                        transform: `translate(-50%, -50%) translateX(${diff * 78}%) scale(${isActive ? 1 : 0.82})`,
                        opacity: isActive ? 1 : 0.5,
                        zIndex: isActive ? 5 : 2,
                        borderRadius: 16, overflow: 'hidden',
                        cursor: isActive ? 'zoom-in' : 'pointer',
                        boxShadow: isActive ? '0 30px 90px rgba(0,0,0,0.5)' : '0 12px 32px rgba(0,0,0,0.3)',
                        border: `1px solid ${ink(0.08)}`,
                        background: cardBg,
                        transition: 'transform 0.65s cubic-bezier(0.22,1,0.36,1), opacity 0.5s ease, width 0.65s cubic-bezier(0.22,1,0.36,1)',
                        filter: isActive ? 'none' : 'brightness(0.55)',
                      }}
                    >
                      <img
                        src={img}
                        alt={`${project.title} preview ${i + 1}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
                      />
                      {isActive && (
                        <>
                          <div style={{
                            position: 'absolute', inset: 0, pointerEvents: 'none',
                            background: 'linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.5) 100%)',
                          }} />
                          <div style={{
                            position: 'absolute', bottom: 14, right: 14,
                            display: 'flex', alignItems: 'center', gap: 6,
                            background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)',
                            border: '1px solid rgba(255,255,255,0.1)', borderRadius: 100,
                            padding: '5px 12px', whiteSpace: 'nowrap', pointerEvents: 'none',
                          }}>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2">
                              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                            </svg>
                            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.08em' }}>
                              Tap to expand
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  )
                })}
              </div>

              {images.length > 1 && (
                <>
                  <button
                    data-hover
                    onClick={() => setActiveImg(i => (i - 1 + images.length) % images.length)}
                    style={{
                      position: 'absolute', left: '2%', top: '50%', transform: 'translateY(-50%)',
                      width: 40, height: 40, borderRadius: '50%', zIndex: 10,
                      background: cardBg, backdropFilter: 'blur(6px)',
                      border: `1px solid ${ink(0.15)}`, color: text,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                      transition: 'background 0.18s, color 0.18s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#C4FF0E'; e.currentTarget.style.color = '#0a0a0a' }}
                    onMouseLeave={e => { e.currentTarget.style.background = cardBg; e.currentTarget.style.color = text }}
                    aria-label="Previous image"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 18l-6-6 6-6"/>
                    </svg>
                  </button>
                  <button
                    data-hover
                    onClick={() => setActiveImg(i => (i + 1) % images.length)}
                    style={{
                      position: 'absolute', right: '2%', top: '50%', transform: 'translateY(-50%)',
                      width: 40, height: 40, borderRadius: '50%', zIndex: 10,
                      background: cardBg, backdropFilter: 'blur(6px)',
                      border: `1px solid ${ink(0.15)}`, color: text,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                      transition: 'background 0.18s, color 0.18s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#C4FF0E'; e.currentTarget.style.color = '#0a0a0a' }}
                    onMouseLeave={e => { e.currentTarget.style.background = cardBg; e.currentTarget.style.color = text }}
                    aria-label="Next image"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </button>
                </>
              )}
            </div>
          ) : (
            <div style={{
              position: 'relative', width: '100%', aspectRatio: '21 / 10',
              borderRadius: 16, overflow: 'hidden',
              border: `1px solid ${ink(0.08)}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: isDark
                ? 'repeating-linear-gradient(45deg, #111 0px, #111 10px, #0f0f0f 10px, #0f0f0f 20px)'
                : 'repeating-linear-gradient(45deg, #efeee8 0px, #efeee8 10px, #e6e4dc 10px, #e6e4dc 20px)',
            }}>
              <span style={{
                fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(4rem, 10vw, 8rem)',
                color: ink(0.06), letterSpacing: '0.04em', userSelect: 'none',
              }}>
                {project.title}
              </span>
            </div>
          )}

          {/* Dot indicators */}
          {images.length > 1 && (
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              marginTop: '1.1rem',
            }}>
              {images.map((_, i) => (
                <button
                  key={i}
                  data-hover
                  onClick={() => setActiveImg(i)}
                  aria-label={`Go to image ${i + 1}`}
                  style={{
                    width: i === activeImg ? 20 : 7, height: 7, borderRadius: 100,
                    background: i === activeImg ? '#C4FF0E' : ink(0.2),
                    border: 'none', padding: 0, cursor: 'pointer',
                    transition: 'width 0.25s cubic-bezier(0.16,1,0.3,1), background 0.2s ease',
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════ CLOSING CTA (moved up, right below the carousel) ══════════════════════════ */}
      <section className="reveal" style={{ padding: 'clamp(2rem, 4vw, 3rem) clamp(1.25rem, 4vw, 3rem) clamp(3rem, 6vw, 4.5rem)', borderBottom: `1px solid ${ink(0.06)}` }}>
        <div style={{
          maxWidth: 1180, margin: '0 auto',
          display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.75rem',
        }}>
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2.2rem, 5.5vw, 4rem)',
            lineHeight: 0.95, color: text, margin: 0, maxWidth: 700,
          }}>
            Curious how it was built?
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {project.links?.github && (
              <a data-hover href={project.links.github} target="_blank" rel="noopener noreferrer"
                className="btn btn-ghost" style={{ fontSize: '0.82rem', padding: '9px 20px' }}>
                View on GitHub ↗
              </a>
            )}
            {project.links?.live && (
              <a data-hover href={project.links.live} target="_blank" rel="noopener noreferrer"
                className="btn btn-fill" style={{ fontSize: '0.82rem', padding: '9px 20px' }}>
                Live Demo ↗
              </a>
            )}
            {project.links?.apk && (
              <a data-hover href={project.links.apk} target="_blank" rel="noopener noreferrer" download
                className="btn btn-ghost" style={{ fontSize: '0.82rem', padding: '9px 20px', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" />
                </svg>
                Download APK
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════ STAT STRIP ══════════════════════════ */}
      <section className="reveal" style={{ borderBottom: `1px solid ${ink(0.06)}`, background: ink(0.015) }}>
        <div style={{
          maxWidth: 1180, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        }}>
          {[
            { label: 'Role',        value: project.role },
            { label: 'Year',        value: project.year },
            { label: 'Stack Depth', value: `${project.tech.length} tools` },
            { label: 'Status',      value: project.status },
          ].map((m, i) => (
            <div key={i} style={{
              padding: 'clamp(1.1rem, 2.5vw, 1.6rem) clamp(1rem, 2.5vw, 1.5rem)',
              borderRight: i < 3 ? `1px solid ${ink(0.06)}` : 'none',
            }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', color: ink(0.3), letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                {m.label}
              </div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(1.3rem, 2.6vw, 1.9rem)', color: text, letterSpacing: '0.01em' }}>
                {m.value}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════ THE STACK ══════════════════════════ */}
      <section className="reveal" style={{
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.25rem, 4vw, 3rem)',
        borderBottom: `1px solid ${ink(0.06)}`,
      }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.2em', color: '#C4FF0E', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>
            ↳ Built With
          </span>
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
            lineHeight: 0.95, color: text, margin: '0 0 2rem', maxWidth: 640,
          }}>
            The technology powering this build.
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: '0.75rem',
          }}>
            {project.tech.map((t, i) => (
              <div key={t} style={{
                border: `1px solid ${ink(0.09)}`,
                borderRadius: 10,
                padding: '1rem 0.9rem',
                background: ink(0.02),
                transition: 'border-color 0.2s, background 0.2s, transform 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(196,255,14,0.5)'; e.currentTarget.style.background = 'rgba(196,255,14,0.05)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = ink(0.09); e.currentTarget.style.background = ink(0.02); e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.58rem', color: ink(0.2), letterSpacing: '0.1em', marginBottom: '0.4rem' }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: '0.88rem', color: text }}>
                  {t}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════ OVERVIEW ══════════════════════════ */}
      <section className="reveal" style={{
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.25rem, 4vw, 3rem)',
        borderBottom: `1px solid ${ink(0.06)}`,
      }}>
        <div style={{
          maxWidth: 1180, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'minmax(0, 0.85fr) minmax(0, 1.15fr)',
          gap: 'clamp(2rem, 5vw, 4rem)',
        }}
          className="responsive-grid-stack"
        >
          <div>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.2em', color: '#C4FF0E', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>
              ↳ The Story
            </span>
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(1.9rem, 4vw, 3rem)',
              lineHeight: 0.98, color: text, margin: 0,
            }}>
              What it does, and why it's built this way.
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {project.overview.map((p, i) => (
              <p key={i} style={{ fontWeight: 300, fontSize: '1rem', color: ink(0.55), lineHeight: 1.85, margin: 0 }}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════ FEATURE SHOWCASE ══════════════════════════ */}
      <section className="reveal" style={{
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.25rem, 4vw, 3rem)',
        borderBottom: `1px solid ${ink(0.06)}`,
      }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.2em', color: '#C4FF0E', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>
            ↳ Under The Hood
          </span>
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
            lineHeight: 0.95, color: text, margin: '0 0 2rem', maxWidth: 640,
          }}>
            Capabilities worth showing off.
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1px',
            background: ink(0.06),
            border: `1px solid ${ink(0.06)}`,
            borderRadius: 14, overflow: 'hidden',
          }}>
            {project.highlights.map((h, i) => (
              <div key={i} style={{
                background: cardBg, padding: 'clamp(1.4rem, 2.5vw, 1.9rem)',
              }}>
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.6rem',
                  color: 'rgba(196,255,14,0.65)', lineHeight: 1, marginBottom: '0.75rem',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <p style={{ fontWeight: 300, fontSize: '0.95rem', color: ink(0.65), lineHeight: 1.6, margin: 0 }}>
                  {h}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lightbox ── */}
      {imgExpanded && hasImages && (
        <div
          onClick={() => setImgExpanded(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(12px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem',
          }}
        >
          <img
            src={images[activeImg]}
            alt={`${project.title} ${activeImg + 1}`}
            style={{
              maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain',
              borderRadius: 10, boxShadow: '0 40px 120px rgba(0,0,0,0.8)',
              animation: 'lightboxIn 0.25s cubic-bezier(0.16,1,0.3,1) forwards',
            }}
          />

          {/* Lightbox prev/next */}
          {images.length > 1 && (
            <>
              <button
                onClick={e => { e.stopPropagation(); setActiveImg(i => Math.max(i - 1, 0)) }}
                disabled={activeImg === 0}
                style={{
                  position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)',
                  width: 44, height: 44, borderRadius: '50%',
                  background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.15)',
                  color: activeImg === 0 ? 'rgba(255,255,255,0.2)' : '#f5f3ee',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: activeImg === 0 ? 'default' : 'pointer',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
              <button
                onClick={e => { e.stopPropagation(); setActiveImg(i => Math.min(i + 1, images.length - 1)) }}
                disabled={activeImg === images.length - 1}
                style={{
                  position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)',
                  width: 44, height: 44, borderRadius: '50%',
                  background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.15)',
                  color: activeImg === images.length - 1 ? 'rgba(255,255,255,0.2)' : '#f5f3ee',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: activeImg === images.length - 1 ? 'default' : 'pointer',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
              {/* Counter */}
              <div style={{
                position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)',
                fontFamily: "'DM Mono', monospace", fontSize: '0.65rem',
                color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', whiteSpace: 'nowrap',
              }}>
                {activeImg + 1} / {images.length} · Tap anywhere to close
              </div>
            </>
          )}
          {images.length === 1 && (
            <div style={{
              position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)',
              fontFamily: "'DM Mono', monospace", fontSize: '0.65rem',
              color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', whiteSpace: 'nowrap',
            }}>
              Tap anywhere to close
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes lightboxIn {
          from { opacity: 0; transform: scale(0.94); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes imgFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </div>
  )
}

// ─── Section definitions ───────────────────────────────────────────────────────
const SECTIONS_BASE = [
  { id: 'hero',     label: 'Home',     number: '00', lightBg: '#0a0a0a', darkBg: '#1a1a1a', lightTabBg: '#161616', darkTabBg: '#222222', isDarkSection: true },
  { id: 'about',    label: 'About',    number: '01', lightBg: '#f5f3ee', darkBg: '#222222', lightTabBg: '#eceae4', darkTabBg: '#2a2a2a', isDarkSection: false },
  { id: 'skills',   label: 'Skills',   number: '02', lightBg: '#0a0a0a', darkBg: '#1a1a1a', lightTabBg: '#161616', darkTabBg: '#222222', isDarkSection: true },
  { id: 'projects', label: 'Projects', number: '03', lightBg: '#f5f3ee', darkBg: '#222222', lightTabBg: '#eceae4', darkTabBg: '#2a2a2a', isDarkSection: false },
  { id: 'resume',   label: 'Resume',   number: '04', lightBg: '#0a0a0a', darkBg: '#1a1a1a', lightTabBg: '#161616', darkTabBg: '#222222', isDarkSection: true },
  { id: 'contact',  label: 'Contact',  number: '05', lightBg: '#0a0a0a', darkBg: '#1a1a1a', lightTabBg: '#161616', darkTabBg: '#222222', isDarkSection: true },
]

// ─── Vertical Right Nav ────────────────────────────────────────────────────────
function VerticalNav({ activeIndex, onNavigate, scrolled, showBackToTop, sections }) {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [hovered, setHovered] = useState(false)

  return (
    <div style={{
      position: 'fixed', right: '2.2rem', top: '50%',
      transform: scrolled ? 'translateY(-50%) translateX(0)' : 'translateY(-50%) translateX(120%)',
      zIndex: 6000, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px',
      opacity: scrolled ? 1 : 0, pointerEvents: scrolled ? 'auto' : 'none',
      transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease',
    }}>
      {sections.map((section, i) => {
        const isActive  = activeIndex === i
        const isHovered = hoveredIndex === i
        return (
          <button
            key={section.id} data-hover onClick={() => onNavigate(i)}
            onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)}
            aria-label={`Go to ${section.label}`}
            style={{ background: 'none', border: 'none', cursor: 'none', display: 'flex', alignItems: 'center', gap: '12px', padding: '6px 0' }}
          >
            <span style={{
              fontFamily: "'DM Mono', monospace", fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase',
              color: isActive ? '#00E5A0' : isHovered ? '#f5f3ee' : 'rgba(255,255,255,0.65)',
              opacity: isActive || isHovered ? 1 : 0.85,
              transform: isActive || isHovered ? 'translateX(0)' : 'translateX(4px)',
              transition: 'color 0.2s ease, opacity 0.2s ease, transform 0.25s ease',
              whiteSpace: 'nowrap', textShadow: '0 1px 8px rgba(0,0,0,0.9)',
              background: isActive ? 'rgba(0,229,160,0.12)' : isHovered ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.45)',
              padding: '3px 10px', borderRadius: '100px', backdropFilter: 'blur(6px)',
              border: isActive ? '1px solid rgba(0,229,160,0.3)' : '1px solid rgba(255,255,255,0.06)',
            }}>
              <span style={{ color: isActive ? '#00E5A0' : 'rgba(255,255,255,0.45)', marginRight: 5, fontSize: '0.65rem' }}>{section.number}</span>
              {section.label}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 0, flexShrink: 0 }}>
              <div style={{
                height: '1.5px',
                background: isActive ? '#00E5A0' : isHovered ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.2)',
                width: isActive ? 28 : isHovered ? 16 : 10,
                transition: 'width 0.3s cubic-bezier(0.16,1,0.3,1), background 0.2s ease', borderRadius: 2,
              }} />
              <div style={{
                width: isActive ? 10 : isHovered ? 8 : 6, height: isActive ? 10 : isHovered ? 8 : 6,
                borderRadius: '50%', background: isActive ? '#00E5A0' : isHovered ? '#f5f3ee' : 'rgba(255,255,255,0.3)',
                border: isActive ? '2px solid rgba(0,229,160,0.3)' : '1.5px solid rgba(255,255,255,0.15)',
                transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)', flexShrink: 0, marginLeft: 4,
                boxShadow: isActive ? '0 0 8px rgba(0,229,160,0.5)' : 'none',
              }} />
            </div>
          </button>
        )
      })}
      <div style={{
        marginTop: '10px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.08)',
        display: 'flex', justifyContent: 'flex-end',
        opacity: showBackToTop ? 1 : 0,
        transform: showBackToTop ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.85)',
        transition: 'opacity 0.35s ease, transform 0.35s cubic-bezier(0.16,1,0.3,1)',
        pointerEvents: showBackToTop ? 'auto' : 'none',
      }}>
        <button
          data-hover onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
          aria-label="Back to top"
          style={{
            width: 36, height: 36, borderRadius: '50%',
            border: `1.5px solid ${hovered ? '#00E5A0' : 'rgba(255,255,255,0.18)'}`,
            background: hovered ? '#00E5A0' : 'rgba(10,10,10,0.75)', backdropFilter: 'blur(12px)',
            color: hovered ? '#0a0a0a' : 'rgba(255,255,255,0.65)', cursor: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
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

// ─── Mobile Bottom Nav ─────────────────────────────────────────────────────────
const NAV_ICONS = ['⌂', 'A', '✦', '◈', 'CV', '✉']

function MobileBottomNav({ activeIndex, onNavigate, sections }) {
  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 6000,
      background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex',
      alignItems: 'stretch', paddingBottom: 'env(safe-area-inset-bottom)',
    }}>
      {sections.map((section, i) => {
        const isActive = activeIndex === i
        return (
          <button key={section.id} onClick={() => onNavigate(i)} style={{
            flex: 1, background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', padding: '8px 2px 6px', gap: 2,
            position: 'relative', minWidth: 0,
            WebkitTapHighlightColor: 'transparent',
          }}>
            {/* Active indicator bar */}
            {isActive && (
              <div style={{
                position: 'absolute', top: 0, left: '15%', right: '15%',
                height: 2, background: '#00E5A0',
                borderRadius: '0 0 2px 2px',
              }} />
            )}
            {/* Number badge */}
            <span style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.5rem',
              letterSpacing: '0.06em',
              color: isActive ? '#00E5A0' : 'rgba(255,255,255,0.25)',
              textTransform: 'uppercase',
              transition: 'color 0.2s ease',
              lineHeight: 1,
            }}>
              {section.number}
            </span>
            {/* Label — truncated to fit */}
            <span style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.58rem',
              letterSpacing: '0.04em',
              color: isActive ? '#f5f3ee' : 'rgba(255,255,255,0.3)',
              textTransform: 'uppercase',
              transition: 'color 0.2s ease',
              lineHeight: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '100%',
              paddingInline: 2,
            }}>
              {section.label}
            </span>
            {/* Active dot */}
            {isActive && (
              <div style={{
                width: 3, height: 3, borderRadius: '50%',
                background: '#00E5A0', opacity: 0.8,
              }} />
            )}
          </button>
        )
      })}
    </div>
  )
}

// ─── Folder Tab ────────────────────────────────────────────────────────────────
function FolderTab({ number, label, tabBg, isDark }) {
  const textColor   = isDark ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.7)'
  const numColor    = isDark ? 'rgba(255,255,255,0.4)'  : 'rgba(0,0,0,0.35)'
  const divColor    = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'
  const borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'
  return (
    <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: 'clamp(0.75rem, 3vw, 3rem)', zIndex: 10, pointerEvents: 'none', transform: 'translateY(-100%)', display: 'flex' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 14px 10px',
        background: tabBg, borderRadius: '8px 8px 0 0',
        border: `1px solid ${borderColor}`, borderBottom: 'none',
        boxShadow: isDark ? 'inset 0 1px 0 rgba(255,255,255,0.06)' : 'inset 0 1px 0 rgba(255,255,255,0.8)',
      }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.12em', color: numColor, textTransform: 'uppercase' }}>{number}</span>
        <div style={{ width: 1, height: 12, background: divColor }} />
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.72rem', letterSpacing: '0.12em', color: textColor, textTransform: 'uppercase', fontWeight: 500 }}>{label}</span>
        <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#00E5A0', opacity: 0.85, flexShrink: 0 }} />
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
  const runwayRefs = useRef([])
  const cardOffsets = useRef([])
  const scrollUpCurrent = useRef([])  // lerped scrollUpY values per card

  const { isDark } = useDarkMode()

  const [loadingDone, setLoadingDone] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [navVisible, setNavVisible] = useState(false)
  const navIdleTimer = useRef(null)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  // ── Project state ─────────────────────────────────────────────────────────────
  // navState: 'portfolio' | 'project'
  // transitionActive: controls whether the wipe circle is mounted (independent of navState)
  // Persisted to sessionStorage so a refresh while viewing a project reopens
  // that same project instead of dropping back to the hero section.
  const getStoredProject = () => {
    try {
      const savedNumber = sessionStorage.getItem('portfolio:activeProjectNumber')
      if (!savedNumber) return null
      return projectsList.find(p => p.number === savedNumber) || null
    } catch {
      return null
    }
  }

  const [activeProject, setActiveProject] = useState(getStoredProject)
  const [navState, setNavState] = useState(() => {
    try {
      return sessionStorage.getItem('portfolio:navState') === 'project' && getStoredProject()
        ? 'project'
        : 'portfolio'
    } catch {
      return 'portfolio'
    }
  })
  const [transitionActive, setTransitionActive] = useState(false)

  // Refs so the transition screen always calls the latest callbacks
  const onPeakRef = useRef(null)
  const onDoneRef = useRef(null)

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  const setCardRef = (i) => (el) => { cardRefs.current[i] = el }
  const setRunwayRef = (i) => (el) => { runwayRefs.current[i] = el }

  const getSpacers = () => Array.from(document.querySelectorAll('[data-runway-spacer]'))

  const computeOffsets = useCallback(() => {
    let cumulative = 0
    cardOffsets.current = cardRefs.current.map((card, i) => {
      const p = cumulative
      if (card) {
        const inner = card.querySelector('[data-card-inner]') || card
        const spacer = document.querySelector(`[data-runway-spacer="${i}"]`)
        cumulative += inner.scrollHeight + (spacer ? spacer.offsetHeight : 0)
      }
      return p
    })
  }, [])

  // ── Sync spacer heights so tall sections get full scroll runway ───────────────
  useEffect(() => {
    const syncHeights = () => {
      cardRefs.current.forEach((card, i) => {
        if (!card) return
        const inner  = card.querySelector('[data-card-inner]') || card
        const spacer = document.querySelector(`[data-runway-spacer="${i}"]`)
        if (!spacer) return
        const cardH = inner.scrollHeight
        const vh    = window.innerHeight

        // Strategy:
        // - Cards TALLER than vh already give the user plenty of scroll time.
        //   Just add enough spacer so any content below the fold is reachable.
        // - Cards SHORTER than vh get a spacer so the user has time to read them
        //   before the next card slides up (dwell = vh - cardH).
        // This avoids the "Hero takes 3× scroll" problem on mobile where minHeight:100vh
        // makes it tall already and extra spacer makes navigation feel broken.
        let spacerH
        if (cardH >= vh) {
          // Tall card: spacer only covers the overflow (content below the fold)
          spacerH = cardH - vh
        } else {
          // Short card: pad up to exactly one viewport of dwell time
          spacerH = vh - cardH
        }
        spacer.style.height = `${Math.max(0, spacerH)}px`
      })
      computeOffsets()
    }

    const ro = new ResizeObserver(syncHeights)
    cardRefs.current.forEach((card) => { if (card) ro.observe(card) })
    window.addEventListener('resize', syncHeights)
    syncHeights()

    return () => { ro.disconnect(); window.removeEventListener('resize', syncHeights) }
  }, [computeOffsets, loadingDone])

  const handleLoadingDone = useCallback(() => {
    setLoadingDone(true)
    requestAnimationFrame(() => setTimeout(computeOffsets, 300))
  }, [computeOffsets])

  const navigateToSection = useCallback((index) => {
    computeOffsets()
    const offset = cardOffsets.current[index] ?? 0
    setActiveIndex(index)   // update immediately so nav tab highlights right away
    window.scrollTo({ top: offset, behavior: 'smooth' })
  }, [computeOffsets])

  // ── Open project ──────────────────────────────────────────────────────────────
  const handleOpenProject = useCallback((project) => {
    setActiveProject(project)
    try {
      sessionStorage.setItem('portfolio:navState', 'project')
      sessionStorage.setItem('portfolio:activeProjectNumber', project.number)
    } catch {}
    // Peak: switch to project view while circle fully covers screen
    onPeakRef.current = () => setNavState('project')
    // Done: just unmount the transition circle
    onDoneRef.current = () => setTransitionActive(false)
    setTransitionActive(true)
  }, [])

  // ── Back to portfolio ─────────────────────────────────────────────────────────
const handleBack = useCallback(() => {
  onPeakRef.current = () => {
    setNavState('portfolio')
    setActiveProject(null)  // ← clear HERE at peak, not in onDone
                            //   so project page hides while circle still covers screen
    try {
      sessionStorage.removeItem('portfolio:navState')
      sessionStorage.removeItem('portfolio:activeProjectNumber')
    } catch {}
  }
  onDoneRef.current = () => {
    setTransitionActive(false)
    setTimeout(() => {
      const el = document.getElementById('projects')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 200)
  }
  setTransitionActive(true)
}, [])

  // ── Stable callbacks passed to ProjectTransitionScreen ───────────────────────
  const handlePeakReached = useCallback(() => onPeakRef.current?.(), [])
  const handleTransitionDone = useCallback(() => onDoneRef.current?.(), [])

  useEffect(() => {
    if (navState === 'project') {
      document.body.style.overflow = ''
    }
  }, [navState])

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

  useEffect(() => {
    if (!loadingDone) return
    const getActive = () => {
      // Use pre-computed offsets + scrollY — no getBCR, and works correctly with sticky cards.
      // A section is "active" once the user has scrolled to its offset.
      // The last section whose offset is <= scrollY wins.
      const scrollY = window.scrollY
      const offsets = cardOffsets.current
      let active = 0
      offsets.forEach((offset, i) => {
        if (scrollY >= offset - 1) active = i  // 1px tolerance for sub-pixel rounding
      })
      // The last section's offset sits exactly at the max scrollable position, so
      // sub-pixel rounding between our JS-measured heights and the browser's actual
      // layout can leave scrollY a hair short of it — the nav would then get stuck
      // on the second-to-last item forever. Once we're at (or past) the bottom of
      // the page, force the last section to be active regardless of offset math.
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      if (scrollY >= maxScroll - 2) active = offsets.length - 1
      return active
    }
    const onScroll = () => setActiveIndex(getActive())
    const timer = setTimeout(() => {
      setActiveIndex(getActive())
      window.addEventListener('scroll', onScroll, { passive: true })
    }, 600)
    return () => { clearTimeout(timer); window.removeEventListener('scroll', onScroll) }
  }, [loadingDone])

  useEffect(() => {
    if (!loadingDone) return
    const SCALE_STEP = 0.025
    const PEEK_GAP   = 8

    // Cache card heights so the RAF loop never calls scrollHeight (forces reflow)
    const cardHeights = []
    const cacheHeights = () => {
      cardRefs.current.forEach((card, i) => {
        if (!card) return
        const inner = card.querySelector('[data-card-inner]') || card
        cardHeights[i] = inner.scrollHeight
      })
    }
    cacheHeights()
    const ro = new ResizeObserver(cacheHeights)
    cardRefs.current.forEach(c => c && ro.observe(c))

    const updateCards = () => {
      const scrollY = window.scrollY
      const vh      = window.innerHeight
      const cards   = cardRefs.current
      const offsets = cardOffsets.current

      // Determine stuck state from scrollY + pre-computed offsets — zero getBCR calls
      const stuckFlags = cards.map((_, i) => scrollY >= (offsets[i] ?? 0))

      cards.forEach((card, i) => {
        if (!card) return

        if (stuckFlags[i]) {
          let cardsAbove = 0
          for (let j = i + 1; j < cards.length; j++) {
            if (stuckFlags[j]) cardsAbove++
          }

          // For tall cards (cardH > vh): scroll content up as user scrolls through spacer.
          // For short cards (cardH <= vh): no scroll-up needed, content is fully visible.
          const cardOffset  = offsets[i] ?? 0
          const cardH       = cardHeights[i] || vh
          const maxScrollUp = Math.max(0, cardH - vh)
          let targetScrollUpY = 0
          if (maxScrollUp > 0) {
            // How far past the card's sticky point has the user scrolled?
            const scrollPast  = Math.max(0, scrollY - cardOffset)
            targetScrollUpY   = -Math.min(scrollPast, maxScrollUp)
          }

          // Lerp toward target
          const prev   = scrollUpCurrent.current[i] ?? 0
          const lerped = prev + (targetScrollUpY - prev) * 0.25
          scrollUpCurrent.current[i] = lerped

          const scale      = Math.max(0.82, 1 - cardsAbove * SCALE_STEP)
          const peekY      = cardsAbove * PEEK_GAP
          const brightness = Math.max(0.5, 1 - cardsAbove * 0.07)
          const radius     = Math.min(cardsAbove * 12, 32)
          card.style.transform    = `translateY(${lerped + peekY}px) scale(${scale})`
          card.style.filter       = cardsAbove > 0 ? `brightness(${brightness})` : 'brightness(1)'
          card.style.borderRadius = i > 0 && cardsAbove > 0
            ? `${radius}px ${radius}px 32px 32px`
            : i > 0 ? '20px 20px 32px 32px' : '0'
        } else {
          scrollUpCurrent.current[i] = 0
          const cardOffset = offsets[i] ?? 0
          const cardTop    = cardOffset - scrollY          // relative to viewport
          const progress   = Math.max(0, Math.min(1, 1 - cardTop / vh))
          const slideY     = (1 - progress) * 80
          const entryScale = 0.96 + progress * 0.04
          card.style.transform    = `translateY(${slideY}px) scale(${entryScale})`
          card.style.filter       = 'brightness(1)'
          card.style.borderRadius = i > 0 ? '20px 20px 32px 32px' : '0'
        }
      })

    }

    // Scroll-driven React state updates — in a scroll listener, NOT the RAF loop.
    // Calling setState 60x/sec inside RAF causes re-renders every frame = the jiggle.
    const onScrollState = () => {
      const scrollY = window.scrollY
      setShowBackToTop(scrollY > 300)
      setNavVisible(true)
      clearTimeout(navIdleTimer.current)
      navIdleTimer.current = setTimeout(() => setNavVisible(false), 2500)
    }

    // RAF loop: only touches DOM directly via card.style — no React state
    const loop = () => {
      updateCards()
      scrollRafId.current = requestAnimationFrame(loop)
    }

    const initTimer = setTimeout(() => {
      loop()
      window.addEventListener('scroll', onScrollState, { passive: true })
    }, 400)

    return () => {
      ro.disconnect()
      clearTimeout(initTimer)
      cancelAnimationFrame(scrollRafId.current)
      window.removeEventListener('scroll', onScrollState)
    }
  }, [loadingDone])

  useEffect(() => {
    if (!loadingDone) return
    window.addEventListener('resize', computeOffsets)
    return () => window.removeEventListener('resize', computeOffsets)
  }, [loadingDone, computeOffsets])

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

  useEffect(() => {
    if (isTouchDevice) return
    document.body.style.cursor = 'auto'
    let hasMoved = false

    const onMove = (e) => {
      pos.current.x = e.clientX
      pos.current.y = e.clientY
      if (!hasMoved) {
        hasMoved = true
        current.current.x = e.clientX
        current.current.y = e.clientY
        document.body.style.cursor = 'none'
        if (blobRef.current) {
          blobRef.current.style.opacity = '1'
          blobRef.current.style.left = `${e.clientX}px`
          blobRef.current.style.top  = `${e.clientY}px`
        }
      }
    }
    const onDown  = () => blobRef.current?.classList.add('clicking')
    const onUp    = () => blobRef.current?.classList.remove('clicking')
    const onEnter = () => blobRef.current?.classList.add('hovering')
    const onLeave = () => blobRef.current?.classList.remove('hovering')

    const tick = () => {
      if (hasMoved) {
        current.current.x += (pos.current.x - current.current.x) * 0.12
        current.current.y += (pos.current.y - current.current.y) * 0.12
        if (blobRef.current) {
          blobRef.current.style.left = `${current.current.x}px`
          blobRef.current.style.top  = `${current.current.y}px`
        }
      }
      rafId.current = requestAnimationFrame(tick)
    }

    if (blobRef.current) blobRef.current.style.opacity = '0'
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
      document.body.style.cursor = 'auto'
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      cancelAnimationFrame(rafId.current)
      mo.disconnect()
    }
  }, [isTouchDevice])

  const sectionComponents = [
    <Hero />,
    <About />,
    <Skills />,
    <Projects onOpenProject={handleOpenProject} />,
    <Resume />,
    <Contact />,
  ]

  const SECTIONS = SECTIONS_BASE.map(s => ({
    ...s,
    bg: isDark ? s.darkBg : s.lightBg,
    tabBg: isDark ? s.darkTabBg : s.lightTabBg,
  }))

  // Project page is visible when navState is 'project' OR during any transition
  // with an active project (so it's behind the circle while it wipes out)
  const isShowingProject = navState === 'project'

  return (
    <>
      <LoadingScreen onDone={handleLoadingDone} />

      {/* ── Single transition screen — stays mounted for its full animation
           regardless of navState changes at peak ── */}
      {transitionActive && (
        <ProjectTransitionScreen
          onPeakReached={handlePeakReached}
          onDone={handleTransitionDone}
        />
      )}

      {!isTouchDevice && <div ref={blobRef} className="cursor-blob" />}

      {/* ── Project full page ── */}
      {isShowingProject && activeProject && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9000, overflowY: 'auto', background: '#0d0d0d' }}>
          <ProjectPage project={activeProject} onBack={handleBack} />
        </div>
      )}

      {/* ── Portfolio ── */}
      <div style={{ visibility: isShowingProject ? 'hidden' : 'visible' }}>
        <div className="hidden md:block">
          <VerticalNav
            activeIndex={activeIndex}
            onNavigate={navigateToSection}
            scrolled={navVisible}
            showBackToTop={showBackToTop}
            sections={SECTIONS}
          />
        </div>

        {isTouchDevice && (
          <MobileBottomNav activeIndex={activeIndex} onNavigate={navigateToSection} sections={SECTIONS} />
        )}

        <main style={{ paddingBottom: isTouchDevice ? 'calc(56px + env(safe-area-inset-bottom))' : 0 }} className="md:pb-0">
          {SECTIONS.map((section, i) => (
            <div key={section.id} ref={setRunwayRef(i)} style={{ display: 'contents' }}>
              <div
                ref={setCardRef(i)}
                data-stack-card={i}
                style={{
                  position: 'sticky', top: 0, zIndex: 10 + i,
                  transformOrigin: 'top center',
                  willChange: 'transform, filter, border-radius',
                  overflow: 'visible',
                  borderRadius: i > 0 ? '20px 20px 32px 32px' : 0,
                }}
              >
                {i > 0 && (
                  <FolderTab
                    number={section.number} label={section.label}
                    tabBg={section.tabBg} isDark={section.isDarkSection}
                  />
                )}
                <div data-card-inner style={{ overflow: 'clip', borderRadius: 'inherit' }}>
                  {sectionComponents[i]}
                </div>
              </div>
              {/* Height spacer: gives this section extra scroll runway beyond its natural height,
                  so tall sections (Resume, About) scroll through all content before the next card covers them */}
              <div data-runway-spacer={i} style={{ display: 'block', pointerEvents: 'none', flexShrink: 0 }} />
            </div>
          ))}
        </main>
      </div>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        .cursor-blob {
          position: fixed; width: 22px; height: 22px;
          background: #C4FF0E; border-radius: 50%;
          pointer-events: none; z-index: 1000003;
          transform: translate(-50%, -50%);
          mix-blend-mode: difference;
          transition: width 0.25s cubic-bezier(0.16,1,0.3,1), height 0.25s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease;
          will-change: left, top, width, height;
        }
        .cursor-blob.hovering { width: 44px; height: 44px; }
        .cursor-blob.clicking { width: 14px; height: 14px; }

        [data-stack-card] {
          transition: filter 0.28s ease, border-radius 0.35s ease;
        }

        .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .reveal.visible { opacity: 1; transform: translateY(0); }

        @media (hover: none) { body { cursor: auto !important; } * { cursor: auto !important; } }
      `}</style>
    </>
  )
}