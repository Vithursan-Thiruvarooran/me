import React, { useContext, useEffect, useMemo, useState } from "react";
import { useTheme } from "@mui/material";
import LoaderContext from "../contexts/loaderContext";
import "./LoaderContainer.css";

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const EXIT_MS = reduced ? 350 : 1100;

// Hex tiles that together cover the viewport; each gets an exit delay based on its distance from the centre.
const buildCells = () => {
  const vw = window.innerWidth, vh = window.innerHeight;
  const r = Math.max(44, Math.min(vw, vh) / 7), cw = Math.sqrt(3) * r;
  const cx = vw / 2, cy = vh / 2, far = Math.hypot(cx, cy);
  const cells = [];
  for (let row = -1; row * 1.5 * r < vh + r; row++) {
    for (let col = -1; col * cw < vw + cw; col++) {
      const x = col * cw + (row & 1 ? cw / 2 : 0), y = row * 1.5 * r;
      cells.push({
        left: x - cw / 2 - 0.5,
        top: y - r - 0.5,
        width: cw + 1,
        height: 2 * r + 1,
        "--d": `${(Math.hypot(x - cx, y - cy) / far * 0.45).toFixed(3)}s`,
      });
    }
  }
  return cells;
};

const LoaderContainer = ({ children, duration }) => {
    const { setIsLoading } = useContext(LoaderContext);
    const theme = useTheme();
    const [leaving, setLeaving] = useState(false);
    const [gone, setGone] = useState(false);
    const cells = useMemo(buildCells, []);

    useEffect(() => {
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => setLeaving(true), duration + 450);
      return () => { clearTimeout(timer); document.body.style.overflow = ""; };
    }, [duration]);

    // The page animates in while the tiles break away.
    useEffect(() => {
      if (!leaving) return undefined;
      document.body.style.overflow = "";
      setIsLoading(false);
      const timer = setTimeout(() => setGone(true), EXIT_MS);
      return () => clearTimeout(timer);
    }, [leaving, setIsLoading]);

    if (gone) return null;

    const color = theme.palette.primary.main;
    return (
      <div
        className={`loader${leaving ? " out" : ""}`}
        role="status"
        aria-label="Loading"
        style={{ backgroundColor: color, color: theme.loadLogoColor }}
      >
        {cells.map((style, i) => (
          <i key={i} className="cell" style={{ ...style, backgroundColor: color }} />
        ))}
        <div className="loader-stage">{children}</div>
        <button className="loader-skip" type="button" onClick={() => setLeaving(true)}>
          Skip
        </button>
      </div>
    );
};

export default LoaderContainer;
