let x, y;
let xspeed = 3,
  yspeed = 3;

let dvd;
let r, g, b;

function preload() {
  dvd = loadImage("dvd_logo.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = random(width);
  y = random(height);
  pickColor();
}

function pickColor() {
  r = random(100, 256);
  g = random(100, 256);
  b = random(100, 256);
}

function draw() {
  background(0);
  tint(r, g, b);
  image(dvd, x, y);

  x += xspeed;
  y += yspeed;

  if (x <= 0 || x + dvd.width >= width) {
    xspeed *= -1;
    pickColor();
  }

  if (y <= 0 || y + dvd.height >= height) {
    yspeed *= -1;
    pickColor();
  }

  x = constrain(x, 0, width - dvd.width);
  y = constrain(y, 0, height - dvd.height);
}
