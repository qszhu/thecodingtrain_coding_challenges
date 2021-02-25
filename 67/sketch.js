let leftscore = 0;
let rightscore = 0;
let left, right, puck;
let ding;

function leftWin() {
  ding.play();
  leftscore++;
  puck.reset();
}

function rightWin() {
  ding.play();
  rightscore++;
  puck.reset();
}

function preload() {
  ding = loadSound("ding.mp3");
}

function setup() {
  createCanvas(600, 400);
  puck = new Puck();
  left = new Paddle(true);
  right = new Paddle(false);
}

function keyPressed() {
  if (key === "a") left.move(-10);
  else if (key === "z") left.move(10);

  if (key === "j") right.move(-10);
  else if (key === "m") right.move(10);
}

function keyReleased() {
  left.move(0);
  right.move(0);
}

function draw() {
  background(0);

  puck.checkPaddleLeft(left);
  puck.checkPaddleRight(right);

  left.show();
  right.show();

  left.update();
  right.update();

  puck.update();
  puck.edges();
  puck.show();

  fill(255);
  textSize(32);
  text(leftscore, 32, 40);
  text(rightscore, width - 64, 40);
}
