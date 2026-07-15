import { useEffect, useState } from 'react'

/**
 * Universal "back to top" button.
 *
 * Fixed to the bottom-right of the screen. Appears on its own once the
 * page (or a given scroll container) has been scrolled past `threshold`,
 * and smooth-scrolls back to the top on click.
 *
 * By default it tracks `window` scroll, so it works on any normal page.
 * Pass `scrollContainerRef` when the scrollable area isn't the window
 * itself (e.g. a fixed, `overflow-y: auto` panel like the project detail
 * page) so it tracks and resets that container instead.
 *
 * Responsive by default:
 * - Sized as a proper ~46px touch target on mobile, tightening to a more
 *   refined ~40px on desktop (md breakpoint, matches the rest of the site).
 * - Offsets respect safe-area insets (notches / home indicator) on top of
 *   the usual viewport-scaled clamp() spacing.
 */
export default function BackToTop({
  scrollContainerRef = null,
  threshold = 400,
  bottomOffset = 'max(clamp(1rem, 4vw, 2.2rem), calc(env(safe-area-inset-bottom) + 0.75rem))',
  rightOffset = 'max(clamp(1rem, 4vw, 2.2rem), calc(env(safe-area-inset-right) + 0.75rem))',
  zIndex = 9500,
}) {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const target = scrollContainerRef?.current || window
    const getScrollTop = () =>
      target === window ? window.scrollY : target.scrollTop

    const onScroll = () => setVisible(getScrollTop() > threshold)
    onScroll() // sync immediately (handles remounts mid-scroll)

    target.addEventListener('scroll', onScroll, { passive: true })
    return () => target.removeEventListener('scroll', onScroll)
  }, [scrollContainerRef, threshold])

  // Manual rAF-driven smooth scroll instead of `scrollTo({ behavior: 'smooth' })`.
  // iOS Safari has a known bug where native smooth-scrolling a
  // `position: fixed; overflow-y: auto` container (exactly how the project
  // detail page's scroll area is built) glitches the compositor mid-animation,
  // making the whole page visually shrink/"zoom out" for a moment. Driving the
  // scroll ourselves avoids that browser code path entirely.
  const handleClick = (e) => {
    // Also avoids iOS trying to scroll the newly-focused fixed button into
    // view, which can itself nudge the visual viewport.
    e.currentTarget.blur()

    const target = scrollContainerRef?.current || window
    const isWindow = target === window
    const startY = isWindow ? window.scrollY : target.scrollTop
    if (startY <= 0) return

    const duration = 500
    const startTime = performance.now()
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const y = startY * (1 - easeOutCubic(progress))
      if (isWindow) window.scrollTo(0, y)
      else target.scrollTop = y
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }

  return (
    <>
      <button
        type="button"
        data-hover
        className="back-to-top-btn"
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="Back to top"
        aria-hidden={!visible}
        tabIndex={visible ? 0 : -1}
        style={{
          position: 'fixed',
          right: rightOffset,
          bottom: bottomOffset,
          zIndex,
          borderRadius: '50%',
          border: `1.5px solid ${hovered ? '#00E5A0' : 'rgba(255,255,255,0.18)'}`,
          background: hovered ? '#00E5A0' : 'rgba(10,10,10,0.75)',
          backdropFilter: 'blur(12px)',
          color: hovered ? '#0a0a0a' : 'rgba(255,255,255,0.7)',
          cursor: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(14px) scale(0.85)',
          pointerEvents: visible ? 'auto' : 'none',
          transition:
            'opacity 0.35s ease, transform 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.2s ease, background 0.2s ease, color 0.2s ease',
          boxShadow: hovered ? '0 0 18px rgba(0,229,160,0.4)' : '0 4px 20px rgba(0,0,0,0.45)',
        }}
      >
        <svg
          className="back-to-top-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transform: hovered ? 'translateY(-1px)' : 'none', transition: 'transform 0.2s ease' }}
        >
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>

      <style>{`
        .back-to-top-btn {
          width: 46px;
          height: 46px;
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }
        .back-to-top-icon {
          width: 16px;
          height: 16px;
        }
        @media (min-width: 768px) {
          .back-to-top-btn {
            width: 40px;
            height: 40px;
          }
          .back-to-top-icon {
            width: 14px;
            height: 14px;
          }
        }
        @media (hover: none) {
          .back-to-top-btn { cursor: pointer !important; }
        }
      `}</style>
    </>
  )
}

