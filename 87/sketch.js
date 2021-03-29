let angle = 0;
let vectors = [];
let beta = 0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(HSB);
}

function draw() {
  background(0);
  rotateY(angle);
  angle += 0.03;

  const r = 100 * (0.8 + 1.6 * sin(6 * beta));
  const theta = 2 * beta;
  const phi = 0.6 * PI * sin(12 * beta);
  const x = r * cos(phi) * cos(theta);
  const y = r * cos(phi) * sin(theta);
  const z = r * sin(phi);
  stroke(255, r, 255);

  vectors.push(createVector(x, y, z));

  vectors = vectors.slice(0, 3500);

  beta += 0.001;

  noFill();
  strokeWeight(8);
  beginShape();
  for (let i = 0; i < vectors.length; i++) {
    let v = vectors[i];
    stroke(floor((beta * 1000) % 256), 255, 255);
    vertex(v.x, v.y, v.z);
  }
  endShape();
}
