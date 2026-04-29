"use client"
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Stats from '@/components/sections/Stats'
import Services from '@/components/sections/Services'
import About from '@/components/sections/About'
import Process from '@/components/sections/Process'
import Portfolio from '@/components/sections/Portfolio'
import Testimonials from '@/components/sections/Testimonials'
// import Team from '@/components/sections/Team'
import CTA from '@/components/sections/CTA'
import Contact from '@/components/sections/Contact'
import Skills from '@/components/sections/Skills'
import Loader from '@/components/sections/loader'

export default function HomePage() {
  return (
    <>
      <Navbar />
      {/* <Loader onComplete={function (): void {
        throw new Error('Function not implemented.')
      } } /> */}
      <main>
        <Hero />
        <Stats />
        <Services />
        <Skills />
        <About />
        <Process />
        <Portfolio />
        <Testimonials />
        {/* <Team /> */}
        <CTA />
        <Contact />
      </main>
      <Footer />
    </>
  )
}