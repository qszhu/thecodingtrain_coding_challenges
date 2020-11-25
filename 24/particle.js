class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxspeed = 4;
    this.h = 0;
    this.prevPos = this.pos.copy();
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.edges()
  }

  edges() {
    if (this.pos.x < 0 || this.pos.x > width) {
      this.pos.x = wrap(this.pos.x, 0, width);
      this.updatePrev()
    }
    if (this.pos.y < 0 || this.pos.y > height) {
      this.pos.y = wrap(this.pos.y, 0, height);
      this.updatePrev()
    }
  }

  follow(vectors) {
    const x = floor(this.pos.x / scl);
    const y = floor(this.pos.y / scl);
    const idx = x + y * cols;
    const force = vectors[idx];
    this.applyForce(force);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  show() {
    stroke(this.h, 255, 255, 25);
    this.h = wrap(this.h + 1, 0, 255);
    strokeWeight(1);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.updatePrev();
  }

  updatePrev() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }
}
