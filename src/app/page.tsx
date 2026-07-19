"use client";

import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown,
  Menu, MessageCircle, MoveRight, Star, X,
} from "lucide-react";
import Link from "next/link";
import { projects, categories, gallery } from "@/data/projects";



const testimonials = [
  { quote: "Festiviya understood the quality of our spaces and translated it online with remarkable restraint. We finally look as premium as our work feels.", name: "Neha Shah", role: "Founder, Astera Spaces", image: "/images/client-neha.jpg" },
  { quote: "The process was precise, fast and genuinely thoughtful. Our new website has changed the quality of enquiries we receive.", name: "Rohan Mehta", role: "Principal Architect", image: "/images/client-rohan.jpg" },
  { quote: "From the first screen, it feels like us. Reservations and private dining enquiries started arriving in the very first week.", name: "Isha Kapoor", role: "Founder, Ember & Grain", image: "/images/client-isha.jpg" },
];

const faqs = [
  { question: "What is included in the professional website package?", answer: "A custom multi-page corporate website, responsive development, hosting for one year, contact form, WhatsApp integration, basic SEO, and one year of support and minor updates." },
  { question: "How long will my website take?", answer: "Most websites launch within 7 to 10 working days after we receive your content and approval on the creative direction. We share clear milestones throughout the process." },
  { question: "Will the design be unique to my business?", answer: "Yes. We do not install off-the-shelf themes. Your visual direction, typography, structure and interactions are tailored to your brand and audience." },
  { question: "Do I need to arrange hosting or technical setup?", answer: "No. Hosting, SSL, deployment and technical setup are included for the first year. You only purchase a domain separately if you do not already own one." },
  { question: "Can I request changes after launch?", answer: "Yes. One year of support and minor content updates is included, so your website can continue to stay accurate and polished." },
];

function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className={`brand-mark ${light ? "brand-mark-light" : ""}`} aria-label="Festiviya home">
      <svg viewBox="0 0 34 34" aria-hidden="true"><path d="M4 3h26v5H10v6h15v5H10v12H4V3Z" fill="currentColor" /><path d="M19 19h11v12H19z" fill="#E76A12" /></svg>
      <span>Festiviya</span>
    </a>
  );
}

function MagneticLink({ href, children, variant = "primary", className = "" }: { href: string; children: ReactNode; variant?: "primary" | "secondary" | "light"; className?: string }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const move = (event: MouseEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setOffset({ x: (event.clientX - rect.left - rect.width / 2) * 0.12, y: (event.clientY - rect.top - rect.height / 2) * 0.12 });
  };
  return (
    <motion.a href={href} className={`button button-${variant} ${className}`} onMouseMove={move} onMouseLeave={() => setOffset({ x: 0, y: 0 })} animate={offset} transition={{ type: "spring", stiffness: 180, damping: 14, mass: 0.2 }}>
      <span>{children}</span><ArrowUpRight size={17} strokeWidth={1.8} />
    </motion.a>
  );
}

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 42 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-8%" }} transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}>{children}</motion.div>;
}

