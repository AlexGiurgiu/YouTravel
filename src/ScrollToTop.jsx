import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Scroll to top on route change (e.g., privacy page) */
export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}