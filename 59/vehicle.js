class Vehicle {
  constructor(x, y) {
    this.pos = createVector(random(width), random(height));
    this.target = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    this.r = 8;
    this.maxspeed = 10;
    this.maxforce = 1;
  }

  behaviors() {
    const arrive = this.arrive(this.target);
    arrive.mult(1);

    const mouse = createVector(mouseX, mouseY);
    const flee = this.flee(mouse);
    flee.mult(5);

    this.applyForce(arrive);
    this.applyForce(flee);
  }

  applyForce(f) {
    this.acc.add(f);
  }

  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
  }

  show() {
    stroke(255);
    strokeWeight(this.r);
    point(this.pos.x, this.pos.y);
  }

  _steer(desired) {
    const steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    return steer;
  }

  arrive(target) {
    const desired = p5.Vector.sub(target, this.pos);

    const d = desired.mag();
    let speed = this.maxspeed;
    if (d < 100) {
      speed = map(d, 0, 100, 0, this.maxspeed);
    }
    desired.setMag(speed);

    return this._steer(desired);
  }

  flee(target) {
    const desired = p5.Vector.sub(target, this.pos);

    const d = desired.mag();
    if (d >= 50) return createVector(0, 0);

    desired.setMag(this.maxspeed);
    desired.mult(-1);

    return this._steer(desired);
  }
}
