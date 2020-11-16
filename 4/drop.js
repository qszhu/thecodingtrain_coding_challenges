const grav = 0.2;

class Drop {
  constructor() {
    this.init();
  }

  init() {
    this.x = random(width);
    this.y = random(-height, 0);
    this.z = random(0, 20);
    this.len = map(this.z, 0, 20, 20, 10);
    this.speed = map(this.z, 0, 20, 20, 1);
  }

  fall() {
    this.y += this.speed;
    this.speed += grav;
    if (this.y > height) this.init();
  }

  show() {
    const thick = map(this.z, 0, 20, 3, 1);
    strokeWeight(thick);
    stroke(255, 255, 255);
    line(this.x, this.y, this.x, this.y + this.len);
  }
}