function Header() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lastScroll = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      setScrolled(current > 24);
      setHidden(current > lastScroll.current && current > 180);
      lastScroll.current = current;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <motion.header className={`site-header ${scrolled ? "is-scrolled" : ""}`} animate={{ y: hidden && !open ? -100 : 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
        <BrandMark />
        <nav className="desktop-nav" aria-label="Main navigation"><a href="#work">Work</a><a href="#studio">Studio</a><a href="#process">Process</a><a href="#pricing">Pricing</a></nav>
        <a className="header-cta" href="#pricing">Get started <ArrowUpRight size={15} /></a>
        <button className="menu-toggle" type="button" onClick={() => setOpen(true)} aria-label="Open menu"><Menu /></button>
      </motion.header>
      <AnimatePresence>
        {open && (
          <motion.div className="mobile-menu" initial={{ y: "-100%" }} animate={{ y: 0 }} exit={{ y: "-100%" }} transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}>
            <div className="mobile-menu-top"><BrandMark light /><button type="button" onClick={() => setOpen(false)} aria-label="Close menu"><X /></button></div>
            <nav>{["Work", "Studio", "Process", "Pricing", "Contact"].map((item, index) => <motion.a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.18 + index * 0.07 }}><span>0{index + 1}</span>{item}</motion.a>)}</nav>
            <p>Beautiful digital experiences for ambitious Indian businesses.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function BrowserFrame({ image, title = "Festiviya project", className = "" }: { image: string; title?: string; className?: string }) {
  return (
    <div className={`browser-frame ${className}`}>
      <div className="browser-bar"><span /><span /><span /><div>festiviya.design / preview</div></div>
      <div className="browser-screen"><img src={image} alt={title} /><div className="screen-brand">FESTIVIYA / SELECTED</div><div className="screen-caption"><span>Built for attention.</span><small>Explore project</small></div></div>
    </div>
  );
}

function Hero() {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 900], [0, 130]);
  const visualY = useTransform(scrollY, [0, 900], [0, 70]);
  const trackPointer = (event: MouseEvent<HTMLElement>) => setPointer({ x: (event.clientX / window.innerWidth - 0.5) * 20, y: (event.clientY / window.innerHeight - 0.5) * 20 });
  return (
    <section id="top" className="hero" onMouseMove={trackPointer}>
      <div className="hero-image" aria-hidden="true" />
      <motion.div className="hero-copy" style={{ y: contentY }}>
        <motion.p className="eyebrow" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>Independent web design studio / India</motion.p>
        <div className="hero-brand-wrap"><motion.p className="hero-brand" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1.05, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}>Festiviya</motion.p></div>
        <motion.h1 initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>Beautiful websites that make<br />businesses look <em>premium.</em></motion.h1>
        <motion.p className="hero-intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75, duration: 1 }}>Strategy, design and development for ambitious businesses that understand the value of a remarkable first impression.</motion.p>
        <motion.div className="hero-actions" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8 }}><MagneticLink href="#pricing">Start your project</MagneticLink><MagneticLink href="#work" variant="secondary">View portfolio</MagneticLink></motion.div>
      </motion.div>
      <motion.div className="hero-devices" style={{ y: visualY }} animate={{ x: pointer.x, rotateY: pointer.x * 0.08, rotateX: -pointer.y * 0.04 }} transition={{ type: "spring", stiffness: 42, damping: 18 }}>
        <BrowserFrame image="/images/project-astera.jpg" title="Astera Spaces website preview" />
        <motion.div className="hero-phone" animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}><div className="phone-speaker" /><img src="/images/project-ember.jpg" alt="Responsive restaurant website preview" /><div className="phone-copy"><small>Ember & Grain</small><span>Taste the evening.</span></div></motion.div>
      </motion.div>
      <a href="#trust" className="scroll-cue"><span>Scroll to discover</span><ArrowDown size={16} /></a>
    </section>
  );
}

function TrustStrip() {
  const items = ["Trusted by 50+ businesses", "Fast delivery", "Premium support", "Responsive by design"];
  return <section id="trust" className="trust-strip" aria-label="Client trust indicators">{items.map((item, index) => <div key={item}>{index === 0 ? <span className="stars" aria-label="Five stars">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={11} fill="currentColor" />)}</span> : <span className="trust-index">0{index}</span>}<p>{item}</p></div>)}</section>;
}

function ProjectStory({ project, index }: { project: (typeof projects)[number]; index: number }) {
  return (
    <article className={`project-story project-${project.tone} ${index % 2 ? "project-reverse" : ""}`}>
      <div className="project-meta">
        <Reveal><p className="section-kicker">Featured project / {project.id}</p></Reveal><Reveal delay={0.08}><h3>{project.title}</h3></Reveal><Reveal delay={0.13}><p className="project-description">{project.description}</p></Reveal>
        <Reveal delay={0.18} className="project-details"><div><span>Industry</span><p>{project.category}</p></div><div><span>Expertise</span><p>{project.tech.join(" / ")}</p></div></Reveal>
        <Reveal delay={0.23} className="project-links"><a href="#contact">Visit website <ArrowUpRight size={15} /></a><Link href={`/work/${project.slug}`}>View case study <MoveRight size={16} /></Link></Reveal>
      </div>
      <motion.div className="project-visual" initial={{ clipPath: "inset(14% 0 14% 0)" }} whileInView={{ clipPath: "inset(0% 0 0% 0)" }} viewport={{ once: true, margin: "-12%" }} transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] }}>
        <BrowserFrame image={project.image} title={`${project.title} website`} />
        <div className="project-phone"><div className="mini-notch" /><img src={project.image} alt={`${project.title} mobile website`} /><div className="mini-page"><strong>{project.title.split(" ")[0]}</strong><span>Made for mobile</span></div></div>
      </motion.div>
    </article>
  );
}

