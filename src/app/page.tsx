import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";
import Contact from "@/components/sections/Contact";
import Skills from "@/components/sections/Skills";
import { Metadata } from "next";

export const metadata: Metadata = {
  // 🔹 Inherit title/description from root layout, or override:
  // title: "Creatovix — Digital Agency | Web Design, Development & Shopify",
  // description: "Creatovix helps businesses grow with high-converting websites, powerful branding, and result-driven digital strategies.",
  
  // 🔹 Canonical URL
  alternates: {
    canonical: "https://www.creatovix.com/",
  },

  // 🔹 Open Graph (homepage-specific)
  openGraph: {
    title: "Creatovix — We Build Digital Experiences That Convert",
    description: "High-converting websites, powerful branding, and result-driven digital strategies for growing businesses.",
    url: "https://www.creatovix.com",
    type: "website",
    siteName: "Creatovix",
    locale: "en_US",
    images: [
      {
        url: "https://www.creatovix.com/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Creatovix — Digital Agency Portfolio Preview",
        type: "image/webp",
      },
    ],
  },

  // 🔹 Twitter Cards
  twitter: {
    card: "summary_large_image",
    title: "Creatovix — Digital Agency",
    description: "High-converting websites, powerful branding, and result-driven digital strategies.",
    site: "@creatovix",
    creator: "@creatovix",
    images: ["https://www.creatovix.com/og-image.webp"],
  },
};

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <Stats />
        <Services />
        <Skills />
        <About />
        <Process />
        <Testimonials />
        <CTA />
        <Contact />
      </main>
    </>
  );
}