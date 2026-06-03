import { useDarkMode } from '../DarkModeContext'

export default function DarkModeToggle() {
  const { isDark, toggle } = useDarkMode()

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: isDark ? 'rgba(163,230,53,0.1)' : 'rgba(255,255,255,0.08)',
        border: isDark ? '1px solid rgba(163,230,53,0.3)' : '1px solid rgba(255,255,255,0.15)',
        borderRadius: '100px',
        padding: '6px 14px 6px 8px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Toggle track */}
      <div style={{
        position: 'relative',
        width: 36,
        height: 20,
        background: isDark ? '#a3e635' : 'rgba(255,255,255,0.15)',
        borderRadius: 100,
        transition: 'background 0.3s ease',
        flexShrink: 0,
      }}>
        {/* Toggle thumb */}
        <div style={{
          position: 'absolute',
          top: 3,
          left: isDark ? 17 : 3,
          width: 14,
          height: 14,
          borderRadius: '50%',
          background: isDark ? '#1a1a1a' : '#ffffff',
          transition: 'left 0.3s cubic-bezier(0.16,1,0.3,1), background 0.3s ease',
          boxShadow: isDark ? '0 0 6px rgba(163,230,53,0.5)' : '0 1px 4px rgba(0,0,0,0.3)',
        }} />
      </div>

      {/* Label */}
      <span style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: '0.68rem',
        letterSpacing: '0.08em',
        color: isDark ? '#a3e635' : 'rgba(255,255,255,0.55)',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        transition: 'color 0.3s ease',
      }}>
        {isDark ? 'Dark' : 'Light'}
      </span>
    </button>
  )
}
