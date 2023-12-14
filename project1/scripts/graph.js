// Få fat i HTML-elementet med id 'chart-container'
const container = document.getElementById("chart-container");

// Få containerens bredde og højde
const containerWidth = container.clientWidth;
const containerHeight = container.clientHeight;

// Funktion til at hente data og oprette visualisering
function fetchDataAndCreateVisualization(url, yAxis, xAxis, svg, graphType) {
  // Hent data fra en URL
  fetch(url)
    .then((response) => response.json()) // Konverter svaret til JSON
    .then((data) => {
      // Data er nu tilgængelige her
      // Kald en funktion til at oprette D3-visualisering med data
      createD3Visualization(data.skovData, yAxis, xAxis, svg, graphType);
      console.log(
        "fetchDataAndCreateVisualization funktionen er indlæst og kaldt."
      );
    })
    .catch((error) => console.error("Fejl ved indhentning af data:", error));
}

// Funktion til at oprette D3-visualisering
function createD3Visualization(data, yAxis, xAxis, svg, graphType) {
  // Tjek om data indeholder 'skovData'-egenskaben og det er et array
  if (!data || !Array.isArray(data)) {
    console.error(
      "Ugyldigt dataformat. Forventede et objekt med 'skovData'-egenskaben som et array."
    );
    return;
  }

  // Tjek om data-arrayet er tomt
  if (data.length === 0) {
    console.error("Tomt skovData-array. Kan ikke oprette visualisering.");
    return;
  }

  // Stilindstillinger
  const styling = {
    width: 1600,
    height: 550,
    marginTop: 60,
    marginRight: 60,
    marginBottom: 60,
    marginLeft: 60,
  };

  // Vælg hvilken type graf der skal oprettes
  switch (graphType) {
    case "bar":
      createBarChart(data, yAxis, xAxis, svg, styling);
      break;
    case "barz":
      createBarzChart(data, yAxis, xAxis, svg, styling);
      break;
    case "bart":
      createBartChart(data, yAxis, xAxis, svg, styling);
      break;
    case "line":
      createLineChart(data, yAxis, xAxis, svg, styling);
      break;
    case "stacked":
      createStackedChart(data, yAxis, xAxis, svg, styling);

    default:
      break;
  }
}
