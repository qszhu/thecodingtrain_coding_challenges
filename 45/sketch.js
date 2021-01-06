const drawing = [];
let currentPath = [];
let isDrawing = false;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.mousePressed(startPath);
  canvas.mouseReleased(endPath);
}

function startPath() {
  isDrawing = true;
  currentPath = [];
  drawing.push(currentPath);
}

function endPath() {
  isDrawing = false;
}

function draw() {
  background(0);

  if (isDrawing) {
    currentPath.push({
      x: mouseX,
      y: mouseY,
    });
  }

  stroke(255);
  strokeWeight(4);
  noFill();

  for (const path of drawing) {
    beginShape();
    for (const { x, y } of path) {
      vertex(x, y);
    }
    endShape();
  }
}
