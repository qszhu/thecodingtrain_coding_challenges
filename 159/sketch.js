let angle;
let angleV = 0;
let angleA = 0;

let bob;
let len
let origin;

const gravity = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);

  origin = createVector(width / 2, 0);
  angle = PI / 4;
  bob = createVector();
  len = height / 2
}

function draw() {
  background(0);

  const force = gravity * sin(angle);
  angleA = -force / len;
  angleV += angleA;
  angle += angleV;

  angleV *= 0.999;

  bob.x = len * sin(angle) + origin.x;
  bob.y = len * cos(angle) + origin.y;

  stroke(255);
  strokeWeight(8);
  fill(127);

  line(origin.x, origin.y, bob.x, bob.y);
  circle(bob.x, bob.y, 64);
}
