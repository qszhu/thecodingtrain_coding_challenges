class Planet {
  constructor(radius, distance, orbitSpeed, img) {
    this.v = p5.Vector.random3D()

    this.radius = radius;
    this.distance = distance;
    this.v.mult(this.distance)
    this.angle = random(TWO_PI);
    this.orbitSpeed = orbitSpeed;

    this.planets = [];
    this.texture = img
  }

  orbit() {
    this.angle += this.orbitSpeed;
    for (const p of this.planets) {
      p.orbit();
    }
  }

  show() {
    push();

    const v2 = createVector(1, 0, 1)
    const p = this.v.cross(v2)
    if (p.x || p.y || p.z) rotate(this.angle, p)

    translate(this.v.x, this.v.y, this.v.z)
    noStroke()
    fill(255)

    texture(this.texture)
    sphere(this.radius)

    for (const p of this.planets) {
      p.show();
    }

    pop();
  }

  spawnMoons(total, level) {
    this.planets = []
    for (let i = 0; i < total; i++) {
      const r = this.radius / (level * 2);
      const d = random(this.radius + r, (this.radius + r) * 2)
      const o = random(-0.1, 0.1);
      const idx = Math.floor(random(0, textures.length))
      const p = new Planet(r, d, o, textures[idx]);
      if (level < 2) {
        const m = Math.floor(random(0, 3));
        p.spawnMoons(m, level + 1);
      }
      this.planets.push(p);
    }
  }
}
