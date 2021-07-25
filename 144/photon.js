class Photon {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(-c, 0);
    this.history = [];
    this.stopped = false;
    this.theta = 0;
  }

  stop() {
    this.stopped = true;
  }

  update() {
    if (!this.stopped) {
      this.history.push(this.pos.copy());

      const deltaV = this.vel.copy();
      deltaV.mult(dt);

      this.pos.add(deltaV);
    }

    if (this.history.length > 500) {
      this.history.shift();
    }
  }

  show() {
    strokeWeight(4);
    stroke(255, 0, 0);

    point(this.pos.x, this.pos.y);

    strokeWeight(2);
    noFill();

    beginShape();
    for (const { x, y } of this.history) {
      vertex(x, y);
    }
    endShape();
  }
}
