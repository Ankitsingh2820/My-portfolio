import Layout from './components/Layout'
import Hero from './sections/Hero'
import About from './sections/About'
import Work from './sections/Work'
import Skills from './sections/Skills'
import Services from './sections/Services'
import Process from './sections/Process'
import AskAI from './sections/AskAI'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'services', label: 'Services' },
  { id: 'process', label: 'Process' },
  { id: 'ask-ai', label: 'Ask AI' },
  { id: 'contact', label: 'Contact' },
]

export default function App() {
  return (
    <Layout sections={SECTIONS}>
      <Hero />
      <About />
      <Work />
      <Skills />
      <Services />
      <Process />
      <AskAI />
      <Contact />
      <Footer />
    </Layout>
  )
}
