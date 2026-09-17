type SanityBlockChild = {
  text?: string;
};

type SanityBlock = {
  _type?: string;
  children?: SanityBlockChild[];
};

type SanityJournalPost = {
  _id: string;
  title?: string;
  slug?: {
    current?: string;
  } | null;
  category?: string;
  date?: string;
  excerpt?: string;
  body?: SanityBlock[];
};

export type JournalPost = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  excerpt: string;
  body: string[];
};

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "sghjj8v9";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-01-01";

const client = {
  async fetch<T>(query: string, params?: Record<string, unknown>): Promise<T> {
    const { createClient } = await import("@sanity/client");
    const sanityClient = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      perspective: "published",
    });

    return sanityClient.fetch<T>(query, params ?? {});
  }
};

function normalizeDate(date: string | undefined): string {
  if (!date) return "";

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
}

function extractBodyText(blocks: SanityBlock[] | undefined): string[] {
  if (!Array.isArray(blocks)) return [];

  return blocks
    .filter((block) => block._type === "block" && Array.isArray(block.children))
    .map((block) =>
      (block.children ?? [])
        .map((child) => child.text ?? "")
        .join(" ")
        .trim()
    )
    .filter(Boolean);
}

function normalizePost(post: SanityJournalPost): JournalPost {
  return {
    _id: post._id,
    title: post.title ?? "Untitled post",
    slug: post.slug?.current ?? "",
    category: post.category ?? "Journal",
    date: normalizeDate(post.date),
    excerpt: post.excerpt ?? "",
    body: extractBodyText(post.body),
  };
}

export async function getJournalPosts(): Promise<JournalPost[]> {
  const query = `*[_type == "journalPost"] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    date,
    excerpt,
    body
  }`;

  try {
    const posts = await client.fetch<SanityJournalPost[]>(query);
    return (posts ?? []).map(normalizePost);
  } catch (error) {
    console.error("Failed to fetch journal posts from Sanity", error);
    return [];
  }
}

export async function getJournalPost(slug: string): Promise<JournalPost | null> {
  if (!slug) return null;

  const query = `*[_type == "journalPost" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    category,
    date,
    excerpt,
    body
  }`;

  try {
    const post = await client.fetch<SanityJournalPost | null>(query, { slug });
    return post ? normalizePost(post) : null;
  } catch (error) {
    console.error(`Failed to fetch journal post '${slug}' from Sanity`, error);
    return null;
  }
}
