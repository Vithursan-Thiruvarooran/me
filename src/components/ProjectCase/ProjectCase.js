import React, { useState } from "react";
import { Box, Button, ButtonBase, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import NorthEastRoundedIcon from "@mui/icons-material/NorthEastRounded";

import TechStack from "../TechStack/TechStack";
import Media from "./Media";
import Lightbox from "./Lightbox";
import useSnapTrack, { trackSx } from "./useSnapTrack";

const HEX = "polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)";
const hasVideo = (item) => item.type === "video" && item.src;

const Gallery = ({ project, onOpen, paused }) => {
  const theme = useTheme();
  const { media } = project;
  const { ref, index, go } = useSnapTrack(media.length);
  const chip = {
    position: "absolute",
    zIndex: 2,
    bgcolor: alpha(theme.palette.background.default, 0.88),
    backdropFilter: "blur(6px)",
    border: 1,
    borderColor: "divider",
    borderRadius: 999,
    color: "text.primary",
  };
  const nav = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 3,
    bgcolor: "background.default",
    border: 1,
    borderColor: "divider",
    opacity: 0,
    transition: "opacity .2s",
    "&:hover": { bgcolor: "background.default" },
    "&:focus-visible": { opacity: 1 },
    "&.Mui-disabled": { display: "none" },
    "@media (hover: none)": { display: "none" },
  };

  return (
    <Box sx={{ minWidth: 0 }}>
      <Box sx={{ position: "relative", borderRadius: 4, overflow: "hidden", border: 1, borderColor: "divider", boxShadow: 6, "&:hover .gallery-nav": { opacity: 1 } }}>
        <Box ref={ref} sx={trackSx} aria-label={`${project.title} media gallery`}>
          {media.map((item, i) => (
            <ButtonBase
              key={i}
              onClick={() => onOpen(i)}
              aria-label={`View ${item.caption} full screen`}
              sx={{ position: "relative", aspectRatio: "16 / 10", display: "block", cursor: "zoom-in", color: "inherit" }}
            >
              <Media item={item} paused={paused} />
              <Box sx={{ ...chip, left: 12, bottom: 12, display: "inline-flex", alignItems: "center", gap: 0.75, px: 1.25, py: 0.75, maxWidth: "calc(100% - 24px)" }}>
                {item.type === "video" ? <PlayArrowRoundedIcon sx={{ fontSize: 16 }} /> : <ImageOutlinedIcon sx={{ fontSize: 15 }} />}
                <Typography variant="caption" noWrap sx={{ color: "inherit" }}>{item.caption}</Typography>
              </Box>
            </ButtonBase>
          ))}
        </Box>
        <Typography variant="caption" sx={{ ...chip, left: 12, top: 12, px: 1.1, py: 0.4, pointerEvents: "none", fontVariantNumeric: "tabular-nums" }}>
          {index + 1} / {media.length}
        </Typography>
        <IconButton className="gallery-nav" aria-label="Previous" disabled={index === 0} onClick={() => go(index - 1)} sx={{ ...nav, left: 12 }}>
          <ChevronLeftRoundedIcon />
        </IconButton>
        <IconButton className="gallery-nav" aria-label="Next" disabled={index === media.length - 1} onClick={() => go(index + 1)} sx={{ ...nav, right: 12 }}>
          <ChevronRightRoundedIcon />
        </IconButton>
      </Box>

      <Box sx={{ display: "flex", gap: 1.25, mt: 1.5, p: "3px", overflowX: "auto", scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" } }}>
        {media.map((item, i) => (
          <ButtonBase
            key={i}
            onClick={() => go(i)}
            aria-label={`Show ${item.caption}`}
            aria-current={i === index}
            sx={{
              position: "relative",
              flex: "0 0 auto",
              width: { xs: 72, sm: 96 },
              aspectRatio: "16 / 10",
              borderRadius: 2.5,
              overflow: "hidden",
              border: 1,
              borderColor: "divider",
              opacity: i === index ? 1 : 0.6,
              outline: i === index ? `2px solid ${theme.palette.primary.main}` : "none",
              outlineOffset: 2,
              transition: "opacity .2s",
              "&:hover": { opacity: 1 },
              "& .ph-text": { display: "none" },
              "& .ph-icon": { width: 30, height: 30, "& svg": { fontSize: 18 } },
            }}
          >
            <Media item={item} thumb />
            {item.type === "video" && item.src && (
              <Box sx={{ position: "absolute", right: 5, bottom: 5, width: 20, height: 20, borderRadius: "50%", bgcolor: "rgba(10,14,12,.7)", color: "#fff", display: "grid", placeItems: "center" }}>
                <PlayArrowRoundedIcon sx={{ fontSize: 14 }} />
              </Box>
            )}
          </ButtonBase>
        ))}
      </Box>
    </Box>
  );
};

// One project as a row: media gallery on one side, details on the other. `flip` swaps sides on wide screens.
const ProjectCase = ({ project, flip, id }) => {
  const [viewer, setViewer] = useState(null); // index of the item open full screen
  const firstVideo = project.media.findIndex(hasVideo);

  return (
    <Box
      id={id}
      component="article"
      sx={{
        display: "grid",
        columnGap: 7,
        rowGap: 3.5,
        alignItems: "center",
        gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "minmax(0, 7fr) minmax(0, 5fr)" },
      }}
    >
      <Box sx={{ order: { md: flip ? 2 : 1 }, minWidth: 0 }}>
        <Gallery project={project} onOpen={setViewer} paused={viewer !== null} />
      </Box>
      <Box sx={{ order: { md: flip ? 1 : 2 }, display: "flex", flexDirection: "column", gap: 1.75, minWidth: 0 }}>
        <Typography variant="body2" sx={{ color: "primary.main", fontWeight: 600 }}>{project.eyebrow}</Typography>
        <Typography variant="h3" component="h3" sx={{ fontSize: "clamp(1.9rem, 4vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.02 }}>
          {project.title}
        </Typography>
        <Typography sx={{ fontSize: "1.0625rem", maxWidth: "48ch" }}>{project.description1}</Typography>
        <Box component="ul" sx={{ listStyle: "none", m: 0, mt: 0.5, p: 0, display: "grid", gap: 1.25 }}>
          {project.highlights.map((h) => (
            <Typography
              component="li"
              key={h}
              variant="body2"
              sx={{
                position: "relative",
                pl: 3,
                opacity: 0.8,
                maxWidth: "52ch",
                "&::before": { content: '""', position: "absolute", left: 2, top: ".4em", width: 10, height: 11.5, bgcolor: "primary.main", clipPath: HEX },
              }}
            >
              {h}
            </Typography>
          ))}
        </Box>
        <TechStack technologies={project.technologies} />
        <Stack direction="row" useFlexGap flexWrap="wrap" spacing={1.25}>
          {project.links.map((link, i) => (
            <Button
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener"
              variant={i === 0 ? "contained" : "outlined"}
              disableElevation
              endIcon={<NorthEastRoundedIcon sx={{ fontSize: "16px !important" }} />}
            >
              {link.label}
            </Button>
          ))}
          {firstVideo >= 0 && (
            <Button variant="outlined" startIcon={<PlayArrowRoundedIcon />} onClick={() => setViewer(firstVideo)}>
              Watch demo
            </Button>
          )}
        </Stack>
      </Box>
      <Lightbox open={viewer !== null} onClose={() => setViewer(null)} title={project.title} media={project.media} start={viewer ?? 0} />
    </Box>
  );
};

export default ProjectCase;
