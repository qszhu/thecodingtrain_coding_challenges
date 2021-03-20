class Particle {
  constructor() {
    this.x = width / 2;
    this.y = height - 16;
    this.vx = random(-1, 1);
    this.vy = random(-5, -1);
    this.alpha = 255;
  }

  finished() {
    return this.alpha < 0;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 5;
  }

  show() {
    noStroke();
    fill(255, this.alpha);
    ellipse(this.x, this.y, 16);
  }
}

let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  for (let i = 0; i < 5; i++) {
    let p = new Particle();
    particles.push(p);
  }

  for (const p of particles) {
    p.update();
    p.show();
  }

  particles = particles.filter((p) => !p.finished());
}
