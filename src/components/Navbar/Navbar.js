import React, { useContext, useState, useEffect } from "react";
import { useTheme, useMediaQuery, AppBar, Toolbar, Hidden } from "@mui/material";
import { motion, useAnimation } from "framer-motion";
import loaderContext from "../../contexts/loaderContext";
import Drawer from "./Drawer";
import Menu from "./Menu";
import { Link } from "react-scroll";

import MenuIcon from '@mui/icons-material/Menu';
import IconButton from "@mui/material/IconButton";

import VithursanLogo from '../../assets/images/VithursanLogo'

const Navbar = () => {
  const [homeIsActive, setHomeIsActive]=useState(true)
  const isMobile = useMediaQuery("(max-width:700px)");
  const { isLoading } = useContext(loaderContext);
  const controls = useAnimation();
  const theme = useTheme();
  const [scroll, setScroll] = useState(false);
  const [mobileNavIsOpen, setMobileNavIsOpen] = useState(false);
  const handleNav = () => setScroll(window.scrollY > 30);
  window.addEventListener("scroll", handleNav);

  const appbarVariants = {
    initial: { height: isMobile ? 70 : 100, boxShadow: 0 },
    scrolled: { height: theme.navbarHeight, boxShadow: theme.shadows[10] },
  };

  useEffect(() => {
    if (!isLoading) {
      controls.start({
        y: 0,
        transition: {
          delay: 0.05,
          type: "spring",
          stiffness: 260,
          damping: 20,
        },
      });
    } else {
      controls.start({ y: -100 });
    }
  }, [isLoading, controls]);

  useEffect(() => {
    if (scroll) {
      setHomeIsActive(false);
    } else {
      setHomeIsActive(true);
    }
  }, [scroll]);

  return (
    <motion.div
      animate={controls}
    >
      <AppBar 
        position="fixed" 
        elevation={0} 
        component="nav" 
        sx={{ backgroundColor: theme.palette.background.default }}
      >
        <Toolbar
          component={motion.div}
          variants={appbarVariants}
          animate={scroll ? "scrolled" : "initial"}
          initial={appbarVariants.initial}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          sx={{ 
            justifyContent: "space-between",
            alignItems:"center",
            '.logo': {
              cursor: 'pointer'
            } 
          }}
        >
          <Link
            spy
            smooth
            duration={500}
            offset={-70}
            to="home"
            className="logo"
          >
            <VithursanLogo width="180px" color={theme.navLogoColor}/> 
          </Link>
          <Hidden mdDown>
            <Menu homeIsActive={homeIsActive} />
          </Hidden>
          <Hidden mdUp>
            <IconButton onClick={() => setMobileNavIsOpen(!mobileNavIsOpen)} >
              <MenuIcon />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>
      <Hidden mdUp>
        <Drawer
          open={mobileNavIsOpen}
          onClose={() => setMobileNavIsOpen(false)}
          onOpen={() => setMobileNavIsOpen(true)}
        />
      </Hidden>
    </motion.div>
  );
};

export default Navbar;