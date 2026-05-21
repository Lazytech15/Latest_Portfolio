import { useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const blobRef = useRef(null)
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const current = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const hovering = useRef(false)
  const clicking = useRef(false)
  const rafId = useRef(null)
  const [wiped, setWiped] = useState(false)

  useEffect(() => {
    // Page entry wipe
    requestAnimationFrame(() => {
      setTimeout(() => setWiped(true), 80)
    })

    const onMove = (e) => {
      pos.current.x = e.clientX
      pos.current.y = e.clientY
    }
    const onDown = () => { clicking.current = true; blobRef.current?.classList.add('clicking') }
    const onUp = () => { clicking.current = false; blobRef.current?.classList.remove('clicking') }
    const onEnter = () => { hovering.current = true; blobRef.current?.classList.add('hovering') }
    const onLeave = () => { hovering.current = false; blobRef.current?.classList.remove('hovering') }

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
      document.querySelectorAll('a, button, [data-hover]').forEach(el => {
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

  return (
    <>
      {/* Page wipe overlay */}
      <div className={`page-wipe${wiped ? ' wiped' : ''}`} />

      {/* Cursor blob */}
      <div ref={blobRef} className="cursor-blob" />

      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}