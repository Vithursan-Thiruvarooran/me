import React from 'react'
import { Tab } from "@mui/material";
import { useTheme } from "@mui/material";


const StyleTab = (props) => {
  const theme = useTheme();

  return (
    <Tab disableRipple {...props} sx={{
      root: {
        transition: ".2s",
        minWidth: 120,
        "&:hover": {
          color: theme.palette.primary.main,
        },
      },
    }}/>
  )
}

export default StyleTab;