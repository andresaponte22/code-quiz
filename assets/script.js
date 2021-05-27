// Variables
var quizContainer = document.getElementById("quiz");
var resultsContainer = document.getElementById("answers");
var submitButton = document.getElementById("submit");

const quizQuestions = [
  {
    question: "Commonly used data types DO NOT include:",
    answers: {
      a: "Booleans",
      b: "Strings",
      c: "Alerts",
      d: "Numbers"
    },
    correctAnswer: "c"
  },
  {
    question: "The conditions in an if/else statement are enclosed within:",
    answers: {
      a: "Quotes",
      b: "Curly brackets",
      c: "Parentheses",
      d: "Square brackets"
    },
    correctAnswer: "c"
  },
  {
    question: "Arrays in Javascript can be used to store ______.",
    answers: {
      a: "Numbers",
      b: "Other arrays",
      c: "Booleans",
      d: "All of the above"
    },
    correctAnswer: "d"
  },
  {
    question: "String values need to be enclosed within _____ when being assinged to variables",
    answers: {
      a: "Commas",
      b: "Curly brackets",
      c: "Quotes",
      d: "Parentheses"
    },
    correctAnswer: "c"
  }
];

// Functions
function buildQuiz(){
  const output = [];

  quizQuestions.forEach(
    (currentQuestion, questionNumber) => {

      var answers = [];

      for(letter in currentQuestion.answers){

        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join('')} </div>`
      );
    }
  );

  quizContainer.innerHTML = output.join('');
};

function showResults(){

  var answerContainers = quizContainer.querySelectorAll('.answers');

  var numCorrect = 0;

  quizQuestions.forEach( (currentQuestion, questionNumber) => {

    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    if(userAnswer === currentQuestion.correctAnswer){
      numCorrect++;
      answerContainers[questionNumber].style.color = 'lightgreen';
    }
    else{
      answerContainers[questionNumber].style.color = 'red';
    }
  });

  resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
};




// Initiate quiz 
buildQuiz();

// Event listeners for answer submission
submitButton.addEventListener('click', displayResults);


