class Plinko {
  constructor(x, y, r) {
    const options = {
      restitution: 1,
      friction: 0,
      isStatic: true,
    };
    this.body = Bodies.circle(x, y, r, options);
    this.r = r;
    World.add(world, this.body);
  }

  show() {
    noStroke();
    fill(127);
    const pos = this.body.position;

    push();
    translate(pos.x, pos.y);
    ellipse(0, 0, this.r * 2);
    pop();
  }
}
