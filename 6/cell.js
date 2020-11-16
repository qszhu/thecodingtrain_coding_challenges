class Cell {
  constructor(pos, r, c) {
    if (pos) {
      this.pos = pos.copy();
    } else {
      this.pos = createVector(random(width), random(height));
    }

    this.r = r || 60;
    this.c = c || color(random(100, 255), 0, random(100, 255), 100);
  }

  clicked(x, y) {
    const d = dist(this.pos.x, this.pos.y, x, y);
    return d < this.r;
  }

  mitosis() {
    return [
      new Cell(this.pos, this.r * 0.8, this.c),
      new Cell(this.pos, this.r * 0.8, this.c),
    ];
  }

  move() {
    const v = p5.Vector.random2D();
    this.pos.add(v);
  }

  show() {
    noStroke();
    fill(this.c);
    ellipse(this.pos.x, this.pos.y, this.r, this.r);
  }
}
