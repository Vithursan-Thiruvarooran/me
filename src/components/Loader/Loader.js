import React from "react";
import { useTheme } from "@mui/material";

import LoaderContainer from "../../containers/LoaderContainer";
import "./Loader.css";

const WORD = "vithiru";
// Last tile finishes flipping at 0.4s + 6 * 0.1s + 0.6s.
const DURATION_MS = 1650;

const Loader = () => {
  const theme = useTheme();

  return (
    <LoaderContainer duration={DURATION_MS}>
      <div className="hex-word" aria-label={WORD}>
        {[...WORD].map((ch, i) => (
          <div key={i} className="tw" style={{ "--i": i }}>
            <div className="tile">
              <div className="face front" style={{ background: theme.loadLogoColor, color: theme.palette.primary.main }}>
                {ch}
              </div>
              <div className="face back" />
            </div>
          </div>
        ))}
      </div>
    </LoaderContainer>
  );
};

export default Loader;
