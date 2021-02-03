let yoff = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(51);
  translate(width / 2, height / 2);

  stroke(255);
  fill(255, 50);
  strokeWeight(1);

  const da = PI / 200;
  const dx = 0.05;

  let xoff = 0;
  beginShape();
  for (let a = 0; a <= TWO_PI; a += da) {
    const n = noise(xoff, yoff);
    const r = sin(2 * a) * map(n, 0, 1, 50, 300);
    const x = sin(yoff * 10) * r * cos(a);
    const y = r * sin(a);
    if (a < PI) xoff += dx;
    else xoff -= dx;
    vertex(x, y);
  }
  endShape();

  yoff += 0.01;
}
