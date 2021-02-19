class Segment {
  constructor(x, y, len, i) {
    this.angle = 0;
    this.b = createVector();
    if (x instanceof Segment) {
      this.a = x.b.copy();
      this.len = y;
      this.sw = map(len, 0, 20, 1, 10);
    } else {
      this.a = createVector(x, y);
      this.len = len;
      this.sw = map(i, 0, 20, 1, 10);
    }
    this.calculateB();
  }

  calculateB() {
    const dx = this.len * cos(this.angle);
    const dy = this.len * sin(this.angle);
    this.b.set(this.a.x + dx, this.a.y + dy);
  }

  setA(pos) {
    this.a = pos.copy();
    this.calculateB();
  }

  update() {
    this.calculateB();
  }

  follow(tx, ty) {
    const target = createVector(tx, ty);
    const dir = p5.Vector.sub(target, this.a);
    this.angle = dir.heading();
    dir.setMag(this.len);
    dir.mult(-1);
    this.a = p5.Vector.add(target, dir);
  }

  followChild(child) {
    this.follow(child.a.x, child.a.y);
  }

  show() {
    stroke(255);
    strokeWeight(4);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}
