const questions = [
  {
    question: "Hvilket land har den største skovrydning i 2010 frem til 2020?",
    apiEndpoint: "https://maltesmoegungerne.onrender.com/smallchanges",
    yAxis: "netChanges",
    xAxis: "name",
    graphType: "bart",
    imagePath: "css/images/deforest.jpg",
    answers: [
      {
        text: "USA",
        correct: false,
        explanation:
          "Forkert, Brasilien oplevede den mest omfattende skovrydning i dette tidsrum, primært i Amazonas. Denne udvikling har haft alvorlige konsekvenser for biodiversiteten og klimaet.",
      },
      {
        text: "Rusland",
        correct: false,
        explanation:
          "Forkert, Brasilien oplevede den mest omfattende skovrydning i dette tidsrum, primært i Amazonas. Denne udvikling har haft alvorlige konsekvenser for biodiversiteten og klimaet.",
      },
      {
        text: "Brasilien",
        correct: true,
        explanation:
          "Korrekt, Brasilien oplevede den mest omfattende skovrydning i dette tidsrum, primært i Amazonas. Denne udvikling har haft alvorlige konsekvenser for biodiversiteten og klimaet.",
      },
    ],
  },
  {
    question:
      "Hvilke faktorer har haft størst indflydelse på skovrydningen af den brasilianske regnskov?",
    apiEndpoint: "https://maltesmoegungerne.onrender.com/brazil",
    yAxis: "pasture",
    xAxis: "year",
    graphType: "stacked",
    imagePath: "css/images/cows.jpg",
    answers: [
      {
        text: "Sojabønneproduktionen",
        correct: false,
        explanation:
          "Forkert, kvægopdræt var den dominerende faktor, der bidrog til skovrydning i Brasilien, hvilket understreger behovet for bæredygtige landbrugsmetoder.",
      },
      {
        text: "Kvægopdræt",
        correct: true,
        explanation:
          "Rigtigt, kvægopdræt var den dominerende faktor, der bidrog til skovrydning i Brasilien, hvilket understreger behovet for bæredygtige landbrugsmetoder.",
      },
      {
        text: "Urbanisering",
        correct: false,
        explanation:
          "Forkert, kvægopdræt var den dominerende faktor, der bidrog til skovrydning i Brasilien, hvilket understreger behovet for bæredygtige landbrugsmetoder.",
      },
    ],
  },
  {
    question: "Hvor meget skov er blevet afbrændt i Brasilien fra 2000-2017?",
    apiEndpoint: "https://maltesmoegungerne.onrender.com/brazilfires",
    yAxis: "Brand",
    xAxis: "d.year",
    graphType: "bar",
    imagePath: "css/images/brazilfire.jpeg",
    answers: [
      {
        text: "cirka 2,2 mio. hektar",
        correct: false,
        explanation:
          "Korrekt.... NOT! Omkring 6,6 millioner hektar blev afbrændt, hvilket har været en udfordring for både klima og biodiversitet i området.",
      },
      {
        text: "cirka 4,4 mio. hektar",
        correct: false,
        explanation:
          "Korrekt.... NOT! Omkring 6,6 millioner hektar blev afbrændt, hvilket har været en udfordring for både klima og biodiversitet i området.",
      },
      {
        text: "cirka 6,6 mio. hektar",
        correct: true,
        explanation:
          "Korrekt! Omkring 6,6 millioner hektar blev afbrændt, hvilket har været en udfordring for både klima og biodiversitet i området.",
      },
    ],
  },
  {
    question:
      "Hvilket land i Amazonas har genoprettet mest skov mellem 2000-2020?",
    apiEndpoint: "https://maltesmoegungerne.onrender.com/growingyearamazon",
    yAxis: "year",
    xAxis: "skovudvidelse",
    graphType: "line",
    imagePath: "css/images/forestfire.jpg",
    answers: [
      {
        text: "Columbia",
        correct: true,
        explanation:
          "Præcis, mellem 2000 og 2020 har Colombia været førende i Amazonas-regionen i bestræbelserne på skovgenoprettelse. Dette skyldes en kombination af stærk miljølovgivning, fællesskabsbaserede genoprettelsesprojekter, og internationalt samarbejde, hvilket har resulteret i en betydelig forbedring af skovområderne i landet",
      },
      {
        text: "Brasilien",
        correct: false,
        explanation:
          "Desværre, mellem 2000 og 2020 har Colombia været førende i Amazonas-regionen i bestræbelserne på skovgenoprettelse. Dette skyldes en kombination af stærk miljølovgivning, fællesskabsbaserede genoprettelsesprojekter, og internationalt samarbejde, hvilket har resulteret i en betydelig forbedring af skovområderne i landet",
      },
      {
        text: "Bolivia",
        correct: false,
        explanation:
          "Desværre, mellem 2000 og 2020 har Colombia været førende i Amazonas-regionen i bestræbelserne på skovgenoprettelse. Dette skyldes en kombination af stærk miljølovgivning, fællesskabsbaserede genoprettelsesprojekter, og internationalt samarbejde, hvilket har resulteret i en betydelig forbedring af skovområderne i landet",
      },
    ],
  },
  {
    question:
      "Hvor mange hektar skov bliver hvert år tabt i hele verden pågrund af bakterier, fungus og virusser?",
    apiEndpoint: "https://maltesmoegungerne.onrender.com/totalannual",
    yAxis: "total_diseases",
    xAxis: "year",
    graphType: "barz",
    imagePath: "css/images/svamp.jpg",
    answers: [
      {
        text: "2,5 mio hektar",
        correct: false,
        explanation:
          "Det er desværre forkert, skovtab på 4,5 millioner hektar årligt skyldes infektioner forårsaget af bakterier, fungus, og virusser. Disse organismer kan forårsage sygdomme i træer og skovområder, hvilket resulterer i betydelige tab af skovarealer. Disse organismer påvirker skovens sundhed ved at angribe træernes blade, grene, stammer, eller rødder, hvilket fører til svækkelse og i nogle tilfælde død af træerne",
      },
      {
        text: "4,5 mio hektar",
        correct: true,
        explanation:
          "Det er helt rigtigt, skovtab på 4,5 millioner hektar årligt skyldes infektioner forårsaget af bakterier, fungus, og virusser. Disse organismer kan forårsage sygdomme i træer og skovområder, hvilket resulterer i betydelige tab af skovarealer. Disse organismer påvirker skovens sundhed ved at angribe træernes blade, grene, stammer, eller rødder, hvilket fører til svækkelse og i nogle tilfælde død af træerne",
      },
      {
        text: "6,5 mio hektar",
        correct: false,
        explanation:
          "Det er desværre forkert, skovtab på 4,5 millioner hektar årligt skyldes infektioner forårsaget af bakterier, fungus, og virusser. Disse organismer kan forårsage sygdomme i træer og skovområder, hvilket resulterer i betydelige tab af skovarealer. Disse organismer påvirker skovens sundhed ved at angribe træernes blade, grene, stammer, eller rødder, hvilket fører til svækkelse og i nogle tilfælde død af træerne",
      },
    ],
  },
];
