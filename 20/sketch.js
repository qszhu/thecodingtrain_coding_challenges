const rows = 30;
const cols = 30;

const particles = new Array(rows).fill().map((_) => new Array(cols));
const springs = [];

const w = 15;

let physics;

function setup() {
  createCanvas(windowWidth, windowHeight);

  physics = new VerletPhysics2D();

  const gravity = new Vec2D(0, 1);
  const gb = new GravityBehavior(gravity);
  physics.addBehavior(gb);

  for (let y = 10, i = 0; i < rows; i++, y += w) {
    for (let x = 100, j = 0; j < cols; j++, x += w) {
      const p = new Particle(x, y);
      particles[i][j] = p;
      physics.addParticle(p);
    }
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const a = particles[i][j];
      if (i !== rows - 1) {
        const b = particles[i + 1][j];
        const s = new Spring(a, b);
        springs.push(s);
        physics.addSpring(s);
      }
      if (j !== cols - 1) {
        const b = particles[i][j + 1];
        const s = new Spring(a, b);
        springs.push(s);
        physics.addSpring(s);
      }
    }
  }

  particles[0][0].lock();
  particles[0][cols - 1].lock();
}

function draw() {
  background(0);
  physics.update();

  for (const s of springs) {
    s.show();
  }
}
