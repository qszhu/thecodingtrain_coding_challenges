const digits = 7;
let c = new Decimal(0.25);
const e = Decimal.div(1, Decimal.pow(100, digits - 1));
let z = new Decimal(0);
let iterations = 0;

let mandel;

function preload() {
  mandel = loadImage("mandelbrot.jpg");
}

function setup() {
  createCanvas(1440, 1080);
  c = c.plus(e);
}

function draw() {
  for (let i = 0; i < 30000; i++) {
    if (z.lt(2)) {
      z = Decimal.mul(z, z).plus(c);
      iterations++;
    } else {
      noLoop();
      break;
    }
  }

  background(mandel);
  fill(255);
  textSize(48);
  textAlign(CENTER);

  let s = `${iterations}`;
  const diff = digits - s.length;
  for (let i = 0; i < diff; i++) {
    s = `0${s}`;
  }
  s = `${s.substring(0, 1)}.${s.substring(1)}`;
  text(s, width / 2 + 250, height / 2 + textDescent());
}
