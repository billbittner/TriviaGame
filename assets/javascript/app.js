
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
        ]            
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
        ]            
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
        ]            
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
        ]            
    }
];
var newQuestions = [];
var usedQuestions = [];
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
    timerText.addClass("timer-elements");
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
    questionText.appendTo($("#content-area"));

    //create an answer target div
    var answerTarget = $("<div>");
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
            answer.addClass("answer correct");
        } else {
            answer.addClass("answer incorrect");
        };
        //remove the answer you just chose from available answers
        currentQuestion.answers.splice(j, 1);
        //insert it into the html
        answer.insertAfter(answerTarget);
    };
    
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

}

function wrongAnswer(){

}

function timesUp(){
    //clear contents
    clearContents()
    //display answer

    //set time out
}

function clearContents(){
    //clear all the contents out

}


startGame();

