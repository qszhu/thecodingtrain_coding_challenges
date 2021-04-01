let grid;
let x;
let y;
let dir;

const ANTUP = 0;
const ANTRIGHT = 1;
const ANTDOWN = 2;
const ANTLEFT = 3;

function setup() {
  createCanvas(400, 400);
  grid = new Array(width).fill().map(() => new Array(height));
  x = width / 2;
  y = height / 2;
  dir = ANTUP;
}

function turnRight() {
  dir = (dir + 1) % 4;
}

function turnLeft() {
  dir = (dir - 1 + 4) % 4;
}

function moveForward() {
  switch (dir) {
    case ANTUP:
      y--;
      break;
    case ANTRIGHT:
      x++;
      break;
    case ANTDOWN:
      y++;
      break;
    case ANTLEFT:
      x--;
      break;
  }

  x = (x + width) % width;
  y = (y + height) % height;
}

function draw() {
  strokeWeight(1);
  for (let n = 0; n < 100; n++) {
    const state = grid[x][y];
    if (state) {
      turnLeft();
      grid[x][y] = 0;
    } else {
      turnRight();
      grid[x][y] = 1;
    }

    stroke(255);
    if (grid[x][y]) {
      stroke(0);
    }
    point(x, y);
    moveForward();
  }
}
