import type { Metadata } from "next";
import { HeaderNav } from "../components/HeaderNav";
import { getJournalPosts } from "../journal-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Journal | Zevray",
  description: "Notes from Zevray's workshop: games, apps, creative software, and the ideas behind them."
};

export default async function JournalsPage() {
  const journalPosts = await getJournalPosts();

  return (
    <>
      <HeaderNav />
      <main className="journals-page" id="top">
        <section className="journals-hero" aria-labelledby="journals-title">
          <p className="eyebrow">04 — Journal</p>
          <h1 id="journals-title">Notes from the <em>workshop.</em></h1>
          <p>Ideas, process, and the things we learn while making games, apps, and creative software.</p>
        </section>
        <section className="journals-list section" aria-label="All journal posts">
          {journalPosts.length ? (
            <div className="article-grid">
              {journalPosts.map((article) => (
                <article key={article.slug}>
                  <div className="article-top"><span>{article.category}</span><time>{article.date}</time></div>
                  <h2>{article.title}</h2>
                  <p>{article.excerpt}</p>
                  <a href={`/journal/${article.slug}`} aria-label={`Read ${article.title}`}>Read note <span>↗</span></a>
                </article>
              ))}
            </div>
          ) : (
            <div className="journals-empty">
              <h2>The journal is just getting started.</h2>
              <p>Publish a journal post in Sanity and it will appear here automatically.</p>
            </div>
          )}
        </section>
      </main>
      <footer><a className="wordmark" href="/" aria-label="Zevray home"><img className="brand-logo" src="/zevray-logo.png" alt="Zevray" /></a><p>Building things we genuinely want to exist.</p><div><a href="/">Home</a><a href="/journals">Journal</a><a href="mailto:hi@zevray.com">Say hello</a></div><small>© {new Date().getFullYear()} Zevray. All rights reserved.</small></footer>
    </>
  );
}

export const revalidate = 0;

