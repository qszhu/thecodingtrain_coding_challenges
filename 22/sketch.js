let angle = 0;

const maxiterations = 100;

const colorsRed = [];
const colorsGreen = [];
const colorsBlue = [];

function setup() {
  pixelDensity(1);
  createCanvas(640, 360);
  colorMode(HSB, 1);

  for (let n = 0; n < maxiterations; n++) {
    const hu = sqrt(n / maxiterations);
    const col = color(hu, 255, 150);
    colorsRed[n] = red(col);
    colorsGreen[n] = green(col);
    colorsBlue[n] = blue(col);
  }
}

function draw() {
  const ca = cos(angle * 3.213);
  const cb = sin(angle);

  angle += 0.02;

  background(255);

  const w = 5; // * abs(sin(angle));
  const h = (w * height) / width;

  const xmin = -w / 2;
  const ymin = -h / 2;
  const xmax = xmin + w;
  const ymax = ymin + h;
  const dx = (xmax - xmin) / width;
  const dy = (ymax - ymin) / height;

  loadPixels();

  let y = ymin;
  for (let j = 0; j < height; j++) {
    let x = xmin;
    for (let i = 0; i < width; i++) {
      let a = x;
      let b = y;
      // let [a, b] = [x, y]; // slow!
      let n = 0;
      while (n < maxiterations) {
        const aa = a * a;
        const bb = b * b;
        // const [aa, bb] = [a * a, b * b]; // slow!
        if (aa + bb > 4) break;
        const twoab = 2 * a * b;
        a = aa - bb + ca;
        b = twoab + cb;
        n++;
      }

      const pix = (j * width + i) * 4;
      if (n === maxiterations) {
        pixels[pix + 0] = 0;
        pixels[pix + 1] = 0;
        pixels[pix + 2] = 0;
      } else {
        pixels[pix + 0] = colorsRed[n];
        pixels[pix + 1] = colorsGreen[n];
        pixels[pix + 2] = colorsBlue[n];
      }
      x += dx;
    }
    y += dy;
  }
  updatePixels();
}
