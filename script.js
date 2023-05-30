// canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const bgMusic = document.getElementById("bg-music");
canvas.width = 800;
canvas.height = 600;


window.addEventListener("load", () => {
  bgMusic.play();
});

// coche
const carWidth = 50;
const carHeight = 80;
const car = {
  x: canvas.width / 2 - carWidth / 2,
  y: canvas.height - carHeight - 20,
  speed: 10,
  moveLeft() {
    if (this.x > 0) {
      this.x -= this.speed;
    }
  },
  moveRight() {
    if (this.x < canvas.width - carWidth) {
      this.x += this.speed;
    }
  }
};

// obstaculos
const obstacleWidth = 50;
const obstacleHeight = 50;
let obstacles = [];
function createObstacle() {
  const obstacle = {
    x: Math.random() * (canvas.width - obstacleWidth),
    y: -obstacleHeight,
    speed: Math.random() * 5 + 2
  };
  obstacles.push(obstacle);
}
setInterval(createObstacle, 1000);

// Set up the game loop
let score = 0;
function gameLoop() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the car
  ctx.fillStyle = '#f00';
  ctx.fillRect(car.x, car.y, carWidth, carHeight);

  // Draw the obstacles
  ctx.fillStyle = '#0f0';
  obstacles.forEach(obstacle => {
    ctx.fillRect(obstacle.x, obstacle.y, obstacleWidth, obstacleHeight);
  });

  // Move the obstacles
  obstacles.forEach(obstacle => {
    obstacle.y += obstacle.speed;
    if (obstacle.y > canvas.height) {
      obstacles = obstacles.filter(o => o !== obstacle);
    }
  });

  // Check for collisions
  obstacles.forEach(obstacle => {
    if (
      car.x < obstacle.x + obstacleWidth &&
      car.x + carWidth > obstacle.x &&
      car.y < obstacle.y + obstacleHeight &&
      car.y + carHeight > obstacle.y
    ) {
      bgMusic.pause();
      alert('Game over!');
      location.reload();
    }
  });

  // Update the score
  score++;
  document.getElementById('score').innerHTML = `Score: ${score}`;

  // Request the next frame
  requestAnimationFrame(gameLoop);
}
gameLoop();

// Handle user input
document.addEventListener('keydown', event => {
  if (event.code === 'ArrowLeft') {
    car.moveLeft();
  } else if (event.code === 'ArrowRight') {
    car.moveRight();
  }
});
