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
      "url": asset->url,
      "alt": asset->metadata?.tags[0].title,
      "width": metadata.dimensions.width,
      "height": metadata.dimensions.height
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