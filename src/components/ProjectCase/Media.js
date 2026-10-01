import React, { useEffect, useRef } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Files in src/assets/images are bundled; paths starting with "/" or "http" are used as-is (e.g. videos in public/).
export const resolveSrc = (src) =>
  !src || /^(https?:)?\//.test(src) ? src : require(`../../assets/images/${src}`);

const fill = { position: "absolute", inset: 0, width: "100%", height: "100%" };

// Short muted loop that plays only while mostly on screen (never automatically with reduced motion).
// `controls` adds the native controls; only the full-screen viewer uses them, since gallery slides are buttons.
// `paused` holds it still, e.g. while the full-screen viewer covers the gallery.
const LoopVideo = ({ src, poster, controls, paused, sx }) => {
  const ref = useRef(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return undefined;
    if (paused || reduced) { video.pause(); return undefined; }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.intersectionRatio > 0.6) video.play().catch(() => {});
      else video.pause();
    }, { threshold: [0, 0.6] });
    io.observe(video);
    return () => io.disconnect();
  }, [paused]);
  return (
    <Box
      component="video"
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      controls={controls}
      sx={{ objectFit: "cover", bgcolor: "#000", display: "block", ...sx }}
    />
  );
};

const Placeholder = ({ item }) => {
  const theme = useTheme();
  const video = item.type === "video";
  const hex = encodeURIComponent(theme.palette.primary.main);
  return (
    <Box
      sx={{
        ...fill,
        display: "grid",
        placeContent: "center",
        justifyItems: "center",
        gap: 1.25,
        p: 3,
        textAlign: "center",
        background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='42' height='72.75' viewBox='0 0 42 72.75'%3E%3Cpath d='M21 0 42 12.1v24.25L21 48.5 0 36.35V12.1zM21 48.5v24.25M0 36.35 0 60.6M42 36.35 42 60.6' fill='none' stroke='${hex}' stroke-opacity='.2'/%3E%3C/svg%3E"), linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.18)}, ${theme.palette.background.default})`,
      }}
    >
      <Box
        className="ph-icon"
        sx={{
          width: 60, height: 60, borderRadius: "50%", display: "grid", placeItems: "center",
          bgcolor: video ? "primary.main" : "background.default",
          color: video ? "primary.contrastText" : "primary.main",
          border: video ? 0 : 1, borderColor: "divider",
        }}
      >
        {video ? <PlayArrowRoundedIcon sx={{ fontSize: 32 }} /> : <ImageOutlinedIcon />}
      </Box>
      <Typography className="ph-text" sx={{ fontWeight: 600, maxWidth: "26ch", fontSize: "clamp(0.95rem, 2vw, 1.15rem)" }}>
        {item.caption}
      </Typography>
      <Typography className="ph-text" variant="caption" sx={{ opacity: 0.7 }}>
        {video ? "Video coming soon" : "Screenshot coming soon"}
      </Typography>
    </Box>
  );
};

const backdrop = (src) => (
  <Box component="img" src={src} alt="" sx={{ position: "absolute", inset: -24, width: "calc(100% + 48px)", height: "calc(100% + 48px)", objectFit: "cover", filter: "blur(22px)", opacity: 0.45 }} />
);

// Renders one gallery item to fill its (positioned) parent.
// Frames: `phone` (type "phone", or `frame: "phone"` for portrait videos), `contain` (`fit: "contain"`), or full-bleed cover.
// `thumb` swaps videos for their poster so thumbnails don't load the video again.
const Media = ({ item, controls = false, thumb = false, paused = false }) => {
  if (!item.src) return <Placeholder item={item} />;
  const video = item.type === "video";
  const src = resolveSrc(item.src);
  const poster = item.poster ? resolveSrc(item.poster) : undefined;
  const still = video ? poster : src;
  const frame = item.type === "phone" || item.frame === "phone" ? "phone" : item.fit === "contain" ? "contain" : "cover";
  const content = (sx) => (video && !thumb
    ? <LoopVideo src={src} poster={poster} controls={controls} paused={paused} sx={sx} />
    : <Box component="img" src={still} alt={item.caption} sx={{ display: "block", objectFit: "cover", ...sx }} />);
  const tinted = { ...fill, display: "grid", placeItems: "center", overflow: "hidden", bgcolor: (t) => alpha(t.palette.primary.main, 0.15) };

  if (frame === "phone") {
    return (
      <Box sx={tinted}>
        {still && backdrop(still)}
        <Box sx={{ position: "relative", height: "88%", aspectRatio: "9 / 19.5", borderRadius: "7% / 3.3%", border: "5px solid #151917", overflow: "hidden", boxShadow: 8, bgcolor: "#151917" }}>
          {content({ width: "100%", height: "100%" })}
        </Box>
      </Box>
    );
  }
  if (frame === "contain") {
    // Small or oddly shaped screenshots (e.g. an extension popup) shown whole on a blurred backdrop.
    return (
      <Box sx={tinted}>
        {still && backdrop(still)}
        {content({ position: "relative", maxHeight: "86%", maxWidth: "86%", objectFit: "contain", borderRadius: 2, boxShadow: 8 })}
      </Box>
    );
  }
  return content({ ...fill, objectPosition: "top" });
};

export default Media;
