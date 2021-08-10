class Spring {
  constructor(k, restLength, a, b) {
    this.k = k;
    this.restLength = restLength;
    this.a = a;
    this.b = b;
  }

  update() {
    const force = p5.Vector.sub(this.b.position, this.a.position);
    const x = force.mag() - this.restLength;
    if (x <= 0) return

    force.normalize();
    force.mult(this.k * x);
    this.a.applyForce(force);

    force.mult(-1);
    this.b.applyForce(force);
  }

  show() {
    stroke(255);
    strokeWeight(4);
    const { x: x1, y: y1 } = this.a.position;
    const { x: x2, y: y2 } = this.b.position;
    line(x1, y1, x2, y2);
  }
}
