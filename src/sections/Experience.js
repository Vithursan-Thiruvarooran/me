import React, { useEffect, useRef, useState } from "react";
import { useTheme, useMediaQuery, Box, Typography } from "@mui/material";
import { motion, useMotionValue, useReducedMotion } from "framer-motion";
import SectionContainer from "../containers/SectionContainer";
import TechStack from "../components/TechStack/TechStack";

import { experiences } from "../assets/data/data";

const HEX = "polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)";
// Where on screen the timeline "draws to", as a fraction of viewport height.
const MARK = 0.65;

const TimelineItem = ({ experience, active, side, itemRef, reduceMotion }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const accent = theme.palette.primary.main;
  const onRight = side === "right";
  // Cards wait slightly dimmed and offset toward their side, then slide into place as the line reaches them.
  // With reduced motion they only fade; the scroll-linked line still draws since it moves only while the user scrolls.
  const shift = !isDesktop || onRight ? 32 : -32;

  return (
    <Box
      ref={itemRef}
      component="article"
      sx={{
        position: "relative",
        pb: 5,
        "&:last-of-type": { pb: 0 },
        [theme.breakpoints.up("md")]: {
          width: "50%",
          ml: onRight ? "50%" : 0,
          pl: onRight ? 5.5 : 0,
          pr: onRight ? 0 : 5.5,
        },
      }}
    >
      {/* hex marker that fills in once the line reaches it */}
      <Box
        sx={{
          position: "absolute",
          top: 3,
          left: -40,
          width: 24,
          height: 26,
          clipPath: HEX,
          bgcolor: active ? accent : "divider",
          display: "grid",
          placeItems: "center",
          transition: "background-color .3s",
          [theme.breakpoints.up("md")]: onRight ? { left: -12 } : { left: "auto", right: -12 },
          "&::after": {
            content: '""',
            width: 18,
            height: 20,
            clipPath: HEX,
            background: active
              ? `radial-gradient(circle, ${accent} 0 34%, ${theme.palette.background.default} 37%)`
              : theme.palette.background.default,
          },
        }}
      />
      <Box
        component={motion.div}
        initial={false}
        animate={active ? { opacity: 1, x: 0 } : { opacity: 0.35, x: reduceMotion ? 0 : shift }}
        transition={reduceMotion ? { duration: 0.3 } : { type: "spring", stiffness: 120, damping: 20 }}
        sx={{
          border: 1,
          borderColor: active ? accent : "divider",
          borderRadius: 3,
          p: { xs: 2.5, sm: 3 },
          transition: "border-color .3s, box-shadow .3s",
          boxShadow: active ? theme.shadows[6] : "none",
        }}
      >
        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "baseline", columnGap: 2 }}>
          <Typography variant="h5" component="h3">
            {experience.title}{" "}
            <Box component="span" sx={{ color: "primary.main" }}>@ {experience.job}</Box>
          </Typography>
          <Typography variant="caption" sx={{ fontVariantNumeric: "tabular-nums" }}>
            {experience.duration}
          </Typography>
        </Box>
        <Typography sx={{ mt: 1.5 }} gutterBottom>
          {experience.description1}
        </Typography>
        <Typography gutterBottom>
          {experience.description2}
        </Typography>
        <TechStack technologies={experience.technologies} />
      </Box>
    </Box>
  );
};

const Experience = () => {
  const theme = useTheme();
  const reduceMotion = useReducedMotion();
  const timelineRef = useRef(null);
  const itemRefs = useRef([]);
  const [activeCount, setActiveCount] = useState(0);
  const progress = useMotionValue(0);

  // Newest role first.
  const ordered = [...experiences].reverse();

  // The line fills to the MARK point on screen; each role activates once the line passes its top.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = timelineRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect(), mark = window.innerHeight * MARK;
      const p = Math.min(1, Math.max(0, (mark - rect.top) / rect.height));
      progress.set(p);
      setActiveCount(itemRefs.current.filter((item) => item && item.getBoundingClientRect().top + 16 < mark).length);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [progress]);

  const lineSx = {
    position: "absolute",
    top: 6,
    bottom: 6,
    left: 11,
    width: 2,
    borderRadius: 1,
    [theme.breakpoints.up("md")]: { left: "50%", ml: "-1px" },
  };

  return (
    <SectionContainer id="experience" title={"Experience"} maxWidth="md">
      <Box ref={timelineRef} sx={{ position: "relative", pl: { xs: 5, md: 0 }, overflowX: "clip" }}>
        <Box sx={{ ...lineSx, bgcolor: "divider" }} />
        <Box
          component={motion.div}
          style={{ scaleY: progress, transformOrigin: "top" }}
          sx={{ ...lineSx, bgcolor: "primary.main" }}
        />
        {ordered.map((experience, i) => (
          <TimelineItem
            key={experience.tabName}
            experience={experience}
            side={i % 2 ? "right" : "left"}
            active={i < activeCount}
            reduceMotion={reduceMotion}
            itemRef={(el) => { itemRefs.current[i] = el; }}
          />
        ))}
      </Box>
    </SectionContainer>
  );
};

export default Experience;
