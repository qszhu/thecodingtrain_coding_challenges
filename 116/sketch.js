const w = 80;

let angle = 0;
let cols;
let rows;
let curves;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = floor(width / w) - 1;
  rows = floor(height / w) - 1;

  curves = new Array(rows)
    .fill()
    .map(() => new Array(cols).fill().map(() => new Curve()));
}

function drawCircle(x, y, r) {
  strokeWeight(1);
  stroke(255);
  ellipse(x, y, r, r);
}

function drawPoint(x, y) {
  strokeWeight(8);
  stroke(255);
  point(x, y);
}

function drawLine(x1, y1, x2, y2) {
  stroke(255, 150);
  strokeWeight(1);
  line(x1, y1, x2, y2);
}

function draw() {
  background(51);
  noFill();

  const d = 0.8 * w;
  const r = d / 2;

  for (let j = 0; j < cols; j++) {
    const cx = (j + 1) * w + w / 2;
    const cy = w / 2;

    drawCircle(cx, cy, d);

    const x = r * cos(angle * (j + 1) - HALF_PI);
    const y = r * sin(angle * (j + 1) - HALF_PI);

    drawPoint(cx + x, cy + y);

    drawLine(cx + x, 0, cx + x, height);

    for (let i = 0; i < rows; i++) {
      curves[i][j].setX(cx + x);
    }
  }

  for (let i = 0; i < rows; i++) {
    const cx = w / 2;
    const cy = (i + 1) * w + w / 2;

    drawCircle(cx, cy, d);

    const x = r * cos(angle * (i + 1) - HALF_PI);
    const y = r * sin(angle * (i + 1) - HALF_PI);

    drawPoint(cx + x, cy + y);

    drawLine(0, cy + y, width, cy + y);

    for (let j = 0; j < cols; j++) {
      curves[i][j].setY(cy + y);
    }
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      curves[i][j].addPoint();
      curves[i][j].show();
    }
  }

  angle -= 0.01;

  if (angle < -TWO_PI) {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        curves[i][j].reset();
      }
    }
    angle = 0;
    saveCanvas("lissajous.png");
    noLoop();
  }
}
