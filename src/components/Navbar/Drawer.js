import React from "react";
import { Drawer, List, Button, Divider, ListItem, Link as MuiLink } from "@mui/material";
import { useTheme } from "@mui/material";

import { Link } from "react-scroll";

const MenuDrawer = ({ open, onClose, onOpen }) => {
    const theme = useTheme();

    const smoothScrollProps = {
      spy: true,
      smooth: true,
      offset: -100,
      duration: 500,
      activeClass: 'active',
    };

    const listItemProps = {
      button: true,
      onClick: onClose,
      onKeyDown: onClose,
      className: 'listItem',
    };

    return (
        <Drawer anchor="left" open={open} onClose={onClose} 
          PaperProps={{
            sx: {
              backgroundColor: theme.palette.background.default,
              '.listItem': {
                display: "flex",
                justifyContent: "center",
                padding: theme.spacing(4, 0),
                "&:hover": {
                  backgroundColor: "rgb(80,80,80)",
                }
              },
              '.active': {
                backgroundColor: theme.palette.primary.main,
              },
            }
          }}
        >
          <div role="presentation">
            <List sx={{ width: 250 }}>
              <Link {...smoothScrollProps} to="about">
                <ListItem {...listItemProps}>
                  {"About"}
                </ListItem>
              </Link>
              <Link {...smoothScrollProps} to="experience">
                <ListItem {...listItemProps}>
                  {"Experience"}
                </ListItem>
              </Link>
              <Link {...smoothScrollProps} to="projects">
                <ListItem {...listItemProps}>
                  {"Projects"}
                </ListItem>
              </Link>
              <Link {...smoothScrollProps} to="contact">
                <ListItem {...listItemProps}>
                  {"Contact"}
                </ListItem>
              </Link>
              <ListItem className="listItem">
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
              </ListItem>
              <Divider />
            </List>
          </div>
        </Drawer>
    );
};

export default MenuDrawer;