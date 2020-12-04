class Rocket {
  constructor(dna) {
    this.pos = createVector(width / 2, height);
    this.vel = createVector();
    this.acc = createVector();
    this.dna = dna || new DNA();
  }

  applyForce(force) {
    this.acc.add(force);
  }

  get dist() {
    return dist(this.pos.x, this.pos.y, target.x, target.y);
  }

  get completed() {
    return this.dist < 10;
  }

  get crashed() {
    if (
      this.pos.x > rx &&
      this.pos.x < rx + rw &&
      this.pos.y > ry &&
      this.pos.y < ry + rh
    )
      return true;
    if (this.pos.x > width || this.pos.x < 0) return true;
    if (this.pos.y > height || this.pos.y < 0) return true;
    return false;
  }

  get fitness() {
    let fitness = map(this.dist, 0, width, width, 0);
    if (this.completed) {
      fitness *= 10;
    }
    if (this.crashed) {
      fitness /= 10;
    }
    return fitness;
  }

  update() {
    if (this.completed) {
      this.pos = target.copy();
    } else if (!this.crashed) {
      this.applyForce(this.dna.genes[count]);
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
      this.vel.limit(4);
    }
  }

  show() {
    push();
    noStroke();
    fill(255, 150);
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    rectMode(CENTER);
    rect(0, 0, 25, 5);
    pop();
  }
}
