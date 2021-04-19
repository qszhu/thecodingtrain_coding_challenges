class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 8;
    this.highlight = false;
  }

  intersects(other) {
    const d = dist(this.x, this.y, other.x, other.y);
    return d <= this.r + other.r;
  }

  update() {
    this.x += random(-1, 1);
    this.y += random(-1, 1);
  }

  draw() {
    noStroke();
    fill(this.highlight ? 255 : 100);
    ellipse(this.x, this.y, this.r * 2);
  }
}
