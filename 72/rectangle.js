class Rectangle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  get bounds() {
    return {
      left: this.x,
      right: this.x + this.w,
      top: this.y,
      bottom: this.y + this.h,
    };
  }

  intersects(other) {
    const { left, right, top, bottom } = this.bounds;
    const {
      left: oleft,
      right: oright,
      top: otop,
      bottom: obottom,
    } = other.bounds;
    return !(
      left >= oright ||
      right <= oleft ||
      top >= obottom ||
      bottom <= otop
    );
  }
}
