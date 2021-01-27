const MAXD = 20;
const MAXN = 20;
let d = 8;
let n = 5;
let radius;

function setup() {
  createCanvas(windowWidth, windowHeight);
  radius = min(width, height) / 2;
}

function draw() {
  d = floor(map(mouseX, 0, width, 1, MAXD));
  n = floor(map(mouseY, 0, height, 1, MAXN));

  const k = n / d;

  background(51);
  push();
  translate(width / 2, height / 2);

  stroke(255);
  noFill();
  strokeWeight(1);

  beginShape();
  for (let a = 0; a < TWO_PI * d; a += 0.02) {
    const r = radius * cos(k * a);
    const x = r * cos(a);
    const y = r * sin(a);
    vertex(x, y);
  }
  endShape(CLOSE);

  pop();
}
