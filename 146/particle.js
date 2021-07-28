class Particle {
  constructor() {
    this.pos = createVector(sceneW / 2, sceneH / 2);
    this.heading = 0;
    this.updateFOV(60);
  }

  updateFOV(fov) {
    this.fov = fov;
    this.rays = [];
    for (let a = -this.fov / 2; a < this.fov / 2; a += 1) {
      this.rays.push(new Ray(this.pos, radians(a) + this.heading));
    }
  }

  rotate(angle) {
    this.heading += angle;
    for (let i = 0, a = -this.fov / 2; a < this.fov / 2; a += 1) {
      this.rays[i++].setAngle(radians(a) + this.heading);
    }
  }

  move(amt) {
    const vel = p5.Vector.fromAngle(this.heading);
    vel.setMag(amt);
    this.pos.add(vel);
  }

  update(x, y) {
    this.pos.set(x, y);
  }

  look(walls) {
    const scene = [];
    for (const ray of this.rays) {
      let closest;
      let record = Infinity;
      for (const wall of walls) {
        const pt = ray.cast(wall);
        if (pt) {
          let d = p5.Vector.dist(this.pos, pt);
          const a = ray.dir.heading() - this.heading;
          d *= cos(a);
          if (d < record) {
            record = d;
            closest = pt;
          }
        }
      }
      if (closest) {
        stroke(255, 100);
        line(this.pos.x, this.pos.y, closest.x, closest.y);
      }
      scene.push(record);
    }
    return scene;
  }

  show() {
    fill(255);

    ellipse(this.pos.x, this.pos.y, 4);

    for (const ray of this.rays) {
      ray.show();
    }
  }
}
