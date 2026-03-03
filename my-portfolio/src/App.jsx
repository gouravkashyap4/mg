import { useState, useEffect, useRef } from "react";

const SERVICES = [
  {
    icon: "⚡",
    title: "Landing Pages",
    desc: "High-converting landing pages that turn visitors into paying customers. Fast, clean, and built to perform.",
    tags: ["React", "HTML/CSS", "Animations"],
  },
  {
    icon: "🛒",
    title: "E-Commerce Stores",
    desc: "Full-featured online stores with smooth checkout flows, product listings, and admin panels.",
    tags: ["Shopify", "WooCommerce", "Custom"],
  },
  {
    icon: "🎨",
    title: "Custom Web Apps",
    desc: "Fully custom web applications tailored to your business needs — dashboards, portals, SaaS tools.",
    tags: ["React", "Node.js", "APIs"],
  },
  {
    icon: "📱",
    title: "Responsive Design",
    desc: "Pixel-perfect on every device. Mobile-first development that looks stunning on phones, tablets, and desktops.",
    tags: ["Mobile", "Tablet", "Desktop"],
  },
{
  icon: "🎯",
  title: "Figma to HTML / React / Next.js",
  desc: "Pixel-perfect conversion of any Figma design into clean, production-ready HTML, React, or Next.js code. Exactly as designed — no compromises.",
  tags: ["Figma", "React", "Next.js"],
},
  {
    icon: "🔧",
    title: "Bug Fixes & Updates",
    desc: "Quick turnaround on fixes, feature additions, and updates to your existing website or app.",
    tags: ["Quick", "Reliable", "Affordable"],
  },
];

// ✏️ REPLACE these with your actual project links from Notion
const PROJECTS = [
  {
    id: 1,
    title: "Monkk — AI Trading Platform",
    category: "Landing Page",
    desc: "AI-powered trading platform featuring DMT Process — combining trade signals, risk management & psychology coaching for disciplined traders.",
    link: "https://work.mobidudes.in/Mohit/monkk/",
    tech: ["React", "TailwindCSS", "Animations"],
    color: "#00FF87",
  },
  {
    id: 2,
    title: "React Admin Dashboard",
    category: "Web App",
    desc: "Full-featured e-commerce admin panel with sales analytics, customer tracking, monthly targets, charts and complete UI component library.",
    link: "https://work.mobidudes.in/Mohit/react-admin/",
    tech: ["React", "Tailwind", "Charts"],
    color: "#FF6B35",
  },
  {
    id: 3,
    title: "Monkk 2.0 — Redesigned",
    category: "Landing Page",
    desc: "Revamped version of Monkk with a fresh green aesthetic — cleaner layout and better visual hierarchy for higher conversions.",
    link: "https://work.mobidudes.in/Mohit/new-monkk/",
    tech: ["React", "CSS", "GSAP"],
    color: "#7C3AED",
  },
  {
    id: 4,
    title: "Mobidudes Agency Website",
    category: "Business Site",
    desc: "Corporate website for a digital agency — dark UI with services, portfolio, careers and contact sections. Built to convert visitors into clients.",
    link: "https://work.mobidudes.in/Mohit/mobidudes/",
    tech: ["React", "TailwindCSS", "Framer"],
    color: "#F59E0B",
  },
  {
    id: 5,
    title: "Tawazun — Wellness App",
    category: "Landing Page",
    desc: "UAE-born wellness platform with fasting tracking, hydration monitoring & AI insights. App Store + Play Store CTAs with waitlist flow.",
    link: "https://work.mobidudes.in/Mohit/Tawazun/",
    tech: ["React", "Next.js", "Animations"],
    color: "#EC4899",
  },
  {
    id: 6,
    title: "Resume Builder Platform",
    category: "SaaS / Web App",
    desc: "Clean SaaS landing page for a resume & CV builder tool — live resume previews, pricing plans, and a modern dark-themed UI.",
    link: "https://work.mobidudes.in/Mohit/Example/",
    tech: ["React", "Node.js", "Stripe"],
    color: "#06B6D4",
  },
];

const STATS = [
  { value: "50+", label: "Projects Delivered" },
  { value: "30+", label: "Happy Clients" },
  { value: "3+", label: "Years Experience" },
  { value: "100%", label: "Job Success" },
];

