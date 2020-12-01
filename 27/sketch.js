let fireworks = [];
let gravity;

function setup() {
  createCanvas(windowWidth, windowHeight);
  gravity = createVector(0, 0.2);
}

function draw() {
  colorMode(RGB);
  background(0, 0, 0, 25);

  if (random(1) < 0.03) fireworks.push(new Firework());

  for (const f of fireworks) {
    f.update();
    f.show();
  }

  fireworks = fireworks.filter((f) => !f.done());
}
