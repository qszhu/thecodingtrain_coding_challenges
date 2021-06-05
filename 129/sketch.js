let segments = [];

function setup() {
  createCanvas(600, 800);
  const a = createVector(0, 100);
  const b = createVector(600, 100);
  const s1 = new Segment(a, b);

  const len = p5.Vector.dist(a, b);
  const h = (len * sqrt(3)) / 2;
  const c = createVector(300, 100 + h);

  const s2 = new Segment(b, c);
  const s3 = new Segment(c, a);

  segments.push(s1, s2, s3);
}

function mousePressed() {
  segments = segments.reduce((acc, val) => acc.concat(val.generate()), []);
}

function draw() {
  background(0);
  translate(0, 100);

  for (const s of segments) {
    s.show();
  }
}
