const numBoids = 200
const flock = []
let boundary

let alignSlider, cohesionSlider, separationSlider;

function setup() {
  createCanvas(windowWidth, windowHeight - 20);

  boundary = new Rectangle(0, 0, width, height);

  alignSlider = createSlider(0, 2, 1, 0.1);
  cohesionSlider = createSlider(0, 2, 1, 0.1);
  separationSlider = createSlider(0, 2, 1, 0.1);

  for (let i = 0; i < numBoids; i++) {
    flock.push(new Boid());
  }
}

function draw() {
  background(51);

  const qtree = new QuadTree(boundary, 4)
  for (const boid of flock) {
    qtree.insert(new Point(boid.position.x, boid.position.y, boid))
  }

  for (const boid of flock) {
    boid.edges();
    boid.flock(qtree);
    boid.update();
    boid.show();
  }
}
