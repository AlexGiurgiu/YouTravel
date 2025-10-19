import React, { useEffect, useMemo, useState, useRef } from "react";

/* I18N */
const I18N = {
  ro: {
    title: "Ce spun clienții noștri",
    googleVerified: "Recenzii verificate Google",
    seeOnGoogle: "Vezi pe Google",
    writeReview: "Scrie o recenzie",
    oneReview: "1 recenzie pe Google",
    manyReviews: (n) => `${n} recenzii pe Google`,
    readMore: "Citește tot",
    close: "Închide",
    recent: "astăzi",
    empty: "Momentan nu avem recenzii publice.",
  },
  en: {
    title: "What our clients say",
    googleVerified: "Google verified reviews",
    seeOnGoogle: "See on Google",
    writeReview: "Write a review",
    oneReview: "1 Google review",
    manyReviews: (n) => `${n} Google reviews`,
    readMore: "Read more",
    close: "Close",
    recent: "today",
    empty: "No public reviews yet.",
  },
};

/* CONFIG */
const PLACE_ID = "ChIJdclidm_0iCYRLdM10rxvDu4";
const GOOGLE_PROFILE_URL = "https://maps.app.goo.gl/8MyLGPiV1nRcfSAHA";
const GOOGLE_WRITE_REVIEW_URL = `https://search.google.com/local/writereview?placeid=${PLACE_ID}`;
const reviewsPath = () =>
  `${import.meta.env.BASE_URL || "/"}reviews/reviews.json`;

/* HELPERS */
function clampTextStyle(lines = 5) {
  return {
    display: "-webkit-box",
    WebkitLineClamp: String(lines),
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  };
}
function formatDate(iso, fallback) {
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return fallback;
    return d.toLocaleDateString("ro-RO", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return fallback;
  }
}
function normalizeReview(r, t) {
  return {
    rating: r?.rating ?? 0,
    text: r?.text ?? "",
    when:
      r?.relativePublishTimeDescription ||
      formatDate(r?.publishTime, t.recent) ||
      t.recent,
    authorName: r?.author?.displayName || "Client Google",
    profilePhotoUrl: r?.author?.photoUri || "",
    googleProfileUrl: r?.author?.uri || "",
  };
}
function initialFromName(name) {
  if (!name || typeof name !== "string") return "A";
  return name.trim().charAt(0).toUpperCase();
}
function isGoogleLetterAvatar(url = "") {
  if (!url) return false;
  const u = url.toString();
  const isLh3 = u.includes("lh3.googleusercontent.com");
  const looksLikeLetter =
    /=s\d+-c0x0+/i.test(u) || u.includes("-c0x00000000-cc") || u.includes("-cc-rp-mo");
  return isLh3 && looksLikeLetter;
}
function Star({ filled = false, className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      width="20"
      height="20"
      fill={filled ? "#E7A500" : "none"}
      stroke="#E7A500"
      strokeWidth="1.5"
    >
      <path d="m12 17.27 5.18 3.04-1.64-5.81L20 9.24l-6-0.51L12 3.5l-2 5.23-6 .51 4.46 4.26-1.64 5.81z" />
    </svg>
  );
}
function GoogleGIcon({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className}>
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.72 1.22 9.24 3.6l6.9-6.9C35.91 2.27 30.33 0 24 0 14.62 0 6.51 5.38 2.56 13.22l8.02 6.23C12.35 13.14 17.69 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.5 24c0-1.6-.14-3.13-.41-4.59H24v9.18h12.73c-.56 2.99-2.18 5.52-4.67 7.21l7.35 5.7C44.74 38.1 46.5 31.55 46.5 24z"/>
      <path fill="#FBBC05" d="M10.58 19.45l-8.02-6.23C1.65 15.92 0 19.78 0 24c0 4.22 1.65 8.08 4.36 10.78l8.02-6.23C11.58 26.9 11 25.52 11 24s.58-2.9 1.58-4.55z"/>
      <path fill="#34A853" d="M24 48c6.33 0 11.91-2.09 15.88-5.68l-7.35-5.7C30.55 38.7 27.5 39.5 24 39.5c-6.31 0-11.65-3.64-14.42-8.95l-8.02 6.23C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  );
}
function computeStats(reviews) {
  if (!reviews || reviews.length === 0) return { avg: 0, count: 0 };
  const total = reviews.reduce((acc, r) => acc + (r.rating || 0), 0);
  const avg = Math.round((total / reviews.length) * 10) / 10;
  return { avg, count: reviews.length };
}

