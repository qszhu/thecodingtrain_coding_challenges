let buffer1;
let buffer2;
let cooling;
let ystart = 0;

const h = 100;

function setup() {
  pixelDensity(1);
  createCanvas(windowWidth, h);
  w = width
  buffer1 = createGraphics(w, h);
  buffer2 = createGraphics(w, h);
  cooling = createImage(w, h);
}

function idx(x, y) {
  return (x + y * w) * 4;
}

function setGreyColor(buffer, idx, color) {
  for (let k = 0; k < 3; k++) {
    buffer.pixels[idx + k] = color;
  }
  buffer.pixels[idx + 3] = 255;
}

function cool() {
  const increment = 0.02;

  cooling.loadPixels();
  for (let x = 0, xoff = 0; x < w; x++, xoff += increment) {
    for (let y = 0, yoff = ystart; y < h; y++, yoff += increment) {
      const n = noise(xoff, yoff);
      const bright = pow(n, 3) * 255;
      setGreyColor(cooling, idx(x, y), bright);
    }
  }
  cooling.updatePixels();

  ystart += increment;
}

function fire(rows) {
  buffer1.loadPixels();
  for (let j = 0; j < rows; j++) {
    const y = h - 1 - j;
    for (let x = 0; x < w; x++) {
      setGreyColor(buffer1, idx(x, y), 255);
    }
  }
  buffer1.updatePixels();
}

function draw() {
  fire(2);
  if (mouseIsPressed) {
    buffer1.fill(255);
    buffer1.noStroke();
    buffer1.ellipse(mouseX, mouseY, 100, 100);
  }
  cool();

  background(0);

  buffer1.loadPixels();
  buffer2.loadPixels();

  for (let x = 1; x < w - 1; x++) {
    for (let y = 1; y < h - 1; y++) {
      const c1 = buffer1.pixels[idx(x + 1, y)];
      const c2 = buffer1.pixels[idx(x - 1, y)];
      const c3 = buffer1.pixels[idx(x, y + 1)];
      const c4 = buffer1.pixels[idx(x, y - 1)];
      const c0 = cooling.pixels[idx(x, y)];
      const newC = (c1 + c2 + c3 + c4) / 4 - c0;
      setGreyColor(buffer2, idx(x, y - 1), newC);
    }
  }
  buffer2.updatePixels();

  let temp = buffer1;
  buffer1 = buffer2;
  buffer2 = temp;

  image(buffer2, 0, 0);
}
