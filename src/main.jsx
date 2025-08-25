import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
  Link,
} from "react-router-dom";
import PrivacyPage from "./PrivacyPage";
import ScrollToTop from "./ScrollToTop";

// --- Theme tokens (kept for inline color needs)
const COLORS = { navy: "#1D3557", coral: "#E76F51" };

// --- Translations
const T = {
  en: {
    headline: "Personalized Travel. Anytime, Anywhere.",
    subheadline: "Smart journeys for businesses & families.",
    nav: {
      corporate: "Corporate Travel",
      family: "Bespoke Holidays",
      about: "About Us",
      contact: "Contact",
    },
    corp: {
      title: "Corporate Travel & Events",
      text:
        "From flights and hotels to team-building events, we take care of every detail — optimizing costs and providing 24/7 support so your team can focus on business.",
      b1: "We provide tailored travel consultancy",
      b2: "We organize business events, teambuildings and corporate parties",
      b3: "We balance cost and quality to optimize every trip",
      b4: "We ensure always-on travel assistance",
    },
    fam: {
      title: "Bespoke Family Holidays",
      text:
        "Family time is precious — and holidays should be stress-free. We design personalized escapes that match your style, budget, and dreams.",
      b1: "We create tailor-made itineraries",
      b2: "We select handpicked destinations worldwide",
      b3: "We ensure the best price–quality balance",
      b4: "We support you from planning to your safe return — including travel health insurance",
    },
    about: {
      title: "Why Travel with Us?",
      p1: "At YouTravel, we believe journeys should be effortless and personal. Unlike agencies that only sell packages, we act as your travel consultant—listening first, then creating solutions that truly fit your needs.",
      p2: "Our founder brings over 13 years of experience in leading travel agencies: she has travelled across three continents, organized large-scale corporate events and meticulously planned holidays. From hotels and flights to rental cars, we handle every detail, represent you in any dispute with providers, and stay available 24/7—so your only focus is enjoying the journey.",
      bullets: [
        "We listen first, then tailor the right solution",
        "13+ years experience in travel & events",
        "Licensed, insured & transparent — including travel health insurance",
        "Here for you 24/7 before, during & after your trip",
      ],
    },
    contact: {
      title: "Let’s Plan Your Next Journey",
      text: "Contact us today and we’ll take care of the rest:",
      email: "Email Us",
      phone: "Call Us",
      whatsapp: "WhatsApp",
      location: "Based in Bucharest, Romania",
    },
    backHome: "Back to Home",
  },
  ro: {
    headline: "Călătorii personalizate. Oriunde, oricând.",
    subheadline: "Călătorii fără griji pentru afaceri și familii.",
    nav: {
      corporate: "Corporate Travel",
      family: "Vacanțe Personalizate",
      about: "Despre noi",
      contact: "Contact",
    },
    corp: {
      title: "Călătorii & Evenimente Corporate",
      text:
        "De la zboruri și hoteluri la team building-uri, ne ocupăm de fiecare detaliu — optimizăm costurile și oferim suport 24/7 pentru ca echipa ta să se concentreze pe business.",
      b1: "Oferim consultanță de călătorie personalizată",
      b2: "Organizăm evenimente corporate, team building-uri și petreceri",
      b3: "Optimizăm costurile și calitatea fiecărei călătorii",
      b4: "Asigurăm asistență permanentă",
    },
    fam: {
      title: "Vacanțe Familiale Personalizate",
      text:
        "Timpul petrecut cu familia este prețios — iar vacanțele trebuie să fie fără griji. Noi creăm experiențe adaptate stilului, bugetului și viselor voastre.",
      b1: "Creăm itinerarii personalizate",
      b2: "Selectăm destinații unice din întreaga lume",
      b3: "Asigurăm cel mai bun raport calitate–preț",
      b4: "Oferim suport de la planificare până la întoarcerea acasă — inclusiv asigurări medicale de călătorie",
    },
    about: {
      title: "De ce să călătoriți cu noi?",
      p1: "La YouTravel, credem că fiecare călătorie trebuie să fie fără griji și personalizată. Spre deosebire de agențiile care vând doar pachete standard, noi acționăm ca un consultant de călătorii — ascultăm mai întâi și apoi construim soluții care vi se potrivesc cu adevărat.",
      p2: "Fondatoarea noastră are peste 13 ani de experiență în conducerea agențiilor de turism: a călătorit pe trei continente, a organizat evenimente corporate de amploare și a planificat vacanțe meticulos. De la hoteluri și zboruri la mașini de închiriat, ne ocupăm de fiecare detaliu, vă reprezentăm în orice dispută cu furnizorii și suntem disponibili 24/7 — astfel încât singurul vostru focus să fie să vă bucurați de călătorie.",
      bullets: [
        "Ascultăm mai întâi, apoi construim soluția potrivită",
        "13+ ani experiență în turism & evenimente",
        "Servicii licențiate, asigurate & transparente — inclusiv asigurări medicale de călătorie",
        "Suntem alături de voi 24/7, înainte, pe durata și după călătorie",
      ],
    },
    contact: {
      title: "Planifică următoarea călătorie",
      text: "Contactați-ne și ne ocupăm de tot:",
      email: "Trimiteți Email",
      phone: "Sunați-ne",
      whatsapp: "WhatsApp",
      location: "Cu sediul în București, România",
    },
    backHome: "Înapoi la început",
  },
};