const PROCESS = [
  { step: "01", title: "Discovery", desc: "We discuss your goals, audience, and vision to define the perfect solution." },
  { step: "02", title: "Design", desc: "Wireframes and UI mockups so you see exactly what you're getting before we code." },
  { step: "03", title: "Develop", desc: "Clean, fast, production-ready code with regular updates and progress checks." },
  { step: "04", title: "Deliver", desc: "Thorough testing, deployment, and a handover with docs — zero headaches." },
];

function useTypingEffect(words, speed = 100, pause = 2000) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx % words.length];
    let timeout;
    if (!isDeleting && displayed === current) {
      timeout = setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && displayed === "") {
      setIsDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(() => {
        setDisplayed((prev) =>
          isDeleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)
        );
      }, isDeleting ? speed / 2 : speed);
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, wordIdx, words, speed, pause]);

  return displayed;
}

function CountUp({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const num = parseInt(target);
        const duration = 1500;
        const steps = 60;
        const increment = num / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= num) {
            setCount(num);
            clearInterval(timer);
          } else {
            setCount(Math.floor(current));
          }
        }, duration / steps);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const typed = useTypingEffect(
    ["Landing Pages", "Web Apps", "E-Commerce", "Dashboards", "Business Sites"],
    90,
    2200
  );

  useEffect(() => {
    const move = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const fontStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&family=Space+Mono:wght@400;700&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body { background: #080808; color: #F0EDE8; font-family: 'DM Sans', sans-serif; overflow-x: hidden; }
    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: #111; }
    ::-webkit-scrollbar-thumb { background: #00FF87; border-radius: 2px; }
    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
    @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
    @keyframes slideIn { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
    @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes gradientShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
    .fade-up { animation: fadeUp 0.7s ease forwards; }
    .float { animation: float 4s ease-in-out infinite; }
    .cursor-glow {
      position: fixed; width: 300px; height: 300px; border-radius: 50%;
      background: radial-gradient(circle, rgba(0,255,135,0.06) 0%, transparent 70%);
      pointer-events: none; z-index: 0; transition: all 0.1s linear;
      transform: translate(-50%, -50%);
    }
    .nav-link { position: relative; }
    .nav-link::after {
      content: ''; position: absolute; bottom: -2px; left: 0;
      width: 0; height: 1px; background: #00FF87;
      transition: width 0.3s ease;
    }
    .nav-link:hover::after { width: 100%; }
    .service-card:hover { transform: translateY(-6px); border-color: #00FF87 !important; }
    .project-card:hover .project-overlay { opacity: 1; }
    .project-card:hover .project-img { transform: scale(1.05); }
    .grain {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      pointer-events: none; z-index: 1000; opacity: 0.03;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    }
    .hero-badge {
      display: inline-flex; align-items: center; gap: 8px;
      background: rgba(0,255,135,0.1); border: 1px solid rgba(0,255,135,0.3);
      color: #00FF87; padding: 6px 16px; border-radius: 100px; font-size: 13px;
      font-family: 'Space Mono', monospace; animation: fadeUp 0.5s ease 0.2s both;
    }
    .dot { width: 6px; height: 6px; background: #00FF87; border-radius: 50%; animation: pulse 1.5s infinite; }
    .btn-primary {
      background: #00FF87; color: #080808; font-weight: 700;
      padding: 14px 32px; border: none; border-radius: 4px; cursor: pointer;
      font-family: 'DM Sans', sans-serif; font-size: 15px; letter-spacing: 0.5px;
      transition: all 0.25s ease; display: inline-flex; align-items: center; gap: 8px;
    }
    .btn-primary:hover { background: #00e67a; transform: translateY(-2px); box-shadow: 0 12px 40px rgba(0,255,135,0.3); }
    .btn-outline {
      background: transparent; color: #F0EDE8; font-weight: 600;
      padding: 14px 32px; border: 1px solid rgba(240,237,232,0.3); border-radius: 4px; cursor: pointer;
      font-family: 'DM Sans', sans-serif; font-size: 15px;
      transition: all 0.25s ease; display: inline-flex; align-items: center; gap: 8px;
    }
    .btn-outline:hover { border-color: #00FF87; color: #00FF87; transform: translateY(-2px); }
    .tag {
      font-size: 11px; font-family: 'Space Mono', monospace;
      background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
      padding: 3px 10px; border-radius: 3px; color: #999;
    }
    .section-label {
      font-family: 'Space Mono', monospace; font-size: 11px; color: #00FF87;
      letter-spacing: 3px; text-transform: uppercase; margin-bottom: 12px; display: block;
    }
    .divider { width: 40px; height: 2px; background: #00FF87; margin: 16px 0; }
    .step-line {
      position: absolute; top: 24px; left: 50%; width: 100%; height: 1px;
      background: linear-gradient(90deg, #00FF87, transparent);
    }
  `;

  return (
    <>
      <style>{fontStyle}</style>
      <div className="grain" />
      <div className="cursor-glow" style={{ left: cursorPos.x, top: cursorPos.y }} />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "20px 40px", display: "flex", alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(8,8,8,0.85)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)"
      }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, letterSpacing: 2, color: "#F0EDE8" }}>
          MG<span style={{ color: "#00FF87" }}>DUDE</span>
        </div>
        <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
          {["home", "services", "work", "process", "contact"].map(s => (
            <button key={s} className="nav-link" onClick={() => scrollTo(s)} style={{
              background: "none", border: "none", color: "#999", cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500,
              textTransform: "capitalize", transition: "color 0.2s",
              padding: "4px 0"
            }}
              onMouseEnter={e => e.target.style.color = "#F0EDE8"}
              onMouseLeave={e => e.target.style.color = "#999"}
            >{s}</button>
          ))}
          <button className="btn-primary" onClick={() => scrollTo("contact")} style={{ padding: "10px 22px", fontSize: 13 }}>
            Hire US ↗
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "120px 40px 80px",
        maxWidth: 1200, margin: "0 auto", position: "relative"
      }}>
        <div style={{ animation: "fadeUp 0.6s ease 0.1s both" }}>
          <div className="hero-badge">
            <div className="dot" />
            Available for new projects
          </div>
        </div>

        <h1 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(72px, 10vw, 140px)", lineHeight: 0.95,
          marginTop: 32, marginBottom: 0, letterSpacing: "-1px",
          animation: "fadeUp 0.6s ease 0.3s both"
        }}>
          WE BUILD<br />
          <span style={{
            background: "linear-gradient(135deg, #00FF87 0%, #00BFFF 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            {typed}<span style={{ animation: "pulse 0.8s infinite", WebkitTextFillColor: "#00FF87" }}>|</span>
          </span><br />
          THAT CONVERT.
        </h1>

        <p style={{
          fontSize: 18, color: "#888", maxWidth: 520, lineHeight: 1.7,
          marginTop: 32, marginBottom: 40,
          animation: "fadeUp 0.6s ease 0.5s both"
        }}>
          Full-stack web developer specializing in fast, beautiful, and high-converting websites for businesses worldwide. Based in India, working globally.
        </p>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", animation: "fadeUp 0.6s ease 0.6s both" }}>
          <button className="btn-primary" onClick={() => scrollTo("work")}>
            View OUR Works ↓
          </button>
          <button className="btn-outline" onClick={() => scrollTo("contact")}>
            Let's Talk
          </button>
        </div>

        {/* Floating badge */}
        {/* <div className="float" style={{
          position: "absolute", right: 80, top: "50%",
          background: "rgba(0,255,135,0.08)", border: "1px solid rgba(0,255,135,0.2)",
          borderRadius: 16, padding: "24px 28px", textAlign: "center",
          backdropFilter: "blur(10px)"
        }}>
          <div style={{ fontFamily: "'Bebas Neue'", fontSize: 48, color: "#00FF87", lineHeight: 1 }}>5★</div>
          <div style={{ fontSize: 12, color: "#888", marginTop: 4, fontFamily: "'Space Mono'" }}>Fiverr & Upwork</div>
        </div> */}

        {/* scroll hint */}
        <div style={{
          position: "absolute", bottom: 40, left: 40, display: "flex",
          alignItems: "center", gap: 12, color: "#555", fontSize: 12,
          fontFamily: "'Space Mono'", animation: "fadeUp 1s ease 1s both"
        }}>
          <div style={{
            width: 1, height: 60, background: "linear-gradient(180deg,#00FF87,transparent)"
          }} />
          Scroll to explore
        </div>
      </section>

      {/* STATS */}
      <section style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "48px 40px", background: "rgba(0,255,135,0.02)"
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
          {STATS.map(({ value, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Bebas Neue'", fontSize: 56, color: "#00FF87", lineHeight: 1 }}>
                <CountUp target={parseInt(value)} suffix={value.replace(/\d/g, "")} />
              </div>
              <div style={{ color: "#666", fontSize: 13, marginTop: 6, fontFamily: "'Space Mono'" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: "100px 40px", maxWidth: 1200, margin: "0 auto" }}>
        <span className="section-label">— What We Do</span>
        <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 64, lineHeight: 1, marginBottom: 16 }}>
          SERVICES<br /><span style={{ color: "#00FF87" }}>& EXPERTISE</span>
        </h2>
        <div className="divider" />
        <p style={{ color: "#888", fontSize: 16, maxWidth: 480, lineHeight: 1.7, marginBottom: 64 }}>
          End-to-end web development services built for results. No fluff — just clean code and beautiful design.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1 }}>
          {SERVICES.map((s, i) => (
            <div key={i} className="service-card" style={{
              padding: "36px 32px", border: "1px solid rgba(255,255,255,0.07)",
              transition: "all 0.3s ease", cursor: "default", background: "#0C0C0C",
              animation: `fadeUp 0.5s ease ${i * 0.1}s both`
            }}>
              <div style={{ fontSize: 36, marginBottom: 20 }}>{s.icon}</div>
              <h3 style={{ fontFamily: "'DM Sans'", fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{s.title}</h3>
              <p style={{ color: "#777", fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>{s.desc}</p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {s.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="work" style={{ padding: "100px 40px", background: "#0A0A0A" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* <span className="section-label">— Portfolio</span> */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64 }}>
            <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 64, lineHeight: 1 }}>
              RECENT<br /><span style={{ color: "#00FF87" }}>PROJECTS</span>
            </h2>
            <p style={{ color: "#777", fontSize: 14, maxWidth: 300, textAlign: "right", lineHeight: 1.7 }}>
              Real projects for real clients. Every site built for performance, conversions, and scale.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {PROJECTS.map((p, i) => (
              <a key={p.id} href={p.link} target="_blank" rel="noopener noreferrer"
                className="project-card"
                style={{
                  textDecoration: "none", color: "inherit", display: "block",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 8, overflow: "hidden", position: "relative",
                  transition: "all 0.3s ease", cursor: "pointer",
                  animation: `fadeUp 0.5s ease ${i * 0.1}s both`
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = p.color; e.currentTarget.style.transform = "translateY(-6px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                {/* Colored top bar */}
                <div style={{ height: 4, background: p.color }} />

                {/* Mock browser window */}
                <div style={{
                  background: "#111", padding: "20px",
                  minHeight: 160, display: "flex", flexDirection: "column",
                  justifyContent: "center", alignItems: "center", position: "relative",
                  overflow: "hidden"
                }}>
                  {/* Browser dots */}
                  <div style={{ position: "absolute", top: 12, left: 16, display: "flex", gap: 5 }}>
                    {["#FF5F57","#FFBD2E","#28CA41"].map(c => (
                      <div key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c, opacity: 0.6 }} />
                    ))}
                  </div>

                  {/* Project number display */}
                  <div style={{
                    fontFamily: "'Bebas Neue'", fontSize: 80, color: p.color,
                    opacity: 0.15, lineHeight: 1, userSelect: "none"
                  }}>
                    {String(p.id).padStart(2, "0")}
                  </div>
                  <div style={{
                    position: "absolute", bottom: 16, right: 16,
                    background: "rgba(255,255,255,0.07)", borderRadius: 4,
                    padding: "4px 10px", fontSize: 11, fontFamily: "'Space Mono'",
                    color: p.color
                  }}>
                    {p.category}
                  </div>
                </div>

                <div style={{ padding: "24px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 10 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 700 }}>{p.title}</h3>
                    <span style={{ color: p.color, fontSize: 18 }}>↗</span>
                  </div>
                  <p style={{ color: "#777", fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>{p.desc}</p>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {p.tech.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" style={{ padding: "100px 40px", maxWidth: 1200, margin: "0 auto" }}>
        <span className="section-label">— How It Works</span>
        <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 64, lineHeight: 1, marginBottom: 64 }}>
          MY SIMPLE<br /><span style={{ color: "#00FF87" }}>PROCESS</span>
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 40 }}>
          {PROCESS.map((p, i) => (
            <div key={i} style={{ position: "relative", animation: `fadeUp 0.5s ease ${i * 0.15}s both` }}>
              {i < PROCESS.length - 1 && (
                <div style={{
                  position: "absolute", top: 22, left: "100%",
                  width: "80%", height: 1,
                  background: "linear-gradient(90deg, rgba(0,255,135,0.4), transparent)",
                  zIndex: 0
                }} />
              )}
              <div style={{
                width: 44, height: 44, borderRadius: "50%",
                border: "2px solid #00FF87", display: "flex",
                alignItems: "center", justifyContent: "center",
                fontFamily: "'Space Mono'", fontSize: 12, color: "#00FF87",
                marginBottom: 20, background: "rgba(0,255,135,0.08)", position: "relative", zIndex: 1
              }}>
                {p.step}
              </div>
              <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 10 }}>{p.title}</h3>
              <p style={{ color: "#777", fontSize: 14, lineHeight: 1.7 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY HIRE ME */}
      <section style={{
        padding: "80px 40px", background: "#0C0C0C",
        borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)"
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <span className="section-label">— Why Choose Me</span>
            <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 56, lineHeight: 1, marginBottom: 32 }}>
              NO DELAYS.<br />NO BS.<br /><span style={{ color: "#00FF87" }}>JUST RESULTS.</span>
            </h2>
            <p style={{ color: "#888", lineHeight: 1.8, fontSize: 15 }}>
              I've worked with clients from 15+ countries delivering websites that look stunning and perform even better. I communicate clearly, meet deadlines, and build long-term relationships.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              ["⚡", "Fast Delivery", "Most projects delivered within 3–7 days."],
              ["💬", "Clear Communication", "Daily updates, quick replies, zero ghosting."],
              ["🔄", "Unlimited Revisions", "We iterate until you're 100% satisfied."],
              ["🔒", "Post-Launch Support", "30 days free support after every delivery."],
            ].map(([icon, title, desc]) => (
              <div key={title} style={{
                display: "flex", gap: 16, padding: "20px 24px",
                border: "1px solid rgba(255,255,255,0.07)", borderRadius: 8,
                transition: "border-color 0.3s"
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#00FF87"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"}
              >
                <span style={{ fontSize: 24 }}>{icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{title}</div>
                  <div style={{ color: "#777", fontSize: 13 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT / CTA */}
      <section id="contact" style={{
        padding: "120px 40px", textAlign: "center",
        background: "radial-gradient(ellipse at center, rgba(0,255,135,0.05) 0%, transparent 60%)"
      }}>
        <span className="section-label" style={{ justifyContent: "center", display: "block" }}>— Let's Work Together</span>
        <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(56px, 8vw, 100px)", lineHeight: 1, marginBottom: 24 }}>
          READY TO BUILD<br /><span style={{ color: "#00FF87" }}>SOMETHING GREAT?</span>
        </h2>
        <p style={{ color: "#888", fontSize: 17, maxWidth: 480, margin: "0 auto 48px", lineHeight: 1.7 }}>
          Whether it's a landing page, full web app, or just a quick fix — I'm here to help. Let's discuss your project.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          {/* ✏️ Replace these links with your actual Fiverr/Upwork profiles */}
          <a href="mailto:mgDudue@gmail.com">
            <button className="btn-primary" style={{ fontSize: 16, padding: "16px 40px" }}>
              📧 mgDudue@gmail.com
            </button>
          </a>
          <a href="tel:+91XXXXXXXXXX">
            <button className="btn-outline" style={{ fontSize: 16, padding: "16px 40px" }}>
              📞 +91 9111905260
            </button>
          </a>
        </div>

        {/* Contact details */}
        <div style={{ marginTop: 64, display: "flex", gap: 40, justifyContent: "center", flexWrap: "wrap" }}>
          {[
            /* ✏️ Replace with your actual contact info */
            // ["📧", "your@email.com"],
            // ["💬", "WhatsApp / Telegram"],
            // ["🌍", "Available Worldwide"],
          ].map(([icon, text]) => (
            <div key={text} style={{ display: "flex", gap: 10, alignItems: "center", color: "#777", fontSize: 14 }}>
              <span>{icon}</span>
              <span style={{ fontFamily: "'Space Mono'" }}>{text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "24px 40px", display: "flex",
        justifyContent: "space-between", alignItems: "center",
        background: "#080808"
      }}>
        <div style={{ fontFamily: "'Bebas Neue'", fontSize: 20, letterSpacing: 2 }}>
          MG<span style={{ color: "#00FF87" }}>DUDE</span>
        </div>
        <div style={{ color: "#555", fontSize: 12, fontFamily: "'Space Mono'" }}>
          © 2025 — Built with 🔥
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {["Fiverr", "Upwork", "LinkedIn"].map(s => (
            <a key={s} href="#" style={{ color: "#555", fontSize: 12, textDecoration: "none", fontFamily: "'Space Mono'", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "#00FF87"}
              onMouseLeave={e => e.target.style.color = "#555"}
            >{s}</a>
          ))}
        </div>
      </footer>
    </>
  );
}