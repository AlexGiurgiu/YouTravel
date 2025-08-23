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

// --- Theme
const COLORS = { navy: "#1D3557", coral: "#E76F51" };

// --- Translations (short UI copy)
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
        "From flights and hotels to team-building events, we optimize costs and provide 24/7 support so your team can focus on business.",
      b1: "Get tailored travel consultancy",
      b2: "Organize business events, teambuildings and corporate parties",
      b3: "Rely on always-on travel assistance",
    },
    fam: {
      title: "Bespoke Family Holidays",
      text:
        "Family time is precious — holidays should be stress-free. We design escapes that fit your style, budget, and dreams.",
      b1: "Enjoy custom itineraries",
      b2: "Discover handpicked destinations",
      b3: "Benefit from the best price-quality balance",
    },
    about: {
      title: "Why Choose YouTravel?",
      text:
        "Because every journey is personal. We balance quality, cost, and reliability to make every trip effortless and memorable.",
    },
    contact: {
      title: "Let’s Plan Your Next Journey",
      text: "Contact us today and we’ll take care of the rest:",
      email: "Email Us",
      phone: "Call Us",
      whatsapp: "WhatsApp",
    },
    backHome: "Back to Home",
  },
  ro: {
    headline: "Călătorii personalizate. Oriunde, oricând.",
    subheadline: "Călătorii inteligente pentru afaceri și familii.",
    nav: {
      corporate: "Corporate Travel",
      family: "Vacanțe Personalizate",
      about: "Despre noi",
      contact: "Contact",
    },
    corp: {
      title: "Călătorii & Evenimente Corporate",
      text:
        "De la zboruri și hoteluri la team building-uri, optimizăm costurile și oferim suport 24/7 pentru ca echipa ta să se concentreze pe business.",
      b1: "Primește consultanță de călătorie personalizată",
      b2: "Organizează evenimente corporate, team building-uri și petreceri",
      b3: "Beneficiază de asistență permanentă",
    },
    fam: {
      title: "Vacanțe Familiale Personalizate",
      text:
        "Timpul cu familia este prețios — vacanțele trebuie să fie fără griji. Creăm experiențe adaptate stilului, bugetului și viselor voastre.",
      b1: "Bucură-te de itinerarii personalizate",
      b2: "Descoperă destinații selectate",
      b3: "Profită de cel mai bun raport calitate-preț",
    },
    about: {
      title: "De ce YouTravel?",
      text:
        "Pentru că fiecare călătorie este personală. Echilibrăm calitatea, costul și fiabilitatea pentru călătorii ușoare și memorabile.",
    },
    contact: {
      title: "Planifică următoarea călătorie",
      text: "Contactați-ne și ne ocupăm de tot:",
      email: "Trimiteți Email",
      phone: "Sunați-ne",
      whatsapp: "WhatsApp",
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
    const section =
      (typeof window !== "undefined" && window.location.hash) || "";
    navigate((next === "ro" ? "/ro" : "/") + section);
  };

  return { lang, t: T[lang], switchLang };
}

