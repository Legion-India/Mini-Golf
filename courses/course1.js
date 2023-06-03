const course1 = new Image();
course1.src = '../Assets/course1.png';

const course = {
    x: 40,
    y: 0,
    height: 970,
    width: 1970,
}

function drawCourse() {
    ctx.drawImage(course1, course.x, course.y, course.width, course.height);
  }

function update(){
    drawCourse();

    requestAnimationFrame(update);
}