import React from 'react'

import { Chip, Stack } from '@mui/material';

const TechStack = ({technologies}) => {
  return (
    <Stack direction="row" spacing={1} sx={{ mt: 2, mb: 2}}>
      { 
        technologies.map((technology, i) => {
          return (<Chip key={"chip" + i} label={technology} color="primary" />)
        })
      }
    </Stack>
  )
}

export default TechStack;