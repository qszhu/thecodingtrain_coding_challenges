const particles = [];
const springs = [];
const spacing = 50;
const k = 0.1;

let gravity;

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < 10; i++) {
    particles[i] = new Particle(width / 2, i * spacing);
    if (i !== 0) {
      const a = particles[i];
      const b = particles[i - 1];
      const spring = new Spring(k, spacing, a, b);
      springs.push(spring);
    }
  }

  particles[0].locked = true;

  gravity = createVector(0, 0.5);
}

function draw() {
  background(112, 50, 126);

  for (const s of springs) {
    s.update();
    s.show();
  }

  noFill();
  stroke(255, 238, 33);
  strokeWeight(8);
  const head = particles[0];
  for (const p of particles) {
    p.applyForce(gravity);
    p.update();
    p.show();
  }
  const tail = particles[particles.length - 1];

  fill(45, 197, 244);
  ellipse(tail.position.x, tail.position.y, 64);

  if (mouseIsPressed) {
    tail.position.set(mouseX, mouseY);
    tail.velocity.set(0, 0);
  }
}
