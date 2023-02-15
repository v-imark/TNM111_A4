import { Card, CardHeader, CardContent } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import ForceGraph2D, {
  ForceGraphMethods,
  NodeObject,
  LinkObject,
} from "react-force-graph-2d";
import { GraphProps } from "./Graph";

interface FocusGraphProps extends GraphProps {
  edgeWeightRange: number[];
  edgeWeightFilter: boolean;
  nodeWeightRange: number[];
  nodeWeightFilter: boolean;
  nodeSize: number;
}

export default function FocusGraph(props: FocusGraphProps) {
  const graphRef = useRef<ForceGraphMethods | undefined>();
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const yellow = "rgba(255,255,0,0.4)";
  const red = "rgba(255,0,0,1)";
  const blue = "rgba(77, 255, 243,1)";

  useEffect(() => {
    setWidth((window.innerWidth / 12) * 4.65);
    setHeight(window.innerHeight * 0.81);
  }, []);

  useEffect(() => {
    if (props.selectedNode == null) {
      graphRef.current?.centerAt(0, 0, 200);
      graphRef.current?.zoom(1, 200);
    } else {
      graphRef.current?.centerAt(
        props.selectedNode?.x,
        props.selectedNode?.y,
        200
      );
      graphRef.current?.zoom(5, 200);
    }
  }, [props.selectedNode]);

  function onEngineStop() {
    graphRef.current?.zoomToFit(400);
  }

  return (
    <Card sx={{ backgroundColor: "rgba(20,20,20,1)", height: "100%" }}>
      <CardHeader
        title="Focus"
        titleTypographyProps={{ color: "yellow", fontSize: "3rem" }}
        sx={{ paddingBottom: 0 }}
      />
      <CardContent>
        <ForceGraph2D
          ref={graphRef}
          autoPauseRedraw={false}
          minZoom={1.4}
          graphData={props.data}
          nodeRelSize={props.nodeSize}
          height={height}
          width={width}
          cooldownTicks={1}
          enableNodeDrag={false}
          enablePanInteraction={true}
          enableZoomInteraction={true}
          linkColor={(link: any) => {
            graphRef.current?.d3Force("link")?.distance(200);
            if (
              link.target == props.selectedNode ||
              link.source == props.selectedNode
            ) {
              return blue;
            }

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
              return 1 + link.val / 8;
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
            return "";
          }}
          linkVisibility={(link: any) => {
            if (
              !(
                link.target.val >= props.nodeWeightRange[0] &&
                link.target.val <= props.nodeWeightRange[1]
              ) ||
              !(
                link.source.val >= props.nodeWeightRange[0] &&
                link.source.val <= props.nodeWeightRange[1]
              )
            ) {
              return false;
            }

            if (
              !(link.val >= props.edgeWeightRange[0] &&
                link.val <= props.edgeWeightRange[1])!
            ) {
              return false;
            }
            return true;
          }}
          nodeLabel={(node: any) => {
            return node.name + ": " + node.val + " appearances";
          }}
          nodeColor={(node: any) => {
            if (node == props.selectedNode) {
              return blue;
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
          nodeVisibility={(node: any) => {
            if (props.edgeWeightFilter) {
              var found = props.data.links.filter(
                (link) =>
                  link.val >= props.edgeWeightRange[0] &&
                  link.val <= props.edgeWeightRange[1]
              );

              found = found.filter(
                (link) => link.target == node || link.source == node
              );

              if (found.length == 0) {
                return false;
              }
            }

            if (props.nodeWeightFilter) {
              if (
                !(
                  node.val >= props.nodeWeightRange[0] &&
                  node.val <= props.nodeWeightRange[1]
                )
              ) {
                return false;
              }
            }

            return true;
          }}
          nodeCanvasObjectMode={() => "replace"}
          onEngineStop={onEngineStop}
          onNodeHover={props.setHighlightedNode}
          onNodeClick={(node) =>
            node == props.selectedNode
              ? props.setSelectedNode(null)
              : props.setSelectedNode(node)
          }
          onLinkHover={props.setHighlightedLink}
        />
      </CardContent>
    </Card>
  );
}
