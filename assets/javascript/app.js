
var shuffledQuestions;
var currentQuestionIndex;

var timeBetweenQuestions = 3000;
var totalTimeToGuess = 20;
var timeLeft;
var questionCountDownInterval;

var correctQs;
var incorrectQs;
var unansweredQs;

var audio = new Audio("assets/sounds/correct.wav");

var questionBank = [
    {
        question: "Who has the most home runs in history?",
        answers: [
            {
                text: "Hank Aaron",
                isCorrect: false,
            },
            {
                text: "Barry Bonds",
                isCorrect: true,
            },
            {
                text: "Babe Ruth",
                isCorrect: false,
            },
            {
                text: "Sammy Sosa",
                isCorrect: false,
            }
        ],
        imgSrc: "assets/images/image1.jpg",    
    },
    {
        question: "Who threw the first perfect game?",
        answers: [
            {
                text: "Cy Young",
                isCorrect: false,
            },
            {
                text: "Monte Ward",
                isCorrect: false,
            },
            {
                text: "Lee Richmond",
                isCorrect: true,
            },
            {
                text: "Addie Joss",
                isCorrect: false,
            }
        ],
        imgSrc: "assets/images/image2.jpg",          
    },
    {
        question: "Who has stolen the most bases in his career?",
        answers: [
            {
                text: "Lou Brock",
                isCorrect: false,
            },
            {
                text: "Billy Hamilton",
                isCorrect: false,
            },
            {
                text: "Ty Cobb",
                isCorrect: false,
            },
            {
                text: "Ricky Henderson",
                isCorrect: true,
            }
        ],
        imgSrc: "assets/images/image3.jpg",         
    },
    {
        question: "Which basketball player also played in the big leagues?",
        answers: [
            {
                text: "Karl Malone",
                isCorrect: false,
            },
            {
                text: "Michael Jordan",
                isCorrect: true,
            },
            {
                text: "Larry Bird",
                isCorrect: false,
            },
            {
                text: "Spud Webb",
                isCorrect: true,
            }
        ],
        imgSrc: "assets/images/image4.jpg",          
    }
];

//this function will setup and start the game for the first time
function initializeGame(){
    //add on.click to the start button 
    $(".start-button").on("click", function(){
        //ask first queston
        startGame();
    });
    //add on.click to the restart button
    $(".restart-button").on("click", function(){
        //restart game
        startGame();
    });
    //create on.click events for the answers
    $(".answer").on("click", presentSolution);

    //hide everything except the start
    $(".timer-content").hide();
    $(".question-content").hide();
    $(".solution-content").hide();
    $(".results-content").hide();
}

//this function will start the game, or restart the game
function startGame() {
    //Shuffle the questions
    shuffledQuestions = shuffle(questionBank);
    //set the index of the current question
    currentQuestionIndex = 0;
    //reset variables
    correctQs = 0;
    incorrectQs = 0;
    unansweredQs = 0;
    //hide everything 
    $(".start-content").hide();
    $(".timer-content").hide();
    $(".question-content").hide();
    $(".solution-content").hide();
    $(".results-content").hide();
    //ask first question
    askQuestion(shuffledQuestions[currentQuestionIndex]);
}

//this function will shuffle the question bank array so it is different each playthrough
function shuffle(questionBank){
    var questions = [];
    for (var i = 0; i < questionBank.length; i++){
        questions.push(questionBank[i]);
    }
    var currentIndex = questions.length;
    var temporaryValue; 
    var randomIndex;
    // shuffle all the questions in the array
    for (var i = 0; i < questions.length; i++){
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = questions[currentIndex];
        questions[currentIndex] = questions[randomIndex];
        questions[randomIndex] = temporaryValue;
    };
    return questions;
}

