
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
var timeBetweenQuestions = 3000;
var timeToGuess = 5;
var correctQs = 0;
var incorrectQs = 0;
var unansweredQs = 0;

function setupGame(){
    //add functionality to the start button 
    $(".start-button").on("click", function(){
        console.log("start button was clicked");
        //ask first queston
        askQuestion();
    });
    //add funcationality to the restart button
    $(".restart-button").on("click", function(){
        console.log("restart button was clicked");
        //reset variables
        correctQs = 0;
        incorrectQs = 0;
        unansweredQs = 0;
        //fill an array with potential questions
        for (var i = 0; i < questionBank.length; i++){
            newQuestions.push(questionBank[i]);
        };
        //hide the results area
        $(".results-area").hide();
        //ask first question
        askQuestion();
    });
    //create on-click events for the answers
    $(".answer").on("click", checkAnswer);
};

function startGame() {
    //fill an array with potential questions
    for (var i = 0; i < questionBank.length; i++){
        newQuestions.push(questionBank[i]);
    };
    //hide everything except the start
    $(".timer-area").hide();
    $(".question-area").hide();
    $(".answer-area").hide();
    $(".results-area").hide();
};

function askQuestion() {
    //show and hide the proper areas
    $(".timer-area").show();
    $(".start-area").hide();
    console.log("start area hidden");
    $(".question-area").show();
    //hid answer-area in case this is question 2, 3, 4 etc.
    $(".answer-area").hide();
    
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
    $(".answer-one").html(currentQuestion.answers[0].text);
    $(".answer-two").html(currentQuestion.answers[1].text);
    $(".answer-three").html(currentQuestion.answers[2].text);
    $(".answer-four").html(currentQuestion.answers[3].text);
    //add correct/incorrect to the answers
    $(".answer-one").data("isCorrect", currentQuestion.answers[0].isCorrect);
    $(".answer-two").data("isCorrect", currentQuestion.answers[1].isCorrect);
    $(".answer-three").data("isCorrect", currentQuestion.answers[2].isCorrect);
    $(".answer-four").data("isCorrect", currentQuestion.answers[3].isCorrect);

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
    //console log - this 
    console.log("checking the answer of: " + $(this));
    //turn off counter
    clearInterval(questionCountDownInterval);
    //display result depening on whether it was right or wrong
    if ($(this).data("isCorrect") === true){
        console.log("correct answer!");
        //add to tally
        correctQs += 1;
        //display that player won
        $("#answer-result").html("You are correct!")
        //clear the answer text
        $("#answer-text").html("");
    } else if ($(this).data("isCorrect") === false){
        console.log("wrong answer...");
        //add to tally
        incorrectQs += 1;
        //display that player lost
        $("#answer-result").html("You are wrong...")
        //display correct answer
        $("#answer-text").html("The correct answer is: " + currentQuestion.correctAnswer);
    } else {
        alert("error: neither correct or incorrect"); //remove for productoin
    };
    //display image of winning answer
    $("#answer-image").attr("src", currentQuestion.imgSrc);
    $("#answer-image").attr("alt", currentQuestion.imgAlt);
    //set timer for next question
    setTimeout(isGameOver, timeBetweenQuestions);
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
    //display that player failed to answer
    $("#answer-result").html("You did not answer in time");
    //display correct answer
    $("#answer-text").html("The correct answer was: " + currentQuestion.correctAnswer);
    //display image of winning answer
    $("#answer-image").attr("src", currentQuestion.imgSrc);
    $("#answer-image").attr("alt", currentQuestion.imgAlt);
    //set timer for next question
    setTimeout(isGameOver, timeBetweenQuestions);
};

function isGameOver(){
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
    //show hide contents
    $(".answer-area").hide();
    $(".results-area").show();
    //display the results
    $("#results-correct").html("You got " + correctQs + " correct.");
    //display correct answer
    $("#results-incorrect").html("You got " + incorrectQs + " wrong.");
    //display correct answer
    $("#results-unanswered").html("You did not answer " + unansweredQs + " questions.");
};

//set up the game 
setupGame();
//run the game
startGame();

