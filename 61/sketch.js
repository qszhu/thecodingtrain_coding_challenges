const path = [];
let angle = 0;
const resolution = 10;

let sun;
let end;

function setup() {
  createCanvas(windowWidth, windowHeight);
  sun = new Orbit(width / 2, height / 2, width / 8, 0);
  let next = sun;
  for (let i = 0; i < 10; i++) {
    next = next.addChild();
  }
  end = next;
}

function draw() {
  background(51);

  for (let next = sun; next !== null; next = next.child) {
    next.update();
  }
  if (path.length < 20000) path.push(createVector(end.x, end.y));

  for (let next = sun; next !== null; next = next.child) {
    next.show();
  }

  beginShape();
  stroke(255, 0, 255);
  noFill();
  for (const pos of path) {
    vertex(pos.x, pos.y);
  }
  endShape();
}
