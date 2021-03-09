const rows = 20;
const cols = 20;
const w = 20;
const totalBees = 30;

let grid;

function setup() {
  createCanvas(rows * w + 1, cols * w + 1);
  grid = new Array(rows).fill().map(() => new Array(cols).fill());
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j] = new Cell(i, j, w);
    }
  }

  for (let i = 0; i < totalBees; i++) {
    const idx = floor(random(rows * cols));
    const i = floor(idx / cols);
    const j = idx % cols;
    grid[i][j].bee = true;
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j].countBees();
    }
  }
}

function gameOver() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j].revealed = true;
    }
  }
}

function mousePressed() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j].contains(mouseX, mouseY)) {
        grid[i][j].reveal();
        if (grid[i][j].bee) gameOver();
        return;
      }
    }
  }
}

function draw() {
  background(255);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j].show();
    }
  }
}
