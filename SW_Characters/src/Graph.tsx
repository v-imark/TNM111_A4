import { useEffect, useMemo, useRef, useState } from "react"
import data from './data/starwars-full-interactions-allCharacters.json'
import ForceGraph2D, { ForceGraphMethods } from 'react-force-graph-2d'
import { Box } from "@mui/material"
import React from "react"

function Graph() {
    const graphRef = useRef<ForceGraphMethods | undefined>()
    const boxRef = useRef()
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);

    useEffect(()=>{
        setWidth((window.innerWidth /12)*5)
        setHeight(window.innerHeight)
    }, [boxRef])

    const graphData = useMemo(()=>{
  
      const nodes = data.nodes.map((item, index) => {
        return {
          id: index,
          name: item.name,
          val: item.value,
          color: item.colour
        }
      })
  
      const links = data.links.map((item, index) => {
        return {
          source: item.source,
          target: item.target,
          val: item.value
        }
      })
  
      return {
        nodes: nodes,
        links: links
      }
    }, [data])
  
    return (
        <Box ref={boxRef} sx={{ border: '1px dashed grey' }}>
            <ForceGraph2D ref={graphRef} graphData={graphData} height={height} width={width} />
        </Box>
    )
  }
  
  export default Graph
  