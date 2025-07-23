const quotes = [
  "Believe in yourself and all that you are.",
  "Happiness is not by chance, but by choice.",
  "The best way to predict the future is to create it.",
  "Difficult roads often lead to beautiful destinations.",
  "Every moment is a fresh beginning."
];

let currentQuote = "";
let favorites = [];

function getNewQuote() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  currentQuote = quote;
  document.getElementById("quote-text").textContent = quote;
}

function addToFavorites() {
  if (currentQuote && !favorites.includes(currentQuote)) {
    favorites.push(currentQuote);
    const li = document.createElement("li");
    li.textContent = currentQuote;
    document.getElementById("favorite-quotes").appendChild(li);
  }
}

const board = document.getElementById("mood-board");
const emojiSelector = document.getElementById("emoji-selector");

board.addEventListener("click", (e) => {
  const emoji = emojiSelector.value;
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = emoji;

  const size = 18 + Math.random() * 12;
  bubble.style.fontSize = `${size}px`;

  const boardRect = board.getBoundingClientRect();
  bubble.style.left = `${e.clientX - boardRect.left}px`;
  bubble.style.top = `${e.clientY - boardRect.top}px`;

  board.appendChild(bubble);

  setTimeout(() => bubble.remove(), 2000);
});

// Quiz Logic
const quizData = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Mark Language",
      "Hyper Transfer Media Language"
    ],
    correct: 0
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Computer Style Sheets",
      "Colorful Style Sheets"
    ],
    correct: 1
  },
  {
    question: "Which language is used for web apps?",
    options: ["PHP", "Python", "JavaScript", "All"],
    correct: 3
  },
  {
    question: "What is the correct syntax to include JS in HTML?",
    options: ["<js>", "<javascript>", "<script>", "<code>"],
    correct: 2
  },
  {
    question: "Which tag is used for inserting an image?",
    options: ["<img>", "<image>", "<src>", "<pic>"],
    correct: 0
  }
];

let quizIndex = 0;
let score = 0;

function loadQuestion() {
  const data = quizData[quizIndex];
  document.getElementById("quiz-question").textContent = data.question;
  const optionsDiv = document.getElementById("quiz-options");
  optionsDiv.innerHTML = "";
  data.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(idx);
    optionsDiv.appendChild(btn);
  });
}

function checkAnswer(selected) {
  if (selected === quizData[quizIndex].correct) {
    score++;
  }
  document.getElementById("quiz-result").textContent = `Score: ${score}/${quizData.length}`;
  document.getElementById("next-btn").style.display = "block";
}

function nextQuestion() {
  quizIndex++;
  if (quizIndex < quizData.length) {
    loadQuestion();
    document.getElementById("next-btn").style.display = "none";
    document.getElementById("quiz-result").textContent = "";
  } else {
    document.getElementById("quiz-question").textContent = "🎉 Quiz Completed!";
    document.getElementById("quiz-options").innerHTML = "";
    document.getElementById("next-btn").style.display = "none";
  }
}

window.onload = loadQuestion;
