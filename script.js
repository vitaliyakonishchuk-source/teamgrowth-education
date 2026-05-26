const questions = [
  {
    question: "Як ти реагуєш на зміни в команді?",
    answers: [
      { text: "Легко адаптуюсь", score: 3 },
      { text: "Потрібен час", score: 2 },
      { text: "Уникаю змін", score: 1 }
    ]
  },
  {
    question: "Наскільки комфортно тобі працювати в команді?",
    answers: [
      { text: "Дуже комфортно", score: 3 },
      { text: "Іноді складно", score: 2 },
      { text: "Люблю працювати самостійно", score: 1 }
    ]
  },
  {
    question: "Як ти вирішуєш конфлікти?",
    answers: [
      { text: "Через діалог", score: 3 },
      { text: "Шукаю компроміс", score: 2 },
      { text: "Уникаю конфліктів", score: 1 }
    ]
  }
];

let currentQuestion = 0;
let totalScore = 0;

const quiz = document.getElementById("quiz");
const nextBtn = document.getElementById("nextBtn");
const result = document.getElementById("result");
const scoreText = document.getElementById("scoreText");

function showQuestion() {
  const q = questions[currentQuestion];

  quiz.innerHTML = `
    <div class="question">${q.question}</div>
    ${q.answers.map(answer => `
      <button class="answer-btn" onclick="selectAnswer(${answer.score})">
        ${answer.text}
      </button>
    `).join("")}
  `;
}

function selectAnswer(score) {
  totalScore += score;
  nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
    nextBtn.style.display = "none";
  } else {
    showResult();
  }
});

function showResult() {
  document.querySelector(".quiz-container").classList.add("hidden");
  result.classList.remove("hidden");

  let text = "";

  if (totalScore >= 8) {
    text = "Ти сильний командний гравець та природний лідер 🚀";
  } else if (totalScore >= 5) {
    text = "У тебе хороший потенціал для розвитку командних навичок 🌱";
  } else {
    text = "Тобі підійде індивідуальний стиль розвитку 💡";
  }

  scoreText.textContent = text;
}

showQuestion();
nextBtn.style.display = "none";
