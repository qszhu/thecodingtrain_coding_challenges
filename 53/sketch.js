let pos;
let prev;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(51);
  pos = createVector(width / 2, height / 2);
  prev = pos.copy();
}

function draw() {
  stroke(255);
  strokeWeight(2);
  line(pos.x, pos.y, prev.x, prev.y);
  prev.set(pos);

  const step = p5.Vector.random2D();

  const r = random(100);
  if (r < 1) step.mult(random(25, 100));
  else step.setMag(2);

  pos.add(step);
}
