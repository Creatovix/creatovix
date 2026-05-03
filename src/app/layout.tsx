import type { Metadata, Viewport } from "next";
import "./globals.css";
import StructuredData from "@/components/StructuredData";
import SmoothScrollProvider from "@/providers/SmoothScrollProvider";
import LayoutWrapper from "@/components/LayoutWrapper";

export const viewport: Viewport = {
  themeColor: "#04020a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  // 🔹 Core Metadata
  title: {
    default: "Creatovix — Digital Agency | Web Design, Development & Shopify",
    template: "%s | Creatovix",
  },
  description:
    "Creatovix helps businesses grow with high-converting websites, powerful branding, and result-driven digital strategies.",

  // 🔹 Canonical & Base URL
  metadataBase: new URL("https://www.creatovix.com"),
  alternates: {
    canonical: "/",
  },

  // 🔹 Keywords
  keywords: [
    "digital agency",
    "web design agency",
    "web design",
    "web development agency",
    "web development",
    "full stack development",
    "shopify development",
    "shopify experts",
    "graphic design agency",
    "graphic design",
    "UI UX design",
    "brand identity",
    "conversion optimization",
    "creatovix",
    "creative agency",
    "responsive web design",
    "ecommerce development",
  ],

  // 🔹 Authors & Publisher
  authors: [{ name: "Creatovix", url: "https://www.creatovix.com" }],
  publisher: "Creatovix",
  creator: "Creatovix",

  // 🔹 Open Graph (Facebook, LinkedIn, WhatsApp)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.creatovix.com",
    siteName: "Creatovix",
    title: "Creatovix — We Build Digital Experiences That Convert",
    description:
      "High-converting websites, powerful branding, and result-driven digital strategies for growing businesses.",
    images: [
      {
        url: "https://www.creatovix.com/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Creatovix — Digital Agency Portfolio Preview",
        type: "image/jpeg",
      },
    ],
  },

  // 🔹 Twitter Cards
  twitter: {
    card: "summary_large_image",
    site: "@creatovix",
    creator: "@creatovix",
    title: "Creatovix — Digital Agency",
    description:
      "High-converting websites, powerful branding, and result-driven digital strategies.",
    images: ["https://www.creatovix.com/og-image.webp"],
  },

  // 🔹 Robots & Indexing
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // 🔹 Verification (replace with your actual codes)
  verification: {
    google:
      "google-site-verification=JrbhqyPA2MelAMaCyCLmZKE3G5msBLgw_JFiZnt6c_A",
  },

  // 🔹 App & Mobile
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Creatovix",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // 🔹 Category
  category: "business",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* 🔹 Preconnect for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="WfTmF8PCqmcfkO5fhVtz3w"
          async
        ></script>

        {/* 🔹 Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />

        {/* 🔹 Favicons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/logo.png" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon-192.png" />

        {/* 🔹 PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* 🔹 DNS Prefetch for External Resources (if used) */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>

      <body className="antialiased bg-[#04020a] text-white overflow-x-hidden">
        {/* 🔹 JSON-LD Structured Data */}
        <SmoothScrollProvider>
          <StructuredData />

          {/* 🔹 Page Content */}
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </SmoothScrollProvider>

        {/* 🔹 Optional: Add a hidden skip link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-white focus:text-black focus:p-3 focus:rounded focus:z-50"
        >
          Skip to content
        </a>
      </body>
    </html>
  );
}
