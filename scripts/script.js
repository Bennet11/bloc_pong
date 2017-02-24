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
var ball = new Ball(400, 250, 5);
var W = context.canvas.width;
var H = context.canvas.height;


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
  this.xSpeed = 5;
  this.ySpeed = 5;
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
  if(direction === "up" && this.y > 10){
    this.y -= this.speed;
  }
  else if(direction === "down" && this.y < (context.canvas.height - 80)) {
    this.y += this.speed;
  }
};

Ball.prototype.render = function(context) {
  context.beginPath();
  context.arc(400, 250, this.radius, 0, 2*Math.PI );
  context.strokeStyle = "black";
  context.stroke();
  context.fillStyle = "black";
  context.fill();
  ball.move();
};

Ball.prototype.move = function() {
  if(this.x < 5) {
    console.log("Computer Wins");
  }
  else if(this.x > W) {
    console.log("Player Wins");
  }
  else if(this.y - this.radius <= 0) {
    this.y += this.ySpeed
  }
  else if(this.y + this.radius >= H) {
    this.y -= this.ySpeed
  }
  else if(this.x - this.radius <= player.paddle.x + player.paddle.width
    && this.y <= player.paddle.y + player.paddle.height
    && this.y >= player.paddle.y) {
      paddleHit();
    }
  else if(this.x + this.radius >= computer.paddle.x + computer.paddle.width
    && this.y <= computer.paddle.y + computer.paddle.height
    && this.y <= computer.paddle.y) {
      paddleHit();
  }
};

function paddleHit() {
  ball.radius <
}

Player.prototype.render = function(context) {
  this.paddle.render(context);
};

Computer.prototype.render = function(context) {
  this.paddle.render(context);
};

var drawCanvas = function() {
  context.clearRect(0, 0, 800, 500);
  context.fillStyle = "gray";
  context.fill();
  context.fillRect(0, 0, 800, 500);
};

function render(context) {
  drawCanvas();
  player.render(context);
  computer.render(context);
  ball.render(context);
}

function step() {
  render(context);
  ball.move();
};

animate(step);

window.onload = function (keyCode) {
  window.addEventListener('keydown', function(event) {
    event.keyDown = true;
    if (event.which === 38) {
      player.paddle.move("up")
      animate(step);
    } else if(event.which === 40) {
      player.paddle.move("down")
      animate(step);
    }
  });
}
