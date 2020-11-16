let a = 0;
let sponge = [];
let level = 0;
let DIM = 0

function setup() {
  DIM = Math.min(windowWidth, windowHeight) / 2;
  createCanvas(windowWidth, windowHeight, WEBGL);

  normalMaterial();
  sponge.push(new Box(0, 0, 0, DIM));
}

function mousePressed() {
  if (level === 3) {
    level = 0;
    sponge = [new Box(0, 0, 0, DIM)];
  } else {
    sponge = sponge.reduce((acc, val) => acc.concat(val.generate()), []);
    level++;
  }
}

function draw() {
  background(51);
  rotateX(a);
  rotateY(a * 0.4);
  rotateZ(a * 0.1);
  sponge.forEach((b) => b.show());
  a += 0.01;
}
