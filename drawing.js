
const BACKGROUND_COLOUR = '#000000';
const LINE_COLOUR = '#FFFFFF';
const LINE_WIDTH = 15;

var currentX = 0;
var currentY = 0;
var previousX = 0;
var previousY = 0;

var canvas;
var context;

function prepareCanvas() {
   // console.log('Preparing Canvas');
   canvas = document.getElementById('my-canvas');
   //context is an object that provides drawing on the canvas or manipulating the canvas
   context = canvas.getContext('2d');

   // Now coloring the canvas black
   context.fillStyle = BACKGROUND_COLOUR;
   context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

   // Now changing the line colour while drawing
   context.strokeStyle = LINE_COLOUR;
   // Now changing the width of the line
   context.lineWidth = LINE_WIDTH;
   // Now to avoid jagged lines we will join the lines
   context.lineCap = "round";

   // Now creating a variable to track if the mouse is pressed
   var isPainting = false;


   // Now we will create a listner to detect the clicking and dragging
   document.addEventListener('mousedown', function (event) {
      // console.log('Mouse Pressed');
      isPainting = true;

      currentX = event.clientX - canvas.offsetLeft;
      currentY = event.clientY - canvas.offsetTop;
   });

   document.addEventListener('mousemove', function (event) {

      if (isPainting) {
         // we will use offset to move our origin from top left corner of screen to top left corner of the canvas
         previousX = currentX;
         currentX = event.clientX - canvas.offsetLeft;

         previousY = currentY;
         currentY = event.clientY - canvas.offsetTop;

         // for drawing the line we will first create new path(beginPath()), set starting point(moveTo()), create Line(lineTo()), close path, Draw the line(stroke())
         draw();
      }

   });

   document.addEventListener('mouseup', function (event) {
      // console.log('Mouse Released');
      isPainting = false;
   });
   
   // Code below makes sure that we no longer draw once pointer has left the canvas
   canvas.addEventListener('mouseleave', function (event) {
      isPainting = false;
   });

   // Touch Events
   canvas.addEventListener('touchstart', function (event) {
      console.log('Touchdown');
      isPainting = true;

      currentX = event.touches[0].clientX - canvas.offsetLeft;
      currentY = event.touches[0].clientY - canvas.offsetTop;
   });

   canvas.addEventListener('touchend', function (event) {
      isPainting = true;
   });

   canvas.addEventListener('touchcancel', function (event) {
      isPainting = true;
   });

   canvas.addEventListener('touchmove', function (event) {

      if (isPainting) {
         // we will use offset to move our origin from top left corner of screen to top left corner of the canvas
         previousX = currentX;
         currentX = event.touches[0].clientX - canvas.offsetLeft;

         previousY = currentY;
         currentY = event.touches[0].clientY - canvas.offsetTop;

         // for drawing the line we will first create new path(beginPath()), set starting point(moveTo()), create Line(lineTo()), close path, Draw the line(stroke())
         draw();
      }

   });

   
}

function draw() {
   context.beginPath();
   context.moveTo(previousX, previousY);
   context.lineTo(currentX, currentY);
   context.stroke();
}

function clearCanvas(){
   currentX = 0;
   currentY = 0;
   previousX = 0;
   previousY = 0;

   // Now making canvas all black
   context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}