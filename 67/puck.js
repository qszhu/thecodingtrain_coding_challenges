class Puck {
  constructor() {
    this.r = 12;
    this.reset();
  }

  reset() {
    this.x = width / 2;
    this.y = height / 2;
    let angle = random(-PI / 4, PI / 4);
    this.xspeed = 5 * Math.cos(angle);
    this.yspeed = 5 * Math.sin(angle);
    if (random(1) < 0.5) this.xspeed *= -1;
  }

  update() {
    this.x += this.xspeed;
    this.y += this.yspeed;
  }

  show() {
    fill(255);
    ellipse(this.x, this.y, this.r * 2);
  }

  edges() {
    if (this.y < 0 || this.y > height) {
      this.yspeed *= -1;
    }
    if (this.x - this.r > width) {
      leftWin();
    }
    if (this.x + this.r < 0) {
      rightWin();
    }
  }

  checkPaddleLeft(p) {
    if (
      this.y - this.r < p.y + p.h / 2 &&
      this.y + this.r > p.y - p.h / 2 &&
      this.x - this.r < p.x + p.w / 2
    ) {
      console.log('left', this.x, p.x)
      if (this.x > p.x) {
        let diff = this.y - (p.y - p.h / 2);
        let rad = radians(45);
        let angle = map(diff, 0, p.h, -rad, rad);
        this.xspeed = 5 * cos(angle);
        this.yspeed = 5 * sin(angle);
        this.x = p.x + p.w / 2 + this.r;
      }
    }
  }

  checkPaddleRight(p) {
    if (
      this.y - this.r < p.y + p.h / 2 &&
      this.y + this.r > p.y - p.h / 2 &&
      this.x + this.r > p.x - p.w / 2
    ) {
      console.log('right', this.x, p.x)
      if (this.x < p.x) {
        let diff = this.y - (p.y - p.h / 2);
        let angle = map(diff, 0, p.h, radians(225), radians(135));
        this.xspeed = 5 * cos(angle);
        this.yspeed = 5 * sin(angle);
        this.x = p.x - p.w / 2 - this.r;
      }
    }
  }
}
