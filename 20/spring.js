class Spring extends VerletSpring2D {
  constructor(a, b) {
    super(a, b, w, 1);
  }

  show() {
    stroke(255);
    strokeWeight(2);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}
