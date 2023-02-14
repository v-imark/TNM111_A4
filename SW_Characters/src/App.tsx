import { useEffect, useMemo, useState } from "react";
import reactLogo from "./assets/react.svg";
import ForceGraph2D from "react-force-graph-2d";
import dataAll from "./data/starwars-full-interactions-allCharacters.json";
import { Box, Card, CardHeader, Grid } from "@mui/material";
import Graph from "./Graph";
import FocusGraph from "./FocusGraph";
import Controls from "./Controls";

function App() {
  const [selectedNode, setSelectedNode] = useState(null)
  const [highlightedNode, setHighlightedNode] = useState(null)
  const [higlightedLink, setHighlightedLink] = useState(null)

  const maxEdgeWeight = Math.max(...dataAll.links.map((link) => link.value))
  const [edgeWeightRange, setEdgeWeightRange] = useState([0, maxEdgeWeight])
  const [edgeWeightFilter, setEdgeWeightFilter] = useState(false)

  useEffect(()=>{
      if (edgeWeightFilter == false) {
        setEdgeWeightRange([0, maxEdgeWeight])
      }
  }, [edgeWeightFilter])

  const graphData = useMemo(() => {
    const nodes = dataAll.nodes.map((item, index) => {
      return {
        id: index,
        name: item.name,
        val: item.value,
        color: item.colour,
      };
    });

    const links = dataAll.links.map((item, index) => {
      return {
        source: item.source,
        target: item.target,
        val: item.value,
      };
    });

    return {
      nodes: nodes,
      links: links,
    };
  }, [dataAll]);


  return (
    <Grid
      container
      spacing={2}
      sx={{ width: "100%", height: "100%", backgroundColor: "#999993" }}
    >
      <Grid item xs={5}>
        <Graph 
          data={graphData} 
          setSelectedNode={setSelectedNode} 
          selectedNode={selectedNode}
          setHighlightedNode={setHighlightedNode}
          highlightedNode={highlightedNode}
          setHighlightedLink={setHighlightedLink}
          highlightedLink={higlightedLink}
          />
      </Grid>
      <Grid item xs={5}>
        <FocusGraph 
          data={graphData} 
          setSelectedNode={setSelectedNode} 
          selectedNode={selectedNode} 
          setHighlightedNode={setHighlightedNode}
          highlightedNode={highlightedNode}
          setHighlightedLink={setHighlightedLink}
          highlightedLink={higlightedLink}
          edgeWeightRange={edgeWeightRange}
          edgeWeightFilter={edgeWeightFilter}
          />
      </Grid>
      <Grid item xs={2} sx={{height: '100%'}}>
        <Controls 
          edgeWeightRange={edgeWeightRange}
          setEdgeWeightRange={setEdgeWeightRange}
          maxEdgeWeight={maxEdgeWeight}
          edgeWeightFilter={edgeWeightFilter}
          setEdgeWeightFilter={setEdgeWeightFilter}
        />
      </Grid>
    </Grid>
  );
}

export default App;