/* COMPONENT */
export default function ReviewsSection({ lang = "ro" }) {
  const t = I18N[lang] || I18N.ro;

  // ---- State ----
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");
  const [modal, setModal] = useState(null);
  const [perView, setPerView] = useState(1);
  const [cursor, setCursor] = useState(0);

  // Auto-slide
  const [isHovering, setIsHovering] = useState(false);        // hover = pauză temporară
  const [userInteracted, setUserInteracted] = useState(false); // click pe săgeți = pauză permanentă
  const intervalRef = useRef(null);

  // 3 pe desktop, 1 pe mobil
  useEffect(() => {
    function updatePerView() {
      setPerView(window.matchMedia("(min-width: 1024px)").matches ? 3 : 1);
    }
    updatePerView();
    window.addEventListener("resize", updatePerView);
    return () => window.removeEventListener("resize", updatePerView);
  }, []);

  // Reset pe schimbare limbă / layout
  useEffect(() => {
    setCursor(0);
  }, [lang, perView]);

  // Fetch JSON
  useEffect(() => {
    let cancelled = false;
    async function load() {
      setError("");
      try {
        const url = reviewsPath();
        const res = await fetch(url, { cache: "no-store" });
        const ct = res.headers.get("content-type") || "";
        if (!ct.includes("application/json")) {
          const text = await res.text();
          throw new Error(
            `Invalid JSON. Content-Type: ${ct}. First chars: ${text?.slice(0, 60)}`
          );
        }
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error("JSON must be an array.");
        const norm = data.map((r) => normalizeReview(r, t));
        if (!cancelled) setReviews(norm);
      } catch (e) {
        if (!cancelled) setError(e.message || "Eroare la încărcarea recenziilor.");
      }
    }
    load();
    return () => { cancelled = true; };
  }, [t]);

  // Stats
  const { avg, count } = useMemo(() => computeStats(reviews), [reviews]);

  // Visible cards
  const visible = useMemo(() => {
    if (reviews.length === 0) return [];
    if (reviews.length <= perView) return reviews;
    const out = [];
    for (let i = 0; i < perView; i++) {
      out.push(reviews[(cursor + i) % reviews.length]);
    }
    return out;
  }, [reviews, perView, cursor]);

  const canSlide = reviews.length > perView;

  const next = () => {
    if (!canSlide) return;
    setUserInteracted(true); // click → oprește permanent auto-slide
    setCursor((c) => (c + perView) % reviews.length);
  };
  const prev = () => {
    if (!canSlide) return;
    setUserInteracted(true); // click → oprește permanent auto-slide
    setCursor((c) => (c - perView + reviews.length) % reviews.length);
  };

  // Auto-slide (desktop only)
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);
  useEffect(() => {
    const shouldRun =
      perView === 3 &&
      canSlide &&
      !userInteracted &&
      // !isHovering &&
      !modal &&
      !prefersReducedMotion;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (shouldRun) {
      intervalRef.current = setInterval(() => {
        setCursor((c) => (c + perView) % (reviews.length || 1));
      }, 6500);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [perView, canSlide, userInteracted, isHovering, modal, prefersReducedMotion, reviews.length]);

  const googleBadge = (
    <div className="flex items-center gap-3">
      <GoogleGIcon className="w-5 h-5" />
      <span className="text-gray-700">{t.googleVerified}</span>
    </div>
  );
  const countLabel = count === 1 ? t.oneReview : t.manyReviews(count);

  return (
    <section id="reviews" className="bg-peach py-16">
      <div className="container-yt">
        <h2 className="text-3xl font-bold mb-4 text-[#1D3557]">{t.title}</h2>

        <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm px-5 py-4 mdq:px-8 md:py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} filled={i < Math.round(avg)} />
              ))}
            </div>
            <div className="text-xl font-semibold text-[#1D3557]">{avg.toFixed(1)}</div>
            <div className="text-gray-600">{countLabel}</div>
          </div>
          <div className="hidden md:block">{googleBadge}</div>
          <div className="flex items-center gap-3">
            <a
              href={GOOGLE_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-50 transition"
            >
              {t.seeOnGoogle}
            </a>
            <a
              href={GOOGLE_WRITE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-[#1D3557] text-white font-medium hover:opacity-95 transition"
            >
              {t.writeReview}
            </a>
          </div>
        </div>

        <div className="md:hidden mt-4">{googleBadge}</div>

        <div className="mt-10">
          {error && <div className="text-center text-rose-600">Eroare: {String(error)}</div>}

          {!error && reviews.length === 0 && (
            <p className="text-center text-gray-600">{t.empty}</p>
          )}

          {!error && reviews.length > 0 && (
            <>
              <div
                className="relative block"
                // onMouseOver={() => setIsHovering(true)}
                // onMouseOut={() => setIsHovering(false)}
                // onPointerOver={() => setIsHovering(true)}
                // onPointerOut={() => setIsHovering(false)}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                  {visible.map((rev, idx) => {
                    const showRealImg =
                      rev.profilePhotoUrl && !isGoogleLetterAvatar(rev.profilePhotoUrl);
                    return (
                      <article
                        key={`${rev.authorName}-${idx}-${cursor}`}
                        className="rounded-2xl border border-neutral-200 bg-white shadow-sm p-6 flex flex-col h-full"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="relative">
                            <span className="absolute -top-1 -left-1 rounded-full bg-white p-[2px] shadow">
                              <GoogleGIcon className="w-4 h-4" />
                            </span>
                            {showRealImg ? (
                              <img
                                src={rev.profilePhotoUrl}
                                alt={rev.authorName}
                                className="w-12 h-12 rounded-full object-cover border border-neutral-200"
                                loading="lazy"
                              />
                            ) : (
                              <div
                                className="w-12 h-12 rounded-full border border-neutral-200 bg-navy-yt text-white flex items-center justify-center font-semibold"
                                title={rev.authorName}
                              >
                                {initialFromName(rev.authorName)}
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <a
                              href={rev.googleProfileUrl || GOOGLE_PROFILE_URL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block font-semibold text-[#1D3557] truncate hover:underline"
                              title={rev.authorName}
                            >
                              {rev.authorName}
                            </a>
                            <div className="text-sm text-gray-500">{rev.when || t.recent}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} filled={i < (rev.rating || 0)} />
                          ))}
                          <span className="ml-2 text-gray-600">
                            {rev.rating?.toFixed ? rev.rating.toFixed(1) : rev.rating}
                          </span>
                        </div>

                        {rev.text && (
                          <>
                            <p className="text-gray-800" style={clampTextStyle(5)}>
                              {rev.text}
                            </p>
                            {rev.text.length > 180 && (
                              <button
                                type="button"
                                onClick={() => setModal(rev)}
                                className="mt-2 text-[#1D3557] font-medium hover:underline"
                              >
                                {t.readMore}
                              </button>
                            )}
                          </>
                        )}
                      </article>
                    );
                  })}
                </div>

                {canSlide && (
                  <div className="mt-6 flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={prev}
                      className="rounded-lg border border-neutral-300 bg-white px-3 py-2 hover:bg-neutral-50"
                      aria-label="previous reviews"
                    >
                      ◀
                    </button>
                    <button
                      type="button"
                      onClick={next}
                      className="rounded-lg border border-neutral-300 bg-white px-3 py-2 hover:bg-neutral-50"
                      aria-label="next reviews"
                    >
                      ▶
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {modal && (
        <div
          className="fixed inset-0 z-[999] bg-black/50 flex items-center justify-center px-4"
          onClick={() => setModal(null)}
        >
          <div
            className="max-w-2xl w-full bg-white rounded-2xl p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-3">
              {(() => {
                const showReal = modal.profilePhotoUrl && !isGoogleLetterAvatar(modal.profilePhotoUrl);
                return showReal ? (
                  <img
                    src={modal.profilePhotoUrl}
                    alt={modal.authorName}
                    className="w-12 h-12 rounded-full object-cover border border-neutral-200"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full border border-neutral-200 bg-navy-yt text-white flex items-center justify-center font-semibold">
                    {initialFromName(modal.authorName)}
                  </div>
                );
              })()}
              <div className="min-w-0">
                <div className="font-semibold text-[#1D3557]">{modal.authorName}</div>
                <div className="text-sm text-gray-500">{modal.when || t.recent}</div>
              </div>
            </div>

            <div className="mt-4 text-gray-800 whitespace-pre-line">{modal.text}</div>

            <div className="mt-6 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setModal(null)}
                className="px-4 py-2 rounded-lg bg-[#1D3557] text-white hover:opacity-95"
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}