import logo_nobackground from '../../public/ed_logo_noBackground.png'
import { useEffect, useRef, useState } from 'react'
import DarkModeToggle from './DarkModeToggle'
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
          timer = setTimeout(tick, 1600)
        } else {
          state.current.ci++
          timer = setTimeout(tick, 75)
        }
      } else {
        setDisplay(word.slice(0, ci - 1))
        if (ci - 1 === 0) {
          state.current.deleting = false
          state.current.wi = (wi + 1) % words.length
          state.current.ci = 0
          timer = setTimeout(tick, 300)
        } else {
          state.current.ci--
          timer = setTimeout(tick, 40)
        }
      }
    }
    timer = setTimeout(tick, 500)
    return () => clearTimeout(timer)
  }, [words])

  return display
}

function usePhilippinesClock() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const updateClock = () => {
      const now = new Date()
      const phTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Manila' }))
      let hours = phTime.getHours()
      const ampm = hours >= 12 ? 'PM' : 'AM'
      hours = hours % 12
      if (hours === 0) hours = 12
      const hoursStr = String(hours).padStart(2, '0')
      const minutes = String(phTime.getMinutes()).padStart(2, '0')
      const seconds = String(phTime.getSeconds()).padStart(2, '0')
      setTime(`${hoursStr}:${minutes}:${seconds} ${ampm}`)
    }
    updateClock()
    const interval = setInterval(updateClock, 1000)
    return () => clearInterval(interval)
  }, [])

  return time
}

