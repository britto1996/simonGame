const simonColors = ["red", "blue", "green", "yellow"];
let userPattern = [];
let gamePattern = [];
let level = 0;
let started = false;

//start the game
$(document).keypress(function () {
  //   console.log("keypress");
  if (!started) {
    $("#level-title").text(`Level ${level}`);
    nextSequence();
    started = true;
  }
});

function mobileEvent() {
  if (!started) {
    $("#level-title").text(`Level ${level}`);
    nextSequence();
    started = true;
  }
}

//user click
$(".btn").click(function () {
  mobileEvent();
  //   console.log(userPattern);
  let userChosenColor = $(this).attr("id");
  userPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  //   console.log(userPattern.length - 1);
  checkAnswer(userPattern.length - 1);
});

//next color
function nextSequence() {
  userPattern = [];
  level++;
  $("#level-title").text(`Level ${level}`);
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = simonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $(`#${randomChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

//animating buttons
function animatePress(currentColor) {
  $(`#${currentColor}`).addClass("pressed");
  setTimeout(function () {
    $(`#${currentColor}`).removeClass("pressed");
  }, 100);
}

//play sound
function playSound(sound) {
  const audio = new Audio(`sounds/${sound}.mp3`);
  audio.play();
}

//checking answer
function checkAnswer(currentLevel) {
  //   console.log(currentLevel);
  if (userPattern[currentLevel] == gamePattern[currentLevel]) {
    // console.log("success");
    if (userPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    let errorSound = new Audio("sounds/wrong.mp3");
    errorSound.play();
    // console.log("error");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text(`Game Over, Press Any Key To Restart`);
    startOver();
  }
}

//start the game again
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
