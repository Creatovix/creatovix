


import ServicesPage from "@/components/sections/servicespage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Web & Shopify Services | Creatovix",
  description:
    "Creatovix offers professional web design, graphic design, web development, full-stack solutions, and custom Shopify stores — all built to drive real business results.",

  // 🔹 Canonical URL
  alternates: {
    canonical: "https://www.creatovix.com/services",
  },

  // 🔹 Keywords
  keywords: [
    "web design agency",
    "web development services",
    "custom Shopify store",
    "graphic design agency",
    "full stack development",
    "conversion rate optimisation",
    "Next.js development",
    "Creatovix services",
    "digital agency UK",
  ],

  // 🔹 Open Graph
  openGraph: {
    title: "Our Services | Web Design, Development & Shopify — Creatovix",
    description:
      "Explore Creatovix's full range of services: web design, graphic design, web development, full-stack builds, and custom Shopify stores — all results-driven.",
    url: "https://www.creatovix.com/services",
    type: "website",
    siteName: "Creatovix",
    locale: "en_US",
    images: [
      {
        url: "https://www.creatovix.com/services-og.webp",
        width: 1200,
        height: 630,
        alt: "Creatovix Services — Web Design, Development & Shopify Agency",
        type: "image/webp",
      },
    ],
  },

  // 🔹 Twitter Cards
  twitter: {
    card: "summary_large_image",
    title: "Our Services | Web Design, Development & Shopify — Creatovix",
    description:
      "Web design, graphic design, development, full-stack & Shopify — all built around real results. See what Creatovix can do for your business.",
    site: "@creatovix",
    creator: "@creatovix",
    images: ["https://www.creatovix.com/services-og.webp"],
  },

  // 🔹 Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};



export default function Services () {
  return (
    <div>
      <ServicesPage />
    </div>
  )
}