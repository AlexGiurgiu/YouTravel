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
  Navigate, // <-- pentru redirect
} from "react-router-dom";
import PrivacyPage from "./PrivacyPage";
import ScrollToTop from "./ScrollToTop";
import { FaWhatsapp, FaPhone, FaEnvelope } from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa";
import ReviewsSection from "./components/ReviewsSection";

// --- Theme tokens (kept for inline color needs)
const COLORS = { navy: "#1D3557", coral: "#E76F51" };

// --- Translations
const T = {
  en: {
    hero: {
      line1: "From planning to your return home,",
      line2: "we handle everything.",
      tagline: "Care-free travel for business and families.",
      cta: "Contact"
    },
    nav: {
      corporate: "Corporate Travel",
      family: "Bespoke Holidays",
      about: "About Us",
      reviews: "Reviews",
      contact: "Contact",
    },
    corp: {
      title: "Corporate Travel & Events",
      text:
        "From flights and hotels to team-building events, we take care of every detail, optimizing costs and providing 24/7 support so your team can focus on business.",
      b1: "We provide tailored travel consultancy",
      b2: "We organize business events, teambuildings and corporate parties",
      b3: "We balance cost and quality to optimize every trip",
      b4: "We ensure always-on travel assistance",
    },
    fam: {
      title: "Bespoke Family Holidays",
      text:
        "Family time is precious and holidays should be stress-free. We design personalized escapes that match your style, budget, and dreams.",
      b1: "We create tailor-made itineraries",
      b2: "We design holidays for the joy of every family member",
      b3: "We ensure the best price–quality balance",
      b4: "We support you from planning to your safe return, including travel health insurance",
    },
        about: {
      title: "Your travel partner, not just another agency",
      p1: "You won’t find thousands of generic offers on our website and that’s on purpose. We prefer to understand what you need and deliver exactly what fits you, rather than making you sift through dozens of irrelevant options.",
      p2: "We’re not just a travel agency, we’re your trusted travel consultant. We’re here before, during, and after the trip. You focus on business or family; we take care of everything else.",
      p3: "We listen, ask, and understand then design your trip as if we were planning it for our own family.",
      whyTitle: "Why clients stay with us:",
      points: [
        {
          title: "Tailor-made travel, never copy-paste",
          text:
            "Every proposal is crafted from scratch based on your real needs: company culture, constraints, timing, preferences.",
        },
        {
          title: "We save you time",
          text:
            "We research, compare, negotiate and organize end-to-end. You only approve. No more tab chaos and back-and-forth.",
        },
        {
          title: "Your safety net, 24/7",
          text:
            "Flight canceled? Hotel issue? You call, we fix it. We offer real support, not robots.",
        },
        {
          title: "A long-term relationship, not a transaction",
          text:
            "We aim to be your trusted travel partner for years, not just for one trip.",
        },
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
    hero: {
      line1: "De la planificare până la întoarcerea acasă,",
      line2: "ne ocupăm de tot.",
      tagline: "Călătorii fără griji pentru afaceri și familii.",
      cta: "Contact"
    },
    nav: {
      corporate: "Corporate Travel",
      family: "Vacanțe Personalizate",
      about: "Despre noi",
      reviews: "Recenzii", 
      contact: "Contact",
    },
    corp: {
      title: "Călătorii & Evenimente Corporate",
      text:
        "De la zboruri și hoteluri la team building-uri, ne ocupăm de fiecare detaliu, optimizăm costurile și oferim suport 24/7 pentru ca echipa ta să se concentreze pe business.",
      b1: "Oferim consultanță de călătorie personalizată",
      b2: "Organizăm evenimente corporate, team building-uri și petreceri",
      b3: "Optimizăm costurile și calitatea fiecărei călătorii",
      b4: "Asigurăm asistență permanentă",
    },
    fam: {
      title: "Vacanțe pentru familia ta",
      text:
        "Timpul petrecut cu familia este prețios, iar vacanțele trebuie să fie fără griji. Noi creăm experiențe adaptate stilului, bugetului și viselor voastre.",
      b1: "Creăm itinerarii personalizate",
      b2: "Creăm vacanțe pentru bucuria fiecărui membru al familiei",
      b3: "Asigurăm cel mai bun raport calitate–preț",
      b4: "Oferim suport de la planificare până la întoarcerea acasă, inclusiv asigurări medicale de călătorie",
    },
    about: {
      title: "Partenerul tău de călătorie, nu doar o agenție",
      p1: "Nu vei găsi la noi mii de oferte generice afișate pe site, este intenționat. Preferăm să înțelegem ce nevoi ai și să oferim exact ceea ce ți se potrivește, nu să te punem să cauți prin zeci de variante nepotrivite.",
      p2: "Nu suntem doar o agenție, ci consultantul tău de încredere în călătorii. Suntem prezenți înainte, în timpul și după călătorie. Tu te concentrezi pe business sau familie, noi avem grijă de restul.",
      p3: "Ascultăm, întrebăm, înțelegem, apoi gândim oferta ca și cum am planifica pentru propria noastră familie.",
      whyTitle: "De ce clienții rămân cu noi:",
      points: [
        {
          title: "Călătorii personalizate, nu copy-paste",
          text:
            "Fiecare propunere este gândită de la zero după nevoile tale reale. Tinem cont de cultura organizației, constrângeri, timp și preferințe.",
        },
        {
          title: "Îți câștigăm timp",
          text:
            "Căutăm, comparăm, negociem și organizăm cap-coadă. Tu doar aprobi. Fără zeci de tab-uri și mesaje înainte-înapoi.",
        },
        {
          title: "Planul tău de siguranță, 24/7",
          text:
            "Zbor anulat? Problemă la hotel? Suni și rezolvăm. Oferim suport real, nu roboți.",
        },
        {
          title: "Relație pe termen lung, nu o tranzacție",
          text:
            "Ne dorim să fim „omul tău de încredere pentru călătorii” ani la rând, nu doar pentru o singură călătorie.",
        },
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
    // URL wins first
    if (pathname.startsWith("/en")) return "en";
    if (pathname.startsWith("/ro")) return "ro";

    // Fallback to saved choice
    const saved = localStorage.getItem("lang");
    if (saved === "en") return "en";

    // Default: Romanian
    return "ro";
  });

  // Align root path to chosen lang (RO -> "/", EN -> "/en")
  useEffect(() => {
    const roots = ["/", "/en", "/ro"];
    const desired = lang === "en" ? "/en" : "/"; // RO lives at "/"
    if (roots.includes(pathname) && pathname !== desired) {
      navigate(desired + (hash || ""), { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const switchLang = (next) => {
    localStorage.setItem("lang", next);
    setLang(next);
    const section = (typeof window !== "undefined" && window.location.hash) || "";
    navigate((next === "en" ? "/en" : "/") + section);
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
    const ids = ["corporate", "family", "about", "reviews", "contact"]; // order matters
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
    >
      <div className="container-yt flex items-center justify-between py-2">
        {/* Logo-only brand (button to hero) */}
        <button onClick={() => scrollToId("hero")} className="flex items-center" aria-label="YouTravel">
          <img
            src={`${import.meta.env.BASE_URL}images/logo-youtravel-white.webp`}
            alt="YouTravel"
            className="h-12"
          />
        </button>

        {/* Desktop nav: right aligned */}
        <nav className="hidden md:flex items-center gap-4">
          <Tab id="corporate">{t.nav.corporate}</Tab>
          <Tab id="family">{t.nav.family}</Tab>
          <Tab id="about">{t.nav.about}</Tab>
          <Tab id="reviews">{t.nav.reviews}</Tab>
          <Tab id="contact">{t.nav.contact}</Tab>

          {/* Language dropdown */}
          <div className="relative ml-2">
            <button
              onClick={() => setOpenLang((v) => !v)}
              className="px-3 py-2 text-sm border rounded-md hover:bg-gray-50 flex items-center gap-1 focus:outline-none"
              aria-haspopup="listbox"
              aria-expanded={openLang}
            >
              🌐 RO | EN
            </button>
            {openLang && (
              <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden">
                <button
                  onClick={() => { setOpenLang(false); switchLang("ro"); }}
                  className="block w-full text-left px-3 py-2 hover:bg-gray-50"
                >
                  RO
                </button>
                <button
                  onClick={() => { setOpenLang(false); switchLang("en"); }}
                  className="block w-full text-left px-3 py-2 hover:bg-gray-50"
                >
                  EN
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
                src={`${import.meta.env.BASE_URL}images/logo-youtravel-white.webp`}
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
                onClick={() => { scrollToId("reviews"); setMobileOpen(false); }}
              >
                {t.nav.reviews}
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
  const [loaded, setLoaded] = useState(false);

  // tiny blurred base64 preview (LQIP)
  const tiny =
    "data:image/webp;base64,UklGRqwBAABXRUJQVlA4IKABAACQCQCdASogACsAPv1splArJiMitVv8AWAfiWMAx+uoKwuyCqjndjjJX93pTs9LPH5W4sZD50dNirU6d+z6Lzu5DhUOfLej4Sde/Ji/ZgT0RXWhIouAAP7FDxJOioubY9ogsyx4+XJC3Nym2yqRd+Qp81u7m1/whu/gEYZB3CHa5GOA5jVyD2DMHjYaxp+SALjK0mysfsuynLNDN3HI6jwYeOvRgevaei0S0KtlDaQ4F2qNMRqZF9zgoYeBaHhT4ingYr6MoPsBTmhVnGfyyDwI6EtvQ20Ue2NYKSds6G6TYyLxmHnHeY6VCz598f/E1xel/gQskd2U1BrbxCgV9W7M9GKAuVrUwTqIQ5+p9KPiS5oejZXAivkpr947N6dKCKGnd2NER226SZ/3L4gL8uDtB+56gHtCs6SSr8Qw8ZwDHXAFk5TOogfBDV8tc+tpMjlG26qVmYltGsyqZDwfBpKPNdMfPjaIDJNlSL3/zP94C/CV91GyhwcVNmDf9gfDF29qLEZb88qkczhoAOzEID72eLk2rlpvOTvxeLiiHIIAAA==";

  return (
    <section
      id="hero"
      className="relative min-h-[78vh] md:min-h-[92vh]"
      style={{
        backgroundImage: `url(${tiny})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#0F172A",
      }}
    >
      {/* Full-res background with AVIF + WebP */}
      <picture>
        <source srcSet="/images/hero-skyline.avif" type="image/avif" />
        <source srcSet="/images/hero-skyline.webp" type="image/webp" />
        <img
          src="/images/hero-skyline.webp"
          alt="City skyline at dusk"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setLoaded(true)}
          fetchPriority="high"
          decoding="async"
          width="1600"
          height="900"
        />
      </picture>

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-black/40 md:bg-black/30 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 container-yt flex items-center min-h-[78vh] md:min-h-[92vh]">
        <div className="text-white max-w-[920px]">
          {/* MOBILE: 2 rânduri, dimensiune >= text-3xl */}
          <h1
            className="
              sm:hidden
              font-extrabold text-white tracking-tight leading-tight
              text-[30px] xs:text-[32px]
              drop-shadow-[0_2px_6px_rgba(0,0,0,.25)]
            "
          >
            <h1 className="sm:hidden text-[30px] font-extrabold leading-tight">
            De la planificare până la<br />
            întoarcerea acasă,<br />
            ne ocupăm de tot.
          </h1>
          </h1>

          {/* DESKTOP/TABLET: rămâne ca înainte */}
          <h1
            className="
              hidden sm:block
              font-extrabold text-white tracking-tight leading-tight
              text-[28px] sm:text-[34px] md:text-[38px] lg:text-[40px] xl:text-[42px]
              drop-shadow-[0_2px_6px_rgba(0,0,0,.25)]
            "
          >
            <span className="block">{t.hero.line1}</span>
            <span className="block">{t.hero.line2}</span>
          </h1>

          <p className="mt-4 md:mt-5 text-base md:text-lg opacity-95 max-w-[60ch]">
            {t.hero.tagline}
          </p>

          <div className="mt-7 md:mt-8 flex justify-start">
            <button
              className="btn-coral inline-flex items-center gap-2"
              onClick={() => scrollToId("contact")}
            >
              <FaPaperPlane className="text-lg" aria-hidden="true" />
              <span>{t.nav.contact}</span>
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
          <p className="mb-5 opacity-90 text-justify">{t.corp.text}</p>
          <ul className="space-y-2">
            <li>✔️ {t.corp.b1}</li>
            <li>🎉 {t.corp.b2}</li>
            <li>💰 {t.corp.b3}</li>
            <li>🕘 {t.corp.b4}</li>
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img
            src={`${import.meta.env.BASE_URL}images/corp-skyline.webp`}
            alt="Corporate travel in major city skyline"
            className="rounded-xl shadow-lg object-cover w-full h-44 md:h-56"
            loading="lazy"
          />
          <img
            src={`${import.meta.env.BASE_URL}images/corp-rooftop.webp`}
            alt="Business rooftop meeting"
            className="rounded-xl shadow-lg object-cover w-full h-44 md:h-56"
            loading="lazy"
          />
          <img
            src={`${import.meta.env.BASE_URL}images/corp-night.webp`}
            alt="Night city skyline with skyscrapers"
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
          <p className="mb-5 text-gray-800 text-justify">{t.fam.text}</p>
          <ul className="space-y-2 text-gray-800">
            <li>🗺️ {t.fam.b1}</li>
            <li>👨‍👩‍👧‍👦 {t.fam.b2}</li>
            <li>💡 {t.fam.b3}</li>
            <li>🛡️ {t.fam.b4}</li>
          </ul>
        </div>

        {/* Photos second on mobile */}
        <div className="order-2 grid grid-cols-2 gap-4">
          <img
            src={`${import.meta.env.BASE_URL}images/fam-pineapple.webp`}
            alt="Tropical pineapple drink on the beach"
            className="rounded-xl shadow-lg object-cover w-full h-44 md:h-56"
            loading="lazy"
          />
          <img
            src={`${import.meta.env.BASE_URL}images/fam-airplane-hand.webp`}
            alt="Hand holding a plane toy by the airplane window"
            className="rounded-xl shadow-lg object-cover w-full h-44 md:h-56"
            loading="lazy"
          />
          <img
            src={`${import.meta.env.BASE_URL}images/fam-jetski.webp`}
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
      <div className="container-yt">
        {/* Titlu pe un singur rând (pe cât permite lățimea containerului) */}
        <h2 className="text-3xl font-bold mb-6 text-[#1D3557]">
          {t.about.title}
        </h2>

        {/* Sub titlu: două coloane – stânga (statement boxes), dreapta (imagine) */}
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Statement boxes – verticale, aerisite */}
          <div className="space-y-4 md:space-y-5">
            <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm p-5 md:p-6">
              <p className="text-gray-700 leading-relaxed text-justify">
                {t.about.p1}
              </p>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm p-5 md:p-6">
              <p className="text-gray-700 leading-relaxed text-justify">
                {t.about.p2}
              </p>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm p-5 md:p-6">
              <p className="text-gray-700 leading-relaxed text-justify">
                {t.about.p3}
              </p>
            </div>
          </div>

          {/* Imagine aliniată SUS cu primul chenar (titlul este în afara grilei) */}
          <div>
            <img
              src={`${import.meta.env.BASE_URL}images/about-canyon.webp`}
              alt={t.about?.imgAlt || "Curated travel experiences"}
              className="rounded-2xl shadow-lg object-cover w-full h-64 md:h-[420px]"
            />
          </div>
        </div>

        {/* Subtitlu + bullets (pe toată lățimea) */}
        <div className="mt-10 md:mt-12">
          <div className="text-sm uppercase tracking-wide text-gray-500 mb-4">
            {t.about.whyTitle}
          </div>

          {/* 2 coloane pe desktop; spațiere compactă */}
          <ul className="grid md:grid-cols-2 gap-6 md:gap-8">
            {t.about.points.map((pt, i) => (
              <li key={i} className="flex items-start gap-3">
                {/* Bifa / pictogramă */}
                <span className="mt-1 inline-flex w-5 h-5 shrink-0 items-center justify-center rounded-full bg-[#1D3557] text-white text-xs">
                  ✓
                </span>

                {/* Titlu + text */}
                <div>
                  <div className="font-semibold text-[#1D3557] leading-snug mb-1">
                    {pt.title}
                  </div>
                  <p className="text-gray-700 text-[15px] leading-relaxed text-justify max-w-prose">
                    {pt.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Contact({ t }) {
  const BTN =
    "inline-flex items-center gap-2 px-4 py-2 rounded-lg shadow hover:opacity-90 transition";

  return (
    <section id="contact" className="bg-navy-yt py-16 text-white">
      <div className="container-yt text-center">
        <h2 className="text-3xl font-bold mb-4">{t.contact.title}</h2>
        <p className="mb-6 opacity-90">{t.contact.text}</p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          {/* Email */}
          <a href="mailto:office@youtravel.ro" className={`${BTN} bg-blue-600 text-white`}>
            <FaEnvelope className="text-lg" />
            <span className="font-semibold">office@youtravel.ro</span>
          </a>

          {/* Phone */}
          <a href="tel:+40720377378" className={`${BTN} bg-gray-700 text-white`}>
            <FaPhone className="text-lg" />
            <span className="font-semibold">+40 720 377 378</span>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/40720377378"
            target="_blank"
            rel="noopener noreferrer"
            className={`${BTN} bg-green-500 text-white`}
          >
            <FaWhatsapp className="text-lg" />
            <span className="font-semibold">WhatsApp</span>
          </a>
        </div>

        <div className="mt-6 text-sm opacity-90">{t.contact.location}</div>
      </div>
    </section>
  );
}

function Footer({ lang }) {
  // EN trebuie să ducă la /en/privacy; RO la /ro/privacy
  const path = lang === "ro" ? "/ro/privacy" : "/en/privacy";
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
        <ReviewsSection lang={lang} />
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
      {/* Home */}
      <Route path="/" element={<OnePage t={t} switchLang={switchLang} lang={lang} />} />
      <Route path="/ro" element={<OnePage t={t} switchLang={switchLang} lang={lang} />} />
      <Route path="/en" element={<OnePage t={t} switchLang={switchLang} lang={lang} />} />

      {/* Privacy */}
      <Route path="/ro/privacy" element={<PrivacyPage />} />
      <Route path="/en/privacy" element={<PrivacyPage />} />
      {/* Backward-compat: vechiul /privacy → EN */}
      <Route path="/privacy" element={<Navigate to="/en/privacy" replace />} />

      {/* Catch-all */}
      <Route path="*" element={<OnePage t={t} switchLang={switchLang} lang={lang} />} />
    </Routes>
  );
}

// --- Mount (GitHub Pages: use basename)
const container = document.getElementById("root");
createRoot(container).render(
  <BrowserRouter basename="/">
    <ScrollToTop />
    <AppRouter />
  </BrowserRouter>
);