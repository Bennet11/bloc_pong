var animate = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback) { window.setTimeout(callback, 1000/60) };

var canvas = document.getElementById("myPong");
var context = canvas.getContext("2d");
var player = new Player();
var computer = new Computer();
var ball = new Ball(400, 250, 10);



function Paddle(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.speed = 10;
}

function Ball(x, y, radius) {
  this.x = x;
  this.y = y;
  this.radius = radius
}

function Player() {
  this.paddle = new Paddle(5, 225, 8, 70);
}

function Computer() {
  this.paddle = new Paddle(787, 275, 8, 70);
}

Paddle.prototype.render = function(context) {
  context.beginPath();
  context.rect(this.x, this.y, this.width, this.height);
  context.fillStyle = "white";
  context.fill();
};

Paddle.prototype.move = function(direction) {
 if(direction === "up" && this.y >= 10){
   this.y -= this.speed;
 }
 else if(direction === "down" && this.y < (context.canvas.height - 70)){
   this.y += this.speed;
 }
};

Ball.prototype.render = function(context) {
  context.beginPath();
  context.arc(40, 40, this.radius, 0, 2*Math.PI );
  context.strokeStyle = "black";
  context.stroke();
  context.fillStyle = "black";
  context.fill();
};

Player.prototype.render = function(context) {
  this.paddle.render(context);
};

Computer.prototype.render = function(context) {
  this.paddle.render(context);
};

var drawCanvas = function(){
  context.clearRect(0, 0, 800, 500);
  context.fillStyle = "gray";
  context.fill();
  context.fillRect(0, 0, 800, 500);
}

function render(context) {
  drawCanvas();
  player.render(context);
  computer.render(context);
  ball.render(context);
}

function step() {
  render(context);
  console.log("render");
};

animate(step);

window.onload = function (keyCode) {
  window.addEventListener('keydown', function(event) {
    event.keyDown = true;
    if (event.which === 38) {
      player.paddle.move("up")
      animate(step);
    } else if(event.which === 40) {
      player.paddle.move("down");
      animate(step);
    }

  });
}
