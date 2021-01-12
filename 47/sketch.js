let img;
let sorted;
let colors;
let sortRanges = [];

function compareColors(c1, c2) {
  const h = hue(c1) - hue(c2);
  if (h !== 0) return h;
  const b = brightness(c1) - brightness(c2);
  if (b !== 0) return b;
  const s = saturation(c1) - saturation(c2);
  return s;
}

function sortStep(arr, compFn, ranges) {
  function swap(a, b) {
    [arr[a], arr[b]] = [arr[b], arr[a]];
  }

  if (ranges.length === 0) return;

  const [a, b] = ranges.pop();
  if (a >= b) return;

  const p = a; //floor(random(a, b + 1));
  swap(p, b);
  let j = a;
  for (let i = a; i < b; i++) {
    if (compFn(arr[i], arr[b]) < 0) {
      swap(i, j++);
    }
  }
  swap(j, b);
  ranges.push([a, j], [j + 1, b]);
}

function preload() {
  img = loadImage("data/sunflower400.jpg");
}

function setup() {
  createCanvas(800, 400);

  img.loadPixels();
  colors = [];
  for (let i = 0; i < img.pixels.length; i += 4) {
    colors.push(
      color(
        img.pixels[i],
        img.pixels[i + 1],
        img.pixels[i + 2],
        img.pixels[i + 3]
      )
    );
  }

  sorted = createImage(img.width, img.height);
  sorted.loadPixels();

  sortRanges.push([0, colors.length - 1]);
}

function draw() {
  sortStep(colors, compareColors, sortRanges);

  for (let i = 0, j = 0; i < sorted.pixels.length; i += 4, j++) {
    sorted.pixels[i] = red(colors[j]);
    sorted.pixels[i + 1] = green(colors[j]);
    sorted.pixels[i + 2] = blue(colors[j]);
    sorted.pixels[i + 3] = alpha(colors[j]);
  }

  sorted.updatePixels();

  background(0);
  image(img, 0, 0);
  image(sorted, 400, 0);
}
