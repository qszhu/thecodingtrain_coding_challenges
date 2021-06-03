class Particle {
  constructor(radius, angle) {
    this.pos = p5.Vector.fromAngle(angle);
    this.pos.mult(radius);
    this.r = 3;
  }

  update() {
    this.pos.x -= 1;
    this.pos.y += random(-3, 3);

    let angle = this.pos.heading();
    angle = constrain(angle, 0, PI / 6);
    const magnitude = this.pos.mag();
    this.pos = p5.Vector.fromAngle(angle);
    this.pos.setMag(magnitude);
  }

  show() {
    fill(255);
    stroke(255);
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }

  intersects(snowflake) {
    const {
      pos: { x, y },
      r,
    } = this;
    return snowflake.some((s) => dist(s.pos.x, s.pos.y, x, y) < r * 2);
  }

  finished() {
    return this.pos.x < 1;
  }
}
