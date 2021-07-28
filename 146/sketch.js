const walls = [];
let ray;
let particle;

let sceneW;
let sceneH;

function setup() {
  createCanvas(windowWidth, windowHeight);
  sceneW = width / 2;
  sceneH = height;

  for (let i = 0; i < 5; i++) {
    const x1 = random(sceneW);
    const y1 = random(sceneH);
    const x2 = random(sceneW);
    const y2 = random(sceneH);
    walls[i] = new Boundary(x1, y1, x2, y2);
  }
  walls.push(new Boundary(0, 0, sceneW, 0));
  walls.push(new Boundary(sceneW, 0, sceneW, sceneH));
  walls.push(new Boundary(sceneW, sceneH, 0, sceneH));
  walls.push(new Boundary(0, sceneH, 0, 0));

  particle = new Particle();
}

function draw() {
  if (keyIsDown(LEFT_ARROW)) {
    particle.rotate(-0.1);
  } else if (keyIsDown(RIGHT_ARROW)) {
    particle.rotate(0.1);
  } else if (keyIsDown(UP_ARROW)) {
    particle.move(2);
  } else if (keyIsDown(DOWN_ARROW)) {
    particle.move(-2);
  }

  background(0);

  for (const wall of walls) {
    wall.show();
  }

  particle.show();

  const distProjPlane = sceneW / 2 / tan(particle.fov / 2);
  const scene = particle.look(walls);
  const w = sceneW / scene.length;

  push();

  translate(sceneW, 0);

  noStroke();
  rectMode(CENTER);
  for (let i = 0; i < scene.length; i++) {
    const sq = scene[i] * scene[i];
    const wSq = sceneW * sceneW;
    const b = map(sq, 0, wSq, 255, 0);
    const h = (sceneW / scene[i]) * distProjPlane;

    fill(b);
    rect(i * w + w / 2, sceneH / 2, w + 1, h);
  }

  pop();
}
