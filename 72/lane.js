class Lane extends Rectangle {
  constructor(index) {
    super(0, index * grid, width, grid);
  }

  static newSafety(index, c) {
    const lane = new Lane(index);
    lane.type = SAFETY;
    lane.obstacles = [];
    lane.col = c;
    return lane;
  }

  static newObstacles(index, t, n, len, spacing, speed) {
    const lane = new Lane(index);
    lane.type = t;

    lane.obstacles = new Array(n).fill();
    const offset = random(0, 200);
    for (let i = 0; i < n; i++) {
      const x = offset + spacing * i;
      const y = index * grid;
      const w = grid * len;
      const h = grid;
      lane.obstacles[i] = new Obstacle(x, y, w, h, speed);
    }

    lane.col = color(0);
    return lane;
  }

  check(frog) {
    if (this.type === CAR) {
      for (const o of this.obstacles) {
        if (frog.intersects(o)) {
          resetGame();
          return;
        }
      }
    } else if (this.type === LOG) {
      const logs = this.obstacles.filter((o) => frog.intersects(o));
      if (logs.length === 0) {
        resetGame();
        return;
      }
      frog.attach(logs[0]);
    }
  }

  run() {
    fill(this.col);
    rect(this.x, this.y, this.w, this.h);
    for (const o of this.obstacles) {
      o.show();
      o.update();
    }
  }
}
