import type { Config } from 'tailwindcss'

// In Tailwind v4, theme customization lives in globals.css inside @theme {}
// This file only needs to specify content paths for class scanning
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
}

export default config