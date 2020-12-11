class Walker {
  constructor(x, y) {
    if (arguments.length === 2) {
      this.pos = createVector(x, y);
      this.stuck = true;
    } else {
      this.pos = randomPoint();
      this.stuck = false;
    }
    this.r = radius;
  }

  walk() {
    const vel = p5.Vector.random2D();
    this.pos.add(vel);
    this.pos.x = constrain(this.pos.x, 0, width);
    this.pos.y = constrain(this.pos.y, 0, height);
  }

  checkStuck(others) {
    for (const o of others) {
      const d2 = distSq(this.pos, o.pos);
      const d1 = this.r + o.r;
      if (d2 < d1 * d1) {
        this.stuck = true;
        return true;
      }
    }
    return false;
  }

  show() {
    noStroke();
    if (this.stuck) {
      fill(255, 0, 0, 200);
    } else {
      fill(255)
    }
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
  }
}

function randomPoint() {
  const i = floor(random(4));
  const x = random(width);
  const y = random(height);
  if (i === 0) return createVector(x, 0);
  if (i === 1) return createVector(x, height);
  if (i === 2) return createVector(0, y);
  return createVector(width, y);
}

function distSq(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return dx * dx + dy * dy;
}
