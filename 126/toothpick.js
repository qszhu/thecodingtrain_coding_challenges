const len = 63;

class Toothpick {
  constructor(x, y, d) {
    this.newPick = true;
    this.dir = d;
    if (this.dir > 0) {
      // horizontal
      this.ax = x - len / 2;
      this.bx = x + len / 2;
      this.ay = y;
      this.by = y;
    } else {
      // vertical
      this.ax = x;
      this.bx = x;
      this.ay = y - len / 2;
      this.by = y + len / 2;
    }
  }

  touches(x, y) {
    return (this.ax === x && this.ay === y) || (this.bx === x && this.by === y);
  }

  create(x, y, others) {
    if (others.some((other) => other !== this && other.touches(x, y))) return;
    return new Toothpick(x, y, this.dir * -1);
  }

  createA(others) {
    return this.create(this.ax, this.ay, others);
  }

  createB(others) {
    return this.create(this.bx, this.by, others);
  }

  show(factor) {
    stroke(0);
    if (this.newPick) {
      stroke(0, 0, 255);
    }
    strokeWeight(2 / factor)
    line(this.ax, this.ay, this.bx, this.by);
  }
}
