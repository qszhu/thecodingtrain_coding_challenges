class Spot {
  constructor(i, j) {
    this.i = i;
    this.j = j;

    this.f = 0;
    this.g = 0;
    this.h = 0;

    this.neighbors = [];

    this.previous = undefined;

    this.wall = false;
    if (random(1) < 0.4) {
      this.wall = true;
    }
  }

  show(col) {
    if (this.wall) {
      fill(0);
      noStroke();
      ellipse(this.i * h + h / 2, this.j * w + w / 2, h / 2, w / 2);
    } else if (col) {
      fill(col);
      rect(this.i * h, this.j * w, h, w);
    }
  }

  addNeighbors(grid) {
    const i = this.i,
      j = this.j;
    const inRange = (i, j) => i >= 0 && i < rows && j >= 0 && j < cols;
    for (let r = -1; r <= 1; r++) {
      for (let c = -1; c <= 1; c++) {
        if (r === 0 && r === 0) continue;
        const [ni, nj] = [i + r, j + c];
        if (inRange(ni, nj)) {
          this.neighbors.push(grid[ni][nj]);
        }
      }
    }
  }
}
