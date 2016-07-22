var $startBtn = document.querySelector(".startBtn");
var $gameZone = document.querySelector(".gameZone");
var $bird = document.querySelector(".bird");
var $score = document.querySelector(".score");
var $gameEnd = document.querySelector(".gameEnd");

var $gameZoneRect = $gameZone.getBoundingClientRect();
var $birdRect = $bird.getBoundingClientRect();

var state = {
  bird: {
    posY: 0
  },
  space: $gameZoneRect.top + $gameZoneRect.height - $birdRect.top + $birdRect.height,
  velocity : 10,
  direction : "down"
}

function gameStart() {
  var frame = $('.frames')
  var i = 0

  function renderLoop() {
    if (state.space < 60) {
      return gameEnd();
    }
    gravity();
    frame.text(i)
    i += 1;
  }
  $("html").click(function() {
    flap();
  });
  setInterval(renderLoop, 20)
}

function flap() {
  state.bird.posY -= 54;
  state.space += 54;

  $('.bird').css({transform: 'translateY('+ state.bird.posY + 'px)'});
}

function gravity(v) {
  state.bird.posY += 4;
  state.space -= 4;
  $('.bird').css({transform: 'translateY('+ state.bird.posY +'px)'});
}

function gameEnd() {
  $(".gameZone").css("opacity", 0.5);
  $(".gameEnd").css("display", "block");
}

$(".startBtn").click(function() {
  $(".startBtn").hide();
  gameStart();
});
