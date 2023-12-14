function createBarChart(data, yAxis, xAxis, svg, styling) {
  const { width, height, marginTop, marginRight, marginBottom, marginLeft } =
    styling;

  // Opret X-akseskalering baseret på år
  const xScale = d3
    .scaleBand()
    .domain(data.map((d) => d.year)) // Brug år som domæne
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
    .attr("x", (d) => xScale(d.year)) // X-position baseret på år
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

  // Tilføj X-aksen
  svg
    .append("g")
    .attr("transform", `translate(0, ${height - marginBottom})`)
    .call(d3.axisBottom(xScale));

  // Tilføj Y-aksen
  const yAxisG = svg
    .append("g")
    .attr("transform", `translate(${marginLeft}, 0)`)
    .call(d3.axisLeft(yScale));

  // Juster tekstens position på Y-aksen
  yAxisG.selectAll("text").style("text-anchor", "end");

  // Tilføj label til Y-aksen
  yAxisG
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 15 - marginLeft) // Justér positionen baseret på margener
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Brand i 1000 hektar");
}
