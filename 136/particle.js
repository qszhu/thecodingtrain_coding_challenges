class Particle {
  constructor() {
    this.xNoise = new NoiseLoop(0.5, -width, width * 2);
    this.yNoise = new NoiseLoop(0.5, -height, height * 2);
    this.dNoise = new NoiseLoop(7, 10, 120);
    this.hNoise = new NoiseLoop(4, 0, 80);
  }

  render(a) {
    noStroke();

    const x = this.xNoise.value(a);
    const y = this.yNoise.value(a);
    const d = this.dNoise.value(a);
    const h = this.hNoise.value(a);

    fill(h, 255, 255, 200);
    ellipse(x, y, d);
  }
}
