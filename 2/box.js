class Box {
  constructor(x, y, z, r) {
    this.pos = createVector(x, y, z);
    this.r = r;
  }
  generate() {
    const boxes = [];
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        for (let k = -1; k <= 1; k++) {
          const sum = abs(i) + abs(j) + abs(k);
          if (sum <= 1) continue;
          const newR = this.r / 3;
          boxes.push(
            new Box(
              this.pos.x + i * newR,
              this.pos.y + j * newR,
              this.pos.z + k * newR,
              newR
            )
          );
        }
      }
    }
    return boxes;
  }
  show() {
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    box(this.r);
    pop();
  }
}
