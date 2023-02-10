import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dataAll from "./data/starwars-full-interactions-allCharacters.json";
import dataE1 from "./data/starwars-episode-1-interactions-allCharacters.json";
import ForceGraph2D, {
  ForceGraphMethods,
  LinkObject,
  NodeObject,
} from "react-force-graph-2d";
import { Box, Card, CardContent, CardHeader } from "@mui/material";
import React from "react";

function Graph() {
  const graphRef = useRef<ForceGraphMethods | undefined>();
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const [highlightedNode, setHighlightedNode] = useState<NodeObject | null>(
    null
  );
  const [higlightedLink, setHighlightedLink] = useState<LinkObject | null>(
    null
  );
  const yellow = "rgba(255,255,0,0.4)";
  const red = "rgba(255,0,0,1)";

  useEffect(() => {
    setWidth((window.innerWidth / 12) * 4.65);
    setHeight(window.innerHeight * 0.7);
  }, []);

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

  function onEngineStop() {
    graphRef.current?.zoomToFit(400);
  }

  const handleNodeHover = (node: NodeObject | null) => {
    setHighlightedNode(node || null);
  };

  const handleLinkHover = (link: LinkObject | null) => {
    setHighlightedLink(link || null);
  };

  const drawCircle = useCallback(
    (node: NodeObject, ctx: CanvasRenderingContext2D) => {
      // add ring just for highlighted nodes
      ctx.beginPath();
      ctx.arc(
        node.x as number,
        node.y as number,
        2 * 1.4,
        0,
        2 * Math.PI,
        false
      );
      ctx.fillStyle = node === highlightedNode ? "red" : "orange";
      ctx.fill();
      console.log(node);
      console.log("was here at drawCircle");
    },
    [highlightedNode]
  );

  return (
    <Card sx={{ backgroundColor: "rgba(20,20,20,1)" }}>
      <CardHeader
        title="Graph 1"
        titleTypographyProps={{ color: "yellow", fontSize: "3rem" }}
      />
      <CardContent>
        <ForceGraph2D
          ref={graphRef}
          autoPauseRedraw={false}
          graphData={graphData}
          nodeRelSize={1.5}
          height={height}
          width={width}
          cooldownTicks={1}
          enableNodeDrag={false}
          enablePanInteraction={false}
          enableZoomInteraction={false}
          linkColor={(link) => {
            graphRef.current?.d3Force("link")?.distance(200);
            if (
              link.target == highlightedNode ||
              link.source == highlightedNode ||
              link == higlightedLink
            ) {
              return red;
            }

            return yellow;
          }}
          linkWidth={(link) => {
            if (
              link.target == highlightedNode ||
              link.source == highlightedNode ||
              link == higlightedLink
            ) {
              return 1 + link.val / 10;
            }
            return 1;
          }}
          linkLabel={(link) => {
            if (link == higlightedLink) {
              return (
                link.source.name +
                " -> " +
                link.target.name +
                ": " +
                link.val +
                " interactions"
              );
            }
            return link.name;
          }}
          nodeLabel={(node) => {
            return node.name + ": " + node.val + " interactions";
          }}
          nodeColor={(node) => {
            if (
              node == highlightedNode ||
              node == higlightedLink?.source ||
              node == higlightedLink?.target
            ) {
              return red;
            }
            return node.color;
          }}
          onEngineStop={() => graphRef.current?.zoomToFit(400)}
          onNodeHover={handleNodeHover}
          onLinkHover={handleLinkHover}
        />
      </CardContent>
    </Card>
  );
}

export default Graph;
