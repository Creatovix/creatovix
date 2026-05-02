import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'teamSection',
  title: 'Team Section',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionTag',
      title: 'Section Tag',
      type: 'string',
      description: 'Small label above the heading (e.g. "The Team")',
      initialValue: 'The Team',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Main section heading',
      initialValue: 'Meet the experts behind the code.',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 3,
      initialValue: 'Scroll to meet the specialists who bring deep expertise and genuine passion to every single project.',
    }),
    defineField({
      name: 'members',
      title: 'Team Members',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'member',
          title: 'Team Member',
          fields: [
            defineField({
              name: 'name',
              title: 'Full Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'role',
              title: 'Role / Job Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'bio',
              title: 'Short Bio',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required().max(200),
            }),
            defineField({
              name: 'image',
              title: 'Profile Photo',
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
              name: 'accentColor',
              title: 'Accent Color',
              type: 'string',
              description: 'Hex color code (e.g. #4A90C2)',
              validation: (Rule) =>
                Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
                  name: 'hex color',
                  invert: false,
                }).warning('Must be a valid hex color like #4A90C2'),
            }),
            defineField({
              name: 'skills',
              title: 'Skills',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'List of skill tags shown on the card',
              validation: (Rule) => Rule.max(6),
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'role',
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
      return { title: title || 'Team Section' }
    },
  },
})