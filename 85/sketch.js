let grid;
let rows;
let cols;
const resolution = 10;

function make2DArray(rows, cols) {
  return new Array(rows).fill().map(() => new Array(cols).fill());
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rows = floor(height / resolution);
  cols = floor(width / resolution);

  grid = make2DArray(rows, cols);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j] = floor(random(2));
    }
  }
}

function draw() {
  background(0);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const y = i * resolution;
      const x = j * resolution;
      if (grid[i][j] === 1) {
        fill(255);
        stroke(0);
        rect(x, y, resolution - 1, resolution - 1);
      }
    }
  }

  const next = make2DArray(rows, cols);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const state = grid[i][j];
      const neighbors = countNeighbors(grid, i, j);

      if (state === 0 && neighbors === 3) {
        next[i][j] = 1;
      } else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
        next[i][j] = 0;
      } else {
        next[i][j] = state;
      }
    }
  }

  grid = next;
}

function countNeighbors(grid, r, c) {
  let sum = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const row = (r + i + rows) % rows;
      const col = (c + j + cols) % cols;
      sum += grid[row][col];
    }
  }
  sum -= grid[r][c];
  return sum;
}
