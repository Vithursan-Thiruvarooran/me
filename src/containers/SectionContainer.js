import React, { useEffect } from "react";
import { Container, Divider, Typography } from "@mui/material";
//import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
//import Divider from "../components/Divider";

const SectionContainer = ({ children, maxWidth, full, reverse, title, padding, ...rest }) => {
    const theme = useTheme();
    const titleControls = useAnimation();
    const contentControls = useAnimation();
    const [titleRef, titleInView] = useInView();
    const [contentRef, contentInView] = useInView();

    useEffect(() => {
      if (titleInView) {
        titleControls.start("visible");
      }
    }, [titleControls, titleInView]);

    useEffect(() => {
      if (contentInView) {
        contentControls.start("visible");
      }
    }, [contentControls, contentInView]);

    const containerStyle = {
      paddingBottom: 4,
      marginTop: 16,
      marginBottom: 8,
    }

    return (
      <Container component="section"  {...rest} sx={containerStyle}>
        {title && (
          <motion.div
            ref={titleRef}
            animate={titleControls}
            initial="hidden"
            transition={{
              delay: 0.3,
              type: "spring",
              stiffness: 100,
              damping: 20,
            }}
            variants={{
              visible: { opacity: 1, x: 0 },
              hidden: { opacity: 0, x: reverse ? 0 : 0 },
            }}
            sx = {{display: 'flex'}}
          >
            {/* <Divider width="20%"  /> */}
            <Divider textAlign="left"
              sx={{
                paddingBottom: theme.spacing(8),
                "&::before, &::after": {
                  borderColor: "secondary.main",
                },
              }}
            >
              <Typography variant="h4" color="primary" >
                {title}
              </Typography>
            </Divider>
            
            {/* <Divider fullWidth /> */}
          </motion.div>
        )}
        <motion.div
          ref={contentRef}
          animate={contentControls}
          initial="hidden"
          transition={{
            delay: 0.5,
            type: "spring",
            stiffness: 100,
            damping: 20,
            when:"beforeChildren"
          }}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: -50 },
          }}
        >
          {children}
        </motion.div>
      </Container>
    );
};

export default SectionContainer;