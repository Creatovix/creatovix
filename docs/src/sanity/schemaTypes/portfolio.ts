import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'portfolioSection',
  title: 'Portfolio Section',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionTag',
      title: 'Section Tag',
      type: 'string',
      description: 'Small label above the heading (e.g. "Our Work")',
      initialValue: 'Our Work',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: "Projects we're proud of.",
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 3,
      initialValue:
        'A curated selection across industries. Every build starts with strategy and ends with measurable results.',
    }),
    defineField({
      name: 'projects',
      title: 'Projects',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'project',
          title: 'Project',
          fields: [
            defineField({
              name: 'num',
              title: 'Number Label',
              type: 'string',
              description: 'Display number like "01", "02" etc.',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Project Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'category',
              title: 'Category',
              type: 'string',
              options: {
                list: [
                  { title: 'Full Stack', value: 'Full Stack' },
                  { title: 'Shopify', value: 'Shopify' },
                  { title: 'WordPress', value: 'WordPress' },
                  { title: 'Design', value: 'Design' },
                ],
                layout: 'radio',
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Short Description',
              type: 'text',
              rows: 2,
              validation: (Rule) => Rule.required().max(150),
            }),
            defineField({
              name: 'result',
              title: 'Key Result Badge',
              type: 'string',
              description: 'Short result shown as a badge (e.g. "3× Revenue", "10k+ DAU")',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'color',
              title: 'Accent Color',
              type: 'string',
              description: 'Hex color code (e.g. #C4622D)',
              validation: (Rule) =>
                Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
                  name: 'hex color',
                  invert: false,
                }).warning('Must be a valid hex color'),
            }),
            defineField({
              name: 'image',
              title: 'Project Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                }),
              ],
            }),
            defineField({
              name: 'tags',
              title: 'Tech Tags',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'Technology/tool tags displayed on the card',
              validation: (Rule) => Rule.max(5),
            }),
            defineField({
              name: 'caseStudyUrl',
              title: 'Case Study URL',
              type: 'url',
              description: 'Optional link to the full case study (leave blank to default to #contact)',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'category',
              media: 'image',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return { title: title || 'Portfolio Section' }
    },
  },
})