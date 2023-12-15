let canvas;
let context;
let x = document.getElementById('X');
let y = document.getElementById('Y');

let ball;

canvas = document.getElementById('2d-animation-canvas');
context = canvas.getContext('2d');

let ballX = 60;
let ballY = 60;
let directionX = 2;
let directionY = 2;
showX();
showY();

function start() {
  function draw(x, y) {
    context.fillStyle = "green";
    context.beginPath();
    context.arc(x,y,10,0,Math.PI * 2,true);
    context.fill();
  }

  function clearCanvas() {
    canvas.width = canvas.width;
  }

  draw(ballX, ballY);

  ball = setInterval(function(){
    if (ballX > 310 || ballX < 0){
      directionX *= -1;
      showX();
    }

    if (ballY < 0 || ballY > 210){
      directionY *= -1;
      showY();
    }

    ballX += directionX;
    ballY += directionY;
    clearCanvas();
    draw(ballX, ballY);

  }, 35);
}

function stop() {
  clearInterval(ball);
}

function xUp() {
  directionX++;
  showX();
}

function xDown() {
  directionX--;
  showX();
}

function yUp() {
  directionY++;
  showY();
}

function yDown() {
  directionY--;
  showY();
}

function showX() {
  x.value = directionX;
}

function showY() {
  y.value = directionY;
}