//this function will present the question and possible answers to the player
function askQuestion(currentQuestion) {
    //show the timer and the question content
    $(".timer-content").show();
    $(".question-content").show();
    
    //create the question text
    $("#question-text").html(currentQuestion.question);
    //place the answers
    $(".answer-one").html(currentQuestion.answers[0].text);
    $(".answer-two").html(currentQuestion.answers[1].text);
    $(".answer-three").html(currentQuestion.answers[2].text);
    $(".answer-four").html(currentQuestion.answers[3].text);
    //add correct/incorrect data to the answers
    $(".answer-one").data("isCorrect", currentQuestion.answers[0].isCorrect);
    $(".answer-two").data("isCorrect", currentQuestion.answers[1].isCorrect);
    $(".answer-three").data("isCorrect", currentQuestion.answers[2].isCorrect);
    $(".answer-four").data("isCorrect", currentQuestion.answers[3].isCorrect);

    //set count down timer
    timeLeft = totalTimeToGuess;
    questionCountDownInterval = setInterval(countDown, 1000);
    //display the timer
    $("#time-left").html("Time Remaining: " + timeLeft);
}

//this question will count down the timer while the question is presented
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
}

//this function will be called if the player ran out of time on a question
function timesUp(){
    //add to tally
    unansweredQs += 1;
    //show hide contents
    $(".question-content").hide();
    $(".solution-content").show();
    //turn off counter
    clearInterval(questionCountDownInterval);
    //display that player failed to answer
    $("#solution-result").css("color", "grey")
    $("#solution-result").html("You did not answer in time");
    //display correct answer
    var correctAnswer = findCorrectAnswer(shuffledQuestions[currentQuestionIndex]);
    $("#solution-text").html("The correct answer was " + correctAnswer);
    //display image of winning answer
    $("#solution-image").attr("src", shuffledQuestions[currentQuestionIndex].imgSrc);
    $("#solution-image").attr("alt", shuffledQuestions[currentQuestionIndex].correctAnswer);
    //set timer for next question
    setTimeout(nextQuestion, timeBetweenQuestions);
}

//this function searches the current question object for the right answer
function findCorrectAnswer(questionObject){
    //loop through the answers and return the one that is correct
    for (var i = 0; questionObject.answers.length; i++){
        if (questionObject.answers[i].isCorrect === true){
            return questionObject.answers[i].text;
        };
    };
}

//this function checks the clicked answer and presents the results 
function presentSolution(){
    //hide question content and show solution content
    $(".question-content").hide();
    $(".solution-content").show();
    //turn off counter
    clearInterval(questionCountDownInterval);
    //find the correct answer
    var correctAnswer = findCorrectAnswer(shuffledQuestions[currentQuestionIndex]);
    //display result depening on whether it was right or wrong
    if ($(this).data("isCorrect") === true){
        //add to tally
        correctQs += 1;
        //display that player won
        $("#solution-result").css("color", "yellow")
        $("#solution-result").html("You are correct!")
        //play winning sounds	
        audio.play();
        //clear the answer text
        $("#solution-text").html("");
    } else if ($(this).data("isCorrect") === false){
        //add to tally
        incorrectQs += 1;
        //display that player was wrong
        $("#solution-result").css("color", "orange")
        $("#solution-result").html("That is not correct...")
        //display correct answer
        $("#solution-text").html("The correct answer was " + correctAnswer + ".");
    };
    //display image of winning answer
    $("#solution-image").attr("src", shuffledQuestions[currentQuestionIndex].imgSrc);
    $("#solution-image").attr("alt", shuffledQuestions[currentQuestionIndex].correctAnswer);
    //set timer for next question
    setTimeout(nextQuestion, timeBetweenQuestions);
}

//this question moves to the next question if the game is not over
function nextQuestion(){
    //check to see if there are any questions left
    if (currentQuestionIndex === (shuffledQuestions.length - 1)){
        //restart game
        gameOver();
    } else {
        //increase the current question index
        currentQuestionIndex += 1;
        //hide solution-content
        $(".solution-content").hide();
        //ask next question
        askQuestion(shuffledQuestions[currentQuestionIndex]);
    };
}

//this function displays the results and the restart button
function gameOver(){
    //show hide contents
    $(".solution-content").hide();
    $(".results-content").show();
    //display the results
    $("#results-correct").html("You got " + correctQs + " questions correct.");
    //display correct answer
    $("#results-incorrect").html("You got " + incorrectQs + " questions wrong.");
    //display correct answer
    $("#results-unanswered").html("You did not answer " + unansweredQs + " questions.");
}

//run the game
initializeGame();

