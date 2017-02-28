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
var location = ball.x;
var W = context.canvas.width;
var H = context.canvas.height;


function Paddle(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.speed = 25;
}

function Ball(x, y, radius) {
  this.x = x;
  this.y = y;
  this.radius = radius
  this.xSpeed = Math.random() < 0.5 ? -5 : 5;
  this.ySpeed = Math.random() < 0.5 ? Math.floor(Math.random() * 4) - 5 : Math.floor(Math.random() * 4) + 1;
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
  context.arc(this.x, this.y, this.radius, 0, 2*Math.PI );
  context.strokeStyle = "black";
  context.stroke();
  context.fillStyle = "black";
  context.fill();
  ball.move();
  animate(step);
};

Ball.prototype.move = function() {
  this.x += this.xSpeed;
  this.y += this.ySpeed;

  if(this.x <= 0 || this.x > (W - 5)) {
    this.wallScore();
  }
  else if(this.y - this.radius <= (0 + 5)) {
    this.ySpeed *= -1
  }
  else if(this.y + this.radius >= (H + 5)) {
    this.ySpeed *= -1
  }
  else if(this.x - this.radius <= player.paddle.x + player.paddle.width
    && this.y <= player.paddle.y + player.paddle.height
    && this.y >= player.paddle.y) {
      paddleHit();
    }
  else if(this.x + this.radius >= computer.paddle.x + computer.paddle.width
    && this.y <= computer.paddle.y + computer.paddle.height
    && this.y >= computer.paddle.y) {
      paddleHit();
  }
};

Ball.prototype.wallScore = function() {
  this.x = W / 2;
  this.y = H / 2;
  this.xSpeed = 0;
  this.ySpeed = 0;

  // setTimeout(reset(location), 3000);
};

function paddleHit() {
  var a = 0.0001, b = 0.005, c = 0.5, x = null;
  x = ball.ySpeed < 0 ? player.paddle.y + player.paddle.height - ball.y : ball.y - player.paddle.y;
       // Parabolic function
       var speedMultiplier = (a * (x * x)) + (b * x) + c;

       ball.xSpeed *= -1;
       ball.ySpeed *= speedMultiplier;
}

Player.prototype.render = function(context) {
  this.paddle.render(context);
};

Computer.prototype.render = function(context) {
  this.paddle.render(context);
};

Computer.prototype.update = function(context) {
  this.ball.render(context)
};

var drawCanvas = function() {
  context.clearRect(0, 0, 800, 500);
  context.fillStyle = "gray";
  context.fill();
  context.fillRect(0, 0, 800, 500);
};



function reset(location) {
  return function() {
    ball.xSpeed = location < W / 2 ? -1 : 1;
    this.ySpeed = Math.random() < 0.5 ? Math.floor(Math.random() * 4) - 5 : Math.floor(Math.random() * 4) + 1;
  }
};

function render(context) {
  drawCanvas();
  player.render(context);
  computer.render(context);
  ball.render(context);
}

function step() {
  render(context);
};


animate(step);

window.onload = function (keyCode) {
  window.addEventListener('keydown', function(event) {
    event.keyDown = true;
    if (event.which === 38) {
      player.paddle.move("up")
    } else if(event.which === 40) {
      player.paddle.move("down")
    }
  });
}
