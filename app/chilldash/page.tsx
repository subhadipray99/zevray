import type { Metadata } from "next";
import "./styles.css";

export const metadata: Metadata = { title: "Chill Dash — Join the waitlist | Zevray", description: "A cozy delivery game about little roads, everyday errands, and finding your own pace." };

const moments = [
  { image: "/chilldash-city.png", alt: "Chill Dash city map and deliveries", label: "Find your route", text: "A little city full of familiar corners, errands, and places to take your time." },
  { image: "/chilldash-orders.png", alt: "Chill Dash delivery order screen", label: "Pick up a little joy", text: "Take on thoughtful deliveries, from coffee and croissants to the things that make a day better." },
  { image: "/chilldash-scooter.png", alt: "Chill Dash scooter selection screen", label: "Make it your ride", text: "Your scooter, your pace. Keep it tuned up and enjoy the ride." }
];

export default function ChillDashPage() {
  return <main className="chill-page">
    <header className="chill-nav"><a href="/" className="studio-link">← <span>Zevray</span></a><a className="dash-brand" href="#waitlist"><img src="/chilldash-logo.png" alt="Chill Dash" /><strong>chill dash.</strong></a><a className="join-link" href="#waitlist">Join waitlist ↓</a></header>
    <section className="chill-hero"><div className="hero-copy"><p className="eyebrow-dash">A new game by Zevray</p><h1>Good things,<br /><em>delivered.</em></h1><p>A cozy delivery game about little roads, everyday errands, and finding your own pace.</p><a href="#waitlist" className="dash-button">Join the waitlist <span>→</span></a></div><div className="hero-screen"><div className="screen-glow" /><img src="/chilldash-city.png" alt="Chill Dash city gameplay showing a delivery in Sunnyvale" /><div className="ride-note"><img src="/chilldash-logo.png" alt="" /><span>Take the long way.<small>There’s no rush.</small></span></div></div></section>
    <section className="intro-band"><p>Little roads. Everyday errands. <em>A whole city to explore.</em></p></section>
    <section className="moments" aria-labelledby="moments-title"><div className="moments-heading"><p className="eyebrow-dash">Chill Dash, at your pace</p><h2 id="moments-title">A small world with<br /><em>room to roam.</em></h2></div><div className="moment-list">{moments.map((moment, index) => <article className={`moment moment-${index + 1}`} key={moment.label}><div className="phone-frame"><img src={moment.image} alt={moment.alt} /></div><div className="moment-copy"><span>0{index + 1}</span><h3>{moment.label}</h3><p>{moment.text}</p></div></article>)}</div></section>
    <section className="waitlist" id="waitlist"><div className="waitlist-copy"><img src="/chilldash-logo.png" alt="" /><p className="eyebrow-dash">First stop: the waitlist</p><h2>Come along<br />for the <em>ride.</em></h2><p>Join for early testing news, development updates, and the first call when the roads open up.</p></div><div className="form-frame"><iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdIlfYnLiuEDTKomDtZO43TnclkCbOCv6Ye2UJvXPpDH21zBA/viewform?embedded=true" title="Chill Dash waitlist signup" width="670" height="2508" frameBorder="0" marginHeight={0} marginWidth={0}>Loading…</iframe></div></section>
    <footer className="chill-footer"><a className="dash-brand" href="#top"><img src="/chilldash-logo.png" alt="Chill Dash" /><strong>chill dash.</strong></a><span>Made by Zevray</span><a href="/">zevray.com ↗</a></footer>
  </main>;
}
