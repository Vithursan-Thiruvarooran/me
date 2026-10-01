import React, { useContext, useEffect } from "react";
import { useTheme, AppBar, Box, ButtonBase, IconButton, Tooltip } from "@mui/material";
import { alpha } from "@mui/material/styles";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { motion, useAnimation } from "framer-motion";
import { Link } from "react-scroll";

import loaderContext from "../../contexts/loaderContext";
import themeContext from "../../contexts/themeContext";
import { openCommandMenu, shortcutLabel } from "../CommandMenu/CommandMenu";

const SECTIONS = [["About", "about"], ["Experience", "experience"], ["Projects", "projects"], ["Contact", "contact"]];
const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

// Sticky, translucent header: hex "VT" mark, section links (desktop), a jump/menu button that
// opens the command menu (which doubles as the mobile nav), and the theme toggle.
const Navbar = () => {
  const theme = useTheme();
  const { isLoading } = useContext(loaderContext);
  const { isDarkMode, setIsDarkMode } = useContext(themeContext);
  const controls = useAnimation();

  useEffect(() => {
    if (!isLoading) {
      controls.start({ y: 0, transition: { delay: 0.05, type: "spring", stiffness: 260, damping: 20 } });
    } else {
      controls.start({ y: -100 });
    }
  }, [isLoading, controls]);

  const offset = -parseInt(theme.navbarHeight, 10);
  const pill = {
    height: 34,
    px: 1.25,
    borderRadius: 2,
    fontSize: 14,
    fontWeight: 500,
    color: "text.secondary",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    cursor: "pointer",
    transition: "color .2s, background-color .2s",
    "&:hover, &.active": { color: "text.primary", bgcolor: alpha(theme.palette.primary.main, 0.16) },
    "&:focus-visible": { outline: `2px solid ${theme.palette.primary.main}`, outlineOffset: 2 },
  };
  const outlined = {
    height: 34,
    border: 1,
    borderColor: "divider",
    borderRadius: 2,
    color: "text.secondary",
    bgcolor: alpha(theme.palette.background.default, 0.6),
    "&:hover": { color: "text.primary", borderColor: "primary.main" },
  };

  return (
    <motion.div animate={controls} initial={{ y: -100 }} style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: theme.zIndex.appBar }}>
      <AppBar
        position="static"
        elevation={0}
        component="nav"
        aria-label="Main"
        sx={{
          bgcolor: alpha(theme.palette.background.default, 0.82),
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderBottom: 1,
          borderColor: "divider",
          color: "text.primary",
          pt: "env(safe-area-inset-top, 0px)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, height: theme.navbarHeight, maxWidth: 1080, width: "100%", mx: "auto", px: { xs: 2, sm: 4 } }}>
          <Box
            component={Link}
            to="home"
            smooth
            duration={500}
            href="#home"
            aria-label="Back to top"
            sx={{ display: "inline-flex", alignItems: "center", gap: 1, color: "primary.main", textDecoration: "none", cursor: "pointer",
              font: `800 20px/1 ${theme.typography.h1.fontFamily}`, letterSpacing: "-0.02em" }}
          >
            <Box component="svg" viewBox="0 0 24 26" aria-hidden="true" sx={{ width: 22, height: 24, fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinejoin: "round" }}>
              <path d="M12 1.5 22 7.25v11.5L12 24.5 2 18.75V7.25z" />
            </Box>
            VT
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 0.5, ml: "auto" }}>
            {SECTIONS.map(([label, id]) => (
              <Box key={id} component={Link} to={id} href={`#${id}`} spy smooth duration={500} offset={offset} activeClass="active" sx={pill}>
                {label}
              </Box>
            ))}
            <Box component="a" href="/resume.pdf" target="_blank" rel="noopener noreferrer" sx={pill}>
              Resume ↗
            </Box>
          </Box>

          <ButtonBase
            onClick={openCommandMenu}
            aria-label="Open menu"
            sx={{ ...outlined, ml: { xs: "auto", md: 0 }, px: 1.25, gap: 1, font: "500 12px/1 ui-monospace, Menlo, Consolas, monospace" }}
          >
            {canHover ? <>Jump to… <span>{shortcutLabel}</span></> : "Menu"}
          </ButtonBase>
          <Tooltip title={isDarkMode ? "Light mode" : "Dark mode"}>
            <IconButton
              onClick={() => setIsDarkMode(!isDarkMode)}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              sx={{ ...outlined, width: 34, p: 0 }}
            >
              {isDarkMode ? <LightModeOutlinedIcon sx={{ fontSize: 18 }} /> : <DarkModeOutlinedIcon sx={{ fontSize: 18 }} />}
            </IconButton>
          </Tooltip>
        </Box>
      </AppBar>
    </motion.div>
  );
};

export default Navbar;
