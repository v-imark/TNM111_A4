import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  createTheme,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  Slider,
  Stack,
  Switch,
  Tab,
  Tabs,
  ThemeProvider,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";

type ControlsProps = {
  edgeWeightRange: number[];
  setEdgeWeightRange: (values: number[]) => void;
  maxEdgeWeight: number;
  edgeWeightFilter: boolean;
  setEdgeWeightFilter: (bool: boolean) => void;
  nodeWeightRange: number[];
  setNodeWeightRange: (values: number[]) => void;
  maxNodeWeight: number;
  nodeWeightFilter: boolean;
  setNodeWeightFilter: (bool: boolean) => void;
  nodeSize: number;
  setNodeSize: (val: number) => void;
  selectedNode: any;
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
  };
  episode: number;
  setEpisode: (val: number) => void;
};

export default function Controls(props: ControlsProps) {
  const [nodeSizeFilter, setNodeSizeFilter] = useState(false);
  const handleEdgeSlider = (event: Event, newValue: number | number[]) => {
    props.setEdgeWeightRange(newValue as number[]);
  };

  const handleNodeSlider = (event: Event, newValue: number | number[]) => {
    props.setNodeWeightRange(newValue as number[]);
  };

  const handleNodeSizeSlider = (event: Event, newValue: number | number[]) => {
    props.setNodeSize(newValue as number);
  };

  const handleTab = (event: React.SyntheticEvent, newValue: number) => {
    props.setEpisode(newValue);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#FFFF00",
      },
      secondary: {
        main: "#FFFF95",
      },
      text: {
        primary: "#FFFF00",
      },
    },
  });

  return (
    <Card sx={{ backgroundColor: "rgba(20,20,20,1)", height: "100%" }}>
      <CardHeader
        title="Options"
        titleTypographyProps={{ color: "yellow", fontSize: "3rem" }}
        sx={{paddingBottom: 0}}
      />
      <CardContent sx={{paddingTop: 0}}>
        <ThemeProvider theme={theme}>
          <Box width={"100%"}>
            <Typography color="yellow">Episode</Typography>
            <Tabs
              value={props.episode}
              onChange={handleTab}
              variant="fullWidth"
              sx={{ width: "100%" }}
            >
                {['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'ALL'].map((value, index) => {
                    return (
                        <Tab
                            label={value}
                            //value={index}
                            sx={{
                                color: "white",
                                "&.Mui-checked": {
                                    color: theme.palette.primary.main,
                                },
                                minWidth: "12%",
                                padding: 0
                            }}
                        />
                    )
                }
                )}
            </Tabs>
          </Box>
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={props.edgeWeightFilter}
                  onChange={() =>
                    props.setEdgeWeightFilter(!props.edgeWeightFilter)
                  }
                  sx={{
                    color: "white",
                    "&.Mui-checked": {
                      color: theme.palette.primary.main,
                    },
                  }}
                />
              }
              label="Edge Weight"
              labelPlacement="start"
              sx={{ color: theme.palette.primary.main, marginLeft: 0 }}
            />
            <Slider
              value={props.edgeWeightRange}
              max={props.maxEdgeWeight}
              onChange={handleEdgeSlider}
              disabled={!props.edgeWeightFilter}
              marks={[
                {
                  label: props.edgeWeightRange[0],
                  value: props.edgeWeightRange[0],
                },
                {
                  label: props.edgeWeightRange[1],
                  value: props.edgeWeightRange[1],
                },
              ]}
            />
          </Box>
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={props.nodeWeightFilter}
                  onChange={() =>
                    props.setNodeWeightFilter(!props.nodeWeightFilter)
                  }
                  sx={{
                    color: "white",
                    "&.Mui-checked": {
                      color: theme.palette.primary.main,
                    },
                  }}
                />
              }
              label="Node Weight"
              labelPlacement="start"
              sx={{ color: theme.palette.primary.main, marginLeft: 0 }}
            />
            <Slider
              value={props.nodeWeightRange}
              max={props.maxNodeWeight}
              onChange={handleNodeSlider}
              disabled={!props.nodeWeightFilter}
              marks={[
                {
                  label: props.nodeWeightRange[0],
                  value: props.nodeWeightRange[0],
                },
                {
                  label: props.nodeWeightRange[1],
                  value: props.nodeWeightRange[1],
                },
              ]}
            />
          </Box>
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={nodeSizeFilter}
                  onChange={() => setNodeSizeFilter(!nodeSizeFilter)}
                  sx={{
                    color: "white",
                    "&.Mui-checked": {
                      color: theme.palette.primary.main,
                    },
                  }}
                />
              }
              label="Node Relative Size"
              labelPlacement="start"
              sx={{ color: theme.palette.primary.main, marginLeft: 0 }}
            />
            <Slider
              value={props.nodeSize}
              max={5}
              step={0.1}
              onChange={handleNodeSizeSlider}
              disabled={!nodeSizeFilter}
              marks={[
                {
                  label: props.nodeSize,
                  value: props.nodeSize,
                },
              ]}
            />
          </Box>
          {props.selectedNode ? (
            <Box marginTop={0}>
              <Typography variant="h5" sx={{ color: "yellow" }}>
                Detailed info
              </Typography>
              <Typography sx={{ color: "yellow" }}>
                {"Character: " + props.selectedNode.name}
              </Typography>
              <Typography sx={{ color: "yellow" }}>
                {"Appearances: " + props.selectedNode.val}
              </Typography>
              <Typography sx={{ color: "yellow" }}>
                {"Interactions: "}
              </Typography>
              <List
                dense={true}
                style={{ maxHeight: window.innerHeight / 7, overflow: "auto" }}
              >
                {props.data.links.map((link: any, index) => {
                  if (
                    link.target == props.selectedNode ||
                    link.source == props.selectedNode
                  ) {
                    const label =
                      link.target.name == props.selectedNode.name
                        ? link.source.name
                        : link.target.name;

                    return (
                      <ListItem key={index} sx={{paddingY: 0}}>
                        <ListItemText
                          primary={label + ": " + link.val}
                          primaryTypographyProps={{
                            color: theme.palette.text.primary,
                          }}
                        />
                      </ListItem>
                    );
                  }
                })}
              </List>
            </Box>
          ) : (
            <></>
          )}
        </ThemeProvider>
      </CardContent>
    </Card>
  );
}
