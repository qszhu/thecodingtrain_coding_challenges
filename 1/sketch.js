const NUM_STARS = 800;
const MAX_SPEED = 20;

let stars = [];
let speed;

function setup() {
  const DIM = Math.min(windowWidth, windowHeight);
  createCanvas(DIM, DIM);
  for (let i = 0; i < NUM_STARS; i++) {
    stars[i] = new Star();
  }
}

function draw() {
  speed = map(mouseX, 0, width, -MAX_SPEED, MAX_SPEED);
  background(0);
  translate(width / 2, height / 2);
  for (const star of stars) {
    star.update();
    star.show();
  }
}
