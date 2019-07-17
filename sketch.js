// Bird properties
let birdX = 100,
    birdY = 250,
    fallSpeed = 0,
    birdDiameter = 30, 
    maxSpeed = -10;
var bird = new Bird(birdX, birdY, fallSpeed, birdDiameter);

// Pipe properties
let pipeWidth = 30,
    pipeSpeed = 5,
    gapHeight = 120;
var pipeList = [];

// World properties
var gravity = 0.6;
var game_started = false;
var canvas_width = 900;
var canvas_height = 500;
var score = 0;

function resetGame() {
  bird = new Bird(birdX, birdY, fallSpeed, birdDiameter);
  pipeList = [];
  game_started = false;
  loop();
}

function setup() {
  var canvas = createCanvas(canvas_width, canvas_height);
  canvas.parent('flappybirdholder');
}

function draw() {
  background(200); // Must come first. Draw the background before drawing the objects on it, otherwise objects will not appear.

  if (game_started) {
    updateGameObjects();
  } else {
    generateScreenSaver();
  }
}

function endGame() {
  alert('Game over!');
  //bird.yPos = height - 0.5 * birdDiameter; // For making the circle align correctly on the ground after game over
  noLoop();
}

function checkCollision() {
  if (bird.yPos >= height || bird.yPos <= -35) {
    endGame();
  }
}

function updateGameObjects() {
  // Update Bird
  bird.fallSpeed += gravity;
  bird.yPos += bird.fallSpeed;
  bird.draw();

  // Update pipes
  if (frameCount % 80 === 0) {
    pipeList.push(new Pipe(pipeWidth, canvas_height, canvas_width, pipeSpeed, gapHeight));
  }
  pipeList.forEach(p => {
    p.xPos -= p.speed;
    if (p.xPos < 0 - pipeWidth) {
      pipeList.shift();
    }
    p.draw();
  })

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
