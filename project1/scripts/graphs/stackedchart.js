function createStackedChart(data, yAxisLabel, xAxisLabel, svg, styling) {
  const { width, height, marginTop, marginRight, marginBottom, marginLeft } =
    styling;

  // Opsætter keys til serien der skal stables
  const keys = Object.keys(data[0]).filter(
    (key) => !["name", "iso3", "year"].includes(key)
  );

  // Konfigurer D3-stack-layout med de angivne nøgler
  const series = d3.stack().keys(keys).offset(d3.stackOffsetExpand)(data);

  // Skalaer for positionelle og farvemæssige kodninger.
  const xScale = d3
    .scaleBand()
    .domain(data.map((d) => d.year))
    .range([marginLeft, width - marginRight])
    .padding(0.1);

  const yScale = d3
    .scaleLinear()
    .domain([0, 1])
    .range([height - marginBottom, marginTop]);

  const color = d3.scaleOrdinal().domain(keys).range(d3.schemeSet1);

  // Konstruer et area.
  const area = d3
    .area()
    .x((d) => xScale(d.data.year))
    .y0((d) => yScale(d[0]))
    .y1((d) => yScale(d[1]));

  // Tilføjer en tooltip
  const tooltip = d3
    .select("#chart-container")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  // Laver en path til event listeners til mouseover effekt
  svg
    .append("g")
    .selectAll("path")
    .data(series)
    .join("path")
    .attr("fill", (d) => color(d.key))
    .attr("d", area)
    .on("mouseover", (event, d) => {
      tooltip.transition().duration(200).style("opacity", 0.9);
      tooltip
        .html(d.key) // Display the key of the area
        .style("left", event.pageX + 10 + "px")
        .style("top", event.pageY - 28 + "px");
    })
    .on("mousemove", (event) => {
      tooltip
        .style("left", event.pageX + 10 + "px")
        .style("top", event.pageY - 28 + "px");
    })
    .on("mouseout", () => {
      tooltip.transition().duration(500).style("opacity", 0);
    });

  // Opret et nyt SVG og sæt oprindeligt gennemsigtighed til 0 for fade-in-effekt
  svg = d3
    .select("#chart-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("opacity", 0);

  // Tilføj en sti for hver serie.
  svg
    .append("g")
    .selectAll()
    .data(series)
    .join("path")
    .attr("fill", (d) => color(d.key))
    .attr("d", area)
    .append("title")
    .text((d) => d.key);

  // Animer SVG-containeren fra gennemsigtig til uigennemsigtig
  svg.transition().duration(3000).style("opacity", 1);

  // Akser
  const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
  const yAxis = d3.axisLeft(yScale).ticks(height / 80, "%");

  // Add a path for each series with event listeners
  svg
    .append("g")
    .selectAll("path")
    .data(series)
    .join("path")
    .attr("fill", (d) => color(d.key))
    .attr("d", area)
    .on("mouseover", (event, d) => {
      tooltip.transition().duration(200).style("opacity", 0.9);
      tooltip
        .html(d.key) // Display the key of the area
        .style("left", event.pageX + 10 + "px")
        .style("top", event.pageY - 28 + "px");
    })
    .on("mousemove", (event) => {
      tooltip
        .style("left", event.pageX + 10 + "px")
        .style("top", event.pageY - 28 + "px");
    })
    .on("mouseout", () => {
      tooltip.transition().duration(500).style("opacity", 0);
    });

  // Tilføj X-aksen
  svg
    .append("g")
    .attr("transform", `translate(-53,${height - marginBottom})`)
    .call(xAxis)
    .call((g) => g.select(".domain").remove())
    .append("text")
    .attr("x", width - marginRight)
    .attr("y", -6)
    .attr("text-anchor", "start")
    .attr("fill", "currentColor");

  // Tilføj Y-aksen
  svg
    .append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(yAxis)
    .call((g) => g.select(".domain").remove())
    .append("text")
    .attr("x", 6)
    .attr("y", marginTop)
    .attr("text-anchor", "start")
    .attr("fill", "currentColor");

  // Opsætning af legende
  const legend = svg
    .append("g")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .attr("text-anchor", "start")
    .selectAll("g")
    .data(keys.slice().reverse())
    .enter()
    .append("g")
    .attr("transform", (d, i) => `translate(0,${i * 20})`);

  // Legendens farvede rektangler
  legend
    .append("rect")
    .attr("x", width - 165)
    .attr("y", 60)
    .attr("width", 25)
    .attr("height", 25)
    .attr("fill", color);

  // Legendens tekst
  legend
    .append("text")
    .attr("x", width - 139)
    .attr("y", 72)
    .attr("dy", "0.32em")
    .style("font-size", "16px")
    .text((d) => d);

  // Returner diagrammet med farveskalaen som en property (til legenden).
  return Object.assign(svg.node(), { scales: { color } });
}
