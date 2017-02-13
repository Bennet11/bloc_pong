function Paddle(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
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
  this.paddle = new Paddle(795, 275, 8, 70);
}

Paddle.prototype.render = function(context) {
  context.beginPath();
  context.rect(this.x, this.y, this.width, this.height);
  context.fillStyle = "white";
  context.fill();
};

Ball.prototype.render = function(context) {
  context.beginPath();
  context.arc(this.x, this.y, this.radius);
  context.strokeStyle = "black";
  context.stroke();
  context.fillStyle = "black";
  context.fill();
};

Player.prototype.render = function() {
  this.paddle.render();
};

Computer.prototype.render = function() {
  this.paddle.render();
};

var player = new Player();
var computer = new Computer();
var ball = new Ball(400, 250, 10);

function render() {
  player.render();
  computer.render();
  ball.render()
}

window.onload = function () {
  var canvas = document.getElementById("myPong");
  var context = canvas.getContext("2d");
  render(context)
}
