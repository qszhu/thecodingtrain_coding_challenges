let slider;

function setup() {
  createCanvas(400, 400);
  slider = createSlider(0, 10, 2, 0.01);
}

function draw() {
  background(51);
  translate(width / 2, height / 2);

  const a = 100;
  const b = 100;
  const n = slider.value();
  stroke(255);
  noFill();

  beginShape();
  for (let angle = 0; angle < TWO_PI; angle += 0.1) {
    const na = 2 / n;
    const [sina, cosa] = [sin(angle), cos(angle)];
    const x = abs(cosa) ** na * a * sgn(cosa);
    const y = abs(sina) ** na * b * sgn(sina);
    vertex(x, y);
  }
  endShape(CLOSE);
}

function sgn(val) {
  if (val > 0) return 1;
  if (val < 0) return -1;
  return 0;
}
