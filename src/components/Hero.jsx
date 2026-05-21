import { useState, useEffect, useRef } from 'react'

const roles = [
  'FULL STACK DEV',
  'IOT ENGINEER',
  'MOBILE DEV',
  'AUTOMATION',
  'DESKTOP DEV',
]

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [charIndex, setCharIndex] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const role = roles[currentRole]
    const speed = isDeleting ? 30 : 65
    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < role.length) {
          setDisplayText(role.slice(0, charIndex + 1))
          setCharIndex(charIndex + 1)
        } else {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (charIndex > 0) {
          setDisplayText(role.slice(0, charIndex - 1))
          setCharIndex(charIndex - 1)
        } else {
          setIsDeleting(false)
          setCurrentRole((p) => (p + 1) % roles.length)
        }
      }
    }, speed)
    return () => clearTimeout(timer)
  }, [charIndex, isDeleting, currentRole])

  const words = ['EMMANUEL', 'SAPICO', 'ABLAO']

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-20 pb-12 px-8 lg:px-16 overflow-hidden">
      {/* Main headline — fills viewport width */}
      <div className="flex-1 flex flex-col justify-center">
        <div
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'none' : 'translateY(30px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
            transitionDelay: '0.2s',
          }}
        >
          {words.map((word, i) => (
            <div
              key={word}
              className="overflow-hidden"
              style={{ lineHeight: 0.88 }}
            >
              <div
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(5rem, 18vw, 20rem)',
                  letterSpacing: '-0.01em',
                  color: i === 2 ? 'transparent' : 'var(--white)',
                  WebkitTextStroke: i === 2 ? '2px rgba(245,243,238,0.4)' : 'none',
                  transform: mounted ? 'translateY(0)' : 'translateY(105%)',
                  transition: `transform 1s cubic-bezier(0.16,1,0.3,1)`,
                  transitionDelay: `${0.1 + i * 0.08}s`,
                  display: 'block',
                }}
              >
                {word}
              </div>
            </div>
          ))}
        </div>

        {/* Role + descriptor row */}
        <div
          className="flex items-center gap-6 mt-10 flex-wrap"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'none' : 'translateY(20px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
            transitionDelay: '0.6s',
          }}
        >
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.8rem',
              letterSpacing: '0.15em',
              color: 'rgba(255,255,255,0.4)',
              textTransform: 'uppercase',
            }}
          >
            {displayText}
            <span className="blink" style={{ color: 'var(--accent)' }}>_</span>
          </span>

          <span style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.15)' }} />

          <div className="flex items-center gap-2">
            <span
              className="status-dot"
              style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }}
            />
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                color: 'rgba(255,255,255,0.35)',
              }}
            >
              Available for opportunities
            </span>
          </div>

          <span style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.15)' }} />

          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.75rem',
              color: 'rgba(255,255,255,0.3)',
              letterSpacing: '0.05em',
            }}
          >
            Philippines
          </span>
        </div>
      </div>

      {/* Bottom row */}
      <div
        className="flex items-end justify-between mt-8"
        style={{
          opacity: mounted ? 1 : 0,
          transition: 'opacity 0.8s ease',
          transitionDelay: '0.9s',
        }}
      >
        <p
          className="max-w-sm"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            fontSize: '1rem',
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.45)',
          }}
        >
          Building end-to-end digital experiences — from IoT hardware and embedded systems to cross-platform mobile, desktop, and web apps.
        </p>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href="#projects"
            onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="btn btn-fill-accent"
          >
            View Work
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="btn btn-ghost"
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 right-8 flex flex-col items-center gap-2"
        style={{
          opacity: mounted ? 0.3 : 0,
          transition: 'opacity 1s ease',
          transitionDelay: '1.2s',
        }}
      >
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            writingMode: 'vertical-rl',
            color: 'rgba(255,255,255,0.5)',
          }}
        >
          SCROLL
        </span>
        <div style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)' }} />
      </div>
    </section>
  )
}