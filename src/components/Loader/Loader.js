import React from "react";
import { useTheme } from "@mui/material";

import LoaderContainer from "../../containers/LoaderContainer";
import VithursanT from "../../assets/images/VithursanT";

const Loader = () => {
  
  const theme = useTheme();

  return (
    <LoaderContainer>
      <VithursanT width={250} color={theme.loadLogoColor}/>
    </LoaderContainer>
  );
};

export default Loader;