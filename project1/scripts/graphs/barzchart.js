function createBarzChart(data, yAxis, xAxis, svg, styling) {
  // Filtrer data for at fjerne værdier, der er null i yAxis eller år
  data = data.filter((d) => d[yAxis] != null && d[xAxis] != null);

  const { width, height, marginTop, marginRight, marginBottom, marginLeft } =
    styling;

  // Opret en skala for X-aksen baseret på år
  const xScale = d3
    .scaleBand()
    .domain(data.map((d) => d.year)) // Tilpas efter din datastruktur
    .range([marginLeft, width - marginRight]) // Rækkevidde med marginer
    .padding(0.1); // Tilføj en smule plads mellem søjlerne

  // Opret en skala for Y-aksen
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d[yAxis])]) // Fra 0 til maksimal værdi i data
    .range([height - marginBottom, marginTop]); // Rækkevidden går fra bund til top

  // Opret en farveskala for søjlerne
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

  // Opret søjlerne med farveskala og animation
  const bars = svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d) => xScale(d.year)) // X-position baseret på år
    .attr("y", height - marginBottom) // Start søjlerne ved bundlinjen
    .attr("width", xScale.bandwidth()) // Bredde af hver søjle
    .attr("height", 0) // Start med højde 0
    .attr("fill", (d) => colorScale(d[yAxis])) // Farve baseret på værdi
    .transition() // Anvend overgang
    .duration(1000) // Varighed af animation i millisekunder
    .ease(d3.easeElasticOut) // Brug elastisk udgangsanimation
    .delay((d, i) => i * 100) // Forsinkelse for hver søjle
    .attr("y", (d) => yScale(d[yAxis])) // Animeret Y-position
    .attr("height", (d) => height - yScale(d[yAxis]) - marginBottom); // Animeret højde

  // Tilføj tekst efter animationen for hver søjle
  bars.on("end", function (d, i) {
    const bar = d3.select(this);
    bar
      .append("text")
      .text((d) => d[yAxis])
      .attr("x", xScale(d.year) + xScale.bandwidth() / 8)
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
  const yAxisG = svg
    .append("g")
    .attr("transform", `translate(${marginLeft}, 0)`)
    .call(d3.axisLeft(yScale));

  // Justér tekstens position på Y-aksen
  yAxisG.selectAll("text").style("text-anchor", "end");

  // Tilføj label til Y-aksen
  yAxisG
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 15 - marginLeft) // Justér positionen baseret på margener
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Brand i 1000 hektar"); // Tekst for Y-aksen
}
