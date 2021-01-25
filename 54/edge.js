class Edge {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }

  show() {
    stroke(255, 50);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
    this.h1.show();
    this.h2.show();
  }

  hankin(sides) {
    const mid = p5.Vector.add(this.a, this.b);
    mid.mult(0.5);

    const v1 = p5.Vector.sub(this.a, mid);
    const v2 = p5.Vector.sub(this.b, mid);

    const elen = v1.mag() + delta;

    let offset1 = mid,
      offset2 = mid;
    if (delta > 0) {
      v1.setMag(delta);
      v2.setMag(delta);
      offset1 = p5.Vector.add(mid, v2);
      offset2 = p5.Vector.add(mid, v1);
    }
    v1.normalize();
    v2.normalize();

    v1.rotate(radians(-angle));
    v2.rotate(radians(angle));

    const interior = ((sides - 2) * PI) / sides;
    const alpha = interior * 0.5;
    const beta = PI - radians(angle) - alpha;
    const hlen = (elen * sin(alpha)) / sin(beta);

    v1.setMag(hlen);
    v2.setMag(hlen);

    this.h1 = new Hankin(offset1, v1);
    this.h2 = new Hankin(offset2, v2);
  }
}
