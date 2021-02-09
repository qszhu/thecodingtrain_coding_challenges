class Particle extends VerletParticle2D {
  show() {
    push();

    translate(this.x, this.y, this.z);
    noStroke();
    fill(255);
    ellipse(0, 0, 2, 2);

    pop();
  }
}