function Portfolio() {
  const [filter, setFilter] = useState("All");
  const visible = filter === "All" ? gallery.slice(0, 4) : gallery.filter((item) => item.category === filter);
  return (
    <section id="work" className="portfolio-section">
      <div className="portfolio-intro page-shell"><Reveal><p className="section-kicker">Selected work / 2024-26</p></Reveal><Reveal delay={0.08}><h2>Digital places people<br /><em>want to explore.</em></h2></Reveal><Reveal delay={0.14}><p>Not just websites. Carefully directed worlds that make brands more valuable, credible and memorable.</p></Reveal></div>
      <div className="project-list">{projects.slice(0, 2).map((project, index) => <ProjectStory key={project.id} project={project} index={index} />)}</div>
      
      <div className="showcase-header page-shell pt-32"><Reveal><p className="section-kicker">Complete Archive</p><h2>More from the<br />studio.</h2></Reveal></div>
      <div className="gallery-filter page-shell">
        <div className="filter-list" role="tablist" aria-label="Filter projects">{categories.map((category) => <button key={category} type="button" className={filter === category ? "active" : ""} onClick={() => setFilter(category)}>{category}</button>)}</div>
        <motion.div layout className="filter-results"><AnimatePresence mode="popLayout">{visible.map((item) => <motion.figure key={item.title} layout initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }} transition={{ duration: 0.5 }}><Link href={`/work/${item.slug}`}><img src={item.image} alt={`${item.title} website project`} /></Link><figcaption><span>{item.title}</span><small>{item.category}</small></figcaption></motion.figure>)}</AnimatePresence>{visible.length === 0 && <motion.p className="coming-soon" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>This chapter is currently in the studio. Ask us for a private preview.</motion.p>}</motion.div>
      </div>
    </section>
  );
}

function LogoWall() {
  const logos = ["Simpolo", "VARMORA", "SUNHEART", "EURO", "Asian Granito", "ORACLE", "IKON", "METRO"];
  return <section className="logo-section page-shell"><Reveal className="logo-copy"><p className="section-kicker">Trusted company</p><h2>Built for businesses<br />with ambition.</h2></Reveal><div className="logo-wall">{logos.map((logo, index) => <motion.div key={logo} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }}>{logo}</motion.div>)}</div></section>;
}

function WhyStudio() {
  const features = [["01", "Premium UI design", "Distinctive visual systems shaped around your business, never a recycled theme."], ["02", "Responsive by instinct", "Every interaction is composed to feel considered on every screen size."], ["03", "Built to be found", "Clear structure, fast performance and foundational SEO from the first line of code."], ["04", "Ready for business", "Hosting, security, WhatsApp and enquiries connected without technical friction."]];
  return (
    <section id="studio" className="why-section">
      <div className="why-heading page-shell"><Reveal><p className="section-kicker">Why Festiviya</p><h2>Small studio.<br /><em>Serious standards.</em></h2></Reveal><Reveal delay={0.1}><p>We combine strategy, design and technology to help good businesses look unmistakably credible.</p></Reveal></div>
      <div className="editorial-panels page-shell">{features.map(([number, title, copy], index) => <motion.article key={number} className={index === 1 || index === 3 ? "panel-offset" : ""} initial={{ opacity: 0, y: 70 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-15%" }} transition={{ duration: 0.9, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}><span>{number}</span><h3>{title}</h3><p>{copy}</p></motion.article>)}</div>
      <div className="capability-line"><div>Fast delivery</div><div>Hosting included</div><div>WhatsApp integration</div><div>Modern technology</div><div>Growth focused</div><div>Fast delivery</div></div>
    </section>
  );
}

function Process() {
  const steps = [["01", "Discovery", "We learn the business, audience and outcome."], ["02", "Planning", "We shape the story and the path through it."], ["03", "UI Design", "We establish a visual world with distinction."], ["04", "Development", "We make every screen fluid, fast and alive."], ["05", "Launch", "We test, refine and put your new presence live."]];
  return (
    <section id="process" className="process-section"><div className="process-title page-shell"><Reveal><p className="section-kicker">Our process</p><h2>Clear from first<br />thought to <em>launch.</em></h2></Reveal><p>One focused process. No confusion, hidden steps or technical overwhelm.</p></div>
      <div className="timeline page-shell"><motion.div className="timeline-progress" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, margin: "-20%" }} transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }} />{steps.map(([number, title, copy], index) => <motion.article key={number} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.25 + index * 0.12, duration: 0.7 }}><span>{number}</span><div className="timeline-dot" /><h3>{title}</h3><p>{copy}</p></motion.article>)}</div>
    </section>
  );
}

