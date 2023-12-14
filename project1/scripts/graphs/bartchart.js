function createBartChart(data, yAxis, xAxis, svg, styling) {
  const { width, height, marginTop, marginRight, marginBottom, marginLeft } =
    styling;

  // Opret X-akseskalering baseret på 'navn'
  const xScale = d3
    .scaleBand()
    .domain(data.map((d) => d.name)) // Brug 'navn' som domæne
    .range([marginLeft, width - marginRight]) // Definér rækkevidde med marginer
    .padding(0.1); // Tilføj lidt plads mellem søjlerne

  // Opret Y-akseskalering
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d[yAxis])]) // Y-aksens værdier fra 0 til maksimal værdi i data
    .range([height - marginBottom, marginTop]); // Rækkevidden går fra bund til top

  // Opret en farveskalering for søjlerne
  const colorScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d[yAxis])]) // Brug Y-aksens værdier til farveskalering
    .range(["#2e7d32", "#bf360c"]); // Farveinterval fra grøn til orange

  // Fjern eksisterende SVG-elementer
  d3.select("#chart-container").selectAll("svg").remove();

  // Opret et nyt SVG-element
  svg = d3
    .select("#chart-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // Opret søjlerne med animation
  const bars = svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d) => xScale(d.name)) // X-position baseret på 'navn'
    .attr("y", height - marginBottom) // Start ved bundlinjen
    .attr("width", xScale.bandwidth()) // Bredde af hver søjle
    .attr("height", 0) // Start med højde 0
    .attr("fill", (d) => colorScale(d[yAxis])) // Farve baseret på værdi
    .transition() // Start animationen
    .duration(1000) // Varighed 1000 ms
    .ease(d3.easeElasticOut) // Anvend en elastisk udgangsanimation
    .delay((d, i) => i * 100) // Forsinkelse for hver søjle
    .attr("y", (d) => yScale(d[yAxis])) // Animeret Y-position
    .attr("height", (d) => height - yScale(d[yAxis]) - marginBottom); // Animeret højde

  // Tilføj tekstetiketter efter animationen for hver søjle
  bars.on("end", function (d, i) {
    const bar = d3.select(this);
    bar
      .append("text")
      .text((d) => d[yAxis])
      .attr("x", xScale(d.name) + xScale.bandwidth() / 8)
      .attr("y", (d) => yScale(d[yAxis])) // Justér offset for positionering indeni søjlen
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .attr("fill", "black");
  });

  // Tilføj X-aksen
  svg
    .append("g")
    .attr("transform", `translate(0, ${height - marginBottom})`)
    .call(d3.axisBottom(xScale));

  // Tilføj Y-aksen
  svg
    .append("g")
    .attr("transform", `translate(${marginLeft}, 0)`)
    .call(d3.axisLeft(yScale))
    .selectAll("text")
    .style("text-anchor", "end");
}
