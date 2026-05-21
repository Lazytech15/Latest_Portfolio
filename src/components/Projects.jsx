import { useEffect, useRef, useState } from 'react'

const projects = [
  {
    number: '001',
    category: 'IoT',
    title: 'SmartHome Hub',
    description: 'ESP32-based smart home monitoring system with real-time sensor data visualization.',
    fullDescription: 'A complete smart home monitoring system powered by ESP32 microcontrollers. Tracks temperature, humidity, motion, and energy consumption with live alerts and a React dashboard. Data flows via MQTT to a Node.js broker and lands in a MySQL database.\n\nThe dashboard shows live chart streams via WebSocket, supports multiple device nodes, and sends push alerts when thresholds are exceeded.',
    tech: ['ESP32', 'MQTT', 'React Vite', 'WebSocket', 'Node.js', 'MySQL'],
    highlights: ['Real-time sensor telemetry', 'MQTT broker integration', 'Live chart dashboard', 'Mobile-ready UI'],
    status: 'Shipped',
  },
  {
    number: '002',
    category: 'Web App',
    title: 'StockMaster Pro',
    description: 'Full-stack inventory management system for small-to-medium businesses.',
    fullDescription: 'A comprehensive inventory management platform built for SMEs. Features barcode scanning for rapid stock intake, automated low-stock alerts, purchase order generation, and detailed sales reports.\n\nRole-based access control allows admins, managers, and staff to have different permissions. Built on PHP + MySQL with a React Vite frontend.',
    tech: ['React Vite', 'PHP', 'MySQL', 'TailwindCSS'],
    highlights: ['Barcode scanning', 'Role-based access', 'Sales reporting', 'Low-stock alerts'],
    status: 'Shipped',
  },
  {
    number: '003',
    category: 'Desktop',
    title: 'NeuralDesk',
    description: 'Electron-based desktop AI assistant with system tray and offline-capable workflows.',
    fullDescription: 'A cross-platform desktop app built with Electron and React. The renderer process handles a clean AI chat interface, while the main process manages file watchers, system tray integration, and IPC bridges to native OS APIs.\n\nSupports custom keyboard shortcuts, hot-key triggers, and SQLite local storage so it works completely offline.',
    tech: ['Electron', 'React', 'Node.js', 'IPC', 'SQLite'],
    highlights: ['System tray app', 'IPC bridge', 'File watcher', 'Hot key triggers'],
    status: 'In Progress',
  },
  {
    number: '004',
    category: 'Mobile',
    title: 'QuickTrack Mobile',
    description: 'Cross-platform React Native app for field technicians to log and sync equipment status.',
    fullDescription: 'Built for field technicians who need to work with or without internet. The app allows logging equipment status, capturing photos, recording notes, and generating PDF reports on-device.\n\nData syncs to a REST API when connectivity is restored. Push notifications alert technicians to overdue equipment checks.',
    tech: ['React Native', 'Expo', 'AsyncStorage', 'REST API', 'PDF Generation'],
    highlights: ['Offline-first', 'Camera integration', 'PDF export', 'Push notifications'],
    status: 'Shipped',
  },
  {
    number: '005',
    category: 'Automation',
    title: 'AutoFlow Engine',
    description: 'n8n-based automation suite connecting Google Sheets, email, Slack, REST APIs, and IoT webhooks.',
    fullDescription: 'A suite of n8n automation workflows designed for business-critical data pipelines. Includes custom n8n nodes written in TypeScript for specialized API integrations.\n\nSupports multi-step error handling and fallback paths, scheduled triggers via Cron, and real-time event-driven flows from IoT webhooks and Slack commands.',
    tech: ['n8n', 'TypeScript', 'Webhooks', 'REST APIs', 'Cron', 'Slack API'],
    highlights: ['Custom n8n nodes', 'Multi-step pipelines', 'Error handling', 'Scheduled triggers'],
    status: 'Shipped',
  },
  {
    number: '006',
    category: 'IoT + Web',
    title: 'AgroSense',
    description: 'Smart agriculture monitoring with ESP32 soil sensors and a React dashboard.',
    fullDescription: 'A smart farming system using ESP32-based sensor arrays to monitor soil moisture, pH, and NPK levels across multiple field nodes. Farmers access real-time data from a React dashboard and can configure automated irrigation triggers.\n\nAn n8n automation pipeline sends SMS alerts when soil conditions fall below thresholds.',
    tech: ['ESP32', 'Sensors', 'React Vite', 'MQTT', 'Node.js', 'MySQL', 'n8n'],
    highlights: ['Soil sensor array', 'Auto irrigation', 'Remote monitoring', 'SMS alerts via n8n'],
    status: 'In Progress',
  },
]

