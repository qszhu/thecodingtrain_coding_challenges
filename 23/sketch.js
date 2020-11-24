var slider;

const n1 = 1;
const n2 = 1;
const n3 = 1;
let m = 5;
const a = 1;
const b = 1;

var osc = 0;

function setup() {
  createCanvas(400, 400);
  slider = createSlider(0, 10, 5, 1);
}

function supershape(theta) {
  let part1 = (1 / a) * cos((theta * m) / 4);
  part1 = pow(abs(part1), n2);

  let part2 = (1 / b) * sin((theta * m) / 4);
  part2 = pow(abs(part2), n3);

  return 1 / pow(part1 + part2, 1 / n1);
}

function draw() {
  m = slider.value(); // map(sin(osc), -1, 1, 0, 10);
  osc += 0.02;

  background(51);
  translate(width / 2, height / 2);

  stroke(255);
  noFill();

  const radius = 100;
  const total = 200;
  const increment = TWO_PI / total;

  beginShape();
  for (let angle = 0; angle < TWO_PI; angle += increment) {
    const r = supershape(angle);
    const x = radius * r * cos(angle);
    const y = radius * r * sin(angle);

    vertex(x, y);
  }

  endShape(CLOSE);
}
