class Star {
  constructor() {
    this.init();
  }

  init() {
    this.sx = random(-width, width);
    this.sy = random(-height, height);
    this.z = random(width);
    this.px = this.sx;
    this.py = this.sy;
  }

  update() {
    this.z -= speed;
    if (this.z <= 0 || this.z >= width) this.init();
  }

  show() {
    fill(255);

    noStroke();
    const x = map(this.sx / this.z, 0, 1, 0, width);
    const y = map(this.sy / this.z, 0, 1, 0, height);
    const r = map(this.z, 0, width, 16, 0);
    ellipse(x, y, r, r);

    stroke(255);
    line(this.px, this.py, x, y);
    this.px = x;
    this.py = y;
  }
}
