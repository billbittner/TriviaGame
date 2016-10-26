
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
var timeBetweenQuestions = 1000;
var timeToGuess = 20;
var correctQs = 0;
var incorrectQs = 0;
var unansweredQs = 0;

function startGame() {
    //fill an array with potential questions
    for (var i = 0; i < questionBank.length; i++){
        newQuestions.push(questionBank[i]);
    } 
    //show and hide the proper areas
    $(".timer-area").hide();
    $(".question-area").hide();
    $(".answer-area").hide();
    $(".results-area").hide();
    //add functionality to the on-click function 
    $(".start-button").on("click", function(){
        console.log("start button was clicked");
        $(".start-button").remove();
        askQuestion();
    });
};

function askQuestion() {
    //show and hide the proper areas
    $(".timer-area").show();
    $(".start-area").hide();
    $(".question-area").show();
    
    //choose a question
    //pick a question in the new questions list.  note: list shoudl not be empty
    var i = Math.floor(Math.random()*newQuestions.length);
    //move the question to a new variable
    currentQuestion = newQuestions[i];
    //remove the question from the array
    newQuestions.splice(i, 1);

    //create the question text
    $("#question-text").html(currentQuestion.question);
    
    //place the answers
    $(".answer-one").html(currentQuestion.answers[0]);
    $(".answer-two").html(currentQuestion.answers[1]);
    $(".answer-three").html(currentQuestion.answers[2]);
    $(".answer-four").html(currentQuestion.answers[3]);

    //create on-click events for correct and incorrect answers
    $(".answer").on("click", checkAnswer);

    //set interval to count down
    timeLeft = timeToGuess;
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

function checkAnswer(){
    console.log("checking the answer!");
    //show or hide content
    $(".question-area").hide();
    $(".answer-area").show();

    if (/*answer is correct*/){
        console.log("correct answer!");
        //add to tally
        correctQs += 1;
        //turn off counter
        clearInterval(questionCountDownInterval);
        //display that player won
        $("#answer-result").html("You are correct!")
        //clear the answer text
        $("#answer-text").html("");
        //display image of winning answer
        var img = $("<img>");
        img.attr("src", currentQuestion.imgSrc);
        img.attr("alt", currentQuestion.imgAlt);
        img.addClass("content-element image");
        img.insertAfter(banner);
        //set timer for next question
        nextQuestion();
    } else if (/*answer is incorrect*/){
        console.log("wrong answer...");
        //add to tally
        incorrectQs += 1;
        //turn off counter
        clearInterval(questionCountDownInterval);
        //display that player lost
        $("#answer-result").html("You are wrong...")
        //display correct answer
        $("#answer-text").html("The correct answer is: " + currentQuestion.correctAnswer);
        //display image of winning answer
        $("#answer-image").attr("src", currentQuestion.imgSrc);
        $("#answer-image").attr("alt", currentQuestion.imgAlt);
        //set timer for next question
        nextQuestion();
    }
};

function timesUp(){
    console.log("time ran out.")
    //add to tally
    unansweredQs += 1;
    //show hide contents
    $(".question-area").hide();
    $(".answer-area").show();
    //turn off counter
    clearInterval(questionCountDownInterval);
    //display that player lost
    $("#answer-result").html("You did not answer in time");
    //display correct answer
    $("#answer-text").html("The correct answer was: " + currentQuestion.correctAnswer);
    //display image of winning answer
    $("#answer-image").attr("src", currentQuestion.imgSrc);
    $("#answer-image").attr("alt", currentQuestion.imgAlt);
    //set timer for next question
    nextQuestion();
};

function clearTimer(){
    //clear all the contents out

};

function nextQuestion(){
    //in 5 seconds, run "isGameOver" to decide next steps
    setTimeout(isGameOver, timeBetweenQuestions);
};

function isGameOver(){
    //show hide contents
    $(".answer-area").hide();
    $(".results-area").show();
    //clear timer
    clearTimer();
    //turn off counter
    if (newQuestions.length === 0){
        //restart game
        gameOver();
    } else {
        //next question
        askQuestion();
    };
};

function gameOver(){
    //display the results
    var resultsCorrect = $("<p>");
    resultsCorrect.html("You got " + correctQs + " correct.")
    resultsCorrect.addClass("content-element")
    resultsCorrect.appendTo($("#content-area"));
    //display correct answer
    var resultsIncorrect = $("<p>");
    resultsIncorrect.html("You got " + incorrectQs + " wrong.")
    resultsIncorrect.addClass("content-element")
    resultsIncorrect.insertAfter(resultsCorrect);
    //display correct answer
    var resultsUnanswered = $("<p>");
    resultsUnanswered.html("You did not answer " + unansweredQs + " questions.")
    resultsUnanswered.addClass("content-element")
    resultsUnanswered.insertAfter(resultsIncorrect);

    //create restart game button
    var restartButton = $("<button>");
    restartButton.addClass("button restart-button");
    restartButton.html("Start Over");
    restartButton.on("click", function(){
        console.log("restart button was clicked");
        $(".restart-button").remove();
        //reset variables
        correctQs = 0;
        incorrectQs = 0;
        unansweredQs = 0;
        startGame();
    });
    //place the start button in the page
    restartButton.insertAfter(resultsUnanswered);
};

//run the game
startGame();

