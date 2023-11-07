// Selecting elements from the HTML document
let addOper = document.getElementById('addition');
let subOper = document.getElementById('subtraction');
let mulOper = document.getElementById('multiplication');
let divOper = document.getElementById('division');
let click = Array from(document.getElementsByClassName('click-audio'));
let playElements = Array.from(document.querySelectorAll('audio , video'));

let questionPrompt = document.getElementById('questionPrompt');
let gameOverPrompt = document.getElementById('game-over');
let operatorDiv = document.getElementById('operatorPrompt');
let subTitle = document.getElementById('subTitle');
let finalScore = document.getElementById('final-score');
let livesP = document.querySelector('.lives-p');
let operatorSel = Array.from(document.getElementsByClassName('operatorSel'));

let num1 = document.getElementById('num1');
let num2 = document.getElementById('num2');
let operator = document.getElementById('operator');

// Declare and initialize variables
var num1Val;
var num2Val;
var operatorVal;
var answer;
var userInpVal;
var scoreVal = 0;
var highScoreVal = 0;
var livesVal = 10;

let userInp = document.getElementById('userInp');
let submitBtn = document.getElementById('submit');

let result = document.getElementById('result');
let chkAnswer = document.getElementById('chkAnswer');
let score = document.getElementById('score');
let lives = document.getElementById('lives');
let highScore = document.getElementById('high-score');
let back = document.getElementById('back');
let muteControl = document.getElementById('mute-control');

let audioHurt = document.getElementById('hurt');
let audioScore = document.getElementById('coin');
let audioWarn = document.getElementById('warn');
let audioClick = document.getElementById('click');
let audioSelect = document.getElementById('select');
let gameOverAudio = document.getElementById('game-over-audio');

// Perform initial setup when the page loads
window.onload = () => {
    // Load high score from local storage if available
    if ((localStorage.getItem('highScore')) != null) {
        highScoreVal = Number.parseInt(localStorage.getItem('highScore'));
        highScore.innerText = highScoreVal;
    }

    // Check and set the mute status for audio elements
    if (localStorage.getItem('muted') != null) {
        playElements.forEach(element => {
            if (localStorage.getItem('muted') == 'true') {
                element.muted = true;
                muteControl.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
            } else {
                element.muted = false;
                muteControl.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
            }
        });
    } else {
        // If mute status is not set, set it to unmuted
        playElements.forEach(element => {
            element.muted = false;
            muteControl.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
            localStorage.setItem('muted', element.muted);
        });
    }
}

// Handle mute/unmute control button
muteControl.addEventListener('click', () => {
    playElements.forEach(element => {
        if (element.muted == false) {
            element.muted = true;
            muteControl.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
            localStorage.setItem('muted', element.muted);
        } else {
            element.muted = false;
            muteControl.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
            localStorage.setItem('muted', element.muted);
        }
    });
});

// Handle click audio for interactive elements
click.forEach((element) => {
    element.addEventListener('click', function () {
        audioClick.play();
    });
});

// Function to set operator selection and start the game
function operatorPrompt() {
    operatorSel.forEach((element) => {
        element.setAttribute("disabled", "disabled");
    })
    setTimeout(operatorChecked, 150);
    setTimeout(operatorDivRem, 151);
    operatorDiv.classList.toggle('disabled');
}

// Remove the operator selection div
function operatorDivRem() {
    document.body.removeChild(operatorDiv);
}

// Perform actions after the operator is selected
function operatorChecked() {
    document.body.removeChild(subTitle);
    questionPrompt.classList.toggle('enabled');
    livesP.classList.toggle('enabled');
    num1.innerText = num1Val;
    num2.innerText = num2Val;
}

// Generate random numbers and set up the addition operation
function newNum() {
    num1Val = (Math.floor(Math.random() * 100));
    num2Val = (Math.floor(Math.random() * 100));
}

function addOperation() {
    newNum();
    answer = num1Val + num2Val;
    operatorVal = '+'
    operator.innerText = operatorVal;
}

function subOperation() {
    newNum();
    answer = num1Val - num2Val;
    operatorVal = '-'
    operator.innerText = operatorVal;
}

function mulOperation() {
    newNum();
    answer = num1Val * num2Val;
    operatorVal = '×';
    operator.innerText = operatorVal;
}

function divOperation() {
    newNum();
    answer = num1Val / num2Val;
    operatorVal = '÷'
    operator.innerText = operatorVal;
}

// Handle submission of the user's answer
submitBtn.addEventListener('click', submission);
userInp.addEventListener('keypress', function (event) {
    if (event.key === "Enter") {
        submission();
    }
});

// Function to hide the result message
function Result() {
    result.classList.remove('enabled');
}

// Function to handle a correct answer
function correctAns() {
    num1.innerText = num1Val;
    num2.innerText = num2Val;
    userInp.value = '';
}

// Function to check the correct answer
function chkAnswerFunc() {
    userInp.value = answer;
}

// Handle the submission of the user's answer
function submission() {
    if (livesVal > 1) {
        userInpVal = Number.parseInt(userInp.value);
        result.classList.add('enabled');
        if (userInpVal == answer && Number.isInteger(userInpVal) == true) {
            result.classList.remove('warning');
            result.classList.remove('incorrect');
            result.classList.add('correct');
            result.innerHTML = 'Your answer was Correct! <i class="fa-solid fa-circle-check"></i>';
            scoreVal = scoreVal + 1;
            score.innerText = scoreVal;
            audioScore.play();
            if (scoreVal > highScoreVal) {
                highScoreVal = scoreVal;
                JSON.stringify(localStorage.setItem('highScore', highScoreVal));
            }
            if ((localStorage.getItem('highScore')) != null) {
                highScoreVal = Number.parseInt(localStorage.getItem('highScore'));
                highScore.innerText = highScoreVal;
            }
            userInp.value = '';
            chkAnswer.classList.remove('enabled');
            if (operatorVal == '+') {
                addOperation();
                correctAns();
            } else if (operatorVal == '-') {
                subOperation();
                correctAns();
            } else if (operatorVal == '×') {
                mulOperation();
                correctAns();
            } else if (operatorVal == '÷') {
                divOperation();
                correctAns();
            }
        } else if ((userInpVal != answer && Number.isInteger(userInpVal) == true)) {
            result
