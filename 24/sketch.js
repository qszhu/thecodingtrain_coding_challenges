const inc = 0.1;
const scl = 10;
let cols, rows;

let zoff = 0;
const particles = [];
let flowfield;

function wrap(v, a, b) {
  if (v < a) return b
  if (v > b) return a
  return v
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 255);
  cols = floor(width / scl);
  rows = floor(height / scl);

  flowfield = new Array(cols * rows);

  for (let i = 0; i < 300; i++) {
    particles[i] = new Particle();
  }

  background(51);
}

function draw() {
  for (let y = 0, yoff = 0; y < rows; y++, yoff += inc) {
    for (let x = 0, xoff = 0; x < cols; x++, xoff += inc) {
      const idx = x + y * cols;
      const angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      const v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[idx] = v;
    }
    zoff += 0.0003;
  }

  for (const p of particles) {
    p.follow(flowfield);
    p.update();
    p.show();
  }
}
