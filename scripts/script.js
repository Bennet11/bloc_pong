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
var position = ball.x;
var playerScore = 0;
var computerScore = 0;
var player1Element = document.getElementById('player1');
var player2Element = document.getElementById('player2');
var W = context.canvas.width;
var H = context.canvas.height;
var playerWonE = document.getElementById('playerWins');
var playerLostE = document.getElementById('playerLose');


function Paddle(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.speed = 2;
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

Player.prototype.render = function(context) {
  this.paddle.render(context);
};

Computer.prototype.render = function(context) {
  this.paddle.render(context);
};


Paddle.prototype.render = function(context) {
  context.beginPath();
  context.rect(this.x, this.y, this.width, this.height);
  context.fillStyle = "white";
  context.fill();
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

Paddle.prototype.move = function(direction) {
  if(direction === "up" && this.y > 10){
    this.y -= this.speed;
  }
  else if(direction === "down" && this.y < (context.canvas.height - 80)) {
    this.y += this.speed;
  }
};

Computer.prototype.update = function() {
  if ((this.paddle.y - 1)> ball.y) {
    this.paddle.move("up");
  } else if (this.paddle.y < (ball.y - 1)) {
    this.paddle.move("down");
  }
};


Ball.prototype.move = function() {
  this.x += this.xSpeed;
  this.y += this.ySpeed;

  if(this.x <= 0 || this.x > (W - 5)) {
    this.x <= 0 ? computerScore++ : playerScore++;
    player1Element.innerHTML = playerScore;
    player2Element.innerHTML = computerScore;
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

  if(playerScore === 1 && playerScore > computerScore) {
    gameOver('player');
    resetScore();
  }
  else if(computerScore === 1 && computerScore > playerScore) {
    gameOver('computer');
    resetScore();
  }
  else {
    setTimeout(reset(position), 3000);
  }
};

function paddleHit() {
  var a = 0.0001, b = 0.005, c = 0.5, x = null;
  x = ball.ySpeed < 0 ? player.paddle.y + player.paddle.height - ball.y : ball.y - player.paddle.y;
       // Parabolic function
       var speedMultiplier = (a * (x * x)) + (b * x) + c;

       ball.xSpeed *= -1;
       ball.ySpeed *= speedMultiplier;
}

function reset(location) {
  return function () {
    ball.xSpeed = Math.random() < 0.5 ? Math.floor(Math.random() * (7 - 4 + 1) - 4): Math.floor(Math.random() * (7 - 4 + 1) + 4);
    ball.ySpeed = Math.random() < 0.5 ? Math.floor(Math.random() * 4) - 5 : Math.floor(Math.random() * 4) + 1;
    playerWonE.style.display = "none";
    playerLostE.style.display = "none";
  };
}

function gameOver(winner) {
  this.x = W / 2;
  this.y = H / 2;
  this.xSpeed = 0;
  this.ySpeed = 0;

  if (winner === 'player') {
    console.log("p1");
    playerWonE.innerText = "Player Won! Please refresh the page to play again.";
    playerWonE.style.display = "block";

  }
  else if (winner === 'computer') {
    console.log("comp");
    playerLostE.innerText = "Computer Won! Please refresh the page to play again.";
    playerLostE.style.display = "block";
  }
}

function resetScore() {
  player1Element.innerText = 0;
  player2Element.innerText = 0;
  playerScore = 0;
  computerScore = 0;
}



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
  computer.update();
  gameOver();
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
