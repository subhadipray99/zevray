import { defineField, defineType } from "sanity";

export const journalPost = defineType({
  name: "journalPost",
  title: "Journal post",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "URL slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({ name: "category", title: "Category", type: "string", initialValue: "Devlog", validation: (Rule) => Rule.required() }),
    defineField({ name: "date", title: "Publish date", type: "date", validation: (Rule) => Rule.required() }),
    defineField({ name: "excerpt", title: "Short excerpt", type: "text", rows: 3, validation: (Rule) => Rule.required().max(220) }),
    defineField({ name: "body", title: "Post body", type: "array", of: [{ type: "block" }], validation: (Rule) => Rule.required() }),
    defineField({ name: "coverImage", title: "Cover image (optional)", type: "image", options: { hotspot: true } })
  ],
  preview: { select: { title: "title", subtitle: "category", media: "coverImage" } }
});
