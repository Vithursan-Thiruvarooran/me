import React, { useContext, useEffect } from "react";
import { Typography } from "@mui/material";
import { keyframes } from '@mui/system';

import { motion, useAnimation } from "framer-motion";
import HomeContainer from "../containers/HomeContainer";
import loaderContext from "../contexts/loaderContext";

const Home = () => {
    const { isLoading } = useContext(loaderContext);
    const controls = useAnimation();

    useEffect(() => {
        if (!isLoading) {
            controls.start((i) => ({
                y: 0,
                opacity: 1,
                transition: { delay: i * 0.1 + 1.2 },
            }));
        } else {
            controls.start({ opacity: 0, y: 5 });
        }
    }, [isLoading, controls]);

    const gradient = keyframes`
      from {
        background-position: 0% center
      }
      to {
        background-position: -200% center
      }
    `;

    return (
      <HomeContainer id="home">
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
            component={motion.span}
            animate={controls}
            custom={2}
            variant="h3"
            color="primary"
            sx={
              {
                background: `linear-gradient(to right, #6D9886, #3eb382, #0dbf75, #6D9886)`,
                backgroundSize: "200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: `${gradient} 3s linear infinite`,
              }
            }
          >
            Vithursan Thiruvarooran
          </Typography>
          <Typography
            component={motion.p}
            animate={controls}
            custom={3}
            variant="body1"
            color="secondary"
            style={{ marginBottom: "0" }}
          >
            Computer Science - Specialist in Software Engineering
          </Typography>
          <Typography
            component={motion.p}
            animate={controls}
            custom={4}
            variant="body1"
            color="secondary"
            style={{ marginBottom: "30px" }}
          >
            Toronto, Canada
          </Typography>
        </div>
      </HomeContainer>
    );
};

export default Home;