import Layout from './components/Layout'
import Hero from './sections/Hero'
import Work from './sections/Work'
import Skills from './sections/Skills'
import About from './sections/About'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

export default function App() {
  return (
    <Layout sections={SECTIONS}>
      <Hero />
      <Work />
      <Skills />
      <About />
      <Contact />
      <Footer />
    </Layout>
  )
}
