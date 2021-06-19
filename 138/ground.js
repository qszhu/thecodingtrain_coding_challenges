class Ground extends Box {
  constructor(x, y, w, h) {
    super(x, y, w, h);
    this.body.isStatic = true;
  }

  show() {
    const { position: pos, angle } = this.body;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    noStroke();
    fill(255);
    rectMode(CENTER);
    rect(0, 0, this.w, this.h);
    pop();
  }
}
