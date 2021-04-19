class Point {
  constructor(x, y, userData) {
    this.x = x;
    this.y = y;
    this.userData = userData;
  }
}

class Rectangle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  get left() {
    return this.x - this.w;
  }

  get right() {
    return this.x + this.w;
  }

  get top() {
    return this.y - this.h;
  }

  get bottom() {
    return this.y + this.h;
  }

  contains(point) {
    const { x, y } = point;
    return (
      x >= this.left && x <= this.right && y >= this.top && y <= this.bottom
    );
  }

  intersects(rect) {
    const { left, right, top, bottom } = rect;
    return !(
      left > this.right ||
      right < this.left ||
      top > this.bottom ||
      bottom < this.top
    );
  }
}

class QuadTree {
  constructor(boundary, capacity) {
    this.boundary = boundary;
    this.capacity = capacity;
    this.points = [];
    this.children = [];
  }

  subdivide() {
    const { x, y, w, h } = this.boundary;
    for (const [dx, dy] of [
      [-1, -1],
      [1, -1],
      [1, 1],
      [-1, 1],
    ]) {
      const [nw, nh] = [w / 2, h / 2];
      const rect = new Rectangle(x + dx * nw, y + dy * nh, nw, nh);
      this.children.push(new QuadTree(rect, this.capacity));
    }
  }

  insert(point) {
    if (!this.boundary.contains(point)) return false;

    if (this.points.length < this.capacity) {
      this.points.push(point);
      return true;
    }

    if (this.children.length === 0) this.subdivide();
    if (this.children.some((child) => child.insert(point))) return true;

    return false;
  }

  query(rect) {
    let found = [];
    if (!this.boundary.intersects(rect)) return found;

    for (const p of this.points) {
      if (rect.contains(p)) found.push(p);
    }

    for (const child of this.children) {
      found = found.concat(child.query(rect));
    }

    return found;
  }
}
