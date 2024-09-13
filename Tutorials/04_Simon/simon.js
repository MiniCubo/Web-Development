var buttons = ["red", "blue", "green", "yellow"];
var patterns = []; 
var userPatterns = [];
var level = 0;
var key = 0;
var started = false;

var sounds = [new Audio("./sounds/red.mp3"),new Audio("./sounds/blue.mp3"),new Audio("./sounds/green.mp3"),new Audio("./sounds/yellow.mp3"),new Audio("./sounds/wrong.mp3")];
$(document).keydown((e) => {
    if (!started){
        nextSequence();
        updateH1();
    }
})

$(".btn").click((e) => {
    var selected = $(e.target).attr("id");
    userPatterns.push(selected);
    playSound(buttons.indexOf(selected));
    pressedButton(selected);
});

function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    var nextButton = buttons[randomNumber];
    started = true;

    patterns.push(nextButton);
    patterns.forEach((element, index) => {
        setTimeout(()=>{
            $("#"+element).fadeOut().fadeIn();
        }, index*500);
    });
    playSound(randomNumber);
}
function playSound(index){
    sounds[index].play();
}
function pressedButton(button){
    $("#"+button).addClass("pressed");
    setTimeout( () => {
        $("#"+button).removeClass("pressed");
    }, 100);
    checkAnswer();
}
function updateH1(){
    $("h1").text("Level "+level);
}
function checkAnswer(){
    if(userPatterns[key] != patterns[key]){
        sounds[4].play();
        $("body").addClass("game-over");
        setTimeout( () => {
            $("body").removeClass("game-over");
        }, 200);
        restartGame();
    }
    else{
        if(userPatterns.length == patterns.length){
            level++;
            userPatterns = []
            key = 0;
            updateH1();
            setTimeout(() => nextSequence(),1000);
        }
        else{
            key++;
        }
    }
}
function restartGame(){
    level = 0;
    key = 0;
    patterns = [];
    userPatterns = [];
    started = false;
    $("h1").text("Game over, Press Any Key to Restart");
}