// --- Smooth scroll helper
const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  const headerOffset = 72;
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
      className={`relative px-3 py-2 rounded-md text-[15px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E76F51] hover:bg-gray-100 ${
        active === id ? "text-[#E76F51]" : "text-gray-800"
      }`}
    >
      {children}
      <span
        className={`absolute left-3 right-3 -bottom-[3px] h-[2px] bg-[#E76F51] transition-opacity ${
          active === id ? "opacity-100" : "opacity-0"
        }`}
      />
    </button>
  );

  return (
    <header
      className={
        "yt-header fixed top-0 left-0 w-full z-50 border-b border-neutral-200 " +
        (scrolled ? "shadow-md" : "shadow-none")
      }
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between py-3 px-4">
        {/* Logo-only brand (button to hero) */}
        <button
          onClick={() => scrollToId("hero")}
          className="flex items-center"
          aria-label="YouTravel"
        >
          <img
            src={`${import.meta.env.BASE_URL}images/logo-youtravel-blue.png`}
            alt="YouTravel"
            className="h-12 w-auto"
          />
        </button>

        {/* Desktop nav: right aligned */}
        <nav className="hidden md:flex items-center gap-3">
          <Tab id="corporate">{t.nav.corporate}</Tab>
          <Tab id="family">{t.nav.family}</Tab>
          <Tab id="about">{t.nav.about}</Tab>
          <Tab id="contact">{t.nav.contact}</Tab>

          {/* Language dropdown */}
          <div className="relative ml-2">
            <button
              onClick={() => setOpenLang((v) => !v)}
              className="px-3 py-2 text-sm border rounded-md hover:bg-gray-50 flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E76F51]"
              aria-haspopup="listbox"
              aria-expanded={openLang}
            >
              <span role="img" aria-label="language">
                🌐
              </span>
              <span>{lang === "ro" ? "Limba (română)" : "Language"}</span>
              <svg width="14" height="14" viewBox="0 0 20 20" className="opacity-60">
                <path d="M5 7l5 6 5-6H5z" fill="currentColor" />
              </svg>
            </button>

            {openLang && (
              <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden z-50">
                <button
                  onClick={() => {
                    setOpenLang(false);
                    switchLang("en");
                  }}
                  className="block w-full text-left px-3 py-2 hover:bg-gray-50"
                >
                  EN
                </button>
                <button
                  onClick={() => {
                    setOpenLang(false);
                    switchLang("ro");
                  }}
                  className="block w-full text-left px-3 py-2 hover:bg-gray-50"
                >
                  RO
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile burger */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-72 bg-white shadow-xl p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-semibold" style={{ color: COLORS.navy }}>
                Menu
              </span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close">
                ✕
              </button>
            </div>
            <div className="border rounded-lg overflow-hidden">
              <button
                onClick={() => {
                  scrollToId("corporate");
                  setMobileOpen(false);
                }}
                className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b"
              >
                {t.nav.corporate}
              </button>
              <button
                onClick={() => {
                  scrollToId("family");
                  setMobileOpen(false);
                }}
                className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b"
              >
                {t.nav.family}
              </button>
              <button
                onClick={() => {
                  scrollToId("about");
                  setMobileOpen(false);
                }}
                className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b"
              >
                {t.nav.about}
              </button>
              <button
                onClick={() => {
                  scrollToId("contact");
                  setMobileOpen(false);
                }}
                className="w-full text-left px-4 py-3 hover:bg-gray-50"
              >
                {t.nav.contact}
              </button>
            </div>
            <div className="mt-3">
              <div className="text-xs text-gray-500 mb-1">
                🌐 {lang === "ro" ? "Limba (română)" : "Language"}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    switchLang("en");
                    setMobileOpen(false);
                  }}
                  className="px-3 py-2 border rounded"
                >
                  EN
                </button>
                <button
                  onClick={() => {
                    switchLang("ro");
                    setMobileOpen(false);
                  }}
                  className="px-3 py-2 border rounded"
                >
                  RO
                </button>
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
    <section id="hero" className="h-[80vh] md:h-[92vh] relative">
      <img
        src={`${import.meta.env.BASE_URL}images/hero-skyline.jpg`}
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/45" />
      <div className="relative z-10 max-w-6xl mx-auto h-full px-6 flex items-center">
        <div className="text-white">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            {t.headline}
          </h1>
        </div>
      </div>
    </section>
  );
}

function Corporate({ t }) {
  return (
    <section id="corporate" className="bg-[#0F1F36] py-16 text-white">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">{t.corp.title}</h2>
          <p className="mb-5 opacity-90">{t.corp.text}</p>
          <ul className="space-y-2 list-disc list-inside">
            <li>{t.corp.b1}</li>
            <li>{t.corp.b2}</li>
            <li>{t.corp.b3}</li>
          </ul>
        </div>

        {/* Images: show first 2 on mobile, all 3 on desktop */}
        <div className="grid grid-cols-2 gap-4">
          <img
            src={`${import.meta.env.BASE_URL}images/corp-skyline.jpg`}
            alt="Skyline"
            className="rounded-xl shadow-lg object-cover w-full h-44 md:h-56"
          />
          <img
            src={`${import.meta.env.BASE_URL}images/corp-rooftop.jpg`}
            alt="Rooftop"
            className="rounded-xl shadow-lg object-cover w-full h-44 md:h-56"
          />
          <img
            src={`${import.meta.env.BASE_URL}images/corp-night.jpg`}
            alt="Night City"
            className="hidden md:block rounded-xl shadow-lg object-cover w-full h-44 md:h-56 col-span-2"
          />
        </div>
      </div>
    </section>
  );
}

