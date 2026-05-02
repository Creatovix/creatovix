// src/sanity/schemaTypes/post.ts
import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 } }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3, description: "Short summary for listing & SEO" }),
    defineField({ name: "coverImage", title: "Cover Image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        { type: "block", styles: [{ title: "Normal", value: "normal" }, { title: "H1", value: "h1" }, { title: "H2", value: "h2" }, { title: "H3", value: "h3" }] },
        { type: "image", options: { hotspot: true } }
      ]
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: ["Web Design", "Shopify", "Development", "Marketing", "Business"] }
    }),
    defineField({ name: "publishedAt", title: "Published At", type: "datetime" }),
    defineField({ name: "readingTime", title: "Reading Time (minutes)", type: "number" }),
    defineField({ name: "seoTitle", title: "SEO Title", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO Description", type: "text", rows: 3 }),
  ],
  preview: {
    select: { title: "title", media: "coverImage" },
    prepare({ title, media }) {
      return { title, media };
    },
  },
});