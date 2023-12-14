document.addEventListener("DOMContentLoaded", function () {
  // Opret et tooltip til at vise informationer, når brugeren holder musen over lande
  const tooltip = d3
    .select("body")
    .append("div")
    .attr("id", "tooltip")
    .style("position", "absolute")
    .style("display", "none")
    .style("background", "rgba(255,255,255,0.8)")
    .style("padding", "5px")
    .style("border", "1px solid #ccc")
    .style("border-radius", "5px");
  let width = 1500;
  let height = 1000;

  // Vælg map-container og tilføj et SVG-element
  const svg = d3
    .select(".map-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // Hent verdenskortdata
  d3.json(
    "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
  ).then((worldData) => {
    // Tjek om verdenskortdata er gyldige
    if (worldData && worldData.objects && worldData.objects.countries) {
      // Konverter rå data til features
      const countries = topojson.feature(
        worldData,
        worldData.objects.countries
      );

      // Definer dit API-endepunkt for 'changes' viewet
      const apiEndpoint = "https://maltesmoegungerne.onrender.com/changes";

      // Hent data fra API
      d3.json(apiEndpoint).then((response) => {
        // Tjek om svaret er succesfuldt
        if (response.ok) {
          const apiData = response.skovData;

          // Initialiser et tomt dataMap-objekt
          const dataMap = {};

          // Udfyld dataMap ved at bruge landenavne som keys
          apiData.forEach((entry) => {
            // Konverter "netChanges" til numerisk format
            entry["netChanges"] = parseFloat(entry["netChanges"]);

            // Brug den opdaterede property som key
            dataMap[entry.name] = dataMap[entry.name] || {
              name: entry.name,
              netChanges: 0,
              year: entry.year,
            };

            // Summer netChanges-værdier for de kombinerede år
            if (entry.year === "2010-2015" || entry.year === "2015-2020") {
              dataMap[entry.name].netChanges += entry["netChanges"];
            }
          });

          // Udtræk et array af netChanges-værdier
          const netChangesValues = Object.values(dataMap).map(
            (entry) => entry.netChanges
          );

          // Beregn midtpunktet for at skille mellem grønne og røde nuancer
          const midpoint = d3.mean(netChangesValues);

          // Definer en farveskala med 12 trin fra grøn til gul til rød
          const defaultColorScale = d3
            .scaleLinear()
            .domain([
              d3.min(netChangesValues),
              midpoint,
              d3.max(netChangesValues),
            ])
            .range(["green", "yellow", "red"]);

          const uniqueYears = [...new Set(apiData.map((entry) => entry.year))];

          uniqueYears.forEach((year) => {
            const netChangesValuesYear = apiData
              .filter((entry) => entry.year === year)
              .map((entry) => entry["netChanges"]);

            defaultColorScale[year] = d3
              .scaleLinear()
              .domain([
                d3.min(netChangesValuesYear),
                d3.max(netChangesValuesYear),
              ])
              .range(["green", "red"]);
          });

          const projection = d3
            .geoMercator()
            .scale(210)
            .translate([width / 2.3, height / 1.4]);
          const path = d3.geoPath().projection(projection);

          // Tilføj en gruppe til SVG-elementet
          const g = svg.append("g");

          // Fjern eksisterende stier
          g.selectAll("path").remove();

          // Tilføj nye stier baseret på landenes features
          g.selectAll("path")
            .data(countries.features)
            .enter()
            .append("path")
            .attr("class", "country")
            .attr("d", path)
            .style("fill", (d) => {
              const countryName = d.properties.name;
              const countryData = dataMap[countryName];

              // Brug farveskalaen til at bestemme fyldfarven
              if (
                countryData &&
                countryData["netChanges"] !== undefined &&
                !isNaN(countryData["netChanges"])
              ) {
                return defaultColorScale(countryData["netChanges"]);
              } else {
                return "#78909C";
              }
            })

            // Vis tooltip ved mouseover
            .on("mouseover", function (event, d) {
              const countryName = d.properties.name;
              const countryData = dataMap[countryName];

              let afskovningText =
                countryData && !isNaN(countryData["netChanges"])
                  ? `Afskovning i 1000 hektar: ${countryData["netChanges"]}`
                  : "Ingen data om afskovning";

              let yearText =
                countryData && countryData.year
                  ? countryData.year
                  : "2010-2020";

              // Fremhæv grænsen ved mouseover med en sort farve
              d3.select(this).style("stroke", "black").style("stroke-width", 2);

              tooltip
                .style("display", "block")
                .html(
                  `<strong>${countryName}</strong><br>År: ${yearText}<br>${afskovningText}`
                )
                .style("left", event.pageX + "px")
                .style("top", event.pageY + "px");
            })
            // Fjern fremhævning ved mouseout
            .on("mouseout", function () {
              d3.select(this).style("stroke", "none");

              // Skjul tooltip ved mouseout
              tooltip.style("display", "none");
            });
        } else {
          console.error("API-forespørgsel mislykkedes:", response.message);
        }
      });
    }
  });
});
