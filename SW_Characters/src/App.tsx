import { useMemo, useState } from "react";
import reactLogo from "./assets/react.svg";
import ForceGraph2D from "react-force-graph-2d";
import data from "./data/starwars-full-interactions-allCharacters.json";
import { Box, Card, CardHeader, Grid } from "@mui/material";
import Graph from "./Graph";

function App() {
  return (
    <Grid
      container
      spacing={2}
      sx={{ width: "100%", height: "100%", backgroundColor: "#999993" }}
    >
      <Grid item xs={5}>
        <Graph />
      </Grid>
      <Grid item xs={5}>
        <Card sx={{ backgroundColor: "black" }}>
          <CardHeader
            title="Graph 2"
            titleTypographyProps={{ color: "yellow", fontSize: "3rem" }}
          />
        </Card>
      </Grid>
      <Grid item xs={2}>
        <Card sx={{ backgroundColor: "black" }}>
          <CardHeader
            title="Options"
            titleTypographyProps={{ color: "yellow", fontSize: "3rem" }}
          />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Box height={"20%"}></Box>
      </Grid>
    </Grid>
  );
}

export default App;
