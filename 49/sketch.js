let obama;
let smaller;

const scl = 16;
let w, h;

function preload() {
  obama = loadImage("obama.jpg");
}

function setup() {
  w = floor(obama.width / scl);
  h = floor(obama.height / scl);

  createCanvas(w * scl, h * scl);

  smaller = createImage(w, h, RGB);
  smaller.copy(obama, 0, 0, obama.width, obama.height, 0, 0, w, h);
}

function draw() {
  background(0);
  noStroke();
  smaller.loadPixels();

  let idx = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const c = color(
        smaller.pixels[idx++],
        smaller.pixels[idx++],
        smaller.pixels[idx++],
        smaller.pixels[idx++]
      );
      fill(c);
      rect(x * scl, y * scl, scl, scl);
    }
  }
  noLoop();
}
