import { useState, useEffect } from 'react'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-[#0a0a0a]/80 backdrop-blur-md' : ''
        }`}
      >
        <div className="flex items-center justify-between px-8 lg:px-16 h-16">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => go(e, '#')}
            className="flex items-center gap-2 group"
            style={{ textDecoration: 'none' }}
          >
            <div className="w-8 h-8 border border-[rgba(255,255,255,0.15)] flex items-center justify-center rounded-sm">
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', color: 'rgba(255,255,255,0.6)' }}>ESA</span>
            </div>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>
              © coded by Emmanuel
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-10">
            {links.map((l) => (
              <a key={l.label} href={l.href} onClick={(e) => go(e, l.href)} className="nav-link">
                {l.label}
              </a>
            ))}
          </div>

          {/* Right: Contact CTA */}
          <a
            href="#contact"
            onClick={(e) => go(e, '#contact')}
            className="hidden md:inline-flex nav-link items-center gap-1.5"
            style={{ opacity: 1 }}
          >
            Contact ↗
          </a>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            style={{ cursor: 'none' }}
          >
            <span
              className="block w-6 h-px bg-white/70 transition-all duration-300"
              style={{ transform: menuOpen ? 'rotate(45deg) translateY(4px)' : '' }}
            />
            <span
              className="block w-6 h-px bg-white/70 transition-all duration-300"
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block w-6 h-px bg-white/70 transition-all duration-300"
              style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-4px)' : '' }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col justify-center items-center transition-all duration-500 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center gap-10">
          {[...links, { label: 'Contact', href: '#contact' }].map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={(e) => go(e, l.href)}
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(3rem, 10vw, 6rem)',
                color: 'rgba(245,243,238,0.85)',
                textDecoration: 'none',
                letterSpacing: '0.04em',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--accent)')}
              onMouseLeave={(e) => (e.target.style.color = 'rgba(245,243,238,0.85)')}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </>
  )
}