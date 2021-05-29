const n = 5;
const percent = 0.5;
const points = [];

let current, previous;

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < n; i++) {
    const angle = (TWO_PI * i) / n;
    const v = p5.Vector.fromAngle(angle);
    v.mult(width / 2);
    v.add(width / 2, height / 2);
    points.push(v);
  }

  reset();
}

function reset() {
  current = createVector(random(width), random(height));

  background(0);
  stroke(255);
  strokeWeight(8);

  for (const p of points) {
    point(p.x, p.y);
  }
}

function draw() {
  stroke(255, 0, 255, 200);
  strokeWeight(1);

  for (let i = 0; i < 1000; i++) {
    const next = random(points);
    if (next !== previous) {
      current.x = lerp(current.x, next.x, percent);
      current.y = lerp(current.y, next.y, percent);
      point(current.x, current.y);
    }
    previous = next;
  }
}