function Pricing() {
  const includes = ["Professional corporate website (multi-page)", "1 year free hosting", "Mobile-friendly responsive design", "WhatsApp chat button integration", "Contact form", "Basic SEO setup", "1 year support and minor updates"];
  return (
    <section id="pricing" className="pricing-section"><div className="pricing-intro"><Reveal><p className="section-kicker">The signature package</p><h2>Premium should feel<br />possible.</h2></Reveal></div>
      <motion.div className="pricing-card" initial={{ opacity: 0, y: 60, scale: 0.98 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
        <div className="price-top"><div><p>Professional corporate website</p><span>Everything your business needs to make a credible first impression.</span></div><div className="price"><small>Investment</small><strong><sup>{"\u20B9"}</sup>2,999</strong><span>one-time</span></div></div>
        <div className="price-body"><div><p className="included-label">Everything included</p><ul>{includes.map((item) => <li key={item}><Check size={16} />{item}</li>)}</ul></div><div className="price-action"><p>If you do not already have a domain name, you will only need to purchase the domain separately. Everything else is included.</p><MagneticLink href="#contact">Get my website</MagneticLink><a href="https://wa.me/919999999999?text=Hi%20Festiviya%2C%20I%20want%20to%20discuss%20a%20website." target="_blank" rel="noreferrer" className="whatsapp-link"><MessageCircle size={17} />Talk on WhatsApp</a></div></div>
      </motion.div>
    </section>
  );
}

function Testimonials() {
  const [active, setActive] = useState(0);
  useEffect(() => { const timer = window.setInterval(() => setActive((value) => (value + 1) % testimonials.length), 6500); return () => window.clearInterval(timer); }, []);
  const testimonial = testimonials[active];
  return (
    <section className="testimonials-section page-shell"><div className="testimonial-heading"><Reveal><p className="section-kicker">Client notes</p><h2>Good work starts<br />good conversations.</h2></Reveal><span>{String(active + 1).padStart(2, "0")} / 0{testimonials.length}</span></div>
      <div className="testimonial-stage"><AnimatePresence mode="wait"><motion.article key={testimonial.name} initial={{ opacity: 0, x: 45 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -45 }} transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}><div className="quote-stars">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} fill="currentColor" />)}</div><blockquote>"{testimonial.quote}"</blockquote><div className="client"><img src={testimonial.image} alt={testimonial.name} /><div><strong>{testimonial.name}</strong><span>{testimonial.role}</span></div></div></motion.article></AnimatePresence><div className="testimonial-controls"><button type="button" onClick={() => setActive((active - 1 + testimonials.length) % testimonials.length)} aria-label="Previous testimonial"><ArrowLeft /></button><button type="button" onClick={() => setActive((active + 1) % testimonials.length)} aria-label="Next testimonial"><ArrowRight /></button></div></div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="faq-section page-shell"><Reveal className="faq-heading"><p className="section-kicker">Questions, answered</p><h2>The details,<br /><em>made clear.</em></h2></Reveal><div className="accordion">{faqs.map((faq, index) => <div className={`faq-item ${open === index ? "open" : ""}`} key={faq.question}><button type="button" onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index}><span>0{index + 1}</span><strong>{faq.question}</strong><ChevronDown /></button><AnimatePresence initial={false}>{open === index && <motion.div className="faq-answer" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}><p>{faq.answer}</p></motion.div>}</AnimatePresence></div>)}</div></section>
  );
}

