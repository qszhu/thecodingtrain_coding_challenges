const cells = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  cells.push(new Cell());
}

function draw() {
  background(200);
  for (const cell of cells) {
    cell.move();
    cell.show();
  }
}

function mousePressed() {
  for (let i = cells.length - 1; i >= 0; i--) {
    const cell = cells[i];
    if (cell.clicked(mouseX, mouseY)) {
      cells.push(...cell.mitosis());
      cells.splice(i, 1);
    }
  }
}