function Family({ t }) {
  return (
    <section id="family" className="yt-peach py-16">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        {/* Text first on mobile, left on desktop */}
        <div className="order-1">
          <h2 className="text-3xl font-bold mb-4" style={{ color: COLORS.navy }}>
            {t.fam.title}
          </h2>
          <p className="mb-5 text-gray-800">{t.fam.text}</p>
          <ul className="space-y-2 list-disc list-inside text-gray-800">
            <li>{t.fam.b1}</li>
            <li>{t.fam.b2}</li>
            <li>{t.fam.b3}</li>
          </ul>
        </div>

        {/* Photos second on mobile, right on desktop */}
        <div className="order-2 grid grid-cols-2 gap-4">
          <img
            src={`${import.meta.env.BASE_URL}images/fam-pineapple.jpg`}
            alt="Tropical pineapple drink on the beach"
            className="rounded-xl shadow-lg object-cover w-full h-44 md:h-56"
          />
          <img
            src={`${import.meta.env.BASE_URL}images/fam-airplane-hand.jpeg`}
            alt="Hand by airplane window"
            className="rounded-xl shadow-lg object-cover w-full h-44 md:h-56"
          />
          <img
            src={`${import.meta.env.BASE_URL}images/fam-jetski.jpg`}
            alt="Family riding a jetski"
            className="hidden md:block rounded-xl shadow-lg object-cover w-full h-44 md:h-56 col-span-2"
          />
        </div>
      </div>
    </section>
  );
}

function About({ t }) {
  return (
    <section id="about" className="yt-white py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4" style={{ color: COLORS.navy }}>
          {t.about.title}
        </h2>
        <p className="mb-8 text-gray-700 max-w-2xl mx-auto">{t.about.text}</p>

        <div className="grid md:grid-cols-3 gap-6">
          <img
            src={`${import.meta.env.BASE_URL}images/about-centralpark.jpg`}
            alt="Central Park"
            className="hidden md:block rounded-xl shadow-md object-cover h-56 md:h-64 w-full"
          />
          <img
            src={`${import.meta.env.BASE_URL}images/about-eiffel.jpg`}
            alt="Eiffel Tower"
            className="hidden md:block rounded-xl shadow-md object-cover h-56 md:h-64 w-full"
          />
          <img
            src={`${import.meta.env.BASE_URL}images/about-canyon.jpg`}
            alt="Canyon"
            className="rounded-xl shadow-md object-cover h-56 md:h-64 w-full"
          />
        </div>
      </div>
    </section>
  );
}

function Contact({ t }) {
  const BTN =
    "inline-flex items-center justify-center gap-2 bg-[#E76F51] text-white px-6 py-3 rounded-lg shadow " +
    "hover:bg-[#d65b42] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
    "focus-visible:ring-[#E76F51] focus-visible:ring-offset-[#1D3557]";

  return (
    <section id="contact" className="yt-navy py-16 text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">{t.contact.title}</h2>
        <p className="mb-6 opacity-90">{t.contact.text}</p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          {/* Email (visible) */}
          <a href="mailto:office@youtravel.ro" className={BTN}>
            📧 {t.contact.email}: <span className="font-semibold">office@youtravel.ro</span>
          </a>

          {/* Phone (visible) */}
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
      </div>
    </section>
  );
}

function Footer({ lang }) {
  const path = lang === "ro" ? "/ro/privacy" : "/privacy";
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-4 text-center">
        {/* First row: © + Privacy */}
        <div className="flex items-center gap-4">
          <p>© {new Date().getFullYear()} YouTravel</p>
          <Link
            to={path}
            className="text-xs underline opacity-80 hover:opacity-100"
          >
            {lang === "ro" ? "Politica de confidențialitate" : "Privacy Policy"}
          </Link>
        </div>

        {/* Second row: Company info */}
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
      <main className="pt-16">
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