
var questionBank = [
    {
        question: "This is question one. Now, what is the answer?",
        answers: [
            {
                text: "this is wrong answer 1",
                isCorrect: false,
            },
            {
                text: "this is wrong answer 2",
                isCorrect: false,
            },
            {
                text: "this is wrong answer 3",
                isCorrect: false,
            },
            {
                text: "this is the correct answer",
                isCorrect: true,
            }
        ],
        imgSrc: "assets/images/image1.jpg",
        imgAlt: "question 1",
        correctAnswer: "Wolf"          
    },
    {
        question: "This is question two. Answer me!",
        answers: [
            {
                text: "this is wrong answer 1",
                isCorrect: false,
            },
            {
                text: "this is wrong answer 2",
                isCorrect: false,
            },
            {
                text: "this is wrong answer 3",
                isCorrect: false,
            },
            {
                text: "this is the correct answer",
                isCorrect: true,
            }
        ],
        imgSrc: "assets/images/image2.jpg",
        imgAlt: "question 2",
        correctAnswer: "northern lights"              
    },
    {
        question: "This is question three. What is the answer?",
        answers: [
            {
                text: "this is wrong answer 1",
                isCorrect: false,
            },
            {
                text: "this is wrong answer 2",
                isCorrect: false,
            },
            {
                text: "this is wrong answer 3",
                isCorrect: false,
            },
            {
                text: "this is the correct answer",
                isCorrect: true,
            }
        ],
        imgSrc: "assets/images/image3.jpg",
        imgAlt: "question 3",
        correctAnswer: "oak tree"              
    },
    {
        question: "This is question four. Please, answer it?",
        answers: [
            {
                text: "this is wrong answer 1",
                isCorrect: false,
            },
            {
                text: "this is wrong answer 2",
                isCorrect: false,
            },
            {
                text: "this is wrong answer 3",
                isCorrect: false,
            },
            {
                text: "this is the correct answer",
                isCorrect: true,
            }
        ],
        imgSrc: "assets/images/image4.jpg",
        imgAlt: "question 4",
        correctAnswer: "polar bears"              
    }
];
var newQuestions = [];
var timeLeft = 0;
var questionCountDownInterval;
var currentQuestion;

function startGame() {
    //fill an array with potential questions
    newQuestions = questionBank; 
    //create the start button
    var startButton = $("<button>");
    startButton.addClass("button start-button");
    startButton.html("START");
    startButton.on("click", function(){
        console.log("start button was clicked");
        $(".start-button").remove();
        askQuestion();
    });
    //place the start button in the page
    startButton.appendTo("#content-area");
};

function askQuestion() {
    //create all the page elements

    //create timer text
    var timerText = $("<h2></h2>");
    timerText.addClass("timer-element");
    timerText.attr("id", "time-left");
    timerText.appendTo($("#timer-area"));
    console.log("timer text was created");
    
    //choose a question
    //pick a question in the new questions list.  note: list shoudl not be empty
    var i = Math.floor(Math.random()*newQuestions.length);
    //move the question to a new variable
    currentQuestion = newQuestions[i];
    //remove the question from the array
    newQuestions.splice(i, 1);

    //create the question text
    var questionText = $("<h2></h2");
    questionText.html(currentQuestion.question);
    questionText.addClass("content-element");
    questionText.appendTo($("#content-area"));

    //create an answer target div
    var answerTarget = $("<div>");
    answerTarget.addClass("content-element");
    answerTarget.insertAfter(questionText);
    
    //create answers
    var numberOfAnswers = currentQuestion.answers.length;
    for (i = 0; i < numberOfAnswers; i++){
        //create the answer element
        var answer = $("<p></p>");
        //choose a random answer from the answers
        var j = Math.floor(Math.random()*currentQuestion.answers.length);
        //assign it text
        answer.html(currentQuestion.answers[j].text);
        //assign classes
        if (currentQuestion.answers[j].isCorrect === true) {
            answer.addClass("content-element answer correct ");
        } else {
            answer.addClass("content-element answer incorrect");
        };
        //remove the answer you just chose from available answers
        currentQuestion.answers.splice(j, 1);
        //insert it into the html
        answer.insertAfter(answerTarget);
    };
    //create on-click events for correct and incorrect answers
    $(".correct").on("click", correctAnswer);
    $(".incorrect").on("click", incorrectAnswer);

    //set interval to count down
    timeLeft = 30;
    questionCountDownInterval = setInterval(countDown, 1000);
    $("#time-left").html("Time Remaining: " + timeLeft);
};

function countDown(){
    //count down one second
    timeLeft--;
    //display thc new time
    $("#time-left").html("Time Remaining: " + timeLeft);
    //check to see if time is update
    if (timeLeft === 0){
        clearInterval(questionCountDownInterval);
        timesUp();
    };
};

function correctAnswer(){
    console.log("correct answer!");
    //clear contents
    clearContents();
    //turn off counter
    clearInterval(questionCountDownInterval);
    //display that player won
    var banner = $("<h2>You are Correct!</h2>");
    banner.addClass("content-element");
    banner.appendTo($("#content-area"));
    //display image of winning answer
    var img = $("<img>");
    img.attr("src", currentQuestion.imgSrc);
    img.attr("alt", currentQuestion.imgAlt);
    img.addClass("content-element image");
    img.insertAfter(banner);
    //set timer for next question
    nextQuestion();
};

function incorrectAnswer(){
    console.log("wrong answer...")
    //clear contents
    clearContents();
    //turn off counter
    clearInterval(questionCountDownInterval);
    //display that player lost
    var banner = $("<h2>You are wrong...</h2>");
    banner.addClass("content-element")
    banner.appendTo($("#content-area"));
    //display correct answer
    var correctAnswer = $("<p></p>");
    correctAnswer.html("The correct answer is: " + currentQuestion.correctAnswer);
    correctAnswer.addClass("content-element");
    correctAnswer.insertAfter($banner);
    //display image of winning answer
    var img = $("<img>");
    img.attr("src", currentQuestion.imgSrc);
    img.attr("alt", currentQuestion.imgAlt);
    img.addClass("content-element image");
    img.insertAfter(correctAnswer);
    //set timer for next question
    nextQuestion();
};

function timesUp(){
    console.log("time ran out.")
    //clear contents
    clearContents()
    //turn off counter
    clearInterval(questionCountDownInterval);
    //display that player lost
    var banner = $("<h2>You ran out of time</h2>");
    banner.addClass("content-element")
    banner.appendTo($("#content-area"));
    //display correct answer
    var correctAnswer = $("<p></p>");
    correctAnswer.html("The correct answer was: " + currentQuestion.correctAnswer);
    correctAnswer.addClass("content-element");
    correctAnswer.insertAfter($banner);
    //display image of winning answer
    var img = $("<img>");
    img.attr("src", currentQuestion.imgSrc);
    img.attr("alt", currentQuestion.imgAlt);
    img.addClass("content-element image");
    img.insertAfter(correctAnswer);
    //set timer for next question
    nextQuestion();
};

function clearContents(){
    //clear all the contents out
    $(".content-element").each(function (){
        $(this).remove();
    });
};

function clearTimer(){
    //clear all the contents out
    $(".timer-element").each(function (){
        $(this).remove();
    });
};

function nextQuestion(){
    //in 5 seconds, run "isGameOver" to decide next steps
    setTimeout(isGameOver, 5000);
};

function isGameOver(){
    //clear contents
    clearContents();
    //clear timer
    clearTimer();
    //turn off counter
    if (newQuestions.length === 0){
        //restart game
        startGame();
    } else {
        //next question
        askQuestion();
    };
};


startGame();

