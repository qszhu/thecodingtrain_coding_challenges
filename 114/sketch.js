let values;
let i = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  values = new Array(width).fill().map(() => random(height));
}

function sortStep() {
  for (let j = 0; j + 1 < values.length - i; j++) {
    if (values[j] > values[j + 1]) {
      [values[j], values[j + 1]] = [values[j + 1], values[j]];
    }
  }
  i++;
  return i >= values.length;
}

function draw() {
  background(0);

  if (sortStep()) {
    console.log("finished");
    noLoop();
  }

  stroke(255);
  for (let i = 0; i < values.length; i++) {
    line(i, height, i, height - values[i]);
  }
}
