import React, { useEffect } from "react";
import { Box, Dialog, IconButton, Typography } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import Media from "./Media";
import useSnapTrack, { trackSx } from "./useSnapTrack";

const navSx = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  color: "#F2E7D5",
  bgcolor: "rgba(242,231,213,.12)",
  border: "1px solid rgba(242,231,213,.25)",
  "&:hover": { bgcolor: "rgba(242,231,213,.2)" },
  "&.Mui-disabled": { display: "none" },
  "@media (hover: none)": { display: "none" },
};

// Full-screen media viewer: swipe, arrow keys, or the side buttons; Esc closes.
const Lightbox = ({ open, onClose, title, media, start }) => {
  const { ref, index, go } = useSnapTrack(media.length);

  useEffect(() => {
    if (open) requestAnimationFrame(() => go(start, true));
  }, [open, start, go]);

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); go(index - 1); }
    if (e.key === "ArrowRight") { e.preventDefault(); go(index + 1); }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen
      onKeyDown={onKeyDown}
      aria-label={`${title} media`}
      PaperProps={{ sx: { bgcolor: "rgba(10,14,12,.96)", color: "#F2E7D5", backgroundImage: "none" } }}
    >
      <Box sx={{ display: "grid", gridTemplateRows: "auto 1fr auto", height: "100%", pt: "calc(12px + env(safe-area-inset-top, 0px))", pb: "calc(16px + env(safe-area-inset-bottom, 0px))" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, px: 2 }}>
          <Typography variant="caption" sx={{ color: "inherit", fontVariantNumeric: "tabular-nums" }}>
            {index + 1} / {media.length}
          </Typography>
          <Typography variant="caption" noWrap sx={{ color: "inherit", flex: 1, opacity: 0.8 }}>{title}</Typography>
          <IconButton onClick={onClose} aria-label="Close" sx={{ color: "inherit", border: "1px solid rgba(242,231,213,.3)" }}>
            <CloseRoundedIcon />
          </IconButton>
        </Box>
        <Box sx={{ position: "relative", minHeight: 0, display: "grid" }}>
          <Box ref={ref} sx={{ ...trackSx, minHeight: 0 }}>
            {media.map((item, i) => (
              <Box key={i} sx={{ display: "grid", placeItems: "center", p: 2, minHeight: 0 }}>
                <Box sx={{ position: "relative", width: "min(100%, calc((100dvh - 170px) * 1.6))", aspectRatio: "16 / 10", borderRadius: 3, overflow: "hidden", bgcolor: "background.default", color: "text.primary" }}>
                  <Media item={item} controls />
                </Box>
              </Box>
            ))}
          </Box>
          <IconButton aria-label="Previous" disabled={index === 0} onClick={() => go(index - 1)} sx={{ ...navSx, left: 16 }}>
            <ChevronLeftRoundedIcon />
          </IconButton>
          <IconButton aria-label="Next" disabled={index === media.length - 1} onClick={() => go(index + 1)} sx={{ ...navSx, right: 16 }}>
            <ChevronRightRoundedIcon />
          </IconButton>
        </Box>
        <Typography variant="body2" sx={{ color: "inherit", textAlign: "center", px: 2, opacity: 0.85 }}>
          {media[index]?.caption}
        </Typography>
      </Box>
    </Dialog>
  );
};

export default Lightbox;
