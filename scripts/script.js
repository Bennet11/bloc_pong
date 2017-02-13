function Paddle(xPos, yPos, width, height) {
  this.xPosition = xPos;
  this.yPosition = yPos;
  this.width = width;
  this.height = height;
}

function Ball(xPos, yPos, radius) {
  this.xPosition = xPos;
  this.yPosition = yPos;
  this.radius = radius
}

function Player() {
  this.paddle = new Paddle(795, 490, 8, 70);
}

function Computer() {
  this.paddle = new Paddle(5, 10, 8, 70);
}

Paddle.prototype.render = function(context) {
  context.beginPath();
  context.rect(this.xPosition, this.yPosition, this.width, this.height);
  context.fillStyle = "white";
  context.fill();
}

Ball.prototype.render = function(context) {
  context.beginPath();
  context.arc(this.xPosition, this.yPosition, this.radius);
  context.strokeStyle = "black";
  context.stroke();
  context.fillStyle = "black";
  context.fill();
}

function render(context) {
  player.render(context);
  computer.render(context);
  ball.render(context);
}


var player = new Player();
var computer = new Computer();
var ball = new Ball(400, 275, 10);

window.onload = function (context) {
  render(context)
}
