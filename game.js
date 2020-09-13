
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

//game start:
$(document).keypress(function() {
  if (!started) {
    //"Press A Key to Start" change to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//user game chosen: detect when any of the buttons are clicked and trigger a handler function
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  //Call checkAnswer() after a user has clicked and chosen their answer
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    //check If the most recent user answer is the same as the game pattern, so then log "success" or "wrong"
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () { //Call nextSequence() after a 1000 millisecond delay
          nextSequence();
        }, 1000);
      }
    } else { //game-over effects
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () { //change after 2s
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

function nextSequence() {
 
  userClickedPattern = []; //reset the userClickedPattern to an empty array 
  level++; //increase the level by 1 every time nextSequence() is called.

  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //select the button with the same id as the randomChosenColour and animate a flash to the button 
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () { //remove the pressed class after a 100 milliseconds.
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) { //play the sound for the button colour selected
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() { //re-started variables.
  level = 0;
  gamePattern = [];
  started = false;
}
