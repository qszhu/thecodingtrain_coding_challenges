class Segment {
  constructor(a, b) {
    this.a = a.copy();
    this.b = b.copy();
  }

  /*
           c
           /\
          /  \
      ---/    \---
    a   b1    a1  b
  */
  generate() {
    const children = [];

    const v = p5.Vector.sub(this.b, this.a);
    v.div(3);

    // segment 0
    const b1 = p5.Vector.add(this.a, v);
    children[0] = new Segment(this.a, b1);

    // segment 3
    const a1 = p5.Vector.sub(this.b, v);
    children[3] = new Segment(a1, this.b);

    v.rotate(-PI / 3);
    const c = p5.Vector.add(b1, v);

    // segment 1
    children[1] = new Segment(b1, c);

    // segment 2
    children[2] = new Segment(c, a1);

    return children;
  }

  show() {
    stroke(255);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}
