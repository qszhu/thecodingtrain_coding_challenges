class Cell {
  constructor(r, c) {
    this.r = r;
    this.c = c;
    this.walls = [true, true, true, true];
    this.visited = false;
  }

  nextNeighbor() {
    const cands = [];

    for (const [dr, dc] of [
      [-1, 0],
      [0, 1],
      [1, 0],
      [0, -1],
    ]) {
      const [nr, nc] = [this.r + dr, this.c + dc];
      const cell = grid[index(nr, nc)];
      if (cell && !cell.visited) {
        cands.push(cell);
      }
    }

    if (cands.length > 0) {
      const ri = floor(random(0, cands.length));
      return cands[ri];
    }
  }

  highlight() {
    const x = this.c * w;
    const y = this.r * w;
    noStroke();
    fill(0, 0, 255, 100);
    rect(x, y, w, w);
  }

  show() {
    const x = this.c * w;
    const y = this.r * w;
    stroke(255);

    if (this.walls[0]) {
      line(x, y, x + w, y);
    }
    if (this.walls[1]) {
      line(x + w, y, x + w, y + w);
    }
    if (this.walls[2]) {
      line(x + w, y + w, x, y + w);
    }
    if (this.walls[3]) {
      line(x, y + w, x, y);
    }

    if (this.visited) {
      noStroke();
      fill(255, 0, 255, 100);
      rect(x, y, w, w);
    }
  }
}
