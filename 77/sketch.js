function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  stroke(255);
  noFill();
  drawCircle(width / 2, height / 2, height / 2);
  noLoop();
}

function drawCircle(x, y, d) {
  ellipse(x, y, d);
  if (d > 1) {
    const newD = d * 0.5;
    drawCircle(x + newD, y, newD);
    drawCircle(x - newD, y, newD);
    drawCircle(x, y - newD, newD);
  }
}
