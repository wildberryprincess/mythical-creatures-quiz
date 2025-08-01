const questions = [
  {
    question: "What’s your ideal climate?",
    answers: [
      { text: "Warm and sunny", result: "Palm Tree" },
      { text: "Cool and foggy", result: "Pine Tree" },
      { text: "Wet and lush", result: "Willow Tree" },
    ]
  },
  {
    question: "How would your friends describe you?",
    answers: [
      { text: "Strong and grounded", result: "Oak Tree" },
      { text: "Flexible and calm", result: "Willow Tree" },
      { text: "Tall and chill", result: "Palm Tree" }
    ]
  },
  {
    question: "What's your pace of life?",
    answers: [
      { text: "Slow and steady", result: "Pine Tree" },
      { text: "Fast and fun", result: "Palm Tree" },
      { text: "Flowing and adaptable", result: "Willow Tree" }
    ]
  }
];

let currentQuestion = 0;
let resultCounts = {};

function startQuiz() {
  document.getElementById('start-screen').classList.add('hidden');
  document.getElementById('question-screen').classList.remove('hidden');
  showQuestion();
}

function showQuestion() {
  const q = questions[currentQuestion];
  document.getElementById('question-text').textContent = q.question;

  const answersDiv = document.getElementById('answer-buttons');
  answersDiv.innerHTML = '';

  q.answers.forEach(answer => {
    const btn = document.createElement('button');
    btn.textContent = answer.text;
    btn.onclick = () => selectAnswer(answer.result);
    answersDiv.appendChild(btn);
  });
}

function selectAnswer(result) {
  resultCounts[result] = (resultCounts[result] || 0) + 1;
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById('question-screen').classList.add('hidden');
  document.getElementById('result-screen').classList.remove('hidden');

  let topResult = Object.keys(resultCounts).reduce((a, b) =>
    resultCounts[a] > resultCounts[b] ? a : b
  );

  document.getElementById('result-text').textContent = `You are a ${topResult}!`;
}

function restartQuiz() {
  currentQuestion = 0;
  resultCounts = {};
  document.getElementById('result-screen').classList.add('hidden');
  document.getElementById('start-screen').classList.remove('hidden');
}
