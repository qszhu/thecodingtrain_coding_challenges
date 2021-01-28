const attractors = [];
const particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  attractors.push(createVector(mouseX, mouseY));
}

function draw() {
  background(51, 50);
  strokeWeight(4);
  particles.push(new Particle(random(width), random(height)));

  if (particles.length > 100) {
    particles.splice(0, 1);
  }

  for (const attractor of attractors) {
    stroke(0, 255, 0);
    point(attractor.x, attractor.y);
  }

  for (const particle of particles) {
    for (const attractor of attractors) {
      particle.attracted(attractor);
    }
    particle.update();
    particle.show();
  }
}
