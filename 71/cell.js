class Cell {
  constructor(i, j, w) {
    this.i = i;
    this.j = j;
    this.w = w;
    this.x = i * w;
    this.y = j * w;
    this.neighborCount = 0;
    this.bee = false;
    this.revealed = false;
  }

  show() {
    stroke(0);
    noFill();
    rect(this.x, this.y, this.w, this.w);
    if (!this.revealed) return;

    if (this.bee) {
      fill(127);
      ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
      return;
    }

    fill(200);
    rect(this.x, this.y, this.w, this.w);

    if (this.neighborCount) {
      textAlign(CENTER);
      fill(0);
      text(this.neighborCount, this.x + this.w * 0.5, this.y + this.w - 6);
    }
  }

  traverseNeighbors(cb) {
    for (let xoff = -1; xoff <= 1; xoff++) {
      const i = this.i + xoff;
      if (i < 0 || i >= cols) continue;

      for (let yoff = -1; yoff <= 1; yoff++) {
        const j = this.j + yoff;
        if (j < 0 || j >= rows) continue;

        cb(i, j);
      }
    }
  }

  countBees() {
    if (this.bee) {
      this.neighborCount = -1;
      return;
    }

    let total = 0;
    this.traverseNeighbors((i, j) => {
      if (grid[i][j].bee) total++;
    });
    this.neighborCount = total;
  }

  contains(x, y) {
    return (
      x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w
    );
  }

  reveal() {
    this.revealed = true;
    if (this.neighborCount === 0) this.floodFill();
  }

  floodFill() {
    this.traverseNeighbors((i, j) => {
      const neighbor = grid[i][j];
      if (!neighbor.revealed) neighbor.reveal();
    });
  }
}
