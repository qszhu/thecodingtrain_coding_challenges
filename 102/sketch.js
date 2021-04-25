const dampening = 0.99;

let cols;
let rows;
let current;
let previous;

function setup() {
  pixelDensity(1)
  createCanvas(640, 480);
  [rows, cols] = [height, width];

  current = new Array(rows).fill().map(() => new Array(cols).fill(0));
  previous = new Array(rows).fill().map(() => new Array(cols).fill(0));
}

function mousePressed() {
  current[mouseY][mouseX] = 1000;
}

function mouseDragged() {
  current[mouseY][mouseX] = 1000;
}

function draw() {
  background(0);

  loadPixels();
  for (let i = 1; i < rows - 1; i++) {
    for (let j = 1; j < cols - 1; j++) {
      const sum =
        previous[i - 1][j] +
        previous[i][j - 1] +
        previous[i + 1][j] +
        previous[i][j + 1];
      current[i][j] = sum / 2 - current[i][j];
      current[i][j] *= dampening;

      const idx = (i * cols + j) * 4;
      for (let k = 0; k < 3; k++) pixels[idx + k] = 1;
      pixels[idx + 3] = current[i][j]
    }
  }
  updatePixels();

  const tmp = previous;
  previous = current;
  current = tmp;
}
