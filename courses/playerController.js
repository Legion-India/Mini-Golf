// Get the canvas element
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const img = new Image();
img.src = "../Assets/ball_white.png";

// Set the ball properties
const ball = {
  x: 0,
  y: 0,
  radius: 10,
  speed: 0.09,
  dx: 0,
  dy: 0,
  isMoving: false,
  friction: 0.98,
};

// Function to draw the ball
function drawBall() {
  /*ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
  ctx.fillStyle = ball.color;
  ctx.fill();*/
  ctx.drawImage(img, ball.x, ball.y);
}

// Event listeners for mouse events
canvas.addEventListener("mousedown", handleMouseDown);
canvas.addEventListener("mouseup", handleMouseUp);

// Variables to track mouse position
let startX = 0;
let startY = 0;

// Function to handle mouse down event
function handleMouseDown(event) {
  startX = event.clientX;
  startY = event.clientY;
  ball.isMoving = true;
}



// Function to handle mouse up event
function handleMouseUp(event) {
    if (ball.isMoving) {
        const currentX = event.clientX;
        const currentY = event.clientY;
    
        // Calculate the difference between start and current mouse position
        const dx = startX - currentX;
        const dy = startY - currentY;
    
        // Set the ball's velocity based on the difference
        ball.dx = dx * ball.speed;
        ball.dy = dy * ball.speed;
        ball.isMoving = false;
    }
}

// Function to update the ball's position and redraw
function update() {
  if (!ball.isMoving) {
    // Apply friction to gradually slow down the ball
    ball.dx *= ball.friction;
    ball.dy *= ball.friction;
    // Update ball position based on velocity
    ball.x += ball.dx;
    ball.y += ball.dy;
  }

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw ball
  drawBall();

  // Request animation frame for next frame update
  requestAnimationFrame(update);
}

img.addEventListener("load", function(){ 
    // Start the animation loop
    update();
})
