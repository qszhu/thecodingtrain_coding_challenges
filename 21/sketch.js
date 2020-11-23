const minval = -2.5;
const maxval = 2.5;

function setup() {
  const dim = min(windowWidth, windowHeight);
  createCanvas(dim, dim);
  pixelDensity(1);
}

function draw() {
  const maxiterations = 1000;

  loadPixels();

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let a = map(x, 0, width, minval, maxval);
      let b = map(y, 0, height, minval, maxval);

      const [ca, cb] = [a, b];
      let n = 0;
      while (n < maxiterations) {
        const aa = a * a - b * b;
        const bb = 2 * a * b;
        a = aa + ca;
        b = bb + cb;
        if (a * a + b * b > 16) break;
        n++;
      }

      let bright = map(n, 0, maxiterations, 0, 1);
      bright = map(sqrt(bright), 0, 1, 0, 255);

      if (n === maxiterations) bright = 0;

      const pix = (y * width + x) * 4;
      pixels[pix + 0] = bright;
      pixels[pix + 1] = bright;
      pixels[pix + 2] = bright;
      pixels[pix + 3] = 255;
    }
  }

  updatePixels();
}
