var game_started = false;
var canvas_width = 900;
var canvas_height = 500;

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
    gapHeight = 50;
var pipeList = [];
    /*
var pipeList = [1, 2, 3, 4, 5];
console.log(pipeList);
pipeList.shift();
console.log(pipeList);
pipeList.push(9);
console.log(pipeList);*/

// World properties
var gravity = 0.6;

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
  background(200);
  if (game_started) {
    updateGameObjects();
  } else {
    generateScreenSaver();
  }
}

function endGame() {
  alert('Game over!');
  //bird.yPos = height - 0.5 * birdDiameter;
  noLoop();
}

function checkCollision() {
  if (bird.yPos >= height) {
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
    if (p.xPos < 0) {
      pipeList.shift();
    }
    p.draw();
  })

  checkCollision();
}

function generateScreenSaver() {
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

/*
var x;
var y;
var xSpeed;
var ySpeed;
var player;

function setup() {
  // put setup code here
  createCanvas(1500,700);
  x = 30;
  y = 30;
  xSpeed = 0;
  ySpeed = 0;
}

function draw() {
  // put drawing code here
  background(200);
  player = ellipse(x, y, 30, 30);
  move();
  x += xSpeed;
  y += ySpeed;
  speedDecay();
}

function move() {
  if (keyIsDown(UP_ARROW)) {
    ySpeed = -10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    ySpeed = 10;
  }
  if (keyIsDown(LEFT_ARROW)) {
    xSpeed = -10;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    xSpeed = 10;
  }
}

function speedDecay() {
  if (xSpeed > 0) {
    xSpeed -= 0.25;
  }

  if (ySpeed > 0) {
    ySpeed -= 0.25;
  }

  if (xSpeed < 0) {
    xSpeed += 0.25;
  }

  if (ySpeed < 0) {
    ySpeed += 0.25;
  }
}
*/