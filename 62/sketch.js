const { Engine, World, Events, Bodies } = Matter;

let engine;
let world;
let particles = [];
let plinkos = [];
let bounds = [];
const cols = 11;
const rows = 10;

function setup() {
  createCanvas(600, 700);
  colorMode(HSB);

  engine = Engine.create();
  world = engine.world;

  newParticle();

  const spacing = width / cols;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols + 1; j++) {
      let x = j * spacing;
      if (i % 2 === 0) {
        x += spacing / 2;
      }
      const y = (i + 1) * spacing;
      const p = new Plinko(x, y, 16);
      plinkos.push(p);
    }
  }

  const b = new Boundary(width / 2, height + 50, width, 100);
  bounds.push(b);

  for (let i = 0; i < cols + 2; i++) {
    const x = i * spacing;
    const h = 100;
    const w = 10;
    const y = height - h / 2;
    const b = new Boundary(x, y, w, h);
    bounds.push(b);
  }
}

function newParticle() {
  const p = new Particle(300, 0, 10);
  particles.push(p);
}

function draw() {
  background(0, 0, 0);

  if (frameCount % 20 === 0) {
    newParticle();
  }

  Engine.update(engine, 1000 / frameRate());

  for (let i = 0; i < particles.length; i++) {
    particles[i].show();
    if (particles[i].isOffScreen()) {
      World.remove(world, particles[i].body);
      particles.splice(i, 1);
      i--;
    }
  }

  for (const p of plinkos) {
    p.show();
  }

  for (const b of bounds) {
    b.show();
  }
}
