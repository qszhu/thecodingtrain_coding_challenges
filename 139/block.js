class Block {
  constructor(x, w, m, v, xc) {
    this.x = x;
    this.y = height - w;
    this.w = w;
    this.v = v;
    this.m = m;
    this.xConstraint = xc;
  }

  hitWall() {
    return this.x <= 0;
  }

  reverse() {
    this.v *= -1;
  }

  collide(other) {
    return !(this.x + this.w < other.x || this.x > other.x + other.w);
  }

  bounce(other) {
    const { m, v } = this;
    const { m: m1, v: v1 } = other;
    const sumM = m + m1;
    let newV = ((m - m1) / sumM) * v;
    newV += ((2 * m1) / sumM) * v1;
    return newV;
  }

  update() {
    this.x += this.v;
  }

  show() {
    const x = constrain(this.x, this.xConstraint, width);
    image(blockImg, x, this.y, this.w, this.w);
  }
}
