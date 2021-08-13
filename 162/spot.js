class Spot {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.x = i * spacing;
    this.y = j * spacing;
    this.visited = false;
  }

  nextSpot() {
    const validOptions = [];
    for (const [di, dj] of [
      [-1, 0],
      [0, 1],
      [1, 0],
      [0, -1],
    ]) {
      const newI = this.i + di;
      const newJ = this.j + dj;
      if (isValid(newI, newJ) && !grid[newI][newJ].visited) {
        validOptions.push([newI, newJ]);
      }
    }

    if (validOptions.length > 0) {
      const [i, j] = random(validOptions);
      return grid[i][j];
    }
  }
}
