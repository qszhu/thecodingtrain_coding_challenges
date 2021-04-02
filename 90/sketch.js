let kitten;

function preload() {
  kitten = loadImage("kitten.jpg");
}

function setup() {
  createCanvas(1024, 512);

  image(kitten, 0, 0);
  makeDithered(kitten, 1);
  image(kitten, 512, 0);
  filter(GRAY);
}

function imageIndex(img, x, y) {
  return 4 * (x + y * img.width);
}

function getColor(img, x, y) {
  const i = imageIndex(img, x, y);
  const p = img.pixels;
  const [r, g, b, a] = p.slice(i, i + 4);
  return [r, g, b, a];
}

function setColor(img, x, y, c) {
  const i = imageIndex(img, x, y);
  const p = img.pixels;
  [p[i], p[i + 1], p[i + 2], p[i + 3]] = c;
}

function closestStep(max, steps, value) {
  return round((steps * value) / max) * floor(max / steps);
}

function makeDithered(img, steps) {
  img.loadPixels();

  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      const oldC = getColor(img, x, y);
      const newC = oldC.map((c) => closestStep(255, steps, c));
      setColor(img, x, y, newC);
      const errC = oldC.map((c, i) => c - newC[i]);
      distributeError(img, x, y, errC);
    }
  }

  img.updatePixels();
}

function distributeError(img, x, y, errC) {
  addError(img, 7 / 16, x + 1, y, errC);
  addError(img, 3 / 16, x - 1, y + 1, errC);
  addError(img, 5 / 16, x, y + 1, errC);
  addError(img, 1 / 16, x + 1, y + 1, errC);
}

function addError(img, factor, x, y, errC) {
  if (x < 0 || x >= img.width || y < 0 || y >= img.height) return;

  let c = getColor(img, x, y);
  c = c.map((c, i) => c + errC[i] * factor);
  setColor(img, x, y, c);
}
