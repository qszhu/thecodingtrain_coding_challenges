let population;
const lifespan = 400;
let lifeP;
let count = 0;
let target;
const maxforce = 0.2;

const rx = 100;
const ry = 150;
const rw = 200;
const rh = 10;

function setup() {
  createCanvas(400, 300);
  population = new Population();
  lifeP = createP();
  target = createVector(width / 2, 50);
}

function draw() {
  background(0);
  population.run();
  lifeP.html(count);

  count++;
  if (count === lifespan) {
    population.evaluate();
    population.selection();
    count = 0;
  }

  fill(255);
  rect(rx, ry, rw, rh);
  ellipse(target.x, target.y, 16, 16);
}
