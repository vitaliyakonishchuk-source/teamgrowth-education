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
  },
  {
    question: "Що тебе найбільше мотивує?",
    answers: [
      { text: "Результат команди", score: 3 },
      { text: "Особистий розвиток", score: 2 },
      { text: "Стабільність", score: 1 }
    ]
  },
  {
    question: "Як ти ставишся до відповідальності?",
    answers: [
      { text: "Люблю брати відповідальність", score: 3 },
      { text: "Залежить від ситуації", score: 2 },
      { text: "Уникаю зайвого тиску", score: 1 }
    ]
  }
];

let currentQuestion = 0;
let totalScore = 0;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
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

      Array.from(answersEl.children).forEach(b => {
        b.disabled = true;
      });

      btn.style.background = "#7c3aed";
      btn.style.color = "white";
    };

    answersEl.appendChild(btn);
  });
}

nextBtn.addEventListener("click", () => {
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

  let result = "";

  if (totalScore >= 13) {
    result = "Ти сильний командний лідер 🚀";
  } else if (totalScore >= 9) {
    result = "Ти добре взаємодієш у команді 👍";
  } else {
    result = "Тобі комфортніше у спокійному темпі 🌱";
  }

  resultText.innerText = result;
}

showQuestion();
