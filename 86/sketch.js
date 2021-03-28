let angle = 0;
const w = 24;
let ma;
let maxD;
let dim;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  dim = min(width, height);
  ma = atan(cos(QUARTER_PI));
  maxD = dist(0, 0, dim / 2, dim / 2);
}

function draw() {
  background(100);
  ortho(-dim, dim, -dim, dim, -dim, dim * 3);
  rotateX(-ma);
  rotateY(-QUARTER_PI);

  for (let z = 0; z < dim; z += w) {
    for (let x = 0; x < dim; x += w) {
      push();

      const d = dist(x, z, dim / 2, dim / 2);
      const offset = map(d, 0, maxD, -4, 4);
      const a = angle + offset;
      const h = floor(map(sin(a), -1, 1, dim / 3, dim));
      translate(x - dim / 2, 0, z - dim / 2);
      normalMaterial();
      box(w, h, w);

      pop();
    }
  }
  angle -= 0.1;
}
