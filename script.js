let questions = [
    {
        prompt: `Brenda cilit HTML element e vendosim JavaScript?`,
        options: [
            "<javascript>",
            "<js>",
            "<script>",
            "<scripting>",
        ],
        answer: "<script>",
        img: "images/1.png"
    },
    
    {
        prompt: `Si thirret një element që quhet myFunction?`,
        options: [
            "call myFunction()",
            "myFunction()",
            "call function myFunction",
            "Call.myFunction",
        ],
        answer: "myFunction()",
        img: "images/2.png"
    },

    {
        prompt: `Në cfarë mënyre fillon një for loop?`,
        options: [
            "for (i = 0; i <= 5; i++)",
            "for (i = 0; i <= 5)",
            "for i = 1 to 5",
            " for (i <= 5; i++)",
        ],
        answer: "for (i = 0; i <= 5; i++)",
        img: "images/3.png"
    },

    {
        prompt: `Cila nga këto është një operator logjik në JavaScript?`,
        options: ["|", "&&", "%", "/"],
        answer: "&&",
        img: "images/4.png"
    },

    {
        prompt: `Një element i emërtuar në një program JavaScript që përdoret 
për të ruajtur dhe rikuperuar të dhëna është një _____.`,
        options: [
            "method",
            "assignment operator",
            "letiable",
            "string",
        ],
        answer: "letiable",
        img: "images/5.png"
    },
];

// Get Dom Elements

let questionsEl =
    document.querySelector(
        "#questions"
    );
let timerEl =
    document.querySelector("#timer");
let choicesEl =
    document.querySelector("#options");
let submitBtn = document.querySelector(
    "#submit-score"
);
let startBtn =
    document.querySelector("#start");
let nameEl =
    document.querySelector("#name");
let feedbackEl = document.querySelector(
    "#feedback"
);
let reStartBtn =
    document.querySelector("#restart");

// Quiz's initial state
let currentQuestionIndex = 0;
let time = questions.length * 15;
let timerId;

// Start quiz and hide frontpage

function quizStart() {
    timerId = setInterval(
        clockTick,
        1000
    );
    timerEl.textContent = time;
    let landingScreenEl =
        document.getElementById(
            "start-quiz"
        );
    landingScreenEl.setAttribute(
        "class",
        "hide"
    );
    questionsEl.removeAttribute(
        "class"
    );
    getQuestion();
}

// Loop through array of questions and
// Answers and create list with buttons
function getQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    let promptEl = document.getElementById("question-words");
    promptEl.textContent = currentQuestion.prompt;

    // Display the image if it exists
    let imgEl = document.getElementById("question-image");
    if (currentQuestion.img) {
        imgEl.src = currentQuestion.img;
        imgEl.style.display = "block";
    } else {
        imgEl.style.display = "none";
    }

    choicesEl.innerHTML = "";
    currentQuestion.options.forEach(function (choice, i) {
        let choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("value", choice);
        choiceBtn.textContent = i + 1 + ". " + choice;
        choiceBtn.onclick = questionClick;
        choicesEl.appendChild(choiceBtn);
    });
}


// Check for right answers and deduct
// Time for wrong answer, go to next question

function questionClick() {
    if (
        this.value !==
        questions[currentQuestionIndex]
            .answer
    ) {
        time -= 10;
        if (time < 0) {
            time = 0;
        }
        timerEl.textContent = time;
        feedbackEl.textContent = `Gabim! Përgjigjja e saktë është:  
        ${questions[currentQuestionIndex].answer}.`;
        feedbackEl.style.color = "red";
    } else {
        feedbackEl.textContent =
            "E saktë!";
        feedbackEl.style.color =
            "green";
    }
    feedbackEl.setAttribute(
        "class",
        "feedback"
    );
    setTimeout(function () {
        feedbackEl.setAttribute(
            "class",
            "feedback hide"
        );
    }, 2000);
    currentQuestionIndex++;
    if (
        currentQuestionIndex ===
        questions.length
    ) {
        quizEnd();
    } else {
        getQuestion();
    }
}

// End quiz by hiding questions,
// Stop timer and show final score

function quizEnd() {
    clearInterval(timerId);
    let endScreenEl =
        document.getElementById(
            "quiz-end"
        );
    endScreenEl.removeAttribute(
        "class"
    );
    let finalScoreEl =
        document.getElementById(
            "score-final"
        );
    finalScoreEl.textContent = time;
    questionsEl.setAttribute(
        "class",
        "hide"
    );
}

// End quiz if timer reaches 0

function clockTick() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
        quizEnd();
    }
}

// Save score in local storage
// Along with users' name

function saveHighscore() {
    let name = nameEl.value.trim();
    if (name !== "") {
        let highscores =
            JSON.parse(
                window.localStorage.getItem(
                    "highscores"
                )
            ) || [];
        let newScore = {
            score: time,
            name: name,
        };
        highscores.push(newScore);
        window.localStorage.setItem(
            "highscores",
            JSON.stringify(highscores)
        );
    }
}

// Save users' score after pressing enter

function checkForEnter(event) {
    if (event.key === "Enter") {
        saveHighscore();
        alert(
            "Your Score has been Submitted"
        );
    }
}
nameEl.onkeyup = checkForEnter;

// Save users' score after clicking submit

submitBtn.onclick = saveHighscore;

// Start quiz after clicking start quiz

startBtn.onclick = quizStart;
