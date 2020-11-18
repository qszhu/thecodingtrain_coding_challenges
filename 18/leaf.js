class Leaf {
  constructor() {
    this.pos = p5.Vector.random3D();
    this.pos.mult(random(width / 4));
    this.pos.y -= height / 4;
    this.reached = false;
  }

  show() {
    fill(255);
    noStroke();
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    ellipse(0, 0, 4, 4);
    pop();
  }
}
