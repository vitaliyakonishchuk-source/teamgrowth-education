const questions = [
  { text: "Ми намагаємося встановити процедури та протоколи.", stage: "Формування" },
  { text: "Ми швидко переходимо до виконання роботи.", stage: "Зіткнення" },
  { text: "Наша команда відчуває спільну відповідальність.", stage: "Виконання" },
  { text: "У нас чіткі процедури узгодження.", stage: "Нормування" },
  { text: "Члени команди бояться звертатися за допомогою.", stage: "Формування" },
  { text: "Усі однаково розуміють наші цілі.", stage: "Нормування" },
  { text: "Лідер підтримує порядок.", stage: "Зіткнення" },
  { text: "У нас немає визначених процедур.", stage: "Виконання" },
  { text: "Ми генеруємо багато ідей.", stage: "Зіткнення" },
  { text: "Члени команди не до кінця довіряють.", stage: "Формування" },
  { text: "Лідер стежить за процедурами.", stage: "Нормування" },
  { text: "Ми отримуємо задоволення від роботи разом.", stage: "Виконання" },
  { text: "Ми прийняли одне одного.", stage: "Нормування" },
  { text: "Лідер демократичний.", stage: "Виконання" },
  { text: "Ми визначаємо цілі та завдання.", stage: "Формування" },
  { text: "Багато хто має власні ідеї.", stage: "Зіткнення" },
  { text: "Ми приймаємо сильні та слабкі сторони.", stage: "Виконання" },
  { text: "У нас є ролі в команді.", stage: "Нормування" },
  { text: "Ми уникаємо конфліктів.", stage: "Нормування" },
  { text: "Завдання здаються складними.", stage: "Зіткнення" },
  { text: "У нас часті абстрактні дискусії.", stage: "Формування" },
  { text: "Ми вирішуємо проблеми групою.", stage: "Виконання" },
  { text: "Ми часто сперечаємося.", stage: "Зіткнення" },
  { text: "Команді хочеться змінити проєкт.", stage: "Зіткнення" },
  { text: "Ми конструктивно критикуємо.", stage: "Нормування" },
  { text: "Ми прихильні один до одного.", stage: "Виконання" },
  { text: "Не всі цілі досягаються.", stage: "Формування" },
  { text: "Наші цілі здаються нереальними.", stage: "Зіткнення" },
  { text: "Ми сповнені ентузіазму.", stage: "Формування" },
  { text: "Ми ділимось особистими проблемами.", stage: "Нормування" },
  { text: "Є опір процесам покращення.", stage: "Зіткнення" },
  { text: "Ми виконуємо багато роботи.", stage: "Виконання" }
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

let answered = false;

function showQuestion() {
  answered = false;

  const q = questions[currentQuestion];

  questionEl.innerHTML = `
    <div style="font-size:28px; font-weight:bold; margin-bottom:20px;">
      Питання ${currentQuestion + 1} / ${questions.length}
    </div>
    <div>${q.text}</div>
  `;

  answersEl.innerHTML = "";

  const variants = [
    { text: "Майже ніколи", score: 1 },
    { text: "Зрідка", score: 2 },
    { text: "Інколи", score: 3 },
    { text: "Часто", score: 4 },
    { text: "Майже завжди", score: 5 }
  ];

  variants.forEach(v => {
    const btn = document.createElement("button");

    btn.innerText = v.text;
    btn.classList.add("answer-btn");

    btn.onclick = () => {
      if (answered) return;

      answered = true;

      scores[q.stage] += v.score;

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
  if (!answered) return;

  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
});

function showResults() {
  document.getElementById("quiz-box").style.display = "none";

  resultBox.style.display = "block";

  let topStage = "";
  let topScore = 0;

  for (const stage in scores) {
    if (scores[stage] > topScore) {
      topScore = scores[stage];
      topStage = stage;
    }
  }

  resultText.innerHTML = `
    <h2>Результати команди</h2>

    <p><strong>Формування:</strong> ${scores["Формування"]}</p>
    <p><strong>Зіткнення:</strong> ${scores["Зіткнення"]}</p>
    <p><strong>Нормування:</strong> ${scores["Нормування"]}</p>
    <p><strong>Виконання:</strong> ${scores["Виконання"]}</p>

    <hr style="margin:30px 0;">

    <h1>Поточна стадія:</h1>
    <h1 style="color:#7c3aed;">${topStage}</h1>
  `;
}

showQuestion();
