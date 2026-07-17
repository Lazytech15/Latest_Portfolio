import { useEffect, useRef, useState } from 'react'
import { useDarkMode } from '../DarkModeContext'

const HIGHLIGHTS = [
  {
    title: 'Inventory Control System',
    stack: 'React · Vite · Supabase',
    note: 'Offline-first stock management with real-time synced dashboards and RLS-secured multi-role access.',
  },
  {
    title: 'EAT-ALL POS',
    stack: 'Electron · React · SQLite',
    note: 'Cross-platform desktop POS with offline-first IPC architecture and live sales analytics.',
  },
  {
    title: 'Quick Track',
    stack: 'React Native · Expo',
    note: 'Field technician app with offline syncing, equipment tracking, and on-device PDF reporting.',
  },
  {
    title: 'ERJ Smart Solutions',
    stack: 'React · Supabase · ESP32 · NFC',
    note: 'HR/attendance platform with custom ESP32 + NFC hardware integration and role-based access control.',
  },
]

const SKILL_CHIPS = [
  'React', 'TypeScript', 'JavaScript', 'React Native', 'Node.js',
  'SQL', 'Supabase', 'Firebase', 'Electron', 'IoT', 'Arduino', 'PlatformIO', 'Git',
]

export default function Resume() {
  const sectionRef = useRef(null)
  const { isDark } = useDarkMode()
  
  const [isMobile, setIsMobile] = useState(false)
  const [openHighlight, setOpenHighlight] = useState(null)

  const bg           = isDark ? '#1a1a1a' : '#0a0a0a'
  const fg           = '#f2f0eb'
  const acc          = '#c8ff00'
  const accText      = '#c8ff00'
  const muted        = 'rgba(242,240,235,0.55)'
  const subtle       = 'rgba(242,240,235,0.28)'
  const border       = 'rgba(242,240,235,0.10)'
  const borderStrong = 'rgba(242,240,235,0.20)'

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)

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
    
    return () => {
      window.removeEventListener('resize', handleResize)
      observer.disconnect()
    }
  }, [])

  return (
    <section
      id="resume"
      ref={sectionRef}
      style={{
        background: bg,
        color: fg,
        fontFamily: "'DM Sans', sans-serif",
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 0.5s ease',
        paddingBottom: 'clamp(8rem, 15vw, 10rem)',
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: acc, zIndex: 10 }} />

      <div aria-hidden="true" style={{
        position: 'absolute',
        right: '-2%', top: '3%',
        fontFamily: "'Bebas Neue', Impact, sans-serif",
        fontSize: 'clamp(100px, 16vw, 240px)',
        lineHeight: 0.85,
        color: 'transparent',
        WebkitTextStroke: '1px rgba(242,240,235,0.04)',
        userSelect: 'none', pointerEvents: 'none', zIndex: 0,
      }}>
        RESUME
      </div>

      <div style={{
        position: 'relative', zIndex: 2,
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.25rem, 4vw, 3.5rem) 0',
      }}>
        <div className="reveal reveal-d1" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: 'clamp(2rem, 5vw, 4rem)' }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', letterSpacing: '0.25em', color: accText, textTransform: 'uppercase' }}>
            ↳ 04 / Resume
          </span>
          <div style={{ flex: 1, height: '0.5px', background: border }} />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: 'clamp(2.5rem, 6vw, 5rem)',
          alignItems: 'start',
        }}>
          {/* LEFT COLUMN */}
          <div>
            <div className="reveal reveal-d2" style={{ overflow: 'hidden', marginBottom: 'clamp(1.25rem, 3vw, 2.5rem)' }}>
              <h2 style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 'clamp(3rem, 7vw, 8rem)', fontWeight: 400, lineHeight: 0.88, color: fg, margin: 0 }}>On Paper,</h2>
              <h2 style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 'clamp(3rem, 7vw, 8rem)', fontWeight: 400, lineHeight: 0.88, color: 'transparent', WebkitTextStroke: `2px ${fg}`, margin: 0 }}>Too.</h2>
            </div>

            <p className="reveal reveal-d3" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.05rem)', lineHeight: 1.85, color: muted, fontWeight: 300, margin: '0 0 clamp(1.5rem, 4vw, 2rem)', maxWidth: 440 }}>
              Full-Stack Developer with hands-on experience building web, mobile, desktop, and IoT-integrated systems — React, TypeScript, Node.js, and Supabase/SQL on the software side, ESP32 and NFC on the hardware side.
            </p>

            <div className="reveal reveal-d4" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 'clamp(2rem, 5vw, 3rem)' }}>
              <a href="/resume/Emmanuel_Ablao_ATS_Resume.pdf" download style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: acc, color: '#0d0d0d', fontFamily: "'DM Mono', monospace", fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '14px 28px', textDecoration: 'none' }}>Download PDF</a>
              {/* <a href="/resume/Emmanuel_Ablao_ATS_Resume.docx" download style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', color: muted, fontFamily: "'DM Mono', monospace", fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none', border: `0.5px solid ${borderStrong}`, padding: '14px 28px' }}>Download DOCX</a> */}
            </div>

            <div className="reveal reveal-d4">
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.22em', color: accText, textTransform: 'uppercase', marginBottom: '0.9rem' }}>Education</div>
              <div style={{ borderTop: `0.5px solid ${border}` }}>
                <div style={{ padding: '1.1rem 0', borderBottom: `0.5px solid ${border}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}><span style={{ fontSize: '0.92rem', color: fg }}>BS Information Technology</span><span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.68rem', color: subtle }}>2022 – 2025</span></div>
                  <div style={{ fontSize: '0.8rem', color: muted, marginTop: 4 }}>ICCT Colleges — Best in Website Development</div>
                </div>
                <div style={{ padding: '1.1rem 0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}><span style={{ fontSize: '0.92rem', color: fg }}>BSIT (Vocational, 2 yrs)</span><span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.68rem', color: subtle }}>2016 – 2017</span></div>
                  <div style={{ fontSize: '0.8rem', color: muted, marginTop: 4 }}>Gateway Institute of Science and Information Technology</div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="reveal reveal-d3">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.25em', color: accText, textTransform: 'uppercase' }}>↳ Project Highlights</span>
              <div style={{ flex: 1, height: '0.5px', background: border }} />
            </div>

            <div style={{ borderTop: `0.5px solid ${border}`, marginBottom: '3rem' }}>
              {HIGHLIGHTS.map((h, i) => {
                const isOpen = !isMobile || openHighlight === i;
                return (
                  <div key={h.title} style={{ borderBottom: `0.5px solid ${border}` }}>
                    <div 
                      onClick={() => isMobile && setOpenHighlight(openHighlight === i ? null : i)}
                      style={{ 
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '1.1rem 0', cursor: isMobile ? 'pointer' : 'default',
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.95rem', color: fg, fontWeight: 500, marginBottom: 4 }}>{h.title}</div>
                        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', color: accText }}>{h.stack}</div>
                      </div>
                      {isMobile && <div style={{ fontSize: '1.2rem', color: muted, marginLeft: '1rem' }}>{isOpen ? '−' : '+'}</div>}
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows 0.3s ease' }}>
                      <div style={{ overflow: 'hidden' }}>
                        <p style={{ fontSize: '0.82rem', color: muted, lineHeight: 1.6, margin: 0, paddingBottom: isOpen ? '1.1rem' : '0' }}>{h.note}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.25em', color: accText, textTransform: 'uppercase' }}>↳ Core Skills</span>
              <div style={{ flex: 1, height: '0.5px', background: border }} />
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {SKILL_CHIPS.map((s) => (
                <span key={s} style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.72rem', color: muted, border: `0.5px solid ${borderStrong}`, padding: '7px 14px' }}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}