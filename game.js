'use strict';

function createPipeHeight() {
  var upperPipeHieght = Math.floor(Math.random() * 3) + 1;
  var lowerPipeHieght = 5 - upperPipeHieght;

  return [upperPipeHieght * 100, lowerPipeHieght * 100];
}

function createPipeHtml(pipeHieght, i) {
  var upperPipeHtml = '<div class='+ i +' style="height: ' + pipeHieght[0] + 'px; width: 50px"></div>';

  var lowerPipeHtml = '<div style="height: ' + pipeHieght[1] + 'px; width: 50px"></div>';

  //var pipeNumber = `<div class="pipeVal">${i}</div>`

  var pipeHtml = '<div class="pipe">' + upperPipeHtml + lowerPipeHtml + '</div>';

  return pipeHtml;
}

function createPipes(n) {

  var pipesHtml = []

  for (var i = 0; i < n; i++) {
    pipesHtml.push(createPipeHtml(createPipeHeight(), i))
  }

  return pipesHtml;
}

$('.pipes').html(createPipes(50));


var initialState = {
  bird: {
    posY: 0,
    bottomY : 30,
    posX : 165,
    velocity: 2,
    directionTimeout: undefined
  },
  pipes: {
    posX: 300,
    velocity: -1
  },
  nextPipe : {
    value : 0,
    leftX : 0,
    rightX : 0,
    topPipeY : 0,
    bottomPipeY : 0
  },
  end: false
};

var state = Object.assign({}, initialState);

function gameStart() {
  var frame = $('.frames');
  var i = 0;

  function renderLoop() {
    if (state.bird.posY === 570 || state.bird.posY < -30 || state.end) {
      return gameEnd();
    }

    movePipesPlane();

    moveBird();

    nextPipePos();

    collisionCheck();

    checkStop();

    frame.text(i);
    i += 1;
  }

  setInterval(renderLoop, 16);
}

// var tempPipe = $("." + state.nextPipe.value);
// console.log(tempPipe[0].getBoundingClientRect().x);

function moveBird() {
  state.bird.posY += state.bird.velocity;
  state.bird.bottomY += state.bird.velocity;

  $('.bird').css({ transform: 'translate(35px, ' + state.bird.posY + 'px)' });
}

function movePipesPlane() {
  state.pipes.posX += state.pipes.velocity;

  $('.pipes').css({ transform: 'translateX(' + state.pipes.posX + 'px)' });
}


function nextPipePos() {
  var nextPipe = state.nextPipe;
  var topPipe = $('.' + nextPipe.value)[0].getBoundingClientRect();
  var pipeGap = 100;

  nextPipe.leftX = topPipe.left;
  nextPipe.rightX = topPipe.left + topPipe.width;
  nextPipe.topPipeY = topPipe.height;
  nextPipe.bottomPipeY = topPipe.height + pipeGap;
}

function collisionCheck() {
  var bird = state.bird;
  var nextPipe = state.nextPipe;

  if (bird.posX >= nextPipe.leftX) {

    if (bird.posY <= nextPipe.topPipeY || bird.bottomY >= nextPipe.bottomPipeY) {
      gameEnd();
      state.end = true;
    }

    if (bird.posX > nextPipe.rightX) {
      updatePipe();
    }

  }
}

function updatePipe() {
  state.nextPipe.value += 1;
}

$(".start").click(function () {
  $(".start").hide();
  gameStart();
});

function gameEnd() {
  $(".gameZone").css("opacity", 0.3);
  $(".start").text("RESTART");
  $(".start").show();
  return;
}

$('.start').click(function(){
  if(state.end)
    restartGame();
})

function checkStop() {
  $('.stop').click(function () {
    state.end = true;
  });
}

$('.gameZone').click(function () {

  if (state.bird.directionTimeout) {
    clearTimeout(state.bird.directionTimeout);
    state.bird.directionTimeout = undefined;
  }

  state.bird.velocity = -4;

  state.bird.directionTimeout = setTimeout(function () {
    state.bird.velocity = 2;
  }, 300);
});

function restartGame() {
  //console.log("restart");
  state = Object.assign({}, initialState);
  $(".gameZone").css("opacity", 1);
  $(".bird").css({transform : "translateY(0)"});
  gameStart();
}
