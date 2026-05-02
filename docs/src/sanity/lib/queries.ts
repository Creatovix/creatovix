// lib/sanity/queries.ts
// GROQ queries for Team and Portfolio sections

import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'

// ─── Client Setup ────────────────────────────────────────────────────────────
// Replace these values with your own project settings
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
})

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SanityTeamMember {
  name: string
  role: string
  bio: string
  image: SanityImageSource | null
  accentColor: string
  skills: string[]
}

export interface SanityTeamSection {
  sectionTag: string
  heading: string
  subheading: string
  members: SanityTeamMember[]
}

export interface SanityProject {
  num: string
  title: string
  category: string
  description: string
  result: string
  color: string
  image: SanityImageSource | null
  tags: string[]
  caseStudyUrl?: string
}

export interface SanityPortfolioSection {
  sectionTag: string
  heading: string
  subheading: string
  projects: SanityProject[]
}

// ─── GROQ Queries ─────────────────────────────────────────────────────────────

const TEAM_QUERY = `*[_type == "teamSection"][0]{
  sectionTag,
  heading,
  subheading,
  members[]{
    name,
    role,
    bio,
    image,
    accentColor,
    skills
  }
}`

const PORTFOLIO_QUERY = `*[_type == "portfolioSection"][0]{
  sectionTag,
  heading,
  subheading,
  projects[]{
    num,
    title,
    category,
    "description": description,
    result,
    color,
    image,
    tags,
    caseStudyUrl
  }
}`

// ─── Fetch Functions ───────────────────────────────────────────────────────────

/**
 * Fetch team section data from Sanity.
 * Returns null if no document exists yet — the component will fall back
 * to hardcoded defaults in that case.
 */
export async function getTeamSection(): Promise<SanityTeamSection | null> {
  try {
    const data = await sanityClient.fetch<SanityTeamSection | null>(TEAM_QUERY)
    // Return null if the document doesn't exist or has no members
    if (!data || !data.members?.length) return null
    return data
  } catch (err) {
    console.warn('[Sanity] Failed to fetch teamSection:', err)
    return null
  }
}

/**
 * Fetch portfolio section data from Sanity.
 * Returns null if no document exists yet — the component will fall back
 * to hardcoded defaults in that case.
 */
export async function getPortfolioSection(): Promise<SanityPortfolioSection | null> {
  try {
    const data = await sanityClient.fetch<SanityPortfolioSection | null>(PORTFOLIO_QUERY)
    // Return null if the document doesn't exist or has no projects
    if (!data || !data.projects?.length) return null
    return data
  } catch (err) {
    console.warn('[Sanity] Failed to fetch portfolioSection:', err)
    return null
  }
}

// ─── Image URL Helper ──────────────────────────────────────────────────────────

/**
 * Resolve an image URL from a Sanity image reference OR a plain URL string.
 * Falls back to a placeholder if neither is available.
 */
export function resolveImageUrl(
  image: SanityImageSource | string | null | undefined,
  width = 800,
  height = 600,
): string {
  if (!image) return `https://placehold.co/${width}x${height}/E8E6E1/6B6860?text=No+Image`
  if (typeof image === 'string') return image
  try {
    return urlFor(image).width(width).height(height).fit('crop').auto('format').url()
  } catch {
    return `https://placehold.co/${width}x${height}/E8E6E1/6B6860?text=No+Image`
  }
}