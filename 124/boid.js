const maxForce = 1;
const maxSpeed = 4;

class Boid {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(random(2, 4));
    this.acceleration = createVector();
  }

  edges() {
    this.position.x = (this.position.x + width) % width;
    this.position.y = (this.position.y + height) % height;
  }

  getSteering(boids, perceptionRadius, processSteering, afterProcessSteering) {
    let steering = createVector();
    let total = 0;

    const { x: x1, y: y1 } = this.position;
    const boundary = new Rectangle(x1 - perceptionRadius, y1 - perceptionRadius, x1 + perceptionRadius, y1 + perceptionRadius)
    const candidates = boids.query(boundary)
    for (const { userData: other } of candidates) {
      if (other === this) continue;

      const { x: x2, y: y2 } = other.position;
      const d = dist(x1, y1, x2, y2);

      if (d < perceptionRadius) {
        steering = processSteering(steering, this, other, d);
        total++;
      }
    }

    if (total > 0) {
      steering.div(total);

      if (afterProcessSteering) {
        steering = afterProcessSteering(steering, this);
      }

      steering.setMag(maxSpeed);
      steering.sub(this.velocity);
      steering.limit(maxForce);
    }

    return steering;
  }

  align(boids) {
    return this.getSteering(boids, 50, (steering, self, other, d) => {
      steering.add(other.velocity);
      return steering;
    });
  }

  separation(boids) {
    return this.getSteering(boids, 50, (steering, self, other, d) => {
      const diff = p5.Vector.sub(self.position, other.position);
      diff.div(d * d);
      steering.add(diff);
      return steering;
    });
  }

  cohesion(boids) {
    return this.getSteering(
      boids,
      100,
      (steering, self, other, d) => {
        steering.add(other.position);
        return steering;
      },
      (steering, self) => {
        steering.sub(self.position);
        return steering;
      }
    );
  }

  flock(boids) {
    const alignment = this.align(boids);
    const cohesion = this.cohesion(boids);
    const separation = this.separation(boids);

    alignment.mult(alignSlider.value());
    cohesion.mult(cohesionSlider.value());
    separation.mult(separationSlider.value());

    this.acceleration.add(alignment);
    this.acceleration.add(cohesion);
    this.acceleration.add(separation);
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.acceleration.mult(0);
  }

  show() {
    strokeWeight(8);
    stroke(255);
    point(this.position.x, this.position.y);
  }
}
