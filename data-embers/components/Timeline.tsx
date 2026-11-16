"use client"
import * as d3 from "d3";
import { useRef, useEffect } from "react";

type TimelineObject = {
    dataDiv: number;
    numFires: number;
    avgFrp: number;
};


export default function Timeline() {
    const data : TimelineObject[] = [
        {dataDiv: 1, numFires: 89, avgFrp: 200},
        {dataDiv: 2, numFires: 72, avgFrp: 350},
        {dataDiv: 3, numFires: 63, avgFrp: 270}
    ]

    const margin = { top: 0, right: 100, bottom: 30, left: 100 };
    const width = 500 -margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const svgRef = useRef(null);

    useEffect(() =>{
    const svg = d3.select(svgRef.current);

    const xScale = d3.scaleBand()
        .domain(data.map((d) => String(d.dataDiv)))
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
        .attr("x", (d) => xScale(String(d.dataDiv))!)
        .attr("y", (d) => yScale(d.numFires))
        .attr("width", xScale.bandwidth())
        .attr("height", (d) => height - yScale(d.numFires))
        .attr("transform", "translate(30, 10)")
        .attr("fill", (d) => myColor(d.avgFrp))
    
    const xAxis = d3.axisBottom(xScale);
    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(30,480)")
        .call(xAxis);

    const yAxis = d3.axisLeft(yScale);
    svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", "translate(30,10)")
        .call(yAxis);

    }, []);

    return (
        <section className="chart-data">
        <svg ref={svgRef} 
        width={width + margin.left + margin.right}
        height={height + margin.top + margin.bottom}>
        </svg>
        </section>
    )

}