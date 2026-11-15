import * as d3 from "d3";
import { useRef } from "react";

type TimelineObject = {
    dataDiv: string;
    numFires: number;
    avgFrp: number;
};


export default function Timeline(data: Array<TimelineObject>) {

    const margin = { top: 0, right: 100, bottom: 30, left: 100 };
    const width = 800 -margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svgRef = useRef(null);
    const svg = d3.select(svgRef.current);

    const xScale = d3.scaleBand()
        .domain(data.map((d) => d.dataDiv))
        .range([0, width]).padding(0.5);
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => d.numFires)!])
        .range([height, 0]);

    const myColor = d3.scaleSequential()
        .domain([0, d3.max(data, (d) => d.avgFrp)!])
        .interpolator(d3.interpolateYlOrRd);

    svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d) => xScale(d.dataDiv)!)
        .attr("y", (d) => yScale(d.numFires))
        .attr("width", xScale.bandwidth())
        .attr("height", (d) => height - yScale(d.numFires))
        .attr("transform", "translate(30, 10)")
        .attr("fill", (d) => myColor(d.avgFrp))

    return (
        <svg ref={svgRef} style={{padding:"100px"}} 
        width={width + margin.left + margin.right}
        height={height + margin.top + margin.bottom}>
        </svg>
    )

}