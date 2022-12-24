import React from 'react'
import { Container } from '@mui/material';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

const root = {
  position: "fixed",
  bottom: "8%",
  right: 0,
  width: "auto"
};

const StickyBar = () => {
  return (
    <Container sx={root}>
      <ThemeToggle></ThemeToggle>
    </Container>
  )
}

export default StickyBar