class SlingShot {
  constructor(x, y, body) {
    const opts = {
      pointA: { x, y },
      bodyB: body,
      stiffness: 0.02,
      length: 40,
    };
    this.sling = Constraint.create(opts);
    World.add(world, this.sling);
  }

  fly() {
    this.sling.bodyB = null;
  }

  show() {
    if (!this.sling.bodyB) return;

    stroke(0);
    strokeWeight(4);
    const posA = this.sling.pointA;
    const posB = this.sling.bodyB.position;
    line(posA.x, posA.y, posB.x, posB.y);
  }

  attach(body) {
    this.sling.bodyB = body;
  }
}
