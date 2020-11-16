let sun;

function setup() {
  createCanvas(windowWidth, windowHeight);
  sun = new Planet(50, 0, 0, random(TWO_PI));
  sun.spawnMoons(5, 1);
}

function draw() {
  background(51);
  translate(width / 2, height / 2);
  sun.orbit();
  sun.show();
}
