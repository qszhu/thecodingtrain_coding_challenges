let n = 0;
const c = 10;

let start = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  colorMode(HSB);
}

function draw() {
  background(0);
  translate(width / 2, height / 2);
  rotate(n * 0.3);
  for (let i = 0; i < n; i++) {
    const a = i * 137.5;
    const r = c * sqrt(i);
    const x = r * cos(a);
    const y = r * sin(a);
    let hu = sin(start + i * 0.5);
    hu = map(hu, -1, 1, 0, 360);
    fill(hu, 255, 255);
    noStroke();
    ellipse(x, y, 12, 12);
  }
  n += 5;
  start += 5;
}
