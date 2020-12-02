class Blob {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(2, 5));
    this.r = random(120, 240);
  }

  update() {
    this.pos.add(this.vel);
    if (this.pos.x > width || this.pos.x < 0) this.vel.x *= -1;
    if (this.pos.y > height || this.pos.y < 0) this.vel.y *= -1;
  }

  show() {
    stroke(0);
    noFill();
    strokeWeight(4);
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
  }
}
