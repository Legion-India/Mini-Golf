/** @type {HTMLCanvasElement} */ 


// Get the canvas element
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const background = new Image();
background.src = 'ball_white.png'

// Set the circle properties

    const centerX1 = 65;
    const centerY1 = 900;
    const radius1 = 20;
    const color1 = "white";

    const centerX2 = 1500;
    const centerY2 = 90;
    const radius2 = 25;
    const color2 = "black";
    

// Draw the circle
ctx.beginPath();
ctx.arc(centerX1, centerY1, radius1, 0, 2 * Math.PI);
ctx.fillStyle = color1;
ctx.fill();
// Draw the hole
ctx.beginPath();
ctx.arc(centerX2, centerY2, radius2, 0, 2 * Math.PI);
ctx.fillStyle = color2;
ctx.fill();



