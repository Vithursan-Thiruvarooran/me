import React from 'react'
import { Box, ButtonBase, Typography } from '@mui/material';

import { openCommandMenu, shortcutLabel } from "../CommandMenu/CommandMenu";

const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const mono = "ui-monospace, Menlo, Consolas, monospace";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        maxWidth: 1080,
        mx: "auto",
        px: { xs: 2, sm: 4 },
        pt: 8,
        pb: "calc(40px + env(safe-area-inset-bottom, 0px))",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 1.5,
        borderTop: 1,
        borderColor: "divider",
      }}
    >
      <Typography variant="caption" sx={{ fontFamily: mono, opacity: 0.7 }}>
        © {new Date().getFullYear()} Vithursan Thiruvarooran
      </Typography>
      <ButtonBase
        onClick={openCommandMenu}
        sx={{ fontFamily: mono, fontSize: 12, opacity: 0.7, borderRadius: 1, "&:hover": { opacity: 1 } }}
      >
        {canHover ? `Press ${shortcutLabel} anywhere to jump around` : "Tap here to jump around"}
      </ButtonBase>
    </Box>
  )
}

export default Footer
