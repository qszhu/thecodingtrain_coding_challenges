let rows, cols;
const scl = 20;
let w
let h

let flying = 0;

let terrain;

function setup() {
  w = windowWidth
  h = windowHeight
  createCanvas(windowWidth, windowHeight, WEBGL);
  cols = floor(w / scl)
  rows = floor(h / scl)

  terrain = new Array(cols).fill(0).map((_) => new Array(rows).fill(0));
}

function draw() {
  flying -= 0.1;
  for (let r = 0, yoff = flying; r < rows; r++, yoff += 0.2) {
    for (let c = 0, xoff = 0; c < cols; c++, xoff += 0.2) {
      terrain[c][r] = map(noise(xoff, yoff), 0, 1, -100, 100);
    }
  }

  background(0);
  translate(0, 50);
  rotateX(PI / 3);
  fill(200, 200, 200, 50);
  translate(-w / 2, -h / 2);
  for (let r = 0; r < rows - 1; r++) {
    beginShape(TRIANGLE_STRIP);
    for (let c = 0; c < cols; c++) {
      vertex(c * scl, r * scl, terrain[c][r]);
      vertex(c * scl, (r + 1) * scl, terrain[c][r + 1]);
    }
    endShape();
  }
}
