import React, {useContext} from 'react';
import themeContext from "../../contexts/themeContext";
import { Switch, Tooltip } from "@mui/material";

const ThemeToggle = () => {
  const { isDarkMode, setIsDarkMode } = useContext(themeContext);

  return (
    <div style={{paddingTop: "5px"}}>
      <Tooltip title={isDarkMode ? "Light Mode" : "Dark Mode"} >
        <Switch size="small" checked={isDarkMode} onChange={(event) =>{setIsDarkMode(event.target.checked)}} />
      </Tooltip>
    </div>
    
  )
}

export default ThemeToggle