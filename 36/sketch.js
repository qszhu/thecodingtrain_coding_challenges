let yoff = 0;
const radius = 150;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  translate(width / 2, height / 2);

  beginShape();
  let xoff = 0;
  for (let a = 0; a < TWO_PI; a += 0.1) {
    const offset = map(noise(xoff, yoff), 0, 1, -25, 25);
    const r = radius + offset;
    const x = r * cos(a);
    const y = r * sin(a);
    vertex(x, y);
    xoff += 0.1;
  }
  endShape();

  yoff += 0.01;
}
