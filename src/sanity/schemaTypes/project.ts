// src/sanity/schemas/project.ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Web Design", value: "Web Design" },
          { title: "Web Development", value: "Web Development" },
          { title: "Graphic Design", value: "Graphic Design" },
          { title: "Full Stack", value: "Full Stack" },
          { title: "Shopify", value: "Shopify" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "color",
      title: "Accent Color (hex)",
      type: "string",
      description: "e.g. #ff4d00 — used for card glow and badge",
      initialValue: "#ff4d00",
      validation: (Rule) =>
        Rule.regex(/^#[0-9a-fA-F]{6}$/, {
          name: "hex color",
          invert: false,
        }).error("Must be a valid hex color, e.g. #ff4d00"),
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      description:
        "Use a tall image (portrait ratio recommended) — the card scrolls through it on hover.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt text",
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first (e.g. 1, 2, 3…)",
      initialValue: 99,
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Year, Newest First",
      name: "yearDesc",
      by: [{ field: "year", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      client: "client",
      category: "category",
      media: "mainImage",
    },
    prepare({ title, client, category, media }) {
      return {
        title,
        subtitle: `${category}${client ? ` · ${client}` : ""}`,
        media,
      };
    },
  },
});