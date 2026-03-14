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
  const [menuOpen, setMenuOpen] = useState(false);
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

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = () => setMenuOpen(false);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [menuOpen]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');

    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body { background: #080808; color: #F0EDE8; font-family: 'DM Sans', sans-serif; overflow-x: hidden; }

    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: #111; }
    ::-webkit-scrollbar-thumb { background: #00FF87; border-radius: 2px; }

    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
    @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }

    .fade-up { animation: fadeUp 0.7s ease forwards; }
    .float-anim { animation: float 4s ease-in-out infinite; }

    /* ── Cursor glow (desktop only) ── */
    .cursor-glow {
      position: fixed; width: 300px; height: 300px; border-radius: 50%;
      background: radial-gradient(circle, rgba(0,255,135,0.06) 0%, transparent 70%);
      pointer-events: none; z-index: 0; transition: all 0.1s linear;
      transform: translate(-50%, -50%);
    }

    /* ── Grain overlay ── */
    .grain {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      pointer-events: none; z-index: 1000; opacity: 0.03;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    }

    /* ── NAV ── */
    .nav-wrap {
      position: fixed; top: 0; left: 0; right: 0; z-index: 200;
      padding: 0 40px; height: 68px; display: flex; align-items: center;
      justify-content: space-between;
      background: rgba(8,8,8,0.88); backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    .nav-logo {
      font-family: 'Bebas Neue', sans-serif; font-size: 26px; letter-spacing: 2px; color: #F0EDE8;
      flex-shrink: 0;
    }
    .nav-logo span { color: #00FF87; }

    .nav-links { display: flex; gap: 32px; align-items: center; }
    .nav-link-btn {
      background: none; border: none; color: #888; cursor: pointer;
      font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
      text-transform: capitalize; transition: color 0.2s; padding: 4px 0;
      position: relative;
    }
    .nav-link-btn::after {
      content: ''; position: absolute; bottom: -2px; left: 0;
      width: 0; height: 1px; background: #00FF87; transition: width 0.3s ease;
    }
    .nav-link-btn:hover { color: #F0EDE8; }
    .nav-link-btn:hover::after { width: 100%; }

    .nav-cta {
      background: #00FF87; color: #080808; font-weight: 700;
      padding: 9px 20px; border: none; border-radius: 4px; cursor: pointer;
      font-family: 'DM Sans', sans-serif; font-size: 13px;
      transition: all 0.25s ease; white-space: nowrap;
    }
    .nav-cta:hover { background: #00e67a; transform: translateY(-1px); }

    /* Hamburger */
    .hamburger {
      display: none; flex-direction: column; gap: 5px; cursor: pointer;
      background: none; border: none; padding: 4px;
    }
    .hamburger span {
      display: block; width: 24px; height: 2px; background: #F0EDE8;
      border-radius: 2px; transition: all 0.3s ease;
    }
    .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
    .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
    .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

    /* Mobile menu drawer */
    .mobile-menu {
      position: fixed; top: 68px; left: 0; right: 0; z-index: 199;
      background: rgba(10,10,10,0.97); backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(255,255,255,0.08);
      padding: 24px 24px 32px;
      transform: translateY(-110%); transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
    }
    .mobile-menu.open { transform: translateY(0); }
    .mobile-menu-links { display: flex; flex-direction: column; gap: 4px; margin-bottom: 20px; }
    .mobile-menu-btn {
      background: none; border: none; color: #aaa; cursor: pointer;
      font-family: 'DM Sans', sans-serif; font-size: 18px; font-weight: 600;
      padding: 12px 0; text-align: left; text-transform: capitalize;
      border-bottom: 1px solid rgba(255,255,255,0.06);
      transition: color 0.2s;
    }
    .mobile-menu-btn:hover { color: #00FF87; }

    /* ── BUTTONS ── */
    .btn-primary {
      background: #00FF87; color: #080808; font-weight: 700;
      padding: 14px 32px; border: none; border-radius: 4px; cursor: pointer;
      font-family: 'DM Sans', sans-serif; font-size: 15px; letter-spacing: 0.3px;
      transition: all 0.25s ease; display: inline-flex; align-items: center; gap: 8px;
      text-decoration: none;
    }
    .btn-primary:hover { background: #00e67a; transform: translateY(-2px); box-shadow: 0 12px 40px rgba(0,255,135,0.3); }
    .btn-outline {
      background: transparent; color: #F0EDE8; font-weight: 600;
      padding: 14px 32px; border: 1px solid rgba(240,237,232,0.25); border-radius: 4px; cursor: pointer;
      font-family: 'DM Sans', sans-serif; font-size: 15px;
      transition: all 0.25s ease; display: inline-flex; align-items: center; gap: 8px;
      text-decoration: none;
    }
    .btn-outline:hover { border-color: #00FF87; color: #00FF87; transform: translateY(-2px); }

    /* ── HERO ── */
    .hero-section {
      min-height: 100vh; display: flex; flex-direction: column;
      justify-content: center; padding: 120px 40px 80px;
      max-width: 1200px; margin: 0 auto; position: relative;
    }
    .hero-badge {
      display: inline-flex; align-items: center; gap: 8px;
      background: rgba(0,255,135,0.1); border: 1px solid rgba(0,255,135,0.3);
      color: #00FF87; padding: 6px 16px; border-radius: 100px; font-size: 13px;
      font-family: 'Space Mono', monospace; animation: fadeUp 0.5s ease 0.2s both;
      width: fit-content;
    }
    .dot { width: 6px; height: 6px; background: #00FF87; border-radius: 50%; animation: pulse 1.5s infinite; flex-shrink: 0; }
    .hero-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: clamp(64px, 10vw, 140px); line-height: 0.95;
      margin-top: 28px; letter-spacing: -1px;
      animation: fadeUp 0.6s ease 0.3s both;
    }
    .hero-gradient {
      background: linear-gradient(135deg, #00FF87 0%, #00BFFF 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }
    .hero-desc {
      font-size: 17px; color: #888; max-width: 500px; line-height: 1.75;
      margin-top: 28px; margin-bottom: 36px;
      animation: fadeUp 0.6s ease 0.5s both;
    }
    .hero-btns {
      display: flex; gap: 14px; flex-wrap: wrap;
      animation: fadeUp 0.6s ease 0.6s both;
    }
    .scroll-hint {
      position: absolute; bottom: 40px; left: 40px; display: flex;
      align-items: center; gap: 12px; color: #444; font-size: 11px;
      font-family: 'Space Mono', monospace; animation: fadeUp 1s ease 1s both;
    }
    .scroll-line { width: 1px; height: 50px; background: linear-gradient(180deg,#00FF87,transparent); }

    /* ── STATS ── */
    .stats-section {
      border-top: 1px solid rgba(255,255,255,0.06);
      border-bottom: 1px solid rgba(255,255,255,0.06);
      padding: 56px 40px; background: rgba(0,255,135,0.02);
    }
    .stats-grid {
      max-width: 1200px; margin: 0 auto;
      display: grid; grid-template-columns: repeat(4,1fr); gap: 24px;
    }
    .stat-item { text-align: center; }
    .stat-value { font-family: 'Bebas Neue', sans-serif; font-size: 56px; color: #00FF87; line-height: 1; }
    .stat-label { color: #666; font-size: 12px; margin-top: 6px; font-family: 'Space Mono', monospace; letter-spacing: 0.5px; }

    /* ── SECTION LABELS ── */
    .section-label {
      font-family: 'Space Mono', monospace; font-size: 11px; color: #00FF87;
      letter-spacing: 3px; text-transform: uppercase; margin-bottom: 12px; display: block;
    }
    .section-title {
      font-family: 'Bebas Neue', sans-serif; font-size: clamp(44px, 6vw, 64px); line-height: 1;
    }
    .section-title span { color: #00FF87; }
    .divider { width: 40px; height: 2px; background: #00FF87; margin: 16px 0 32px; }

    /* ── SERVICES ── */
    .services-section { padding: 100px 40px; max-width: 1200px; margin: 0 auto; }
    .services-desc { color: #888; font-size: 15px; max-width: 460px; line-height: 1.75; margin-bottom: 56px; }
    .services-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1px;
      background: rgba(255,255,255,0.07);
      border: 1px solid rgba(255,255,255,0.07);
    }
    .service-card {
      padding: 36px 28px; background: #0C0C0C;
      transition: all 0.3s ease; cursor: default;
      animation: fadeUp 0.5s ease both;
    }
    .service-card:hover { background: #111; transform: translateY(-4px); box-shadow: 0 16px 48px rgba(0,0,0,0.5); }
    .service-icon { font-size: 34px; margin-bottom: 18px; display: block; }
    .service-title { font-size: 19px; font-weight: 700; margin-bottom: 10px; }
    .service-desc { color: #777; font-size: 14px; line-height: 1.7; margin-bottom: 18px; }
    .tags { display: flex; gap: 6px; flex-wrap: wrap; }
    .tag {
      font-size: 11px; font-family: 'Space Mono', monospace;
      background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
      padding: 3px 9px; border-radius: 3px; color: #888;
    }

    /* ── PROJECTS ── */
    .projects-section { padding: 100px 40px; background: #0A0A0A; }
    .projects-inner { max-width: 1200px; margin: 0 auto; }
    .projects-header {
      display: flex; justify-content: space-between; align-items: flex-end;
      margin-bottom: 56px; gap: 24px; flex-wrap: wrap;
    }
    .projects-subtext { color: #777; font-size: 14px; max-width: 280px; text-align: right; line-height: 1.7; }
    .projects-grid {
      display: grid; grid-template-columns: repeat(3,1fr); gap: 20px;
    }
    .project-card {
      text-decoration: none; color: inherit; display: block;
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 8px; overflow: hidden; position: relative;
      transition: all 0.3s ease;
      animation: fadeUp 0.5s ease both;
    }
    .project-card:hover { transform: translateY(-6px); }
    .project-mock {
      background: #111; padding: 20px;
      min-height: 150px; display: flex; flex-direction: column;
      justify-content: center; align-items: center; position: relative; overflow: hidden;
    }
    .browser-dots { position: absolute; top: 12px; left: 16px; display: flex; gap: 5px; }
    .browser-dot { width: 8px; height: 8px; border-radius: 50%; opacity: 0.6; }
    .project-num {
      font-family: 'Bebas Neue', sans-serif; font-size: 80px;
      opacity: 0.13; line-height: 1; user-select: none;
    }
    .project-cat {
      position: absolute; bottom: 14px; right: 14px;
      background: rgba(255,255,255,0.07); border-radius: 4px;
      padding: 4px 10px; font-size: 11px; font-family: 'Space Mono', monospace;
    }
    .project-body { padding: 22px; }
    .project-title-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; gap: 8px; }
    .project-title { font-size: 17px; font-weight: 700; line-height: 1.3; }
    .project-arrow { font-size: 18px; flex-shrink: 0; }
    .project-desc { color: #777; font-size: 13px; line-height: 1.6; margin-bottom: 14px; }

    /* ── PROCESS ── */
    .process-section { padding: 100px 40px; max-width: 1200px; margin: 0 auto; }
    .process-grid {
      display: grid; grid-template-columns: repeat(4,1fr); gap: 40px; margin-top: 0;
    }
    .process-step { position: relative; animation: fadeUp 0.5s ease both; }
    .process-connector {
      position: absolute; top: 22px; left: 100%;
      width: 80%; height: 1px;
      background: linear-gradient(90deg, rgba(0,255,135,0.4), transparent);
      z-index: 0;
    }
    .step-circle {
      width: 44px; height: 44px; border-radius: 50%;
      border: 2px solid #00FF87; display: flex;
      align-items: center; justify-content: center;
      font-family: 'Space Mono', monospace; font-size: 12px; color: #00FF87;
      margin-bottom: 20px; background: rgba(0,255,135,0.08); position: relative; z-index: 1;
    }
    .step-title { font-weight: 700; font-size: 17px; margin-bottom: 10px; }
    .step-desc { color: #777; font-size: 14px; line-height: 1.7; }

    /* ── WHY HIRE ── */
    .why-section {
      padding: 80px 40px;
      background: #0C0C0C;
      border-top: 1px solid rgba(255,255,255,0.05);
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    .why-inner {
      max-width: 1200px; margin: 0 auto;
      display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;
    }
    .why-title {
      font-family: 'Bebas Neue', sans-serif; font-size: clamp(40px, 5vw, 56px); line-height: 1.05; margin-bottom: 24px;
    }
    .why-title span { color: #00FF87; }
    .why-desc { color: #888; line-height: 1.8; font-size: 15px; }
    .why-cards { display: flex; flex-direction: column; gap: 14px; }
    .why-card {
      display: flex; gap: 16px; padding: 18px 22px;
      border: 1px solid rgba(255,255,255,0.07); border-radius: 8px;
      transition: border-color 0.3s;
    }
    .why-card:hover { border-color: #00FF87; }
    .why-card-icon { font-size: 22px; flex-shrink: 0; margin-top: 2px; }
    .why-card-title { font-weight: 700; font-size: 14px; margin-bottom: 3px; }
    .why-card-desc { color: #777; font-size: 13px; line-height: 1.5; }

    /* ── CONTACT ── */
    .contact-section {
      padding: 120px 40px; text-align: center;
      background: radial-gradient(ellipse at center, rgba(0,255,135,0.05) 0%, transparent 60%);
    }
    .contact-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: clamp(48px, 8vw, 100px); line-height: 1; margin-bottom: 20px;
    }
    .contact-title span { color: #00FF87; }
    .contact-desc { color: #888; font-size: 16px; max-width: 460px; margin: 0 auto 44px; line-height: 1.75; }
    .contact-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

    /* ── FOOTER ── */
    .footer {
      border-top: 1px solid rgba(255,255,255,0.06);
      padding: 24px 40px; display: flex;
      justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;
      background: #080808;
    }
    .footer-logo { font-family: 'Bebas Neue', sans-serif; font-size: 20px; letter-spacing: 2px; }
    .footer-logo span { color: #00FF87; }
    .footer-copy { color: #555; font-size: 12px; font-family: 'Space Mono', monospace; }
    .footer-links { display: flex; gap: 24px; }
    .footer-link {
      color: #555; font-size: 12px; text-decoration: none;
      font-family: 'Space Mono', monospace; transition: color 0.2s;
    }
    .footer-link:hover { color: #00FF87; }

    /* ═══════════════════════════════════════
       RESPONSIVE — TABLET (max 1024px)
    ═══════════════════════════════════════ */
    @media (max-width: 1024px) {
      .nav-wrap { padding: 0 24px; }
      .hero-section { padding: 110px 24px 72px; }
      .stats-section { padding: 48px 24px; }
      .stats-grid { grid-template-columns: repeat(2,1fr); gap: 28px 16px; }
      .services-section { padding: 80px 24px; }
      .services-grid { grid-template-columns: repeat(2,1fr); }
      .projects-section { padding: 80px 24px; }
      .projects-grid { grid-template-columns: repeat(2,1fr); }
      .projects-subtext { text-align: left; max-width: 100%; }
      .process-section { padding: 80px 24px; }
      .process-grid { grid-template-columns: repeat(2,1fr); gap: 32px; }
      .process-connector { display: none; }
      .why-section { padding: 64px 24px; }
      .why-inner { gap: 48px; }
      .contact-section { padding: 96px 24px; }
      .footer { padding: 24px; }
    }

    /* ═══════════════════════════════════════
       RESPONSIVE — MOBILE (max 768px)
    ═══════════════════════════════════════ */
    @media (max-width: 768px) {
      /* Nav */
      .nav-wrap { padding: 0 20px; }
      .nav-links { display: none; }
      .hamburger { display: flex; }

      /* Hero */
      .hero-section { padding: 96px 20px 64px; }
      .hero-title { font-size: clamp(52px, 14vw, 80px); margin-top: 20px; }
      .hero-desc { font-size: 15px; margin-top: 20px; margin-bottom: 28px; }
      .hero-btns { flex-direction: column; gap: 12px; }
      .hero-btns .btn-primary,
      .hero-btns .btn-outline { width: 100%; justify-content: center; padding: 14px 24px; }
      .scroll-hint { display: none; }

      /* Stats */
      .stats-section { padding: 40px 20px; }
      .stats-grid { grid-template-columns: repeat(2,1fr); gap: 24px 12px; }
      .stat-value { font-size: 44px; }
      .stat-label { font-size: 11px; }

      /* Services */
      .services-section { padding: 64px 20px; }
      .services-grid { grid-template-columns: 1fr; background: transparent; border: none; gap: 12px; }
      .service-card { border: 1px solid rgba(255,255,255,0.07); border-radius: 8px; padding: 28px 22px; }
      .service-card:hover { transform: none; }

      /* Projects */
      .projects-section { padding: 64px 20px; }
      .projects-header { flex-direction: column; align-items: flex-start; margin-bottom: 36px; }
      .projects-subtext { text-align: left; max-width: 100%; }
      .projects-grid { grid-template-columns: 1fr; gap: 16px; }
      .project-card:hover { transform: none; }
      .project-num { font-size: 60px; }

      /* Process */
      .process-section { padding: 64px 20px; }
      .process-grid { grid-template-columns: 1fr; gap: 28px; }
      .process-connector { display: none; }

      /* Why */
      .why-section { padding: 56px 20px; }
      .why-inner { grid-template-columns: 1fr; gap: 40px; }
      .why-title { font-size: clamp(36px, 10vw, 48px); }

      /* Contact */
      .contact-section { padding: 72px 20px; }
      .contact-btns { flex-direction: column; gap: 12px; align-items: stretch; }
      .contact-btns .btn-primary,
      .contact-btns .btn-outline { width: 100%; justify-content: center; }

      /* Footer */
      .footer { padding: 20px; flex-direction: column; text-align: center; gap: 12px; }
      .footer-links { justify-content: center; }
    }

    /* ═══════════════════════════════════════
       RESPONSIVE — SMALL MOBILE (max 400px)
    ═══════════════════════════════════════ */
    @media (max-width: 400px) {
      .hero-title { font-size: 48px; }
      .stats-grid { grid-template-columns: repeat(2,1fr); gap: 20px 8px; }
      .stat-value { font-size: 38px; }
    }
  `;

  return (
    <>
      <style>{css}</style>
      <div className="grain" />
      <div className="cursor-glow" style={{ left: cursorPos.x, top: cursorPos.y }} />

      {/* ── NAV ── */}
      <nav className="nav-wrap">
        <div className="nav-logo">MG<span>DUDE</span></div>

        {/* Desktop links */}
        <div className="nav-links">
          {["home","services","work","process","contact"].map(s => (
            <button key={s} className="nav-link-btn" onClick={() => scrollTo(s)}>{s}</button>
          ))}
          <button className="nav-cta" onClick={() => scrollTo("contact")}>Hire Us ↗</button>
        </div>

        {/* Hamburger */}
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={(e) => { e.stopPropagation(); setMenuOpen(o => !o); }}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile Menu Drawer */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`} onClick={e => e.stopPropagation()}>
        <div className="mobile-menu-links">
          {["home","services","work","process","contact"].map(s => (
            <button key={s} className="mobile-menu-btn" onClick={() => scrollTo(s)}>{s}</button>
          ))}
        </div>
        <button className="btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={() => scrollTo("contact")}>
          Hire Us ↗
        </button>
      </div>

      {/* ── HERO ── */}
      <section id="home" className="hero-section">
        <div style={{ animation: "fadeUp 0.6s ease 0.1s both" }}>
          <div className="hero-badge">
            <div className="dot" />
            Available for new projects
          </div>
        </div>

        <h1 className="hero-title">
          WE BUILD<br />
          <span className="hero-gradient">
            {typed}<span style={{ animation: "pulse 0.8s infinite", WebkitTextFillColor: "#00FF87" }}>|</span>
          </span><br />
          THAT CONVERT.
        </h1>

        <p className="hero-desc">
          Full-stack web developer specializing in fast, beautiful, and high-converting websites for businesses worldwide. Based in India, working globally.
        </p>

        <div className="hero-btns">
          <button className="btn-primary" onClick={() => scrollTo("work")}>View Our Works ↓</button>
          <button className="btn-outline" onClick={() => scrollTo("contact")}>Let's Talk</button>
        </div>

        <div className="scroll-hint">
          <div className="scroll-line" />
          Scroll to explore
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="stats-section">
        <div className="stats-grid">
          {STATS.map(({ value, label }) => (
            <div key={label} className="stat-item">
              <div className="stat-value">
                <CountUp target={parseInt(value)} suffix={value.replace(/\d/g, "")} />
              </div>
              <div className="stat-label">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="services-section">
        <span className="section-label">— What We Do</span>
        <h2 className="section-title">
          SERVICES<br /><span>& EXPERTISE</span>
        </h2>
        <div className="divider" />
        <p className="services-desc">
          End-to-end web development services built for results. No fluff — just clean code and beautiful design.
        </p>
        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <div key={i} className="service-card" style={{ animationDelay: `${i * 0.08}s` }}>
              <span className="service-icon">{s.icon}</span>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-desc">{s.desc}</p>
              <div className="tags">
                {s.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="work" className="projects-section">
        <div className="projects-inner">
          <div className="projects-header">
            <h2 className="section-title">
              RECENT<br /><span>PROJECTS</span>
            </h2>
            <p className="projects-subtext">
              Real projects for real clients. Every site built for performance, conversions, and scale.
            </p>
          </div>

          <div className="projects-grid">
            {PROJECTS.map((p, i) => (
              <a
                key={p.id}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card"
                style={{ animationDelay: `${i * 0.08}s` }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = p.color; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}
              >
                <div style={{ height: 4, background: p.color }} />
                <div className="project-mock">
                  <div className="browser-dots">
                    {["#FF5F57","#FFBD2E","#28CA41"].map(c => (
                      <div key={c} className="browser-dot" style={{ background: c }} />
                    ))}
                  </div>
                  <div className="project-num" style={{ color: p.color }}>
                    {String(p.id).padStart(2,"0")}
                  </div>
                  <div className="project-cat" style={{ color: p.color }}>{p.category}</div>
                </div>
                <div className="project-body">
                  <div className="project-title-row">
                    <h3 className="project-title">{p.title}</h3>
                    <span className="project-arrow" style={{ color: p.color }}>↗</span>
                  </div>
                  <p className="project-desc">{p.desc}</p>
                  <div className="tags">
                    {p.tech.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" className="process-section">
        <span className="section-label">— How It Works</span>
        <h2 className="section-title" style={{ marginBottom: 56 }}>
          MY SIMPLE<br /><span>PROCESS</span>
        </h2>
        <div className="process-grid">
          {PROCESS.map((p, i) => (
            <div key={i} className="process-step" style={{ animationDelay: `${i * 0.12}s` }}>
              {i < PROCESS.length - 1 && <div className="process-connector" />}
              <div className="step-circle">{p.step}</div>
              <h3 className="step-title">{p.title}</h3>
              <p className="step-desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY HIRE ME ── */}
      <section className="why-section">
        <div className="why-inner">
          <div>
            <span className="section-label">— Why Choose Me</span>
            <h2 className="why-title">
              NO DELAYS.<br />NO BS.<br /><span>JUST RESULTS.</span>
            </h2>
            <p className="why-desc">
              I've worked with clients from 15+ countries delivering websites that look stunning and perform even better. I communicate clearly, meet deadlines, and build long-term relationships.
            </p>
          </div>
          <div className="why-cards">
            {[
              ["⚡", "Fast Delivery", "Most projects delivered within 3–7 days."],
              ["💬", "Clear Communication", "Daily updates, quick replies, zero ghosting."],
              ["🔄", "Unlimited Revisions", "We iterate until you're 100% satisfied."],
              ["🔒", "Post-Launch Support", "30 days free support after every delivery."],
            ].map(([icon, title, desc]) => (
              <div key={title} className="why-card">
                <span className="why-card-icon">{icon}</span>
                <div>
                  <div className="why-card-title">{title}</div>
                  <div className="why-card-desc">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="contact-section">
        <span className="section-label">— Let's Work Together</span>
        <h2 className="contact-title">
          READY TO BUILD<br /><span>SOMETHING GREAT?</span>
        </h2>
        <p className="contact-desc">
          Whether it's a landing page, full web app, or just a quick fix — I'm here to help. Let's discuss your project.
        </p>
        <div className="contact-btns">
          <a href="mailto:mgDudue@gmail.com" className="btn-primary" style={{ fontSize: 15, padding: "15px 36px" }}>
            📧 mgDudue@gmail.com
          </a>
          <a href="tel:+919111905260" className="btn-outline" style={{ fontSize: 15, padding: "15px 36px" }}>
            📞 +91 9111905260
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-logo">MG<span>DUDE</span></div>
        <div className="footer-copy">© 2025 — Built with 🔥</div>
        <div className="footer-links">
          {["Fiverr","Upwork","LinkedIn"].map(s => (
            <a key={s} href="#" className="footer-link">{s}</a>
          ))}
        </div>
      </footer>
    </>
  );
}