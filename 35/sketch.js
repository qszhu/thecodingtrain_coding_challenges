let cities = [];
const totalCitites = 32;

const popSize = 500;
let population = [];
let fitness = [];

let recordDistance = Infinity;
let bestEver;
let currentBest;

function setup() {
  createCanvas(800, 800);
  const order = [];
  for (let i = 0; i < totalCitites; i++) {
    const v = createVector(random(width), random(height / 2));
    cities[i] = v;
    order[i] = i;
  }

  for (let i = 0; i < popSize; i++) {
    population[i] = shuffle(order);
  }
}

function drawSolution(solution) {
  stroke(255);
  strokeWeight(4);
  noFill();

  beginShape();
  for (let i = 0; i < solution.length; i++) {
    const n = solution[i];
    const { x, y } = cities[n];
    vertex(x, y);
    ellipse(x, y, 16, 16);
  }
  endShape();
}

function draw() {
  background(0);

  calculateFitness();
  normalizeFitness();
  nextGeneration();

  drawSolution(bestEver);

  translate(0, height / 2);

  drawSolution(currentBest);
}

function swap(a, i, j) {
  [a[i], a[j]] = [a[j], a[i]];
}

function calcDistance(points, order) {
  let sum = 0;
  for (let i = 0; i < order.length - 1; i++) {
    const { x: x1, y: y1 } = points[order[i]];
    const { x: x2, y: y2 } = points[order[i + 1]];
    sum += dist(x1, y1, x2, y2);
  }
  return sum;
}
