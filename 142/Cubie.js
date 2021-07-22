class Cubie {
  constructor(m, x, y, z, i) {
    this.matrix = m;
    this.x = x;
    this.y = y;
    this.z = z;
    this.faces = [
      // back: blue
      new Face(createVector(0, 0, -1), color(0, 0, 255), i),
      // front: green
      new Face(createVector(0, 0, 1), color(0, 255, 0), i),
      // bottom: white, y is reversed？
      new Face(createVector(0, 1, 0), color(255, 255, 255), i),
      // top: yellow
      new Face(createVector(0, -1, 0), color(255, 255, 0), i),
      // right: orange
      new Face(createVector(1, 0, 0), color(255, 150, 0), i),
      // left: red
      new Face(createVector(-1, 0, 0), color(255, 0, 0), i),
    ];
  }

  turnFacesX(dir) {
    this.faces.forEach((f) => f.turnX(-dir * HALF_PI));
  }

  turnFacesY(dir) {
    this.faces.forEach((f) => f.turnY(dir * HALF_PI));
  }

  turnFacesZ(dir) {
    this.faces.forEach((f) => f.turnZ(-dir * HALF_PI));
  }

  updatePos(x, y, z) {
    this.matrix.reset();
    this.matrix.translate(x, y, z);
    this.x = x;
    this.y = y;
    this.z = z;
  }

  show() {
    noFill();
    stroke(0);
    strokeWeight(1);

    push();

    // translate(this.x, this.y, this.z)
    applyMatrix(...this.matrix.toArray());
    box(1);
    this.faces.forEach((f) => f.show());

    pop();
  }
}
