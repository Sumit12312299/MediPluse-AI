import { useState, useEffect } from "react";
export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(query);
    const listener = (e) => setMatches(e.matches);
    mql.addEventListener("change", listener);
    setMatches(mql.matches);
    return () => mql.removeEventListener("change", listener);
  }, [query]);
  return matches;
};
export const useIsMobile = () => useMediaQuery("(max-width: 767px)");
export const useIsTablet = () => useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
export const useIsDesktop = () => useMediaQuery("(min-width: 1024px)");
export default useMediaQuery;
