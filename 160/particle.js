class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.locked = false;
    this.mass = 1;
  }

  applyForce(force) {
    // a = f / m
    const f = force.copy();
    f.div(this.mass);
    this.acceleration.add(f);
  }

  update() {
    if (this.locked) return;

    this.velocity.mult(0.99);
    if (this.velocity.mag() < 0) {
      this.velocity.mult(0)
    }
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  show() {
    stroke(255);
    strokeWeight(2);
    fill(45, 197, 244);
    ellipse(this.position.x, this.position.y, 16);
  }
}
