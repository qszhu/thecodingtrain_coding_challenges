class Circle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.r = 2;
    this.color = color;
    this.growing = true;
  }

  grow() {
    if (this.growing) {
      this.r += 0.5;
    }
  }

  show() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }

  get touchesEdge() {
    let x = this.x,
      y = this.y,
      r = this.r;
    return x - r <= 0 || x + r >= width || y - r <= 0 || y + r >= height;
  }

  overlaps(other) {
    return this.distanceTo(other.x, other.y) < this.r + other.r + 1;
  }

  distanceTo(x, y) {
    return dist(x, y, this.x, this.y)
  }
}
