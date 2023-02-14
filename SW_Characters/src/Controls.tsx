import { Box, Card, CardContent, CardHeader, Checkbox, createTheme, FormControlLabel, Slider, Stack, Switch, ThemeProvider, Typography, useTheme } from "@mui/material";
import { useState } from "react";

type ControlsProps = {
    edgeWeightRange: number[]
    setEdgeWeightRange: (values: number[]) => void
    maxEdgeWeight: number
    edgeWeightFilter: boolean
    setEdgeWeightFilter: (bool: boolean) => void
}

export default function Controls(props: ControlsProps) {

    

    const handleSlider = (event: Event, newValue: number | number[]) => {
        props.setEdgeWeightRange(newValue as number[]);
      };

    const theme = createTheme({
        palette: {
            primary: {
                main: '#FFFF00',
            },
            secondary: {
                main: '#FFFF95',
            },

        }
    })

    return (
        <Card sx={{ backgroundColor: "rgba(20,20,20,1)", height: '100%' }}>
          <CardHeader
            title="Options"
            titleTypographyProps={{ color: "yellow", fontSize: "3rem" }}
          />
          <CardContent>
            <Box>
                <ThemeProvider theme={theme}>
                    <FormControlLabel 
                        control={
                            <Checkbox 
                                checked={props.edgeWeightFilter}
                                onChange={() => props.setEdgeWeightFilter(!props.edgeWeightFilter)}
                                sx={{
                                    color: 'white',
                                    '&.Mui-checked': {
                                    color: theme.palette.primary.main,
                                    },
                                }}
                            />
                        }
                        label='Edge Weight'
                        labelPlacement="start"
                        sx={{color: theme.palette.primary.main}}
                    />
                    <Slider 
                        value={props.edgeWeightRange}
                        valueLabelDisplay="auto"
                        max={props.maxEdgeWeight}
                        onChange={handleSlider}
                        disabled={!props.edgeWeightFilter}
                    />
                </ThemeProvider>
            </Box>
          </CardContent>
        </Card>
    )
}