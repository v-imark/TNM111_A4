import { useEffect, useMemo, useState } from "react";
import reactLogo from "./assets/react.svg";
import ForceGraph2D from "react-force-graph-2d";
import dataAll from "./data/starwars-full-interactions-allCharacters.json";
import data1 from "./data/starwars-episode-1-interactions-allCharacters.json";
import data2 from "./data/starwars-episode-2-interactions-allCharacters.json";
import data3 from "./data/starwars-episode-3-interactions-allCharacters.json";
import data4 from "./data/starwars-episode-4-interactions-allCharacters.json";
import data5 from "./data/starwars-episode-5-interactions-allCharacters.json";
import data6 from "./data/starwars-episode-6-interactions-allCharacters.json";
import data7 from "./data/starwars-episode-7-interactions-allCharacters.json";
import { Box, Card, CardHeader, Grid } from "@mui/material";
import Graph from "./Graph";
import FocusGraph from "./FocusGraph";
import Controls from "./Controls";

function App() {
  const data = [data1, data2, data3, data4, data5, data6, data7, dataAll];

  const [selectedNode, setSelectedNode] = useState(null);
  const [highlightedNode, setHighlightedNode] = useState(null);
  const [higlightedLink, setHighlightedLink] = useState(null);

  const [nodeSize, setNodeSize] = useState(1.5);

  const [episode, setEpisode] = useState(7);
  const maxEdgeWeight = Math.max(
    ...data[episode].links.map((link) => link.value)
  );
  const [edgeWeightRange, setEdgeWeightRange] = useState([0, maxEdgeWeight]);
  const [edgeWeightFilter, setEdgeWeightFilter] = useState(false);
  const maxNodeWeight = Math.max(
    ...data[episode].nodes.map((node) => node.value)
  );
  const [nodeWeightRange, setNodeWeightRange] = useState([0, maxNodeWeight]);
  const [nodeWeightFilter, setNodeWeightFilter] = useState(false);

  useEffect(() => {
    if (edgeWeightFilter == false) {
      setEdgeWeightRange([0, maxEdgeWeight]);
    }
  }, [edgeWeightFilter]);

  useEffect(() => {
    if (nodeWeightFilter == false) {
      setNodeWeightRange([0, maxNodeWeight]);
    }
  }, [nodeWeightFilter]);

  const graphData = useMemo(() => {
    const nodes = data[episode].nodes.map((item, index) => {
      return {
        id: index,
        name: item.name,
        val: item.value,
        color: item.colour,
      };
    });

    const links = data[episode].links.map((item, index) => {
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
  }, [episode]);

  useEffect(() => {
    setEdgeWeightRange([0, maxEdgeWeight]);
    setNodeWeightRange([0, maxNodeWeight]);
    setSelectedNode(null);
  }, [graphData]);

  return (
    <Grid
      container
      spacing={2}
      paddingLeft={2}
      paddingTop={2}
      sx={{ width: "100%", height: "100%", backgroundColor: "#999993" }}
    >
      <Grid item xs={5} sx={{ height: "100%" }}>
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
      <Grid item xs={5} sx={{ height: "100%" }}>
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
          nodeWeightRange={nodeWeightRange}
          nodeWeightFilter={nodeWeightFilter}
          nodeSize={nodeSize}
        />
      </Grid>
      <Grid item xs={2} sx={{ height: "100%" }}>
        <Controls
          edgeWeightRange={edgeWeightRange}
          setEdgeWeightRange={setEdgeWeightRange}
          maxEdgeWeight={maxEdgeWeight}
          edgeWeightFilter={edgeWeightFilter}
          setEdgeWeightFilter={setEdgeWeightFilter}
          nodeWeightRange={nodeWeightRange}
          setNodeWeightRange={setNodeWeightRange}
          maxNodeWeight={maxNodeWeight}
          nodeWeightFilter={nodeWeightFilter}
          setNodeWeightFilter={setNodeWeightFilter}
          nodeSize={nodeSize}
          setNodeSize={setNodeSize}
          selectedNode={selectedNode}
          data={graphData}
          episode={episode}
          setEpisode={setEpisode}
        />
      </Grid>
    </Grid>
  );
}

export default App;
