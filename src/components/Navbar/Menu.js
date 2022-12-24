import React, { useState, useEffect, useContext } from "react";
import { withStyles } from "@mui/styles";
import { Container, Tab, Button, Link as MuiLink } from "@mui/material";
import { motion, useAnimation } from "framer-motion";
import { Link, Events } from "react-scroll";
import LoaderContext from "../../contexts/loaderContext";

//import StyledTab from "./StyleTab";
import StyledTabs from "./StyleTabs";

const smoothScrollProps = {
  spy: true,
  smooth: true,
  offset: -140,
  duration: 500,
};

const AnimatedLink = React.forwardRef((props, ref) => (
  <motion.div ref={ref} custom={props.custom} animate={props.animate}>
    <Link {...smoothScrollProps} {...props} />
  </motion.div>
));

const Menu = ({homeIsActive}) => {

  const [value, setValue] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const { isLoading } = useContext(LoaderContext);
  const controls = useAnimation();

  useEffect(() => {
    Events.scrollEvent.register("begin", (to, element) => {
      setIsScrolling(true);
    });

    Events.scrollEvent.register("end", (to, element) => {
      setIsScrolling(false);
    });
  });

  useEffect(() => {
    if (!isLoading) {
      controls.start((i) => ({
        y: 0,
        opacity: 1,
        transition: { delay: i * 0.1 + 0.3 },
      }));
  } else {
      controls.start({ opacity: 0, y: -5 });
  }}, [isLoading, controls]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const spyHandleChange = (index) => {
    if (!isScrolling) {
      setValue(index);
    }
  };

  useEffect(() => {
    if (homeIsActive){
      setValue(false)
    }
  }, [homeIsActive])

  return (
    <Container sx={{ display: "flex", alignItems: "center", width: "auto",  margin: 0 }}>
      <StyledTabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <StyledTab
          component={AnimatedLink}
          custom={0}
          animate={controls}
          to="about"
          label={"About"}
          onSetActive={() => spyHandleChange(0)}
          onSetInactive={()=> spyHandleChange(false)}
        />
        <StyledTab
          component={AnimatedLink}
          animate={controls}
          custom={1}
          to="experience"
          label={"Experience"}
          onSetActive={() => spyHandleChange(1)}
        />
        <StyledTab
          component={AnimatedLink}
          animate={controls}
          custom={2}
          to="projects"
          label={"Projects"}
          onSetActive={() => spyHandleChange(2)}
        />
        <StyledTab
          component={AnimatedLink}
          animate={controls}
          custom={3}
          to="contact"
          label={"Contact"}
          onSetActive={() => spyHandleChange(3)}
        />
      </StyledTabs>
      <motion.div custom={4} animate={controls}>
        <Button
          component={MuiLink}
          href="/resume.pdf"
          variant="outlined"
          color="primary"
          underline="none"
          rel="noopener noreferrer" 
          target="_blank"
        >
          {"Resume"}
        </Button>
      </motion.div>
    </Container>
  );
};

const StyledTab = withStyles((theme) => ({
  root: {
    transition: ".2s",
    minWidth: 120,
    "&:hover": {
      color: theme.palette.primary.main,
    },
   
  },
}))((props) => <Tab disableRipple {...props} />);


export default Menu;