const defaultColor = [255, 0, 0];
const colors = [
  [255, 255, 0],
  [0, 185, 63],
  [0, 104, 255],
  [122, 0, 229],
];

let sandpiles;
let nextpiles;
const blockSize = 8;
let rows;
let cols;

function array2D(rows, cols, fill) {
  return new Array(rows).fill().map(() => new Array(cols).fill(fill));
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);

  rows = Math.trunc(height / blockSize);
  cols = Math.trunc(width / blockSize);

  sandpiles = array2D(rows, cols, 0);
  nextpiles = array2D(rows, cols, 0);

  sandpiles[Math.trunc(rows / 2)][Math.trunc(cols / 2)] =
    Number.MAX_SAFE_INTEGER;

  background(...defaultColor);
}

function topple() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      nextpiles[y][x] = sandpiles[y][x];
    }
  }

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const num = sandpiles[y][x];
      if (num < 4) continue;
      nextpiles[y][x] -= 4;
      if (x + 1 < cols) nextpiles[y][x + 1]++;
      if (x - 1 >= 0) nextpiles[y][x - 1]++;
      if (y + 1 < rows) nextpiles[y + 1][x]++;
      if (y - 1 >= 0) nextpiles[y - 1][x]++;
    }
  }

  let tmp = sandpiles;
  sandpiles = nextpiles;
  nextpiles = tmp;
}

function render() {
  noStroke();
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const num = sandpiles[y][x];
      const col = num < 4 ? colors[num] : defaultColor;
      fill(...col);
      rect(x * blockSize, y * blockSize, blockSize, blockSize);
    }
  }
}

function draw() {
  render();

  for (let i = 0; i < 1; i++) {
    topple();
  }
}
