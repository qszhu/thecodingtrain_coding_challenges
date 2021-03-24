const cirPath = [];
const triPath = [];
const spacing = 1;
let theta = 0;

function polarToCartesian(r, angle) {
  return createVector(r * cos(angle), r * sin(angle));
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  const radius = 300;
  let startA = 0;
  let endA = 120;
  let start = polarToCartesian(radius, startA);
  let end = polarToCartesian(radius, endA);
  for (let a = startA; a < 360; a += spacing) {
    const cv = polarToCartesian(radius, a);
    cirPath.push(cv);

    const amt = (a % 120) / (endA - startA);
    const tv = p5.Vector.lerp(start, end, amt);
    triPath.push(tv);

    if ((a + spacing) % 120 === 0) {
      startA += 120;
      endA += 120;
      start = polarToCartesian(radius, startA);
      end = polarToCartesian(radius, endA);
    }
  }
}

function draw() {
  background(220);
  translate(width / 2, height / 2);
  rotate(30);

  stroke(0);
  strokeWeight(4);
  noFill();

  const amt = (sin(theta) + 1) / 2;
  theta += 1;

  beginShape();
  for (let i = 0; i < cirPath.length; i++) {
    const cv = cirPath[i];
    const tv = triPath[i];
    const x = lerp(cv.x, tv.x, amt);
    const y = lerp(cv.y, tv.y, amt);
    vertex(x, y);
  }
  endShape(CLOSE);
}
