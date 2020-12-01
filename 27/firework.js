class Firework {
  constructor() {
    this.hu = random(255);
    this.firework = new Particle(random(width), height, this.hu, true);
    this.exploded = false;
    this.particles = [];
  }

  done() {
    return this.exploded && this.particles.length === 0;
  }

  update() {
    if (!this.exploded) {
      this.firework.applyForce(gravity);
      this.firework.update();

      if (this.firework.vel.y >= 0) {
        this.exploded = true;
        this.explode();
      }
    }

    for (const p of this.particles) {
      p.applyForce(gravity);
      p.update();
    }

    this.particles = this.particles.filter((p) => !p.done());
  }

  explode() {
    for (let i = 0; i < 100; i++) {
      const p = new Particle(
        this.firework.pos.x,
        this.firework.pos.y,
        this.hu,
        false
      );
      this.particles.push(p);
    }
  }

  show() {
    if (!this.exploded) this.firework.show();

    for (const p of this.particles) {
      p.show();
    }
  }
}
