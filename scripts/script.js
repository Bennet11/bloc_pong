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
  this.xspeed = 0;
  this.yspeed = 0;
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

Paddle.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
  this.xspeed = x;
  this.yspeed = y;
  if (this.x < 0) {
    this.x = 0;
    this.xspeed = 0;
  } else if (this.x + this.width > 800) {
    this.x = 800 - this.width;
    this.xspeed = 0;
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

function render(context) {
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
      player.paddle.move(0,1)
      console.log("up arrow");
      animate(step);
    } else if(event.which === 40) {
      console.log("down arrow");
    }

  });
}
