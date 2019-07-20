/**
 * Author: Benn Tay Guobin
 * 
 * Improvements:
 *   - Make the bird talk as he passes each pipe.
 *   - Add music/sound effects
 *
 * Bugs:
 *   - On mobile, page zooms when flap button is tapped too quickly.
 */

// Bird properties
const birdX = 100,
      birdY = 250,
      fallSpeed = 0,
      birdDiameter = 30,
      birdRadius = 0.5 * birdDiameter,
      maxSpeed = -10;
var bird = new Bird(birdX, birdY, fallSpeed, birdDiameter),
    birdImg1,
    birdImg2;

// Pipe properties
const pipeWidth = 30,
    pipeSpeed = 5,
    gapHeight = 120;
var pipeList = [],
    topPipeImg,
    bottomPipeImg;

// World properties
const gravity = 0.6,
  canvas_width = 900,
  canvas_height = 500;
var backgroundImg;

// Other game properties
var score = 0,
  game_started = false,
  flapButton;

function preload() {
  // Bird images
  birdImg1 = loadImage('images/birdframe1.png');
  birdImg2 = loadImage('images/birdframe2.png');
  bird.imgSprite = birdImg1;

  // Pipe images
  topPipeImg = loadImage('images/toppipe.png');
  bottomPipeImg = loadImage('images/bottompipe.png');

  // Background image
  backgroundImg = loadImage('images/bg.png');
}

function setup() {
  // Setup canvas
  var canvas = createCanvas(canvas_width, canvas_height);
  canvas.parent('flappybirdholder');

  // Setup text
  textSize(24);

  // Setup buttons
  flapButton = new Clickable();
  flapButton.locate(750, 400);
  flapButton.text = 'Flap';
  flapButton.onRelease = function() {
    game_started = true;
    bird.fallSpeed -= 16;
    if (bird.fallSpeed < maxSpeed) {
      bird.fallSpeed = maxSpeed;
    }
  }
}

function draw() {
  background(backgroundImg); // Must come first. Draw the background before drawing the objects on it, otherwise objects will not appear.
  if (game_started) {
    updateGameObjects();
    text('Score: ' + str(score), 700, 50);
  } else {
    generateScreenSaver();
  }
  flapButton.draw();

}

function resetGame() {
  bird = new Bird(birdX, birdY, fallSpeed, birdDiameter);
  bird.imgSprite = birdImg1;
  pipeList = [];
  game_started = false;
  score = 0;
  loop();
}

// Draw FPS (rounded to 2 decimal places) at the bottom left of the screen
// Source: https://github.com/processing/p5.js/wiki/Optimizing-p5.js-Code-for-Performance
function displayFPS() {
  let fps = frameRate();
  fill(255);
  stroke(0);
  text("FPS: " + fps.toFixed(2), 10, height - 10);
}

function endGame() {
  //TODO: Use canvas text instead of alert
  alert('Game over!');
  noLoop();
}

function checkCollision() {
  // Check if bird has fallen to the ground or flown too high out of canvas
  /*
  if (bird.yPos + birdRadius >= height || bird.yPos <= -35) {
    endGame();
  }
  */

  // Check collision between bird and ground/sky using p5.collide2D
  if (collideLineRect(0, canvas_height, canvas_width, canvas_height, bird.xPos, bird.yPos, birdDiameter, birdDiameter)
    || collideLineRect(0, -35, canvas_width, -35, bird.xPos, bird.yPos, birdDiameter, birdDiameter)) {
    endGame();
  }

  // Check if the bird has collided with the nearest pipe
  /*
  if (pipeList.length > 0) {
    let p = pipeList[0];
    if (Math.abs(p.xPos + (pipeWidth/2) - bird.xPos) < 0.5 * (pipeWidth + (birdRadius))) {
      if (bird.yPos - birdRadius <= p.topComponentHeight || bird.yPos + birdRadius > p.bottomComponentYPos) {
        endGame();
      }
    }
  }
  */

  // Check collision between bird and nearest pipe using p5.collide2D
  if (pipeList.length > 0) {
    let p = pipeList[0];
    if (collideRectRect(p.xPos, 0, pipeWidth, p.topComponentHeight, bird.xPos, bird.yPos, birdDiameter, birdDiameter)
      || collideRectRect(p.xPos, p.bottomComponentYPos, pipeWidth, p.bottomComponentHeight, bird.xPos, bird.yPos, birdDiameter, birdDiameter)) {
      endGame();
    }
  }
}

function updateGameObjects() {
  // Update Bird
  bird.fallSpeed += gravity;
  
  if (bird.fallSpeed < 0) {
    bird.imgSprite = birdImg2;
  } else {
    bird.imgSprite = birdImg1;
  }
  
  bird.yPos += bird.fallSpeed;
  bird.draw();

  // Update pipes
  if (frameCount % 80 === 0) {
    pipeList.push(new Pipe(pipeWidth, canvas_height, canvas_width, pipeSpeed, gapHeight, topPipeImg, bottomPipeImg));
  }
  pipeList.forEach(p => {
    p.xPos -= p.speed;
    if (p.xPos < 0 - pipeWidth) {
      pipeList.shift();
    }
    p.draw();
  })  

  // Update score
  if (pipeList.length > 0) {
    let firstPipe = pipeList[0];
    if (firstPipe.xPos === bird.xPos) {
      score++;
    }
  }

  checkCollision();
}

function generateScreenSaver() {
  // TODO: Add moving background
  bird.draw();
}

function keyPressed() {
  if (keyCode === 70) {
    game_started = true;
    bird.fallSpeed -= 16;
    if (bird.fallSpeed < maxSpeed) {
      bird.fallSpeed = maxSpeed;
    }
  }
}
