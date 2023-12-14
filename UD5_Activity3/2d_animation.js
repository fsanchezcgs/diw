let canvas;
let context;
let sound = document.querySelector("#boing");

canvas = document.getElementById('2d-animation-canvas');
context = canvas.getContext('2d');

var ballX = 60;
var ballY = 60;
var directionX = 2;
var directionY = 2;

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

  setInterval(function(){
    if (ballX > 310 || ballX < 0){
      directionX *= -1;
      sound.play();
    }

    if (ballY < 0 || ballY > 210){
      directionY *= -1;
      sound.play();
    }

    ballX += directionX;
    ballY += directionY;
    clearCanvas();
    draw(ballX, ballY);

  }, 35);
}
