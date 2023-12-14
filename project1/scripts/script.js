// Vent på, at hele HTML-dokumentet er indlæst
document.addEventListener("DOMContentLoaded", function () {
  // Hent forskellige elementer fra dokumentet
  const startButton = document.getElementById("start-btn");
  const nextButton = document.getElementById("next-btn");
  const questionContainerElement =
    document.getElementById("question-container");
  const questionElement = document.getElementById("question");
  const answerButtonsElement = document.getElementById("answer-buttons");
  const explanationElement = document.getElementById("explanation");
  const resultsButton = document.getElementById("results-btn");

  // Definer størrelsen på SVG-elementet
  const width = 780;
  const height = 503;

  // Opret SVG-elementet til visualisering
  let svg = d3
    .select("#chart-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto;");

  // Variabler til styring af quizzen
  let shuffledQuestions = [];
  let currentQuestionIndex = -1;
  let correctAnswersCount = 0;

  // Tilføj eventlisteners til knapperne
  resultsButton.addEventListener("click", showResults);
  startButton.addEventListener("click", startQuiz);
  nextButton.addEventListener("click", () => {
    nextQuestion();
  });

  // Funktion til at skjule elementer baseret på deres klasse
  function hideElementsByClass(className) {
    const elements = document.getElementsByClassName(className);
    for (const element of elements) {
      element.style.display = "none";
    }
  }

  // Start quizzen
  function startQuiz() {
    // Opret en tilfældig ordre af spørgsmål
    const arr = [];
    while (arr.length < questions.length) {
      const randomNumber = Math.floor(Math.random() * questions.length - 1) + 1;
      if (arr.indexOf(randomNumber) === -1) {
        arr.push(randomNumber);
      }
    }

    // Skjul visse elementer og vis spørgsmål
    hideElementsByClass("intro-image");
    hideElementsByClass("quiz-info-box");
    arr.forEach((index) => {
      shuffledQuestions.push(questions[index]);
    });
    startButton.classList.add("hide");
    questionContainerElement.classList.remove("hide");
    nextQuestion();
  }

  // Vis det næste spørgsmål
  function nextQuestion() {
    resetState();
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
      showQuestion(shuffledQuestions[currentQuestionIndex]);
    } else {
      nextButton.classList.add("hide");
      resultsButton.classList.add("hide");
    }
  }

  // Vis resultaterne
  function showResults() {
    resetState();
    localStorage.setItem("correctAnswersCount", correctAnswersCount);
    window.location.href = "results.html";
  }

  // Nulstil tilstanden
  function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add("hide");
    while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
    if (svg) {
      svg.remove();
      d3.selectAll("g > *").remove();
      d3.select("svg").remove();
    }
  }

  // Vis et spørgsmål
  function showQuestion(question) {
    const existingImage =
      questionContainerElement.querySelector(".question-image");
    if (existingImage) {
      existingImage.remove();
    }
    answerButtonsElement.style.display = "";
    if (question.imagePath) {
      const imageElement = document.createElement("img");
      imageElement.src = question.imagePath;
      imageElement.alt = "Question image";
      imageElement.classList.add("question-image");
      questionContainerElement.insertBefore(
        imageElement,
        questionContainerElement.firstChild
      );
    }
    questionElement.innerText = question.question;
    explanationElement.innerText = "";
    answerButtonsElement.innerHTML = "";
    question.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.innerText = answer.text;
      button.classList.add("btn");
      button.dataset.explanation = answer.explanation;
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.dataset.imagePath = question.imagePath;
      button.addEventListener("click", selectAnswer);
      answerButtonsElement.appendChild(button);
    });
  }

  // Vælg et svar
  async function selectAnswer(e) {
    const selectedButton = e.target;
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const isCorrect = selectedButton.dataset.correct === "true";
    showExplanationPage(selectedButton.dataset.explanation, isCorrect);
    const questionImage =
      questionContainerElement.querySelector(".question-image");
    if (questionImage) {
      questionImage.style.display = "none";
    }
    answerButtonsElement.style.display = "none";
    showExplanationPage(selectedButton.dataset.explanation, isCorrect);
    if (currentQuestionIndex === shuffledQuestions.length - 1) {
      resultsButton.classList.remove("hide");
      nextButton.classList.add("hide");
    } else {
      nextButton.classList.remove("hide");
    }
    const apiUrl = currentQuestion.apiEndpoint;
    const yAxis = currentQuestion.yAxis;
    const xAxis = currentQuestion.xAxis;
    const graphType = currentQuestion.graphType;
    await fetchDataAndCreateVisualization(apiUrl, yAxis, xAxis, svg, graphType);
    if (selectedButton.dataset.correct === "true") {
      selectedButton.classList.add("correct");
      correctAnswersCount++;
    } else {
      selectedButton.classList.add("wrong");
    }
  }

  // Vis forklaringssiden
  function showExplanationPage(explanation, isCorrect) {
    explanationElement.innerHTML = "";
    const iconElement = document.createElement("img");
    iconElement.src = isCorrect
      ? "css/icons/correct.png"
      : "css/icons/wrong.png";
    iconElement.alt = isCorrect ? "Correct Answer" : "Wrong Answer";
    iconElement.classList.add("explanation-icon");
    explanationElement.appendChild(iconElement);
    const textNode = document.createTextNode(explanation);
    explanationElement.appendChild(textNode);
  }

  // Fjern statusklasser fra et element
  function clearStatusClass(element) {
    const children = element.children;
    for (let i = 0; i < children.length; i++) {
      children[i].classList.remove("correct", "wrong");
    }
  }
});
