import Layout from './components/Layout'
import Hero from './sections/Hero'
import Services from './sections/Services'
import Work from './sections/Work'
import Process from './sections/Process'
import About from './sections/About'
import AskAI from './sections/AskAI'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Work' },
  { id: 'process', label: 'Process' },
  { id: 'about', label: 'About' },
  { id: 'ask-ai', label: 'Ask AI' },
  { id: 'contact', label: 'Contact' },
]

export default function App() {
  return (
    <Layout sections={SECTIONS}>
      <Hero />
      <Services />
      <Work />
      <Process />
      <About />
      <AskAI />
      <Contact />
      <Footer />
    </Layout>
  )
}
