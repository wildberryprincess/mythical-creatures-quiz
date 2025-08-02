let questions = [];
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

// Load questions before quiz starts
fetch('questions.json')
  .then(response => response.json())
  .then(data => {
    questions = data;
  })
  .catch(error => console.error('Failed to load questions:', error));
