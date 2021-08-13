let grid;
const spacing = 5;
let cols, rows;
const path = [];
let spot;

function make2DArray(rows, cols) {
  return new Array(rows).fill().map(() => new Array(cols).fill());
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  rows = floor(height / spacing) - 1;
  cols = floor(width / spacing) - 1;
  grid = make2DArray(rows, cols);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j] = new Spot(i, j);
    }
  }

  spot = grid[floor(rows / 2)][floor(cols / 2)];
  path.push(spot);
  spot.visited = true;
}

function isValid(i, j) {
  if (i < 0 || i >= rows || j < 0 || j >= cols) return false;
  return !grid[i][j].visited;
}

function draw() {
  background(0);

  spot = spot.nextSpot();
  if (spot) {
    path.push(spot);
    spot.visited = true;
  } else {
    const stuck = path.pop();
    // stuck.clear();
    spot = path[path.length - 1];
  }

  if (!spot) {
    console.log("Done!");
    noLoop();
    return;
  }

  stroke(255);
  strokeWeight(spacing * 0.25);
  noFill();

  beginShape();
  for (const spot of path) {
    vertex(spot.x, spot.y);
  }
  endShape();

  stroke(255);
  strokeWeight(spacing * 0.5);
  point(spot.x, spot.y);
}
