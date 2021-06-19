class Box {
  constructor(x, y, w, h) {
    const opts = { restitution: 0.5 };
    this.body = Matter.Bodies.rectangle(x, y, w, h, opts);
    Matter.World.add(world, this.body);
    this.w = w;
    this.h = h;
  }

  show() {
    const { position: pos, angle } = this.body;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    fill(255);
    rectMode(CENTER);
    imageMode(CENTER);
    image(boxImg, 0, 0, this.w, this.h);
    pop();
  }
}
