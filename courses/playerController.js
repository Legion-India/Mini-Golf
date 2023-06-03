/** @type {HTMLCanvasElement} */
// Get the canvas element
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const course1 = new Image();
course1.src = '../Assets/course1.png';

const course = {
    x: 0,
    y: 0,
    height: 970,
    width: 1970,
}
const wall1 ={
  x:0,
  y:590,
  height:65,
  width:740,
}

const wall2 ={
  x:890,
  y:590,
  height:65,
  width:680,
}

const wall3 ={
  x: 400,
  y: 300,
  height: 70,
  width: 685,
}

const wall4 = {
  x: 1230,
  y: 300,
  height: 70,
  width: 700,
}

const wall5 ={
  x1: 1650,
  x2: 1950,
  y1: 915,
  y2: 750,
  thickness: 10,
}

const wall6 ={
  x1: 1950,
  x2: 1650,
  y1: 800,
  y2: 360,
  thickness: 10,
}

function drawCourse() {
    ctx.drawImage(course1, course.x, course.y, course.width, course.height);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(wall1.x,wall1.y,wall1.width,wall1.height);
    ctx.strokeRect(wall2.x,wall2.y,wall2.width,wall2.height);
    ctx.strokeRect(wall3.x,wall3.y,wall3.width,wall3.height);
    ctx.strokeRect(wall4.x,wall4.y,wall4.width,wall4.height);
    ctx.fillStyle = "#000000"; // Adjust the wall color as needed
    ctx.fillRect(wall6.x1, wall6.y2, wall6.x2 - wall6.x1, wall6.thickness);

  }



function drawWall1(){

}

/*function update(){
    drawCourse();

    requestAnimationFrame(update);
}*/

// Create an image object for the ball
const ballImg = new Image();
ballImg.src = "../Assets/ball_white.png"; // Replace with the path to your ball image

  // Set the ball properties
  const ball = {
    x: 65,
    y: 800,
    height: 30,
    width: 30,
    speed: 0.065,
    dx: 0,
    dy: 0,
    isMouseDown: false,
    friction: 0.98,
  };

  const hole ={
    x: 1535,
    y: 190,
    height: 30,
    width: 30,
  }
  
  // Function to draw the ball image
  function drawBall() {
    ctx.strokeStyle = 'blue';
    ctx.beginPath();
    ctx.arc(ball.x + ball.width/2,ball.y  + ball.height/2,ball.height/2,0,Math.PI *2);
    ctx.stroke();
    ctx.drawImage(ballImg, ball.x, ball.y);
    ctx.beginPath();
    ctx.arc(hole.x + hole.width/2,hole.y  + hole.height/2,hole.height/2,0,Math.PI *2);
    ctx.stroke();
  }
  
  // Event listeners for mouse events
  canvas.addEventListener("mousedown", handleMouseDown);
  canvas.addEventListener("mouseup", handleMouseUp);
  
  // Variables to track mouse position
  let startX = 0;
  let startY = 0;
  
  // Function to handle mouse down event
  function handleMouseDown(event) {
    if (!ball.isMoving) {
      startX = event.clientX;
      startY = event.clientY;
      ball.isMouseDown = true;
    }
  }
  
  // Function to handle mouse up event
  function handleMouseUp(event) {
    if (ball.isMouseDown) {
      const currentX = event.clientX;
      const currenty = event.clientY;
      
      // Calculate the difference between start and current mouse position
      const dx = startX - currentX;
      const dy = startY - currenty;
      
      // Set the ball's velocity based on the difference
      ball.dx = dx * ball.speed;
      ball.dy = dy * ball.speed;
      
      ball.isMouseDown = false; // Reset mouse state
      ball.isMoving = true; // Set ball movement flag
    }
  }

  function crash1(otherobj) {
    var myleft = ball.x;
    var myright = ball.x + (ball.width);
    var mytop = ball.y;
    var mybottom = ball.y + (ball.height);
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + (otherobj.height);
    var crash = true;
    if ((myleft>otherright) || (mytop>otherbottom) || (mybottom<othertop) || (myright<otherleft)) {
      crash = false;
    }
    return crash;
  }

  /*function crash2(otherobj) {
    var myleft = ball.x;
    var myright = ball.x + (ball.width);
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var crash = true;
    if((myleft>otherright) || myright<otherleft){
      crash = false;
    }
    return crash
  }*/
  function crash3(wall) {
    // Calculate the line segment vector
    const wallVector = {
      x: wall.x1 - wall.x2,
      y: wall.y1 - wall.y2,
    };
  
    // Calculate the vector between the ball's center and one end of the wall
    const ballToWallVector = {
      x: ball.x - wall.x2,
      y: ball.y - wall.y2,
    };
  
    // Calculate the dot product of the line segment vector and the ball-to-wall vector
    const dotProduct = (ballToWallVector.x * wallVector.x) + (ballToWallVector.y * wallVector.y);
  
    // Calculate the square of the magnitude of the line segment vector
    const wallVectorMagnitudeSquared = (wallVector.x * wallVector.x) + (wallVector.y * wallVector.y);
  
    // Calculate the projection factor (dot product divided by magnitude squared)
    const projectionFactor = dotProduct / wallVectorMagnitudeSquared;
  
    // Calculate the closest point on the line segment to the ball's center
    const closestPoint = {
      x: wall.x2 + (wallVector.x * projectionFactor),
      y: wall.y2 + (wallVector.y * projectionFactor),
    };
  
    // Calculate the vector from the ball's center to the closest point
    const ballToClosestPointVector = {
      x: closestPoint.x - ball.x,
      y: closestPoint.y - ball.y,
    };
  
    // Calculate the distance between the ball's center and the closest point
    const distance = Math.sqrt((ballToClosestPointVector.x * ballToClosestPointVector.x) +
                               (ballToClosestPointVector.y * ballToClosestPointVector.y));
  
    // Check if the distance is less than or equal to the ball's radius (collision occurred)
    if (distance <= ball.width/2) {
      // Calculate the reflection vector
      const reflectionVector = {
        x: ballToClosestPointVector.x - (2 * ballToClosestPointVector.x * projectionFactor),
        y: ballToClosestPointVector.y - (2 * ballToClosestPointVector.y * projectionFactor),
      };
  
      // Update the ball's velocity to the reflection vector
      ball.dx = reflectionVector.x;
      ball.dy = reflectionVector.y;
    }
  }
  
  


  // Function to update the ball's position and redraw
  function update() {
    if (ball.isMoving) {
      // Apply friction to gradually slow down the ball
      ball.dx *= ball.friction;
      ball.dy *= ball.friction;
      
      // Update ball position based on velocity
      ball.x += ball.dx;
      ball.y += ball.dy;

      if(ball.y>900 || ball.y<44){
        ball.dy *= -1;
      }

      if(ball.x>1880 || ball.x<59){
        ball.dx *= -1;
      }
      

      if(crash1(wall1)){
        ball.dy *= -1;
      }
      

      if(crash1(wall2)){
        ball.dy *= -1;
      }

      if(crash1(wall3)){
        ball.dy *= -1;
      }

      if(crash1(wall4)){
        ball.dy *= -1;
      }


      if (Math.abs(ball.dx) < 0.1 && Math.abs(ball.dy) < 0.1) {
        // Ball has stopped moving
        ball.isMoving = false;
      }
    }

    crash3(wall5);
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCourse();
    // Draw ball image
    drawBall();
    
    // Request animation frame for next frame update
    requestAnimationFrame(update);
  }

  // Start loading the ball image
  addEventListener("load", function () {
    // Start the animation loop once the image is loaded
    update();
  });
  
