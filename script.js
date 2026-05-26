const questions = [
  {
    question: "Команда ще мало знайома між собою?",
    stage: "Формування"
  },
  {
    question: "Люди поводяться обережно?",
    stage: "Формування"
  },
  {
    question: "Учасники придивляються один до одного?",
    stage: "Формування"
  },
  {
    question: "У команді поки мало довіри?",
    stage: "Формування"
  },

  {
    question: "У команді виникають суперечки?",
    stage: "Зіткнення"
  },
  {
    question: "Є боротьба за лідерство?",
    stage: "Зіткнення"
  },
  {
    question: "Люди часто не погоджуються?",
    stage: "Зіткнення"
  },
  {
    question: "Іноді є напруга в спілкуванні?",
    stage: "Зіткнення"
  },

  {
    question: "Команда вже працює більш стабільно?",
    stage: "Нормування"
  },
  {
    question: "Люди підтримують одне одного?",
    stage: "Нормування"
  },
  {
    question: "Є спільні правила роботи?",
    stage: "Нормування"
  },
  {
    question: "Команда краще взаємодіє?",
    stage: "Нормування"
  },

  {
    question: "Команда працює дуже ефективно?",
    stage: "Виконання"
  },
  {
    question: "Учасники самостійно вирішують задачі?",
    stage: "Виконання"
  },
  {
    question: "Команда досягає високих результатів?",
    stage: "Виконання"
  },
  {
    question: "Люди довіряють одне одному?",
    stage: "Виконання"
  }
];

let currentQuestion = 0;

const scores = {
  "Формування": 0,
  "Зіткнення": 0,
  "Нормування": 0,
  "Виконання": 0
};

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const resultText = document.getElementById("result-text");

let selected = false;

function showQuestion() {
  selected = false;

  const q = questions[currentQuestion];

  questionEl.innerText = q.question;
  answersEl.innerHTML = "";

  const answers = [
    { text: "Так", score: 2 },
    { text: "Частково", score: 1 },
    { text: "Ні", score: 0 }
  ];

  answers.forEach(answer => {
    const btn = document.createElement("button");

    btn.innerText = answer.text;
    btn.classList.add("answer-btn");

    btn.onclick = () => {
      if (selected) return;

      selected = true;

      scores[q.stage] += answer.score;

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
  if (!selected) return;

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

  let bestStage = "";
  let bestScore = -1;

  for (const stage in scores) {
    if (scores[stage] > bestScore) {
      bestScore = scores[stage];
      bestStage = stage;
    }
  }

  resultText.innerHTML = `
    <h3>Результати команди:</h3>

    <p>Формування: ${scores["Формування"]}</p>
    <p>Зіткнення: ${scores["Зіткнення"]}</p>
    <p>Нормування: ${scores["Нормування"]}</p>
    <p>Виконання: ${scores["Виконання"]}</p>

    <h2>Поточний етап команди:</h2>
    <h1>${bestStage}</h1>
  `;
}

showQuestion();
