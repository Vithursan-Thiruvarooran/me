import { useCallback, useEffect, useState } from "react";

// A horizontal scroll-snap track (one item per view). Swiping works natively on touch;
// `go` scrolls to an item and `index` follows whichever item is in view.
// `ref` is a callback ref, so it also works for tracks that mount later (e.g. inside a dialog).
const useSnapTrack = (count) => {
  const [node, setNode] = useState(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!node) return undefined;
    const onScroll = () => setIndex(Math.round(node.scrollLeft / Math.max(1, node.clientWidth)));
    node.addEventListener("scroll", onScroll, { passive: true });
    return () => node.removeEventListener("scroll", onScroll);
  }, [node]);

  const go = useCallback((i, instant = false) => {
    if (!node) return;
    const next = Math.max(0, Math.min(count - 1, i));
    node.scrollTo({ left: next * node.clientWidth, behavior: instant ? "auto" : "smooth" });
    setIndex(next);
  }, [node, count]);

  return { ref: setNode, index, go };
};

export const trackSx = {
  display: "flex",
  overflowX: "auto",
  scrollSnapType: "x mandatory",
  overscrollBehaviorX: "contain",
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": { display: "none" },
  "& > *": { flex: "0 0 100%", scrollSnapAlign: "start" },
};

export default useSnapTrack;
