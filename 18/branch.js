class Branch {
  constructor(parent, pos, dir) {
    this.parent = parent;
    this.pos = pos;
    this.dir = dir;

    this.origDir = this.dir.copy();
    this.count = 0;
    this.len = 30;
  }

  reset() {
    this.dir = this.origDir.copy();
    this.count = 0;
  }

  next() {
    const nextDir = p5.Vector.mult(this.dir, this.len);
    const nextPos = p5.Vector.add(this.pos, nextDir);
    return new Branch(this, nextPos, this.dir.copy());
  }

  show(idx, total) {
    if (!this.parent) return;
    const sw = map(idx, 0, total, 3, 1);
    strokeWeight(sw);
    stroke(255);
    line(
      this.pos.x,
      this.pos.y,
      this.pos.z,
      this.parent.pos.x,
      this.parent.pos.y,
      this.parent.pos.z
    );
  }
}