// --- Language: URL + localStorage
function useLang() {
  const navigate = useNavigate();
  const { pathname, hash } = useLocation();
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem("lang");
    if (pathname.startsWith("/ro")) return "ro";
    return saved === "ro" ? "ro" : "en";
  });

  // Align URL to selected language on first load (root only)
  useEffect(() => {
    const desired = lang === "ro" ? "/ro" : "/";
    const atRoot = pathname === "/" || pathname === "/ro";
    if (atRoot && !pathname.startsWith(desired)) {
      navigate(desired + (hash || ""), { replace: true });
    }
    // eslint-disable-next-line
  }, []);

  const switchLang = (next) => {
    localStorage.setItem("lang", next);
    setLang(next);
    const section = (typeof window !== "undefined" && window.location.hash) || "";
    navigate((next === "ro" ? "/ro" : "/") + section);
  };

  return { lang, t: T[lang], switchLang };
}

// --- Smooth scroll helper
const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  const headerOffset = 0; // header sits above, we don’t need extra offset now
  const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;
  window.scrollTo({ top: y, behavior: "smooth" });
};

// ---------------- Components ----------------
function Header({ t, switchLang, lang }) {
  const [openLang, setOpenLang] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");

  // Shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section highlight
  useEffect(() => {
    const ids = ["corporate", "family", "about", "contact"]; // order matters
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { root: null, threshold: 0.3, rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const Tab = ({ id, children }) => (
    <button
      onClick={() => scrollToId(id)}
      className={`relative px-3 py-2 rounded-md text-[15px] transition-colors focus:outline-none hover:text-[#E76F51] ${
        active === id ? "text-[#E76F51]" : "text-gray-800"
      }`}
    >
      {children}
      <span
        className={`absolute left-3 right-3 -bottom-[3px] h-[2px] bg-[#E76F51] transition-opacity duration-200 ${
          active === id ? "opacity-100" : "opacity-0"
        }`}
      />
    </button>
  );

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 bg-white border-b border-neutral-200"
      // style={{ position: "static" }}  // ensure header is NOT fixed/sticky
    >
      <div className="container-yt flex items-center justify-between py-2">
        {/* Logo-only brand (button to hero) */}
        <button onClick={() => scrollToId("hero")} className="flex items-center" aria-label="YouTravel">
          <img
            src={`${import.meta.env.BASE_URL}images/logo-youtravel-white.png`}
            alt="YouTravel"
            className="h-12"
          />
        </button>

        {/* Desktop nav: right aligned */}
        <nav className="hidden md:flex items-center gap-4">
          <Tab id="corporate">{t.nav.corporate}</Tab>
          <Tab id="family">{t.nav.family}</Tab>
          <Tab id="about">{t.nav.about}</Tab>
          <Tab id="contact">{t.nav.contact}</Tab>

          {/* Language dropdown */}
          <div className="relative ml-2">
            <button
              onClick={() => setOpenLang((v) => !v)}
              className="px-3 py-2 text-sm border rounded-md hover:bg-gray-50 flex items-center gap-1 focus:outline-none"
              aria-haspopup="listbox"
              aria-expanded={openLang}
            >
              <span role="img" aria-label="language">🌐</span>
              <span>{lang === "ro" ? "Limba (română)" : "Language"}</span>
            </button>
            {openLang && (
              <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden">
                <button
                  onClick={() => { setOpenLang(false); switchLang("en"); }}
                  className="block w-full text-left px-3 py-2 hover:bg-gray-50"
                >
                  EN
                </button>
                <button
                  onClick={() => { setOpenLang(false); switchLang("ro"); }}
                  className="block w-full text-left px-3 py-2 hover:bg-gray-50"
                >
                  RO
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile burger */}
        <button className="md:hidden p-2" onClick={() => setMobileOpen(true)} aria-label="Open menu">
          <svg width="26" height="26" viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Mobile full-screen menu */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-white">
          <div className="container-yt h-full flex flex-col">
            <div className="flex items-center justify-between py-4">
              <img
                src={`${import.meta.env.BASE_URL}images/logo-youtravel-white.png`}
                alt="YouTravel"
                className="h-12"
              />
              <button onClick={() => setMobileOpen(false)} aria-label="Close" className="p-2">
                ✕
              </button>
            </div>
            <div className="mt-6 flex-1 flex flex-col">
              <button
                className="text-left text-xl py-4 border-b border-neutral-200"
                onClick={() => { scrollToId("corporate"); setMobileOpen(false); }}
              >
                {t.nav.corporate}
              </button>
              <button
                className="text-left text-xl py-4 border-b border-neutral-200"
                onClick={() => { scrollToId("family"); setMobileOpen(false); }}
              >
                {t.nav.family}
              </button>
              <button
                className="text-left text-xl py-4 border-b border-neutral-200"
                onClick={() => { scrollToId("about"); setMobileOpen(false); }}
              >
                {t.nav.about}
              </button>
              <button
                className="text-left text-xl py-4 border-b border-neutral-200"
                onClick={() => { scrollToId("contact"); setMobileOpen(false); }}
              >
                {t.nav.contact}
              </button>

              <div className="mt-6">
                <div className="text-sm text-gray-500 mb-2">🌐 {lang === "ro" ? "Limba (română)" : "Language"}</div>
                <div className="flex gap-3">
                  <button onClick={() => { switchLang("en"); setMobileOpen(false); }} className="px-4 py-2 border rounded">EN</button>
                  <button onClick={() => { switchLang("ro"); setMobileOpen(false); }} className="px-4 py-2 border rounded">RO</button>
                </div>
              </div>

              <div className="mt-auto py-6 text-sm text-gray-500">
                © {new Date().getFullYear()} YouTravel
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero({ t }) {
  return (
    <section id="hero" className="relative min-h-[78vh] md:min-h-[92vh]">
      {/* Background */}
      <img
        src={`${import.meta.env.BASE_URL}images/hero-skyline.jpg`}
        alt="City skyline at dusk"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/45" />

      {/* Content */}
      <div className="relative z-10 container-yt flex items-center min-h-[78vh] md:min-h-[92vh]">
        <div className="text-white max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
            {t.headline}
          </h1>
          <p className="mt-4 text-lg md:text-2xl opacity-95">
            {t.subheadline}
          </p>
          {/* Button back to normal placement */}
          <div className="mt-8">
            <button className="btn-coral" onClick={() => scrollToId("contact")}>
              ✈️ {t.nav.contact}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Corporate({ t }) {
  return (
    <section id="corporate" className="bg-navy-yt text-white py-16">
      <div className="container-yt grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">{t.corp.title}</h2>
          <p className="mb-5 opacity-90">{t.corp.text}</p>
          <ul className="space-y-2">
            <li>✔️ {t.corp.b1}</li>
            <li>🎉 {t.corp.b2}</li>
            <li>💰 {t.corp.b3}</li>
            <li>🕘 {t.corp.b4}</li>
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img
            src={`${import.meta.env.BASE_URL}images/corp-skyline.jpg`}
            alt="Corporate travel in major city skyline"
            className="rounded-xl shadow-lg object-cover w-full h-44 md:h-56"
            loading="lazy"
          />
          <img
            src={`${import.meta.env.BASE_URL}images/corp-rooftop.jpg`}
            alt="Business rooftop meeting"
            className="rounded-xl shadow-lg object-cover w-full h-44 md:h-56"
            loading="lazy"
          />
          <img
            src={`${import.meta.env.BASE_URL}images/corp-night.jpg`}
            alt="Night city travel"
            className="hidden md:block rounded-xl shadow-lg object-cover w-full h-44 md:h-56 col-span-2"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

function Family({ t }) {
  return (
    <section id="family" className="bg-peach py-16">
      <div className="container-yt grid md:grid-cols-2 gap-10 items-center">
        {/* Text first on mobile */}
        <div className="order-1">
          <h2 className="text-3xl font-bold mb-4" style={{ color: COLORS.navy }}>
            {t.fam.title}
          </h2>
          <p className="mb-5 text-gray-800">{t.fam.text}</p>
          <ul className="space-y-2 text-gray-800">
            <li>🗺️ {t.fam.b1}</li>
            <li>🌍 {t.fam.b2}</li>
            <li>💡 {t.fam.b3}</li>
            <li>🛡️ {t.fam.b4}</li>
          </ul>
        </div>

        {/* Photos second on mobile */}
        <div className="order-2 grid grid-cols-2 gap-4">
          <img
            src={`${import.meta.env.BASE_URL}images/fam-pineapple.jpg`}
            alt="Tropical pineapple drink on the beach"
            className="rounded-xl shadow-lg object-cover w-full h-44 md:h-56"
            loading="lazy"
          />
          <img
            src={`${import.meta.env.BASE_URL}images/fam-airplane-hand.jpeg`}
            alt="Hand holding a plane toy by the airplane window"
            className="rounded-xl shadow-lg object-cover w-full h-44 md:h-56"
            loading="lazy"
          />
          <img
            src={`${import.meta.env.BASE_URL}images/fam-jetski.jpg`}
            alt="Family riding a jetski"
            className="hidden md:block rounded-xl shadow-lg object-cover w-full h-44 md:h-56 col-span-2"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

function About({ t }) {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        {/* Text first always */}
        <div className="order-1 md:order-none">
          <h2 className="text-3xl font-bold mb-4" style={{ color: COLORS.navy }}>
            {t.about.title}
          </h2>

          {/* Paragraphs with justified text */}
          <div className="text-gray-700 space-y-4 mb-8 leading-relaxed text-justify">
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
          </div>

          {/* Bullets */}
          <ul className="grid sm:grid-cols-2 gap-3 text-gray-800">
            {t.about.bullets.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <svg
                  className="mt-1 shrink-0"
                  width="18"
                  height="18"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle cx="10" cy="10" r="10" fill={COLORS.coral} />
                  <path
                    d="M6 10.5l2.2 2.2L14 7"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Image second always */}
        <div className="order-2 md:order-none">
          <img
            src={`${import.meta.env.BASE_URL}images/about-canyon.jpg`}
            alt="Curated travel experiences"
            className="rounded-xl shadow-lg object-cover w-full h-64 md:h-[420px]"
          />
        </div>
      </div>
    </section>
  );
}

function Contact({ t }) {
  const BTN = "btn-coral";

  return (
    <section id="contact" className="bg-navy-yt py-16 text-white">
      <div className="container-yt text-center">
        <h2 className="text-3xl font-bold mb-4">{t.contact.title}</h2>
        <p className="mb-6 opacity-90">{t.contact.text}</p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          {/* Email */}
          <a href="mailto:office@youtravel.ro" className={BTN}>
            📧 {t.contact.email}: <span className="font-semibold">office@youtravel.ro</span>
          </a>

          {/* Phone */}
          <a href="tel:+40720377378" className={BTN}>
            📞 {t.contact.phone}: <span className="font-semibold">+40 720 377 378</span>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/40720377378"
            target="_blank"
            rel="noopener noreferrer"
            className={BTN}
          >
            💬 {t.contact.whatsapp}
          </a>
        </div>

        <div className="mt-6 text-sm opacity-90">{t.contact.location}</div>
      </div>
    </section>
  );
}

function Footer({ lang }) {
  const path = lang === "ro" ? "/ro/privacy" : "/privacy";
  return (
    <footer className="bg-gray-900 text-white">
      <div className="border-t border-white/10" />
      <div className="container-yt py-6 flex flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-4">
          <p>© {new Date().getFullYear()} YouTravel</p>
          <Link
            to={path}
            className="text-xs underline opacity-80 hover:opacity-100"
          >
            {lang === "ro" ? "Politica de confidențialitate" : "Privacy Policy"}
          </Link>
        </div>

        <p className="text-xs opacity-70 leading-relaxed max-w-3xl">
          YOUR TRAVEL SOLUTIONS SRL • CUI: RO 48018452 • Nr. Reg. Com.: J40/7471/2023 <br />
          Licența de turism nr. 2786 / 25.05.2023 • Brevet de turism nr. 26310 / 05.05.2022 <br />
          Polița de asigurare nr. IF-i 4545 (valabilă până la 27.04.2026) — S.C. GERMAN ROMANIAN ASSURANCE S.A.
        </p>
      </div>
    </footer>
  );
}

// --- Main (one-page) content wrapper
function OnePage({ t, switchLang, lang }) {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) setTimeout(() => scrollToId(hash.replace("#", "")), 50);
  }, [hash, lang]);

  return (
    <div className="font-sans">
      <Header t={t} switchLang={switchLang} lang={lang} />
      {/* no extra padding; header height provides the visual space */}
      <main className="pt-0">
        <Hero t={t} />
        <Corporate t={t} />
        <Family t={t} />
        <About t={t} />
        <Contact t={t} />
      </main>
      <Footer lang={lang} />
    </div>
  );
}

function AppRouter() {
  const { lang, t, switchLang } = useLang();
  return (
    <Routes>
      <Route path="/" element={<OnePage t={t} switchLang={switchLang} lang={lang} />} />
      <Route path="/ro" element={<OnePage t={t} switchLang={switchLang} lang={lang} />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/ro/privacy" element={<PrivacyPage />} />
      <Route path="*" element={<OnePage t={t} switchLang={switchLang} lang={lang} />} />
    </Routes>
  );
}

// --- Mount (GitHub Pages: use basename)
const container = document.getElementById("root");
createRoot(container).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <ScrollToTop />
    <AppRouter />
  </BrowserRouter>
);