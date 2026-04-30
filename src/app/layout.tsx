import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Creatovix — Digital Agency | Web Design, Development & Shopify",
  description:
    "Creatovix helps businesses grow with high-converting websites, powerful branding, and result-driven digital strategies. Web design, full stack development, and Shopify experts.",
  keywords: [
    "digital agency",
    "web design agency",
    "web development agency",
    "full stack development",
    "shopify development",
    "graphic design agency",
    "UI UX design",
    "brand identity",
    "creatovix",
  ],
  authors: [{ name: "Creatovix" }],
  openGraph: {
    title: "Creatovix — We Build Digital Experiences That Turn Visitors Into Paying Clients",
    description:
      "Creatovix helps businesses grow with high-converting websites, powerful branding, and result-driven digital strategies.",
    type: "website",
    locale: "en_US",
    siteName: "Creatovix",
  },
  twitter: {
    card: "summary_large_image",
    title: "Creatovix — Digital Agency",
    description: "High-converting websites, powerful branding, and result-driven digital strategies.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[#04020a] text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}