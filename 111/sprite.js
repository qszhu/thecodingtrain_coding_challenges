class Sprite {
  constructor(animation, x, y, speed) {
    this.x = x;
    this.y = y;
    this.animation = animation;
    this.w = this.animation[0].width;
    this.len = this.animation.length;
    this.speed = speed;
    this.index = 0;
  }

  show() {
    const idx = floor(this.index % this.len);
    image(this.animation[idx], this.x, this.y);
  }

  animate() {
    this.index += this.speed;
    if (this.index < 0) this.index += this.len;
    this.x += this.speed * 15;

    if (this.x > width) {
      this.x = -this.w;
    }
    if (this.x + this.w < 0) {
      this.x = width;
    }
  }
}
