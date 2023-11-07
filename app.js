let addOper = document.getElementById('addition');
let subOper = document.getElementById('subtraction');
let mulOper = document.getElementById('multiplication');
let divOper = document.getElementById('division');
let click = Array.from(document.getElementsByClassName('click-audio'));
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

// localStorage.getItem('muted' , element.muted);

window.onload = () => {
    if((localStorage.getItem('highScore')) != null){
        highScoreVal = Number.parseInt(localStorage.getItem('highScore'));
        highScore.innerText = highScoreVal;
    }

    if (localStorage.getItem('muted') != null) {
        playElements.forEach(element => {
            if (localStorage.getItem('muted') == 'true') {
                element.muted = true;
                muteControl.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
            }
            else {
                element.muted = false;
                muteControl.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
            }
        });
    }
    else {
        playElements.forEach(element => {
            element.muted = false;
            muteControl.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
            localStorage.setItem('muted', element.muted);
        }
        )
    }
}

muteControl.addEventListener('click', () => {
    playElements.forEach(element => {
        if (element.muted == false) {
            element.muted = true;
            muteControl.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
            localStorage.setItem('muted', element.muted);
        }
        else {
            element.muted = false;
            muteControl.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
            localStorage.setItem('muted', element.muted);
        }
    });
});

click.forEach((element) => {
    element.addEventListener('click', function () {
        audioClick.play();
    });
});

function operatorPrompt() {
    operatorSel.forEach((element) => {
        element.setAttribute("disabled", "disabled");
    })
    setTimeout(operatorChecked, 150);
    setTimeout(operatorDivRem, 151);
    operatorDiv.classList.toggle('disabled');
}

function operatorDivRem() {
    document.body.removeChild(operatorDiv);
}

function operatorChecked() {
    document.body.removeChild(subTitle);
    questionPrompt.classList.toggle('enabled');
    livesP.classList.toggle('enabled');
    num1.innerText = num1Val;
    num2.innerText = num2Val;
}

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

submitBtn.addEventListener('click', submission);
userInp.addEventListener('keypress', function (event) {
    if (event.key === "Enter") {
        submission();
    }
});

function Result() {
    result.classList.remove('enabled');
}

function correctAns() {
    num1.innerText = num1Val;
    num2.innerText = num2Val;
    userInp.value = '';
}

function chkAnswerFunc() {
    userInp.value = answer;
}

function submission() {
    if(livesVal > 1){

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
    
            if(scoreVal > highScoreVal){
                highScoreVal = scoreVal;
                JSON.stringify(localStorage.setItem('highScore' , highScoreVal));
            }
            
            if((localStorage.getItem('highScore')) != null){
                highScoreVal = Number.parseInt(localStorage.getItem('highScore'));
                highScore.innerText = highScoreVal;
            }
    
            userInp.value = '';
            chkAnswer.classList.remove('enabled');
            if (operatorVal == '+') {
                addOperation();
                correctAns();
            }
            else if (operatorVal == '-') {
                subOperation();
                correctAns();
            }
            else if (operatorVal == '×') {
                mulOperation();
                correctAns();
            }
            else if (operatorVal == '÷') {
                divOperation();
                correctAns();
            }
        }
    
        else if ((userInpVal != answer && Number.isInteger(userInpVal) == true)) {
            result.classList.remove('warning');
            result.classList.remove('correct');
            result.classList.add('incorrect');
            result.innerHTML = `Your answer was Incorrect! <i class="fa-solid fa-circle-xmark"></i>`;
            audioHurt.play();
            
            if(scoreVal >= 0) {
                scoreVal = scoreVal - 1;
            }
            
            if(livesVal > 0){
                livesVal = livesVal - 1;
                lives.innerText = livesVal;
            }

            chkAnswer.classList.add('enabled');
    
        }
    
        else {
            result.classList.remove('correct');
            result.classList.remove('incorrect');
            result.classList.add('warning');
            result.innerHTML = `Please enter a valid number! <i class="fa-solid fa-circle-exclamation"></i>`;
            audioWarn.play();
        }
    
        
        setTimeout(Result, 3000);
    }
    
    else{
        gameOverFunc();
    }
}

// Audio on selection

operatorSel.forEach((element) => {
    element.addEventListener('click', () => {
        audioSelect.play();
    });
});

// Game Over

function gameOverFunc(){
    audioHurt.play();
    gameOverAudio.play();
    livesVal = 0;
    lives.innerText = livesVal;
    if(scoreVal == -1){
        scoreVal = 0;
    }
    finalScore.innerText = scoreVal;
    questionPrompt.classList.toggle('enabled');
    gameOverPrompt.classList.toggle('enabled');
    document.body.removeChild(questionPrompt);
}'
