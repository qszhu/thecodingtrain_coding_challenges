class Particle extends VerletParticle2D {
  show() {
    fill(255);
    ellipse(this.x, this.y, 10, 10);
  }
}
