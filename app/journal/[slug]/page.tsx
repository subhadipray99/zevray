import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getJournalPost, getJournalPosts } from "../../journal-data";
import "./post.css";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getJournalPosts();
  return posts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getJournalPost((await params).slug);
  if (!post) return {};
  return { title: `${post.title} | Zevray Journal`, description: post.excerpt };
}

export default async function JournalPostPage({ params }: Props) {
  const post = await getJournalPost((await params).slug);
  if (!post) notFound();
  return <main className="post-page"><nav><a href="/">← Zevray</a><a href="/#journal">Journal</a></nav><article><p className="post-meta">{post.category} <span>·</span> {post.date}</p><h1>{post.title}</h1><p className="post-dek">{post.excerpt}</p><div className="post-rule" /> <div className="post-body">{post.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></article><footer><a href="/#journal">← Back to the workshop</a><a href="mailto:hi@zevray.com">hi@zevray.com ↗</a></footer></main>;
}
