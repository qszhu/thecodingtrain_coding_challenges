class Bird {
  constructor(x, y, r) {
    const opts = { restituion: 0.5 };
    this.body = Matter.Bodies.circle(x, y, r, opts);
    Matter.Body.setMass(this.body, this.body.mass * 4);
    Matter.World.add(world, this.body);
    this.r = r;
  }

  show() {
    const { position: pos, angle } = this.body;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(dotImg, 0, 0, this.r * 2, this.r * 2);
    pop();
  }
}
