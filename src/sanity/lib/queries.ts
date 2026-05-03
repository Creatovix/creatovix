// src/sanity/lib/queries.ts
import { groq } from "next-sanity";

export const getAllPostsQuery = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "coverImage": coverImage.asset->url,
    category,
    publishedAt,
    readingTime
  }
`;

export const getPostBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "coverImage": {
      "url": coverImage.asset->url,
      "alt": coverImage.asset->metadata.tags[0].title,
      "width": coverImage.asset->metadata.dimensions.width,
      "height": coverImage.asset->metadata.dimensions.height
    },
    content,
    category,
    publishedAt,
    readingTime,
    seoTitle,
    seoDescription
  }
`;

export const getRelatedPostsQuery = groq`
  *[_type == "post" && category == $category && slug.current != $currentSlug] | order(publishedAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "coverImage": coverImage.asset->url,
    category,
    publishedAt,
    readingTime
  }
`;





// ── All projects (ordered by `order` field, featured first) ──────────────────
export const getAllProjectsQuery = groq`
  *[_type == "project"] | order(featured desc, order asc, year desc) {
    _id,
    category,
    color,
    "mainImage": mainImage.asset->url,
    "mainImageAlt": mainImage.alt,
  }
`;
 
// ── Single project by slug ───────────────────────────────────────────────────
export const getProjectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    category,
    color,
    "mainImage": mainImage.asset->url,
    "mainImageAlt": mainImage.alt,
  }
`;