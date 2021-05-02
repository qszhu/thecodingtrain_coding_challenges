const defaultColor = [255, 0, 0];
const colors = [
  [255, 255, 0],
  [0, 185, 63],
  [0, 104, 255],
  [122, 0, 229],
];

let sandpiles;
let nextpiles;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);

  sandpiles = new Array(height).fill().map(() => new Array(width).fill(0));
  nextpiles = new Array(height).fill().map(() => new Array(width).fill(0));

  sandpiles[Math.trunc(height / 2)][Math.trunc(width / 2)] = 10 ** 9;

  background(...defaultColor);
}

function topple() {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      nextpiles[y][x] = sandpiles[y][x];
    }
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const num = sandpiles[y][x];
      if (num < 4) continue;
      nextpiles[y][x] -= 4;
      if (x + 1 < width) nextpiles[y][x + 1]++;
      if (x - 1 >= 0) nextpiles[y][x - 1]++;
      if (y + 1 < height) nextpiles[y + 1][x]++;
      if (y - 1 >= 0) nextpiles[y - 1][x]++;
    }
  }

  let tmp = sandpiles;
  sandpiles = nextpiles;
  nextpiles = tmp;
}

function render() {
  loadPixels();
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const num = sandpiles[y][x];
      const col = num < 4 ? colors[num] : defaultColor;
      const idx = (x + y * width) * 4;
      for (let i = 0; i < 3; i++) {
        pixels[idx + i] = col[i];
      }
    }
  }
  updatePixels();
}

function draw() {
  render();

  topple();
}
