function mutateDna(dna) {
  function mutate(val, min, max) {
    if (random(1) < 0.01) return val + random(min, max);
    return val;
  }
  const res = [];
  res[0] = mutate(dna[0], -0.1, 0.1);
  res[1] = mutate(dna[1], -0.1, 0.1);
  res[2] = mutate(dna[2], -10, 10);
  res[3] = mutate(dna[3], -10, 10);
  return res;
}

class Vehicle {
  constructor(x, y, dna) {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, -2);
    this.position = createVector(x, y);
    this.r = 4;
    this.maxspeed = 5;
    this.maxforce = 0.5;
    this.health = 1;
    if (dna) {
      this.dna = mutateDna(dna);
    } else {
      this.dna = [random(-2, 2), random(-2, 2), random(0, 100), random(0, 100)];
    }
  }

  update() {
    this.health -= 0.005;
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  eat(list, nutrition, perception) {
    for (let i = list.length - 1; i >= 0; i--) {
      const d = this.position.dist(list[i]);
      if (d < this.maxspeed) {
        list.splice(i, 1);
        this.health += nutrition;
      }
    }
    let record = Infinity;
    let closest = null;
    for (const eatable of list) {
      const d = this.position.dist(eatable);
      if (d < record && d < perception) {
        record = d;
        closest = eatable;
      }
    }
    if (closest) return this.seek(closest);
    return createVector(0, 0);
  }

  seek(target) {
    const desired = p5.Vector.sub(target, this.position);
    desired.setMag(this.maxspeed);
    const steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    return steer;
  }

  behaviors(good, bad) {
    const steerG = this.eat(good, 0.2, this.dna[2]);
    const steerB = this.eat(bad, -1, this.dna[3]);

    steerG.mult(this.dna[0]);
    steerG.mult(this.dna[1]);

    this.applyForce(steerG);
    this.applyForce(steerB);
  }

  clone() {
    if (random(1) < 0.002) {
      return new Vehicle(this.position.x, this.position.y, this.dna);
    }
  }

  dead() {
    return this.health < 0;
  }

  display() {
    const angle = this.velocity.heading() + PI / 2;

    push();
    translate(this.position.x, this.position.y);
    rotate(angle);

    if (debug) {
      strokeWeight(3);
      stroke(0, 255, 0);
      noFill();
      line(0, 0, 0, -this.dna[0] * 25);
      strokeWeight(2);
      ellipse(0, 0, this.dna[2] * 2);
      stroke(255, 0, 0);
      line(0, 0, 0, -this.dna[1] * 25);
      ellipse(0, 0, this.dna[3] * 2);
    }

    const gr = color(0, 255, 0);
    const rd = color(255, 0, 0);
    const col = lerpColor(rd, gr, this.health);

    fill(col);
    stroke(col);
    strokeWeight(1);
    beginShape();
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape(CLOSE);

    pop();
  }

  boundaries() {
    const d = 25;
    let x = this.velocity.x;
    let y = this.velocity.y;

    if (this.position.x < d) {
      x = this.maxspeed;
    } else if (this.position.x > width - d) {
      x = -this.maxspeed;
    }

    if (this.position.y < d) {
      y = this.maxspeed;
    } else if (this.position.y > height - d) {
      y = -this.maxspeed;
    }

    if (x === this.velocity.x && y === this.velocity.y) return;

    const desired = createVector(x, y);
    desired.normalize();
    desired.mult(this.maxspeed);
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }
}
