import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import NavRail from './NavRail'

export default function Layout({ children, sections }) {
  const [activeSection, setActiveSection] = useState('home')
  const lenisRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (!prefersReduced) {
      lenisRef.current = new Lenis()
      const raf = (time) => {
        lenisRef.current.raf(time)
        requestAnimationFrame(raf)
      }
      requestAnimationFrame(raf)
    }
    return () => lenisRef.current?.destroy()
  }, [])

  useEffect(() => {
    const observers = []
    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { threshold: 0.4 }
      )
      observer.observe(el)
      observers.push(observer)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [sections])

  return (
    <>
      <NavRail sections={sections} activeSection={activeSection} />
      <main className="ml-0 md:ml-20">{children}</main>
    </>
  )
}
