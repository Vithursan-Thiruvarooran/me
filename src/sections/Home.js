import React, { useContext, useEffect, lazy, Suspense } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { keyframes } from '@mui/system';
import { scroller } from "react-scroll";

import { motion, useAnimation } from "framer-motion";
import HomeContainer from "../containers/HomeContainer";
import loaderContext from "../contexts/loaderContext";

const Honeycomb = lazy(() => import("../components/Honeycomb/Honeycomb"));

const scrollTo = (id) => scroller.scrollTo(id, { smooth: true, duration: 500, offset: -70 });

const gradient = keyframes`
  from {
    background-position: 0% center
  }
  to {
    background-position: -200% center
  }
`;

const Home = () => {
    const theme = useTheme();
    const { isLoading } = useContext(loaderContext);
    const controls = useAnimation();

    useEffect(() => {
        if (!isLoading) {
            controls.start((i) => ({
                y: 0,
                opacity: 1,
                transition: { delay: i * 0.1 + 0.2 },
            }));
        } else {
            controls.start({ opacity: 0, y: 5 });
        }
    }, [isLoading, controls]);

    return (
      <Box component="section" id="home" sx={{ position: "relative", overflow: "hidden" }}>
        <Suspense fallback={null}>
          <Honeycomb colors={theme.honeycomb} />
        </Suspense>
        <HomeContainer>
          <div>
            <Typography
              component={motion.div}
              animate={controls}
              custom={0}
              color="secondary"
              variant="h5"
              style={{ marginBottom: "0px" }}
            >
              Welcome, I'm
            </Typography>
            <Typography
              component={motion.h1}
              animate={controls}
              custom={2}
              variant="h3"
              color="primary"
              sx={{
                fontSize: "clamp(2.4rem, 9vw, 5.5rem)",
                fontWeight: 800,
                lineHeight: 1,
                my: 1,
                background: `linear-gradient(to right, #6D9886, #3eb382, #0dbf75, #6D9886)`,
                backgroundSize: "200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: `${gradient} 3s linear infinite`,
                "@media (prefers-reduced-motion: reduce)": { animationDuration: "12s" },
              }}
            >
              Vithursan Thiruvarooran
            </Typography>
            <Typography
              component={motion.p}
              animate={controls}
              custom={3}
              variant="body1"
              color="secondary"
              sx={{ mt: 2.5, mb: 0, fontSize: "clamp(1.0625rem, 2.2vw, 1.3rem)", fontWeight: 500, maxWidth: "36ch" }}
            >
              Software engineer who builds test automation.
            </Typography>
            <Typography
              component={motion.p}
              animate={controls}
              custom={4}
              variant="body1"
              color="secondary"
              sx={{ opacity: 0.75 }}
            >
              Computer Science, University of Toronto · Toronto, Canada
            </Typography>
            <Box
              component={motion.div}
              animate={controls}
              custom={5}
              sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mt: 4 }}
            >
              <Button onClick={() => scrollTo("projects")} variant="contained" size="large" disableElevation>
                See my projects
              </Button>
              <Button onClick={() => scrollTo("contact")} variant="outlined" size="large">
                Get in touch
              </Button>
            </Box>
          </div>
        </HomeContainer>
      </Box>
    );
};

export default Home;
