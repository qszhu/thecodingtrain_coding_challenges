class Curve {
  constructor() {
    this.path = [];
    this.current = createVector();
  }

  setX(x) {
    this.current.x = x;
  }

  setY(y) {
    this.current.y = y;
  }

  addPoint() {
    this.path.push(this.current.copy());
  }

  reset() {
    this.path = [];
  }

  show() {
    stroke(255);
    strokeWeight(1);
    noFill();

    beginShape();
    for (const v of this.path) {
      vertex(v.x, v.y);
    }
    endShape();

    strokeWeight(8);
    point(this.current.x, this.current.y);
  }
}
