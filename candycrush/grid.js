class Grid {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.dim = width / rows;
    this.reset();
  }

  reset() {
    this.grid = new Array(rows).fill().map(() => new Array(cols).fill());
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const cell = new Cell(i, j, this.dim);
        this.grid[i][j] = cell;
      }
    }
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const cell = this.grid[i][j];
        if (i - 1 >= 0) cell.topCell = this.grid[i - 1][j];
        if (i + 1 < rows) cell.bottomCell = this.grid[i + 1][j];
        if (j - 1 >= 0) cell.leftCell = this.grid[i][j - 1];
        if (j + 1 < cols) cell.rightCell = this.grid[i][j + 1];
      }
    }

    this.swaps = [];
    this.trySwap = false;
    this.afterSwap = false;
  }

  dropShape(col, shape) {
    const startCell = this.grid[0][col];
    if (!startCell.isEmpty) return;

    shape.attachToCell(startCell);
  }

  dropShapes() {
    for (let j = 0; j < cols; j++) {
      this.dropShape(j, randomShape());
    }
  }

  shapesFall() {
    let res = false;
    for (let i = rows - 1; i >= 0; i--) {
      for (let j = 0; j < cols; j++) {
        const cell = this.grid[i][j];
        if (cell.isEmpty) continue;
        if (!cell.bottomCell || !cell.bottomCell.isEmpty) continue;
        const shape = cell.removeShape();
        shape.attachToCell(cell.bottomCell);
        res = true;
      }
    }
    return res;
  }

  hasSameType(cell1, cell2) {
    if (cell1.isEmpty || cell2.isEmpty) return false;
    return cell1.shape.constructor.name === cell2.shape.constructor.name;
  }

  markPop(i, j) {
    const cell = this.grid[i][j];
    if (cell.shouldPop !== void 0) return;

    cell.shouldPop = false;
    if (cell.isEmpty) return;

    let cnt = 1;

    let left = j;
    while (left - 1 >= 0 && this.hasSameType(cell, this.grid[i][left - 1])) {
      cnt++;
      left--;
    }

    let right = j;
    while (
      right + 1 < cols &&
      this.hasSameType(cell, this.grid[i][right + 1])
    ) {
      cnt++;
      right++;
    }

    if (cnt >= 3) {
      for (let c = left; c <= right; c++) {
        this.grid[i][c].shouldPop = true;
      }
    }

    cnt = 1;

    let top = i;
    while (top - 1 >= 0 && this.hasSameType(cell, this.grid[top - 1][j])) {
      cnt++;
      top--;
    }

    let bottom = i;
    while (
      bottom + 1 < rows &&
      this.hasSameType(cell, this.grid[bottom + 1][j])
    ) {
      cnt++;
      bottom++;
    }

    if (cnt >= 3) {
      for (let r = top; r <= bottom; r++) {
        this.grid[r][j].shouldPop = true;
      }
    }
  }

  isStable() {
    for (let i = rows - 1; i >= 0; i--) {
      for (let j = 0; j < cols; j++) {
        const cell = this.grid[i][j];
        if (cell.isEmpty) return false;
      }
    }
    return true;
  }

  popShapes() {
    for (let i = rows - 1; i >= 0; i--) {
      for (let j = 0; j < cols; j++) {
        const cell = this.grid[i][j];
        cell.shouldPop = undefined;
      }
    }
    for (let i = rows - 1; i >= 0; i--) {
      for (let j = 0; j < cols; j++) {
        this.markPop(i, j);
      }
    }
    for (let i = rows - 1; i >= 0; i--) {
      for (let j = 0; j < cols; j++) {
        const cell = this.grid[i][j];
        if (cell.shouldPop) cell.removeShape();
      }
    }
  }

  findCell(x, y) {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const cell = this.grid[i][j];
        if (cell.contains(x, y)) return cell;
      }
    }
  }

  swapStart(mouseX, mouseY) {
    const cell = this.findCell(mouseX, mouseY);
    if (!cell) return;
    cell.highlight = true;
    this.swaps = [cell];
  }

  markSwap(mouseX, mouseY) {
    if (this.swaps.length === 0) return;

    const cell = this.findCell(mouseX, mouseY);
    if (!cell || cell === this.swaps[0]) return;

    if (this.swaps.length === 2) {
      this.swaps[1].highlight = false;
      this.swaps.pop();
    }
    cell.highlight = true;
    this.swaps.push(cell);
  }

  swap() {
    if (this.swaps.length !== 2) return;
    const [cell1, cell2] = this.swaps;
    cell1.highlight = false;
    cell2.highlight = false;
    this.trySwap = true;
  }

  doSwap() {
    const [cell1, cell2] = this.swaps;
    const shape1 = cell1.removeShape();
    const shape2 = cell2.removeShape();
    shape1.attachToCell(cell2);
    shape2.attachToCell(cell1);
  }

  resetSwaps() {
    this.trySwap = false;
    this.afterSwap = false;
    this.swaps = [];
  }

  gameOver() {
    this.reset();
  }

  update() {
    if (this.trySwap || this.afterSwap) {
      if (this.trySwap) {
        this.doSwap();
        this.trySwap = false;
        this.afterSwap = true;
      } else if (this.afterSwap) {
        this.popShapes();
        if (this.isStable()) this.doSwap();
        this.resetSwaps();
      }
    } else {
      if (this.isStable()) {
        this.popShapes();
      } else {
        this.shapesFall();
        this.dropShapes();
      }
    }
  }

  show() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.grid[i][j].show();
      }
    }
  }
}