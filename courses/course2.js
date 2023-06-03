/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const course1 = new Image();
course1.src = '../Assets/Map_Desert_2.png';

const course = {
    x: 0,
    y: 0,
    height: 970,
    width: 1970,
}

const wall1 ={
    x:550,
    y:597,
    height:58,
    width:1008,
  }

const wall2 ={
    x:550,
    y:268,
    height:58,
    width:1008,
  }

const wall3 ={
    x:480,
    y:268,
    height:340,
    width:75,
  }

function drawCourse(){
    ctx.drawImage(course1, course.x, course.y, course.width, course.height);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(wall1.x,wall1.y,wall1.width,wall1.height);
    ctx.strokeRect(wall2.x,wall2.y,wall2.width,wall2.height);
    ctx.strokeRect(wall3.x,wall3.y,wall3.width,wall3.height);
}

const ballImg = new Image();
ballImg.src = "../Assets/ball_white.png";

const ball = {
    x: 565,
    y: 465,
    height: 30,
    width: 30,
    speed: 0.065,
    dx: 0,
    dy: 0,
    isMouseDown: false,
    friction: 0.98,
  };

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

  function drawBall() {
    ctx.strokeStyle = 'blue';
    ctx.beginPath();
    ctx.arc(ball.x + ball.width/2,ball.y  + ball.height/2,ball.height/2,0,Math.PI *2);
    ctx.stroke();
    ctx.drawImage(ballImg, ball.x, ball.y);
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
    var crash = 1;
    if ((myleft>otherright) || (mytop>otherbottom) || (mybottom<othertop) || (myright<otherleft)) {
      crash = 0;
    }
    if(crash) return crash2(otherobj);
    return crash;
  }

  function crash2(otherobj) {
    var myleft = ball.x;
    var myright = ball.x + (ball.width);
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var crash = 1;
    var speedx=ball.dx;
    if((myleft>otherright+10*speedx) || myright<otherleft+10*speedx){
      crash = 2;
    }
    return crash;
  }

  function crash3(wall){
    if(areatri(ball.x,ball.y,wall.x1,wall.y1,wall.x3,wall.y3)+areatri(ball.x,ball.y,wall.x2,wall.y2,wall.x3,wall.y3)<areatri(wall.x1,wall.y1,wall.x2,wall.y2,wall.x3,wall.y3)) return true;
    return false;
  }

function update(){

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

          if(crash1(wall1)==1){
            ball.dy *= -1;
          }
          if(crash1(wall1)==2){
            ball.dx *= -1;
          }
    
          if(crash1(wall2)==1){
            ball.dy *= -1;
          }
          if(crash1(wall2)==2){
            ball.dx *= -1;
          }
    
          if(crash1(wall3)==1){
            ball.dy *= -1;
          }
          if(crash1(wall3)==2){
            ball.dx *= -1;
          }

          //if(crash3(sand)){
          //  ball.friction=0.95;
          //}

        if (Math.abs(ball.dx) < 0.1 && Math.abs(ball.dy) < 0.1) {
            // Ball has stopped moving
            ball.isMoving = false;
          }
    }



    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    

    drawCourse();

    drawBall();

    requestAnimationFrame(update);

}

addEventListener("load", function () {
    // Start the animation loop once the image is loaded
    update();
  });
  