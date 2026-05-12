import PortfolioSection from "@/components/sections/Portfolio";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Work | Award-Winning Web Design & Development Portfolio — Creatovix",
  description: "Explore Creatovix’s portfolio of high-converting websites, custom Shopify stores. See how we help businesses scale that turn visitors into customers.",
  
  // 🔹 Canonical URL
  alternates: {
    canonical: "https://www.creatovix.com/portfolio",
  },

  // 🔹 Open Graph
  openGraph: {
    title: "Portfolio | Creatovix",
    description: "Explore our latest web design, development, and graphic design projects.",
    url: "https://www.creatovix.com/portfolio",
    type: "website",
    siteName: "Creatovix",
    locale: "en_US",
    images: [
      {
        url: "https://www.creatovix.com/portfolio-og.webp",
        width: 1200,
        height: 630,
        alt: "Creatovix Portfolio — Digital Agency Projects",
        type: "image/webp",
      },
    ],
  },

  // 🔹 Twitter Cards
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Creatovix",
    description: "Explore our latest web design, development, and graphic design projects.",
    site: "@creatovix",
    creator: "@creatovix",
    images: ["https://www.creatovix.com/portfolio-og.webp"],
  },
};

export default function Portfolio() {
  return (
    <div>
      <PortfolioSection />
    </div>
  );
}