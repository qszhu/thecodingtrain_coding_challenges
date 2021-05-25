class Turtle {
  constructor(x, y, angle, ratio) {
    this.x = x;
    this.y = y;
    this.dir = angle;
    this.ratio = ratio;
  }

  reset() {
    translate(this.x, this.y);
    rotate(this.dir);
    this.pen = true;
  }

  forward(amt) {
    amt *= this.ratio;
    if (this.pen) {
      stroke(255);
      strokeWeight(1);
      line(0, 0, amt, 0);
    }
    translate(amt, 0);
  }

  right(angle) {
    rotate(angle);
  }
}
