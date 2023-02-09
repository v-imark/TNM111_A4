import { useMemo, useState } from 'react'
import reactLogo from './assets/react.svg'
import ForceGraph2D from 'react-force-graph-2d'
import data from './data/starwars-full-interactions-allCharacters.json'
import { Box, Grid } from '@mui/material'
import Graph from './Graph'


function App() {

  return (
    <Box width={'100%'} height={'100%'}>
      <Grid container spacing={2} sx={{width: '100%', height: '100%'}}>
        <Grid item xs={5}>
          <Graph/>
        </Grid>
        <Grid item xs={5}></Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </Box>
  )
}

export default App
