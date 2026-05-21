export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        background: 'var(--bg)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '3rem 2rem 2.5rem',
      }}
    >
      <div className="px-6 lg:px-14">
        {/* Marquee */}
        <div
          style={{
            overflow: 'hidden',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            padding: '1rem 0',
            marginBottom: '3rem',
          }}
        >
          <div className="marquee-inner" style={{ gap: '3rem' }}>
            {Array(8).fill(['REACT', '·', 'VITE', '·', 'ESP32', '·', 'NODE.JS', '·', 'REACT NATIVE', '·', 'ELECTRON', '·', 'N8N', '·', 'MYSQL', '·']).flat().map((t, i) => (
              <span
                key={i}
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '0.7rem',
                  letterSpacing: '0.2em',
                  color: t === '·' ? 'var(--accent)' : 'rgba(255,255,255,0.2)',
                  textTransform: 'uppercase',
                  padding: '0 0.5rem',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div
              style={{
                width: 28,
                height: 28,
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)' }}>ESA</span>
            </div>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.04em' }}>
              dev.portfolio
            </span>
          </div>

          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.72rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.06em' }}>
            {year} © Built with React · Vite · TailwindCSS
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: "'DM Mono', monospace", fontSize: '0.72rem', color: 'rgba(255,255,255,0.25)' }}>
            <span
              className="status-dot"
              style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }}
            />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  )
}