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
  }
];
let currentQuestion = 0;
let totalScore = 0;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result");
const resultText = document.getElementById("result-text");

function showQuestion() {
  const q = questions[currentQuestion];

  questionEl.innerText = q.question;
  answersEl.innerHTML = "";

  q.answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.innerText = answer.text;
    btn.classList.add("answer-btn");

    btn.onclick = () => {
      totalScore += answer.score;

      document.querySelectorAll(".answer-btn").forEach(b => {
        b.disabled = true;
      });

      btn.style.background = "#7c3aed";
      btn.style.color = "white";
    };

    answersEl.appendChild(btn);
  });
}nextBtn.addEventListener("click", () => {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  document.getElementById("quiz-box").style.display = "none";
  resultBox.style.display = "block";

  if (totalScore >= 5) {
    resultText.innerText =
      "Твій стиль — сильний командний лідер 🚀";
  } else {
    resultText.innerText =
      "Ти гнучкий командний гравець 🌱";
  }
}

showQuestion();
