function heuristic(a, b) {
  return dist(a.i, a.j, b.i, b.j);
}

const cols = 50;
const rows = 50;
const grid = new Array(rows).fill().map((_) => new Array(cols));

const openSet = [];
const closedSet = [];

let start;
let end;

let w, h;

function setup() {
  const d = Math.min(windowWidth, windowHeight);
  createCanvas(d, d);

  w = width / cols;
  h = height / rows;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j] = new Spot(i, j);
    }
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j].addNeighbors(grid);
    }
  }

  start = grid[0][0];
  end = grid[rows - 1][cols - 1];
  start.wall = false;
  end.wall = false;

  openSet.push(start);
}

function draw() {
  if (openSet.length === 0) {
    noLoop();
    alert("no solution");
    return;
  }

  let winner = 0;
  for (let i = 0; i < openSet.length; i++) {
    if (openSet[i].f < openSet[winner].f) {
      winner = i;
    }
  }

  const current = openSet[winner];
  if (current === end) {
    noLoop();
    alert("DONE!");
  }

  openSet.splice(winner, 1);
  closedSet.push(current);

  for (const neighbor of current.neighbors) {
    if (closedSet.includes(neighbor) || neighbor.wall) continue;

    const tempG = current.g + heuristic(neighbor, current);

    let newPath = false;
    if (openSet.includes(neighbor)) {
      if (tempG < neighbor.g) {
        neighbor.g = tempG;
        newPath = true;
      }
    } else {
      neighbor.g = tempG;
      newPath = true;
      openSet.push(neighbor);
    }

    if (newPath) {
      neighbor.h = heuristic(neighbor, end);
      neighbor.f = neighbor.g + neighbor.h;
      neighbor.previous = current;
    }
  }

  background(255);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j].show();
    }
  }

  for (const spot of closedSet) {
    spot.show(color(255, 0, 0, 50));
  }

  for (const spot of openSet) {
    spot.show(color(0, 255, 0, 50));
  }

  const path = [];
  let temp = current;
  path.push(temp);
  while (temp.previous) {
    path.push(temp.previous);
    temp = temp.previous;
  }

  noFill();
  stroke(255, 0, 200);
  strokeWeight(w / 2);
  beginShape();
  for (const spot of path) {
    vertex(spot.i * h + h / 2, spot.j * w + w / 2);
  }
  endShape();
}
