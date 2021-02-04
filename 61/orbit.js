const k = -4;

class Orbit {
  constructor(x, y, r, n, p) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.n = n;
    this.parent = p;
    this.child = null;
    this.speed = radians(pow(k, n - 1)) / resolution;
    this.angle = -HALF_PI;
  }

  addChild() {
    const newr = this.r / 3;
    const newx = this.x + this.r + newr;
    const newy = this.y;
    this.child = new Orbit(newx, newy, newr, this.n + 1, this);
    return this.child;
  }

  update() {
    if (!this.parent) return;
    this.angle += this.speed;
    const rsum = this.r + this.parent.r;
    this.x = this.parent.x + rsum * cos(this.angle);
    this.y = this.parent.y + rsum * sin(this.angle);
  }

  show() {
    stroke(255, 100);
    strokeWeight(1);
    noFill();
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }
}
