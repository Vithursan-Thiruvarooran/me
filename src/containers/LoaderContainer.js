import React, {useContext} from "react";
import { useTheme } from "@mui/material";
import { motion } from "framer-motion";
import LoaderContext from "../contexts/loaderContext";

const LoaderContainer = ({ children }) => {
    const {setIsLoading} = useContext(LoaderContext)
    const theme = useTheme();

    const containerStyle = {
      position:"fixed",
      top:0,
      left:0,
      width: "100%",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.palette.primary.main,
      zIndex: 10000,
    };

    const contentStyle = {
      margin: "0 auto",
    };

    return (
      <motion.div
        initial={{
          y: 0,
        }}
        animate={{
          y: "-100vh"
        }}
        transition={{
          delay: 4.8,
          duration: 0.3
        }}
        onAnimationComplete={definition => {
          setIsLoading(false)
        }}
        style={containerStyle}
      >
        <div style={contentStyle}>{children}</div>
      </motion.div>
    );
};

export default LoaderContainer;