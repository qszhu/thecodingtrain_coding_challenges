const symmetry = 6;
const angle = 360 / symmetry;
let xoff = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);

  angleMode(DEGREES);
  background(127);
}

function draw() {
  if (!mouseIsPressed) return;

  translate(width / 2, height / 2);

  const mx = mouseX - width / 2;
  const my = mouseY - height / 2;
  const pmx = pmouseX - width / 2;
  const pmy = pmouseY - height / 2;

  const hu = map(sin(xoff), -1, 1, 0, 255);
  xoff += 1;
  stroke(hu, 100);

  for (let i = 0; i < symmetry; i++) {
    rotate(angle);

    const d = dist(mx, my, pmx, pmy);
    const sw = map(d, 0, 16, 16, 2);
    strokeWeight(sw);

    line(mx, my, pmx, pmy);

    push();
    scale(1, -1);
    line(mx, my, pmx, pmy);
    pop();
  }
}
