
var shuffledQuestions;
var currentQuestionIndex;

var timeBetweenQuestions = 3000;
var totalTimeToGuess = 5;
var timeLeft;
var questionCountDownInterval;

var correctQs;
var incorrectQs;
var unansweredQs;

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
        imgAlt: "question 1"       
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
        imgAlt: "question 2"           
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
        imgAlt: "question 3"           
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
        imgAlt: "question 4"           
    }
];

//this function will setup and start the game for the first time
function initializeGame(){
    //add on.click to the start button 
    $(".start-button").on("click", function(){
        console.log("start button was clicked");
        //ask first queston
        startGame();
    });
    //add on.click to the restart button
    $(".restart-button").on("click", function(){
        console.log("restart button was clicked");
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
    askQuestion();
}

//this function will shuffle the question bank array so it is different each playthrough
function shuffle(questionBankArray){
    var currentIndex = questionBankArray.length;
    var temporaryValue; 
    var randomIndex;
    // While there remain elements to shuffle...
    for (var i = 0; i < questionBankArray.length; i++){
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = questionBankArray[currentIndex];
        questionBankArray[currentIndex] = questionBankArray[randomIndex];
        questionBankArray[randomIndex] = temporaryValue;
    };
    console.log("array is shuffled");
    return questionBankArray;
}

//this function will present the question and possible answers to the player
function askQuestion() {
    //show the timer and the question content
    $(".timer-content").show();
    $(".question-content").show();
    
    //create the question text
    $("#question-text").html(shuffledQuestions[currentQuestionIndex].question);
    
    //place the answers
    $(".answer-one").html(shuffledQuestions[currentQuestionIndex].answers[0].text);
    $(".answer-two").html(shuffledQuestions[currentQuestionIndex].answers[1].text);
    $(".answer-three").html(shuffledQuestions[currentQuestionIndex].answers[2].text);
    $(".answer-four").html(shuffledQuestions[currentQuestionIndex].answers[3].text);
    //add correct/incorrect to the answers
    $(".answer-one").data("isCorrect", shuffledQuestions[currentQuestionIndex].answers[0].isCorrect);
    $(".answer-two").data("isCorrect", shuffledQuestions[currentQuestionIndex].answers[1].isCorrect);
    $(".answer-three").data("isCorrect", shuffledQuestions[currentQuestionIndex].answers[2].isCorrect);
    $(".answer-four").data("isCorrect", shuffledQuestions[currentQuestionIndex].answers[3].isCorrect);

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
    console.log("time ran out.")
    //add to tally
    unansweredQs += 1;
    //show hide contents
    $(".question-content").hide();
    $(".solution-content").show();
    //turn off counter
    clearInterval(questionCountDownInterval);
    //display that player failed to answer
    $("#solution-result").html("You did not answer in time");
    //display correct answer
    var correctAnswer = findCorrectAnswer(shuffledQuestions[currentQuestionIndex]);
    $("#solution-text").html("The correct answer was: " + correctAnswer);
    //display image of winning answer
    $("#solution-image").attr("src", shuffledQuestions[currentQuestionIndex].imgSrc);
    $("#solution-image").attr("alt", shuffledQuestions[currentQuestionIndex].imgAlt);
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
        $("#solution-result").html("You are correct!")
        //clear the answer text
        $("#solution-text").html("");
    } else if ($(this).data("isCorrect") === false){
        console.log("wrong answer...");
        //add to tally
        incorrectQs += 1;
        //display that player was wrong
        $("#solution-result").html("You are wrong...")
        //display correct answer
        var correctAnswer = findCorrectAnswer(shuffledQuestions[currentQuestionIndex]);
        $("#solution-text").html("The correct answer was: " + correctAnswer);
    } else {
        alert("error: neither correct or incorrect"); //remove for productoin
    };
    //display image of winning answer
    $("#solution-image").attr("src", shuffledQuestions[currentQuestionIndex].imgSrc);
    $("#solution-image").attr("alt", shuffledQuestions[currentQuestionIndex].imgAlt);
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
        askQuestion();
    };
}

//this function displays the results and the restart button
function gameOver(){
    //show hide contents
    $(".solution-content").hide();
    $(".results-content").show();
    //display the results
    $("#results-correct").html("You got " + correctQs + " correct.");
    //display correct answer
    $("#results-incorrect").html("You got " + incorrectQs + " wrong.");
    //display correct answer
    $("#results-unanswered").html("You did not answer " + unansweredQs + " questions.");
}

//run the game
initializeGame();