function Modal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="modal-overlay open" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-panel">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>
                {project.number}
              </span>
              <span className="tag">{project.category}</span>
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '0.7rem',
                  color: project.status === 'Shipped' ? 'var(--accent)' : '#FFD93D',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <span className="status-dot" style={{ width: 5, height: 5, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />
                {project.status}
              </span>
            </div>
            <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.5rem', color: 'var(--white)', letterSpacing: '0.02em' }}>
              {project.title}
            </h3>
          </div>
          <button
            data-hover
            onClick={onClose}
            style={{
              background: 'none',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.5)',
              width: 36,
              height: 36,
              borderRadius: 6,
              cursor: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'border-color 0.2s, color 0.2s',
              fontSize: '1rem',
            }}
            onMouseEnter={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.4)'; e.target.style.color = 'var(--white)' }}
            onMouseLeave={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.color = 'rgba(255,255,255,0.5)' }}
          >
            ×
          </button>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          {project.fullDescription.split('\n\n').map((p, i) => (
            <p key={i} style={{ fontWeight: 300, fontSize: '0.95rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: '0.8rem' }}>
              {p}
            </p>
          ))}
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.68rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            Key Features
          </p>
          <ul style={{ listStyle: 'none' }}>
            {project.highlights.map((h, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 300, fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.4rem' }}>
                <span style={{ color: 'var(--accent)', fontSize: '0.8rem' }}>→</span>
                {h}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.68rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            Stack
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {project.tech.map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <a href="#" className="btn btn-ghost" style={{ fontSize: '0.85rem', padding: '10px 22px' }}>
            GitHub ↗
          </a>
          <a href="#" className="btn btn-fill-accent" style={{ fontSize: '0.85rem', padding: '10px 22px' }}>
            Live Demo ↗
          </a>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const sectionRef = useRef(null)
  const [modal, setModal] = useState(null)

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
    <>
      {modal && <Modal project={modal} onClose={() => setModal(null)} />}

      <section
        id="projects"
        ref={sectionRef}
        className="section-white rounded-top-section"
        style={{ padding: '6rem 2rem 7rem', position: 'relative', zIndex: 2 }}
      >
        <div className="px-6 lg:px-14">
          {/* Label */}
          <div className="reveal reveal-d1 flex items-center gap-3 mb-16">
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '0.72rem',
                letterSpacing: '0.18em',
                color: 'rgba(0,0,0,0.3)',
                textTransform: 'uppercase',
              }}
            >
              03 / My Work
            </span>
            <div style={{ flex: 1, height: 1, background: 'rgba(0,0,0,0.07)' }} />
          </div>

          {/* Heading */}
          <div className="reveal reveal-d2 mb-4">
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(3.5rem, 8vw, 7rem)',
                lineHeight: 0.9,
                color: '#0a0a0a',
                letterSpacing: '0.01em',
              }}
            >
              Selected Projects
            </h2>
          </div>

          <p className="reveal reveal-d3" style={{ fontWeight: 300, fontSize: '0.9rem', color: 'rgba(0,0,0,0.45)', fontFamily: "'DM Mono', monospace", letterSpacing: '0.06em', marginBottom: '3rem' }}>
            // Click any project for full details
          </p>

          {/* Project list */}
          <div className="reveal reveal-d3">
            {projects.map((p, i) => (
              <div
                key={i}
                data-hover
                onClick={() => setModal(p)}
                className="project-row"
                style={{ gap: '2rem' }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '2rem', flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.72rem', color: 'rgba(0,0,0,0.3)', letterSpacing: '0.08em', minWidth: '2.5rem' }}>
                    {p.number}
                  </span>
                  <span className="project-row-title">{p.title}</span>
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: '0.72rem',
                      color: 'rgba(0,0,0,0.35)',
                      letterSpacing: '0.06em',
                      display: 'none',
                    }}
                    className="hidden lg:inline"
                  >
                    {p.description}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.7rem', letterSpacing: '0.08em', color: 'rgba(0,0,0,0.4)', display: 'none' }} className="hidden md:inline">
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
                    }}
                  >
                    <span className="status-dot" style={{ width: 5, height: 5, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />
                    {p.status}
                  </span>
                  <span className="project-row-arrow" style={{ color: 'rgba(0,0,0,0.5)' }}>→</span>
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
    </>
  )
}