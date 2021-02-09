class Spring extends VerletSpring2D {
  constructor(a, b) {
    super(a, b, w, 1);
  }

  show() {
    stroke(255);
    strokeWeight(1);
    line(this.a.x, this.a.y, this.a.z, this.b.x, this.b.y, this.b.z);
  }
}
