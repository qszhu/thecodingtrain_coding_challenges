let circles;
let img;

function preload() {
  img = loadImage("kitten.jpg");
}

function setup() {
  createCanvas(600, 600);
  img.loadPixels();
  circles = [];
}

function newCircle() {
  const x = random(0, img.width);
  const y = random(0, img.height);

  let valid = true;
  for (const circle of circles) {
    if (circle.distanceTo(x, y) < circle.r + 2) {
      valid = false;
      break;
    }
  }

  if (valid) {
    const idx = floor(x + y * img.width) * 4;
    const r = img.pixels[idx];
    const g = img.pixels[idx + 1];
    const b = img.pixels[idx + 2];
    const c = color(r, g, b);
    return new Circle(x, y, c);
  }
}

function putNewCircle() {
  const total = 10;
  let count = 0;
  let attempts = 0;
  const stop = 1000;

  while (count < total) {
    const circle = newCircle();
    if (circle) {
      circles.push(circle);
      count++;
    }
    attempts++;
    if (attempts > stop) {
      noLoop();
      console.log("finished");
      break;
    }
  }
}

function draw() {
  background(0);

  putNewCircle();

  for (const circle of circles) {
    if (circle.growing) {
      if (circle.touchesEdge) circle.growing = false;
      else {
        for (const other of circles) {
          if (circle === other) continue;
          if (circle.overlaps(other)) {
            circle.growing = false;
            break;
          }
        }
      }
    }
    circle.show();
    circle.grow();
  }
}
