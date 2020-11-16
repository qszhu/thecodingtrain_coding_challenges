let grid;
let next;

const dA = 1;
const dB = 0.5;
const feed = 0.055;
const k = 0.062;

function setup() {
  // createCanvas(windowWidth, windowHeight);
  createCanvas(200, 200)
  pixelDensity(1);
  grid = []
  next = []
  for (let r = 0; r < height; r++) {
    grid[r] = []
    next[r] = []
    for (let c = 0; c < width; c++) {
      grid[r][c] = { a: 1, b : 0 }
      next[r][c] = { a: 1, b : 0 }
    }
  }

  for (let i = 100; i < 110; i++) {
    for (let j = 100; j < 110; j++) {
      grid[i][j].b = 1;
    }
  }
}

function draw() {
  background(51);

  for (let r = 1; r < height - 1; r++) {
    for (let c = 1; c < width - 1; c++) {
      let { a, b } = grid[r][c];
      a += dA * laplace(r, c, 'a') - a * b * b + feed * (1 - a);
      b += dB * laplace(r, c, 'b') + a * b * b - (k + feed) * b;

      a = constrain(a, 0, 1);
      b = constrain(b, 0, 1);
      next[r][c] = { a, b };
    }
  }

  loadPixels();

  let o = 0;
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      const { a, b } = next[r][c];
      let color = float((a - b) * 255);
      color = constrain(color, 0, 255);
      pixels[o++] = color;
      pixels[o++] = color;
      pixels[o++] = color;
      pixels[o++] = 255;
    }
  }
  updatePixels()

  ;[grid, next] = [next, grid]
}

function laplace(r, c, k) {
  let res = 0;
  res += grid[r][c][k] * -1;
  res += grid[r][c - 1][k] * 0.2;
  res += grid[r][c + 1][k] * 0.2;
  res += grid[r + 1][c][k] * 0.2;
  res += grid[r - 1][c][k] * 0.2;
  res += grid[r - 1][c - 1][k] * 0.05;
  res += grid[r - 1][c + 1][k] * 0.05;
  res += grid[r + 1][c - 1][k] * 0.05;
  res += grid[r + 1][c + 1][k] * 0.05;
  return res;
}
