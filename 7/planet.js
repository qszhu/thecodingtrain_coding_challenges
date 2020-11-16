class Planet {
  constructor(radius, distance, orbitSpeed, angle) {
    this.radius = radius;
    this.distance = distance;
    this.orbitSpeed = orbitSpeed;
    this.angle = angle;
    this.planets = [];
  }

  orbit() {
    this.angle += this.orbitSpeed;
    for (const p of this.planets) {
      p.orbit();
    }
  }

  show() {
    push();
    fill(255, 100);
    rotate(this.angle);
    translate(this.distance, 0);
    ellipse(0, 0, this.radius * 2);
    for (const p of this.planets) {
      p.show();
    }
    pop();
  }

  spawnMoons(total, level) {
    for (let i = 0; i < total; i++) {
      const r = this.radius / (level * 2);
      const d = random(100, 300) / level;
      const o = random(0, 0.1);
      const a = random(TWO_PI);
      const p = new Planet(r, d, o, a);
      if (level < 3) {
        const m = Math.floor(random(0, 4));
        p.spawnMoons(m, level + 1);
      }
      this.planets.push(p);
    }
  }
}
