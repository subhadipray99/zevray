import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { journalPost } from "./sanity/schemaTypes/journalPost";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "sghjj8v9";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
  name: "zevray",
  title: "Zevray Studio",
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: { types: [journalPost] }
});
