import { HeaderNav } from "./components/HeaderNav";
import { getJournalPosts } from "./journal-data";

type Project = {
  name: string;
  category: string;
  description: string;
  status: string;
  href?: string;
  action: string;
  visual: "chill" | "slide";
};

const projects: Project[] = [
  {
    name: "Chill Dash", category: "Indie game", status: "In development", visual: "chill", href: "/chilldash", action: "Join waitlist",
    description: "A cozy delivery game about little roads, everyday errands, and finding your own pace."
  },
  {
    name: "SlideSource", category: "Teleprompter app", status: "Available on Google Play", visual: "slide", href: "https://play.google.com/store/apps/details?id=app.shuvo.slidesource", action: "Download app",
    description: "A design-focused teleprompter app for presenting with clarity and confidence."
  }
];

function Logo() { return <img className="brand-logo" src="/zevray-logo.png" alt="Zevray" />; }

function ProjectVisual({ visual }: { visual: Project["visual"] }) {
  if (visual === "chill") return <div className="chill-visual" aria-hidden="true"><div className="sun" /><div className="hill h1" /><div className="hill h2" /><div className="road" /><div className="car"><b /><b /></div><div className="tree t1" /><div className="tree t2" /></div>;
  return <div className="slide-visual" aria-hidden="true"><div className="slide-paper"><span /><span /><span /><em /></div><div className="slide-grid" /></div>;
}

export default async function Home() {
  const journalPosts = await getJournalPosts();

  return <>
    <HeaderNav />
    <main id="top">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy"><p className="eyebrow">Independent studio · India / Everywhere</p><h1 id="hero-title">We build<br />things worth<br /><em>experiencing.</em></h1><p className="intro">Games, apps, and creative software made with curiosity, craft, and a little personality.</p><div className="hero-actions"><a className="button dark" href="#work">Explore our work <span>↓</span></a><a className="text-link" href="#about">About Zevray <span>↘</span></a></div></div>
        <div className="hero-art" aria-label="An abstract Zevray stripe composition"><div className="art-label">ZEV—RAY<br /><small>01 / studio</small></div><div className="stripe s1" /><div className="stripe s2" /><div className="stripe s3" /><div className="stripe s4" /><div className="dot" /></div>
        <p className="scroll-cue">Scroll to roam <span>↓</span></p>
      </section>
      <section className="work section" id="work" aria-labelledby="work-title"><div className="section-head"><p className="eyebrow">01 — Selected work</p><h2 id="work-title">Things we’re<br /><em>making.</em></h2></div><div className="project-list">{projects.map((project, index) => <article className={`project project-${index + 1}`} key={project.name}><ProjectVisual visual={project.visual} /><div className="project-info"><div><p className="project-meta">{project.category} <span>·</span> {project.status}</p><h3>{project.name}</h3></div><p>{project.description}</p><a href={project.href} target={project.href?.startsWith("http") ? "_blank" : undefined} rel={project.href?.startsWith("http") ? "noreferrer" : undefined}>{project.action} <span>↗</span></a></div></article>)}</div></section>
      <section className="about section" id="about"><p className="eyebrow">02 — A little about us</p><div className="about-grid"><h2>Zevray is an independent studio building games, apps, and creative software.</h2><div><p>We like starting with an idea, figuring out how to make it real, and learning along the way. Some projects are playful. Some are practical. Some are experiments.</p><p>We’re here to make things with personality.</p><a className="text-link" href="mailto:hi@zevray.com">Get to know us <span>↗</span></a></div></div><div className="stripe-band" aria-hidden="true">ZEVRAY <span>✳</span> ZEVRAY <span>✳</span> ZEVRAY <span>✳</span></div></section>
      <section className="principles section" aria-labelledby="principles-title"><div className="section-head"><p className="eyebrow">03 — How we work</p><h2 id="principles-title">Keep it <em>real.</em></h2></div><div className="principle-grid">{[["01", "Start small", "Good products can begin as small ideas."],["02", "Make it feel good", "The details matter, whether it’s a game or a tool."],["03", "Stay curious", "Explore, experiment, and keep learning."],["04", "Build with intention", "Make things that have a reason to exist."]].map(([n,t,d]) => <article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div></section>
      <section className="journal section" id="journal" aria-labelledby="journal-title"><div className="section-head row"><div><p className="eyebrow">04 — Journal</p><h2 id="journal-title">From the <em>workshop.</em></h2></div><a className="text-link" href="/journals">All notes <span>↗</span></a></div>
        <div className="article-grid">{journalPosts.length ? journalPosts.map(article => <article key={article.slug}><div className="article-top"><span>{article.category}</span><time>{article.date}</time></div><h3>{article.title}</h3><p>{article.excerpt}</p><a href={`/journal/${article.slug}`} aria-label={`Read ${article.title}`}>Read note <span>↗</span></a></article>) : <article><h3>No journal posts yet.</h3><p>Add a new story in Sanity to see it appear here.</p></article>}</div>
      </section>
      <section className="contact" id="contact"><p className="eyebrow">05 — Say hello</p><h2>Have an idea, want to collaborate, or just want to say <em>hello?</em></h2><a className="contact-mail" href="mailto:hi@zevray.com">hi@zevray.com <span>↗</span></a></section>
    </main>
    <footer><a className="wordmark" href="#top"><Logo /></a><p>Building things we genuinely want to exist.</p><div><a href="#work">Work</a><a href="#about">About</a><a href="#journal">Journal</a></div><small>© {new Date().getFullYear()} Zevray. All rights reserved.</small></footer>
  </>;
}
