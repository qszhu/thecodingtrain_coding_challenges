let unikitty;

const res = 1;
const rows = 40 / res;
const cols = 40 / res;

const particles = new Array(rows).fill().map((_) => new Array(cols));
const springs = [];

const w = 10 * res;
let zoff = 0;

let physics;

function preload() {
  unikitty = loadImage("unikitty.jpg");
}

function setup() {
  // createCanvas(windowWidth, windowHeight);
  createCanvas(800, 600, WEBGL);

  physics = new VerletPhysics2D();

  const gravity = new Vec2D(0, 0.5, 0);
  const gb = new GravityBehavior(gravity);
  physics.addBehavior(gb);

  let x = (-cols * w) / 2 - 100;
  for (let i = 0; i < cols; i++, x += w) {
    let y = (-rows * w) / 2;
    for (let j = 0; j < rows; j++, y += w) {
      p = new Particle(x, y, 0);
      particles[i][j] = p;
      physics.addParticle(p);
    }
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      a = particles[i][j];
      if (i + 1 < cols) {
        b1 = particles[i + 1][j];
        s1 = new Spring(a, b1);
        springs.push(s1);
        physics.addSpring(s1);
      }
      if (j + 1 < rows) {
        b2 = particles[i][j + 1];
        s2 = new Spring(a, b2);
        springs.push(s2);
        physics.addSpring(s2);
      }
    }
  }

  for (let i = 0; i < particles[0].length; i++) {
    particles[0][i].lock();
  }
}

function draw() {
  background(51);

  physics.update();

  for (let i = 0, xoff = 0; i < cols; i++, xoff += 0.1) {
    for (let j = 0, yoff = 0; j < rows; j++, yoff += 0.1) {
      const n = noise(xoff, yoff);
      const windx = map(noise(xoff, yoff, zoff), 0, 1, 0, 3);
      const windy = map(noise(xoff + 5000, yoff + 5000, zoff), 0, 1, -0.5, 0);
      const windz = map(noise(xoff + 3000, yoff + 3000, zoff), 0, 1, -1, 1);
      const wind = new Vec2D(windx, windy, windz);
      particles[i][j].addForce(wind);
    }
  }
  zoff += 0.1;

  noFill();
  noStroke();
  textureMode(NORMAL);
  for (let j = 0; j < rows - 1; j++) {
    beginShape(TRIANGLE_STRIP);
    texture(unikitty);
    for (let i = 0; i < cols; i++) {
      const { x: x1, y: y1, z: z1 } = particles[i][j];
      const u = map(i, 0, cols - 1, 0, 1);
      const v1 = map(j, 0, rows - 1, 0, 1);
      vertex(x1, y1, z1, u, v1);

      const { x: x2, y: y2, z: z2 } = particles[i][j + 1];
      const v2 = map(j + 1, 0, rows - 1, 0, 1);
      vertex(x2, y2, z2, u, v2);
    }
    endShape();
  }
  /*
  stroke(255);
  strokeWeight(4);
  line((-cols * w) / 2 - 100, (-rows * w) / 2, (-cols * w) / 2 - 100, height);
  */
}
