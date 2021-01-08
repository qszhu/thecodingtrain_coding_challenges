class Asteroid {
  constructor(pos, r) {
    if (pos) {
      this.pos = pos.copy();
    } else {
      this.pos = createVector(random(width), random(height));
    }

    if (r) {
      this.r = r * 0.5;
    } else {
      this.r = random(15, 50);
    }

    this.vel = p5.Vector.random2D();

    this.total = floor(random(5, 15));
    this.offset = [];
    for (let i = 0; i < this.total; i++) {
      this.offset[i] = random(-this.r * 0.5, this.r * 0.5);
    }
  }

  update() {
    this.pos.add(this.vel);
  }

  render() {
    push();

    stroke(255);
    noFill();
    translate(this.pos.x, this.pos.y);

    beginShape();
    for (let i = 0; i < this.total; i++) {
      const angle = map(i, 0, this.total, 0, TWO_PI);
      const r = this.r + this.offset[i];
      const x = r * cos(angle);
      const y = r * sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);

    pop();
  }

  breakup() {
    return [new Asteroid(this.pos, this.r), new Asteroid(this.pos, this.r)];
  }

  edges() {
    if (this.pos.x > width + this.r) this.pos.x = -this.r;
    if (this.pos.x < -this.r) this.pos.x = width + this.r;
    if (this.pos.y > height + this.r) this.pos.y = -this.r;
    if (this.pos.y < -this.r) this.pos.y = height + this.r;
  }
}