export default function Hero() {
  const canvasRef = useRef(null)
  const roleText = useTypewriter(ROLES)
  const phTime = usePhilippinesClock()
  const { isDark } = useDarkMode()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const COUNT = 42
    const pts = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.6 + 0.4,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      a: Math.random() * 0.25 + 0.06,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      pts.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${p.a})`
        ctx.fill()
        p.x += p.dx; p.y += p.dy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
      })
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const d  = Math.sqrt(dx * dx + dy * dy)
          if (d < 110) {
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = `rgba(255,255,255,${0.05 * (1 - d / 110)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  const bgCircles = [
    { width: 520, height: 520, top: '-190px', right: '-110px', dur: '9s' },
    { width: 280, height: 280, bottom: '-90px', left: '-70px',  dur: '12s' },
    { width: 90,  height: 90,  bottom: '90px',  right: '19%',   dur: '7s'  },
  ]

  return (
    <section style={{
      background: isDark ? '#1a1a1a' : '#0a0a0a',
      minHeight: '100vh',
      fontFamily: "'DM Sans', sans-serif",
      color: isDark ? '#e8e8e8' : '#f5f3ee',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
      transition: 'background 0.4s ease, color 0.4s ease',
    }}>

      {/* ── Particle canvas ── */}
      <canvas ref={canvasRef} style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 1,
      }} />

      {/* ── Floating bg circles ── */}
      {bgCircles.map((s, i) => (
        <div key={i} style={{
          position: 'absolute', borderRadius: '50%',
          background: 'rgba(255,255,255,0.03)', pointerEvents: 'none',
          width: s.width, height: s.height,
          top: s.top, right: s.right, bottom: s.bottom, left: s.left,
          animation: `heroFloat ${s.dur} ease-in-out infinite ${i % 2 ? 'reverse' : ''}`,
          zIndex: 2,
        }} />
      ))}

      {/* ── Top bar ── */}
    <div style={{
      position: 'relative', zIndex: 10,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '1.2rem 1.5rem',
      animation: 'heroSlideDown 0.7s cubic-bezier(0.16,1,0.3,1) both',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <img src={logo_nobackground} alt="ESA Logo" style={{ height: 50, width: 'auto' }} />
        <span style={{ display: 'flex', fontSize: '1.1rem', fontWeight: '700', letterSpacing: '0.05em' }}>
          {'EABLAO.DEV'.split('').map((char, i) => (
            <span
              key={i}
              style={{
                display: 'inline-block',
                color: isDark ? '#a3e635' : '#ffffff',
                opacity: 0,
                animation: `letterFall 0.4s cubic-bezier(0.16,1,0.3,1) forwards`,
                animationDelay: `${0.3 + i * 0.07}s`,
                transition: 'color 0.4s ease',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </span>
      </div>
      <DarkModeToggle />
    </div>

      {/* ── Body ── */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '2rem 1.25rem 5rem',
        position: 'relative', zIndex: 5,
      }}>

        {/* Role typewriter badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '100px', padding: '7px 16px',
          marginBottom: '1.5rem',
          animation: 'heroFadeUp 0.7s 0.2s cubic-bezier(0.16,1,0.3,1) both',
          flexWrap: 'wrap', justifyContent: 'center',
        }}>
          <span style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 'clamp(0.65rem, 2vw, 0.78rem)', letterSpacing: '0.15em',
            color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase',
          }}>
            Currently a
          </span>
          <span style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 'clamp(0.78rem, 2.2vw, 0.9rem)', color: '#f5f3ee',
            letterSpacing: '0.06em', minWidth: 160, textAlign: 'left',
          }}>
            {roleText}
            <span style={{
              display: 'inline-block', width: 2, height: '0.9em',
              background: '#f5f3ee', marginLeft: 2, verticalAlign: 'middle',
              animation: 'ejBlink 1s step-end infinite',
            }} />
          </span>
        </div>

        {/* Brushstroke headline */}
        <div style={{
          position: 'relative', display: 'inline-block',
          padding: 'clamp(0.8rem, 2vw, 1.4rem) clamp(1rem, 3vw, 2.8rem) clamp(1rem, 2.5vw, 1.9rem)',
          marginBottom: '1.75rem',
          animation: 'heroFadeUp 0.8s 0.35s cubic-bezier(0.16,1,0.3,1) both',
          maxWidth: '100%',
        }}>
          <svg
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
            viewBox="0 0 820 240" preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18 42 C40 10 100 4 170 6 L650 2 C720 0 800 16 812 48 L815 96 C818 112 810 122 808 136 L806 182 C803 208 765 226 710 228 L120 230 C68 231 14 214 10 190 L5 100 C2 72 10 54 18 42 Z" fill="#ffffff"/>
            <path d="M10 52 C6 38 8 24 18 16 L16 20 C8 28 6 42 8 56 Z" fill="#e0e0e0"/>
            <path d="M810 36 C818 46 820 58 816 72 L813 68 C816 56 814 46 808 36 Z" fill="#e0e0e0"/>
            <path d="M30 6 C80 -4 160 -4 220 4 L218 10 C158 2 80 2 32 12 Z" fill="#f0f0f0" opacity="0.7"/>
            <path d="M560 2 C640 -2 740 8 798 28 L795 34 C737 14 640 4 560 8 Z" fill="#f0f0f0" opacity="0.6"/>
            <path d="M14 196 C48 222 110 230 160 230 L158 224 C110 224 50 216 16 192 Z" fill="#e0e0e0" opacity="0.8"/>
            <path d="M640 226 C700 226 770 214 806 192 L803 188 C767 210 700 222 640 222 Z" fill="#e0e0e0" opacity="0.75"/>
            <path d="M80 12 C200 4 400 2 560 6 L558 14 C398 10 200 12 82 20 Z" fill="white" opacity="0.3"/>
          </svg>
          <h1 style={{
            position: 'relative', zIndex: 2,
            fontFamily: "'Permanent Marker', cursive",
            fontSize: 'clamp(1.6rem, 4.5vw, 5rem)',
            lineHeight: 1.15, color: '#0a0a0a',
            textTransform: 'uppercase', letterSpacing: '0.01em', margin: 0,
          }}>
            I'm grateful you're here<br />let's explore together
          </h1>
        </div>

        {/* Bio */}
        <p style={{
          fontSize: 'clamp(0.95rem, 2.5vw, 1.2rem)', fontWeight: 300,
          color: 'rgba(245,243,238,0.7)',
          maxWidth: 520, lineHeight: 1.9,
          marginBottom: '2.2rem', letterSpacing: '0.01em',
          animation: 'heroFadeUp 0.8s 0.5s cubic-bezier(0.16,1,0.3,1) both',
          padding: '0 0.5rem',
        }}>
          Hi! I am Emmanuel Sapico Ablao, a full stack developer building end-to-end
          digital experiences — from IoT hardware to cross-platform mobile,
          desktop, and web apps.
        </p>

        {/* CTAs */}
        <div style={{
          display: 'flex', gap: 12, alignItems: 'center',
          flexWrap: 'wrap', justifyContent: 'center',
          animation: 'heroFadeUp 0.8s 0.65s cubic-bezier(0.16,1,0.3,1) both',
        }}>
          <a
            href="#contact"
            data-hover
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            style={{
              display: 'inline-block',
              background: '#ffffff', color: '#0a0a0a',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(0.85rem, 2.5vw, 1.05rem)', fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              padding: 'clamp(14px, 2vw, 18px) clamp(32px, 5vw, 56px)', borderRadius: 4,
              border: 'none', textDecoration: 'none',
              transition: 'opacity 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-3px)' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1';    e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Let’s Work Together
          </a>

          <a
            href="#projects"
            data-hover
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
            }}
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 'clamp(0.78rem, 2vw, 0.9rem)', color: 'rgba(255,255,255,0.45)',
              letterSpacing: '0.12em', textDecoration: 'none',
              borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: 2,
              transition: 'color 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)' }}
          >
            See my work ↓
          </a>
        </div>

        {/* Scroll hint */}
        <div style={{
          position: 'absolute', bottom: '2.2rem', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          animation: 'heroFadeUp 0.8s 1s cubic-bezier(0.16,1,0.3,1) both',
        }}>
          <span style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.65rem', letterSpacing: '0.2em',
            color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase',
          }}>Scroll</span>
          <div style={{
            width: 1, height: 36,
            background: 'rgba(255,255,255,0.25)',
            animation: 'heroScrollLine 2s ease-in-out infinite',
          }} />
        </div>
      </div>

      <style>{`
        @keyframes ejPulse     { 0%,100%{opacity:1} 50%{opacity:0.35} }
        @keyframes ejBlink     { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes heroSlideDown { from{opacity:0;transform:translateY(-20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes heroFadeUp    { from{opacity:0;transform:translateY(30px)}  to{opacity:1;transform:translateY(0)} }
        @keyframes heroFloat     { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-18px) scale(1.02)} }
        @keyframes heroScrollLine{ 0%,100%{transform:scaleY(1);opacity:0.4} 50%{transform:scaleY(0.5);opacity:0.1} }
        @keyframes letterFall    { 0%{opacity:0;transform:translateY(-20px)} 100%{opacity:1;transform:translateY(0)} }
      `}</style>
    </section>
  )
}