import React from 'react'
import { Tabs } from "@mui/material";
import { useTheme } from "@mui/material";

const StyleTabs = (props) => {
  const theme = useTheme();

  return (
    <Tabs {...props} variant="fullWidth" TabIndicatorProps={{ children: <span /> }}  sx={{
        indicator: {
          "& > span": {
            maxWidth: 20,
          },
        },
        marginRight: theme.spacing(4)
    }}/>
  )
}

export default StyleTabs;