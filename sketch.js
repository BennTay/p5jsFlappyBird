// Bird properties
const birdX = 100,
    birdY = 250,
    fallSpeed = 0,
    birdDiameter = 30, 
    maxSpeed = -10;
var bird = new Bird(birdX, birdY, fallSpeed, birdDiameter);

// Pipe properties
const pipeWidth = 30,
    pipeSpeed = 5,
    gapHeight = 120;
var pipeList = [];

// World properties
const gravity = 0.6,
  canvas_width = 900,
  canvas_height = 500;

// Other game properties
var score = 0,
  game_started = false;

function resetGame() {
  bird = new Bird(birdX, birdY, fallSpeed, birdDiameter);
  pipeList = [];
  game_started = false;
  loop();
}

function setup() {
  // Setup canvas
  var canvas = createCanvas(canvas_width, canvas_height);
  canvas.parent('flappybirdholder');

  // Setup text
  textSize(24);
}

function draw() {
  background(200); // Must come first. Draw the background before drawing the objects on it, otherwise objects will not appear.

  // Draw FPS (rounded to 2 decimal places) at the bottom left of the screen
  /*
  let fps = frameRate();
  fill(255);
  stroke(0);
  text("FPS: " + fps.toFixed(2), 10, height - 10);
  */
  
  if (game_started) {
    updateGameObjects();
    text('Score: ' + str(score), 700, 50);
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
  // Check if bird has fallen to the ground or flown too high out of canvas
  if (bird.yPos >= height || bird.yPos <= -35) {
    endGame();
  }

  // Check if the bird has collided with the nearest pipe
  if (pipeList.length > 0) {
    let p = pipeList[0];
    if (Math.abs(p.xPos + (pipeWidth/2) - bird.xPos) < 0.5 * (pipeWidth + (0.5*birdDiameter))) {
      if (bird.yPos < p.topComponentHeight || bird.yPos > canvas_height - p.bottomComponentHeight) {
        endGame();
      }
    }
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
