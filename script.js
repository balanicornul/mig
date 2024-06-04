const questions = [
    {
        question: "Cât este \\( \\sqrt{15} \\)?",
        answers: ["\\(\\sqrt(4)\\) ", "\\(4\\)", "\\(5\\)", "\\(6\\)"],
        correct: 1
    },
    {
        question: "Cât este \\( \\int_{a}^{b} x \\)?",
        answers: ["\\(3\\)", "\\(4\\)", "\\(5\\)", "\\(6\\)"],
        correct: 1
    },
    {
        question: "Cât este \\( \\frac{15}{x} \\)?",
        answers: ["\\(3\\)", "\\(4\\)", "\\(5\\)", "\\(6\\)"],
        correct: 1
    },
];

let currentQuestion = 0;
let score = 0;
let timerInterval;
let timerExpired = false; 

function loadQuestion() {
    if (timerExpired) return; 

    const questionElement = document.getElementById('intrebare');
    const answerButtons = document.querySelectorAll('.raspuns');

    questionElement.textContent = questions[currentQuestion].question;
    answerButtons.forEach((button, index) => {
        button.textContent = questions[currentQuestion].answers[index];
        button.style.backgroundColor = '#E7ECEF';
        button.style.color = '#000000';
        button.disabled = false;
    });
    document.querySelector('.next').style.display = 'none';
    MathJax.typeset();
}

function verificaRaspuns(button) {
    if (timerExpired) return; 

    const answerButtons = document.querySelectorAll('.raspuns');
    const correctIndex = questions[currentQuestion].correct;
    
    if (Array.from(answerButtons).indexOf(button) === correctIndex) {
        button.style.backgroundColor = '#4F926E';
        score++;
    } else {
        button.style.backgroundColor = '#D64550';
        answerButtons[correctIndex].style.backgroundColor = '#4F926E';
    }

    answerButtons.forEach(btn => btn.disabled = true);
    document.querySelector('.next').style.display = 'block';
}

function next() {
    if (timerExpired) return; 
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
}

 function disableAllButtons() {
    const answerButtons = document.querySelectorAll('.raspuns');
    answerButtons.forEach(btn => btn.disabled = true);
}


function endQuiz() {
    clearInterval(timerInterval); 
    alert(`Scorul tau este ${score} din ${questions.length}.`);
    currentQuestion = 0;
    score = 0;
    timerExpired = true;
    disableAllButtons();
    loadQuestion();
}

function startTimer(duration, display) {
    let timer = duration, hours, minutes, seconds;
    timerInterval = setInterval(() => {
        hours = parseInt(timer / 3600, 10);
        minutes = parseInt((timer % 3600) / 60, 10);
        seconds = parseInt(timer % 60, 10);

        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = hours + ":" + minutes + ":" + seconds;

        if (--timer < 0) {
            endQuiz();
            alert("Timpul a expirat!");
            window.close();
        }
    }, 1000);
}


window.onload = function () {
    loadQuestion();
    const twoHours = 2*60*60 ; 
    const display = document.getElementById('time');
    startTimer(twoHours, display);
};
