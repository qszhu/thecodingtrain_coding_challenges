class Obstacle extends Rectangle {
  constructor(x, y, w, h, s) {
    super(x, y, w, h);
    this.speed = s;
  }

  update() {
    this.x += this.speed;
    const left = -this.w - grid;
    const right = width + grid;
    if (this.speed > 0) {
      if (this.x > right) this.x = left;
    } else {
      if (this.x < left) this.x = right;
    }
  }

  show() {
    fill(200);
    rect(this.x, this.y, this.w, this.h);
  }
}
