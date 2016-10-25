
var questionBank = [
    {
        question: "This is question one. Now, what is the answer?",
        answer: "answer 1",
        wrongAnswers: ["answer 2", "answer 3", "answer 4"]
    },
    {
        question: "This is question two.  Please tell me: what is the answer?",
        answer: "answer 1",
        wrongAnswers: ["answer 2", "answer 3", "answer 4"]
    },
    {
        question: "This is question three.  What is the answer?",
        answer: "answer 1",
        wrongAnswers: ["answer 2", "answer 3", "answer 4"]
    },
    {
        question: "This is question four. What is the answer?",
        answer: "answer 1",
        wrongAnswers: ["answer 2", "answer 3", "answer 4"]
    },
];
var newQuestions = [];
var usedQuestions = [];
var timeLeft = 0;
var questionInterval;

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
    var timerText = $("<h2>Time Remaining: </h2>");
    // timerText.html("Time Remaining: ");
    timerText.addClass("timer-elements");
    timerText.appendTo($("#timer-area"));
    console.log("timer text was created");
    //create time element to update
    var timeLeftDisplay = $("<h2></h2>");
    timeLeftDisplay.addClass("timer-elements");
    timeLeftDisplay.attr("id", "timer-time");
    timeLeftDisplay.appendTo(timerText);
    console.log("time remaining was created");
    //create question


    //create timing aspects
    //set interval to count down
    timeLeft = 30;
    questionInterval = setInterval(countDown, 1000);
    $("#timer-time").html(timeLeft);

    //add onclicks etc.
};

function timeOut(){

}

function countDown(){
    //count down one second
    timeLeft -= 1;
    //display thc new time
    $("#timer-time").html(timeLeft);
    //check to see if time is update
    if(timeLeft === 0){
        timesUp();
    };
};

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