function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <section id="contact" className="final-cta" ref={ref}><motion.div className="final-bg" style={{ y: imageY }} /><div className="final-shade" /><div className="final-content"><Reveal><BrandMark light /></Reveal><Reveal delay={0.08}><h2>Ready to build a website<br />your customers will <em>remember?</em></h2></Reveal><Reveal delay={0.14}><p>Your website is your first impression.<br />Let us make it unforgettable.</p></Reveal><Reveal delay={0.2} className="final-actions"><MagneticLink href="#pricing" variant="light">Start my website</MagneticLink><a href="#work">View portfolio <MoveRight size={17} /></a></Reveal></div>
      <motion.div className="final-browser final-browser-one" animate={{ y: [0, -14, 0], rotate: [-5, -4, -5] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}><BrowserFrame image="/images/project-ember.jpg" title="Restaurant website" /></motion.div><motion.div className="final-browser final-browser-two" animate={{ y: [0, 12, 0], rotate: [7, 5, 7] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}><BrowserFrame image="/images/project-aura.jpg" title="Clinic website" /></motion.div>
    </section>
  );
}

function Footer() {
  return <footer className="footer"><div className="footer-top page-shell"><div><BrandMark /><p>Independent web design studio creating premium digital experiences for ambitious businesses.</p></div><div className="footer-links"><div><span>Explore</span><a href="#work">Portfolio</a><a href="#studio">Studio</a><a href="#process">Process</a><a href="#pricing">Pricing</a></div><div><span>Contact</span><a href="mailto:hello@festiviya.com">hello@festiviya.com</a><a href="https://wa.me/919999999999" target="_blank" rel="noreferrer">WhatsApp</a><a href="#top">Instagram</a></div></div></div><div className="footer-bottom page-shell"><span>Copyright {new Date().getFullYear()} Festiviya</span><span>Designed with intent by Festiviya</span><a href="#top">Back to top <ArrowUpRight size={14} /></a></div></footer>;
}

function Cursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  useEffect(() => { const move = (event: globalThis.MouseEvent) => setPosition({ x: event.clientX, y: event.clientY }); window.addEventListener("mousemove", move); return () => window.removeEventListener("mousemove", move); }, []);
  const x = useSpring(position.x, { stiffness: 420, damping: 32 });
  const y = useSpring(position.y, { stiffness: 420, damping: 32 });
  return <motion.div className="custom-cursor" style={{ x, y }} />;
}

function Services() {
  const services = [
    { title: "Brand Identity", desc: "Positioning, typography, and visual systems that make you unmistakably you." },
    { title: "UI/UX Design", desc: "Intuitive, high-converting interfaces crafted with precision for every device." },
    { title: "Web Engineering", desc: "Blazing fast, secure, and scalable architectures using modern frameworks." },
    { title: "Growth & SEO", desc: "Technical optimization and structured content designed to rank and convert." }
  ];
  return (
    <section className="services-section page-shell">
      <div className="services-header">
        <Reveal><p className="section-kicker">Our Expertise</p><h2>Disciplines that drive<br /><em>real value.</em></h2></Reveal>
      </div>
      <div className="services-grid">
        {services.map((service, idx) => (
          <motion.div key={service.title} className="service-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1, duration: 0.8 }}>
            <span>0{idx + 1}</span>
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ImpactStats() {
  const stats = [
    { value: "50+", label: "Brands Launched" },
    { value: "99%", label: "Lighthouse Score" },
    { value: "10+", label: "Industries Served" },
    { value: "100%", label: "Client Satisfaction" }
  ];
  return (
    <section className="impact-section page-shell">
      <Reveal><p className="section-kicker text-center mb-16">By the numbers</p></Reveal>
      <div className="impact-grid">
        {stats.map((stat, idx) => (
          <motion.div key={stat.label} className="impact-card" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.1, duration: 0.8 }}>
            <h3>{stat.value}</h3>
            <p>{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default function App() {
  return <main><Cursor /><Header /><Hero /><TrustStrip /><Services /><Portfolio /><LogoWall /><WhyStudio /><ImpactStats /><Process /><Pricing /><Testimonials /><FAQ /><FinalCTA /><Footer /><a className="floating-whatsapp" href="https://wa.me/919999999999?text=Hi%20Festiviya%2C%20I%20want%20a%20premium%20website." target="_blank" rel="noreferrer" aria-label="Chat with Festiviya on WhatsApp"><MessageCircle size={20} /></a></main>;
}