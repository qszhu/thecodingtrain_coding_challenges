class NoiseLoop {
  constructor(diameter, min, max) {
    this.diameter = diameter;
    this.min = min;
    this.max = max;
    this.cx = random(1000);
    this.cy = random(1000);
  }

  value(a) {
    // circle on a 2D noise plane
    const xoff = map(cos(a), -1, 1, this.cx, this.cx + this.diameter);
    const yoff = map(sin(a), -1, 1, this.cy, this.cy + this.diameter);
    const r = noise(xoff, yoff);
    // 2D to 1D
    return map(r, 0, 1, this.min, this.max);
  }
}
