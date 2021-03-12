class Frog extends Rectangle {
  constructor(x, y, w) {
    super(x, y, w, w);
  }

  attach(log) {
    this.attached = log;
  }

  update() {
    if (this.attached) {
      this.x += this.attached.speed;
    }
    this.x = constrain(this.x, 0, width - this.x);
  }

  show() {
    fill(0, 255, 0, 200);
    rect(this.x, this.y, this.w, this.h);
  }

  move(xdir, ydir) {
    this.x += xdir * grid;
    this.y += ydir * grid;
    this.attach(null);
  }
}
