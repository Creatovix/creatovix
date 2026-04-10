import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CodeCraft Studio — Full Stack, Shopify, WordPress & Design Agency',
  description: 'CodeCraft Studio is a full-service digital agency. We build high-performance websites, Shopify stores, WordPress sites, and stunning brand identities that grow your business.',
  keywords: [
    'full stack development agency',
    'shopify development agency',
    'wordpress development agency',
    'web design agency',
    'graphic design agency',
    'UI UX design services',
    'digital agency',
  ],
  authors: [{ name: 'CodeCraft Studio' }],
  openGraph: {
    title: 'CodeCraft Studio — Full Stack, Shopify, WordPress & Design Agency',
    description: 'We craft modern digital experiences that convert — from full-stack apps to stunning e-commerce stores.',
    type: 'website',
    locale: 'en_US',
    siteName: 'CodeCraft Studio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CodeCraft Studio',
    description: 'Full Stack · Shopify · WordPress · Graphic & Web Design.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}