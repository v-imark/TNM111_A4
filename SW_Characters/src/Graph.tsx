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

export type GraphProps = {
    data: {
        nodes: {
            id: number;
            name: string;
            val: number;
            color: string;
        }[];
        links: {
            source: number;
            target: number;
            val: number;
        }[];
    }
    selectedNode: any;
    setSelectedNode: (node: any) => void;
    highlightedNode: any;
    setHighlightedNode: (node: any) => void;
    highlightedLink: any;
    setHighlightedLink: (node: any) => void;
}

export default function Graph(props: GraphProps) {
  const graphRef = useRef<ForceGraphMethods | undefined>();
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const yellow = "rgba(255,255,0,0.4)";
  const red = "rgba(255,0,0,1)";

  useEffect(() => {
    setWidth((window.innerWidth / 12) * 4.65);
    setHeight(window.innerHeight*0.81);
  }, []);

 

  function onEngineStop() {
    graphRef.current?.zoomToFit(400);
  }

  return (
    <Card sx={{ backgroundColor: "rgba(20,20,20,1)"}}>
      <CardHeader
        title="Context"
        titleTypographyProps={{ color: "yellow", fontSize: "3rem" }}
        sx={{paddingBottom: 0}}
      />
      <CardContent>
        <ForceGraph2D
          ref={graphRef}
          autoPauseRedraw={false}
          minZoom={1.5}
          graphData={props.data}
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
              link.target == props.highlightedNode ||
              link.source == props.highlightedNode ||
              link == props.highlightedLink
            ) {
              return red;
            }

            return yellow;
          }}
          linkWidth={(link: any) => {
            if (
              link.target == props.highlightedNode ||
              link.source == props.highlightedNode ||
              link == props.highlightedLink
            ) {
              return 1 + link.val / 10;
            }
            return 1;
          }}
          linkLabel={(link: any) => {
            if (link == props.highlightedLink) {
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
          nodeLabel={(node: any) => {
            if (node == null) {
                console.log("null")
                return '';
            }
            return node.name + ": " + node.val + " interactions";
          }}
          nodeColor={(node: any) => {
            if (node == props.selectedNode) {
                return 'white'
            }
            if (
              node == props.highlightedNode ||
              node == props.highlightedLink?.source ||
              node == props.highlightedLink?.target
            ) {
              return red;
            }

            return node.color;
          }}
          onEngineStop={onEngineStop}
          onNodeHover={props.setHighlightedNode}
          onNodeClick={(node) => node == props.selectedNode ? props.setSelectedNode(null) : props.setSelectedNode(node)}
          onLinkHover={props.setHighlightedLink}
        />
      </CardContent>
    </Card>
  );
}

