function getRandomSize() {
  const r = pow(random(0, 1), 3);
  return constrain(r * 32, 2, 32);
}

class Snowflake {
  constructor(sx, sy, img) {
    this.randomize(sx, sy);

    this.img = img;
    this.angle = random(TWO_PI);
    this.dir = random(1) > 0.5 ? 1 : -1;
    this.xOff = 0;
  }

  applyForce(force) {
    const f = force.copy();
    f.mult(this.r);
    this.acc.add(f);
  }

  randomize(sx, sy) {
    const x = sx || random(width);
    const y = sy || random(-100, 10);
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector();
    this.r = getRandomSize();
  }

  update() {
    this.xOff = sin(this.angle * 2) * 2 * this.r;

    this.vel.add(this.acc);
    this.vel.limit(this.r * 0.2);

    if (this.vel.mag() < 1) {
      this.vel.normalize();
    }

    this.pos.add(this.vel);
    this.acc.mult(0);

    if (this.pos.y > height + this.r) {
      this.randomize();
    }

    const left = -this.r;
    const right = width + this.r;
    if (this.pos < left) {
      this.pos.x = right;
    }
    if (this.pos.x > right) {
      this.pos.x = left;
    }

    this.angle += (this.dir * this.vel.mag()) / 200;
  }

  render() {
    push();

    translate(this.pos.x + this.xOff, this.pos.y);
    rotate(this.angle);

    imageMode(CENTER);
    image(this.img, 0, 0, this.r, this.r);

    pop();
  }
}
