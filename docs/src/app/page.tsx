"use client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import Process from "@/components/sections/Process";
import Portfolio from "@/components/sections/Portfolio";
import Testimonials from "@/components/sections/Testimonials";
// import Team from '@/components/sections/Team'
import CTA from "@/components/sections/CTA";
import Contact from "@/components/sections/Contact";
import Skills from "@/components/sections/Skills";
import Loader from "@/components/sections/loader";
import { useState } from "react";

export default function HomePage() {
  const [loaderDone, setLoaderDone] = useState(false);
  return (
    <>
      {/* Cinematic loader — unmounts itself via onComplete */}
      {!loaderDone && <Loader onComplete={() => setLoaderDone(true)} />}

      {/* Site shell — renders beneath loader, fades in once done */}
      <div
        style={{
          opacity: loaderDone ? 1 : 0,
          transition: "opacity 0.6s ease",
          visibility: loaderDone ? "visible" : "hidden",
        }}
      ></div>
      <Navbar />
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
  );
}
