let pi = 0;
let iterations = 0;
const history = [];
let div;

const minY = 2;
const maxY = 4;

function setup() {
  createCanvas(600, 400);
  div = createDiv("").style("font-size", "64pt");
}

function draw() {
  background(0);

  let den = iterations * 2 + 1;
  if (iterations % 2 === 0) {
    pi += 4 / den;
  } else {
    pi -= 4 / den;
  }
  history.push(pi);

  stroke(255);
  noFill();

  const piY = map(PI, minY, maxY, height, 0);
  line(0, piY, width, piY);

  beginShape();
  const spacing = width / history.length;
  for (let i = 0; i < history.length; i++) {
    const x = i * spacing;
    const y = map(history[i], minY, maxY, height, 0);
    vertex(x, y);
  }
  endShape();

  div.html(pi);
  iterations++;
}
