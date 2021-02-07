class Particle {
  constructor(x, y, r) {
    this.hue = random(360)
    const options = {
      restitution: 0.5,
      friction: 0,
      density: 1,
    };
    x += random(-1, 1);
    this.body = Bodies.circle(x, y, r, options);
    this.r = r;
    World.add(world, this.body);
  }

  isOffScreen() {
    const { x, y } = this.body.position;
    return x < -50 || x > width + 50 || y > height;
  }

  show() {
    fill(this.hue, 255, 255);
    noStroke();
    const pos = this.body.position;

    push();
    translate(pos.x, pos.y);
    ellipse(0, 0, this.r * 2);
    pop();
  }
}
