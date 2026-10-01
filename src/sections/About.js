import React from "react";
import { useTheme, Box, Link, Typography } from "@mui/material";
import { scroller } from "react-scroll";
import SectionContainer from "../containers/SectionContainer";

import Me from "../assets/images/me.jpg";

import { about_description1, about_description2, about_caption, about_rows } from "../assets/data/data";

const HEX = "polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)";

// Profile photo cropped to a hexagon, with an offset hexagon behind it that slides into place on hover.
const HexPhoto = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: "relative",
        width: "clamp(140px, 20vw, 220px)",
        aspectRatio: "0.866",
        "&:hover .hex-back": { transform: "none" },
      }}
    >
      <Box
        className="hex-back"
        sx={{
          position: "absolute",
          inset: 0,
          clipPath: HEX,
          bgcolor: "primary.main",
          opacity: 0.3,
          transform: "translate(7%, 6%)",
          transition: "transform .45s cubic-bezier(.2,.8,.2,1)",
          "@media (prefers-reduced-motion: reduce)": { transition: "none" },
        }}
      />
      <Box sx={{ position: "absolute", inset: 0, clipPath: HEX, bgcolor: "primary.main", p: "4px" }}>
        <Box
          component="img"
          src={Me}
          alt="Vithursan Thiruvarooran"
          sx={{ display: "block", width: "100%", height: "100%", objectFit: "cover", clipPath: HEX, bgcolor: theme.palette.background.default }}
        />
      </Box>
    </Box>
  );
};

const About = () => {
    return (
      <SectionContainer id="about" title={"About"} maxWidth="md">
        <Box sx={{ display: "grid", gap: { xs: 4, md: 6 } }}>
          <Box
            sx={{
              display: "grid",
              columnGap: 7,
              rowGap: 3.5,
              alignItems: "start",
              gridTemplateColumns: { xs: "1fr", sm: "auto minmax(0, 1fr)" },
            }}
          >
            <Box component="figure" sx={{ m: 0, display: "grid", gap: 1.75, justifyItems: "center" }}>
              <HexPhoto />
              <Typography component="figcaption" variant="body2" sx={{ maxWidth: "24ch", opacity: 0.75, textAlign: "center" }}>
                {about_caption}
              </Typography>
            </Box>
            <Box sx={{ display: "grid", gap: 2, alignContent: "center", minHeight: "100%" }}>
              <Typography sx={{ fontSize: "1.0625rem", lineHeight: 1.65, maxWidth: "62ch" }}>
                {about_description1}
              </Typography>
              <Typography sx={{ fontSize: "1.0625rem", lineHeight: 1.65, maxWidth: "62ch", opacity: 0.75 }}>
                {about_description2}
              </Typography>
            </Box>
          </Box>

          <Box
            component="dl"
            sx={{ m: 0, display: "grid", gap: { xs: 3, sm: 4 }, gridTemplateColumns: { xs: "1fr", sm: "repeat(3, minmax(0, 1fr))" } }}
          >
            {about_rows.map(({ label, text, link }) => (
              <Box key={label} sx={{ pt: 2, borderTop: 2, borderColor: "primary.main" }}>
                <Typography component="dt" variant="h6" sx={{ fontSize: "1rem", fontWeight: 600, color: "primary.main", mb: 0.5 }}>
                  {label}
                </Typography>
                <Typography component="dd" sx={{ m: 0, lineHeight: 1.55, maxWidth: "30ch" }}>
                  {text}
                  {link && (
                    <>
                      {" "}
                      <Link
                        component="button"
                        onClick={() => scroller.scrollTo(link.to, { smooth: true, duration: 500, offset: -64 })}
                        sx={{ verticalAlign: "baseline", font: "inherit", whiteSpace: "nowrap", textUnderlineOffset: 3 }}
                      >
                        {link.label}
                      </Link>
                    </>
                  )}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </SectionContainer>
    );
};

export default About;
