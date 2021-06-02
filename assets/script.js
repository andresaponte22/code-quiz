// Variables
var startButton = document.getElementById('start-btn')
var nextButton = document.getElementById('next-btn')
var questionContainerElement = document.getElementById('question-container')
var questionElement = document.getElementById('question')
var answerButtonsElement = document.getElementById('answer-btns')
var highscoreContainerElement = document.getElementById('highscore-container')
var usernameInput = document.getElementById('username')
var submitButtonElement = document.getElementById('submitUsername')

var highscoreDisplayElement = document.getElementById('highscore-display')

var usernameDisplay = document.getElementById('username-input')
var scoreDisplay = document.getElementById('score')

let shuffledQuestions, currentQuestionIndex
var countRightAnswers = 0
let timer = 0

// Object and keys for quiz questions and answers
const questions = [
  {
    question: "Commonly used data types DO NOT include:",
    answers: [
      {text: 'Booleans', correct: false},
      {text: 'Strings', correct: false},
      {text: 'Alerts', correct: true},
      {text: 'Numbers', correct: false}
    ]
  },
  {
    question: "The conditions in an if/else statement are enclosed within:",
    answers: [
      {text: 'Quotes', correct: false},
      {text: 'Curly brackets', correct: false},
      {text: 'Parentheses', correct: true},
      {text: 'Square brackets', correct: false}
    ]
  },
  {
    question: "Arrays in Javascript can be used to store ______.",
    answers: [
      {text: 'Numbers', correct: false},
      {text: 'Other arrays', correct: false},
      {text: 'Booleans', correct: false},
      {text: 'All of the above', correct: true}
    ]
  },
  {
    question: "String values need to be enclosed within _____ when being assinged to variables",
    answers: [
      {text: 'Commas', correct: false},
      {text: 'Curly brackets', correct: false},
      {text: 'Quotes', correct: true},
      {text: 'Parentheses', correct: false}
    ]
  }
];

// Event listener for click on buttons
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

submitButtonElement.addEventListener('click', function() {
  console.log(usernameInput.value)

  localStorage.setItem("username", usernameInput.value)
  localStorage.setItem("score", countRightAnswers)

  questionContainerElement.classList.add('hide')
  highscoreContainerElement.classList.add('hide')

  highscoreDisplayElement.classList.remove('hide')

  usernameDisplay.textContent = localStorage.getItem("username")
  scoreDisplay.textContent = localStorage.getItem("score")

  startButton.setAttribute('disabled', false)


})


// Functions
function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    var button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  var selectedButton = e.target
  var correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
    startButton.setAttribute('disabled', true)
    // add highscore functionality
    highscoreContainerElement.classList.remove('hide')
  }
  if (selectedButton.dataset = correct) {
    countRightAnswers++
  }
  document.getElementById('right-answers').innerHTML = countRightAnswers
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}
