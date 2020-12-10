const r = 10;
const k = 30;
let grid;
const w = r / Math.sqrt(2);
const active = [];
let cols, rows;
const ordered = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  strokeWeight(4);
  colorMode(HSB);

  cols = floor(width / w);
  rows = floor(height / w);
  grid = new Array(cols * rows);

  const x = width / 2;
  const y = height / 2;
  const i = floor(x / w);
  const j = floor(y / w);
  const pos = createVector(x, y);
  grid[i + j * cols] = pos;
  active.push(pos);
}

function draw() {
  background(0);

  for (let total = 0; total < 25 && active.length > 0; total++) {
    const randIdx = floor(random(active.length));
    const pos = active[randIdx];
    let found = false;
    for (let n = 0; n < k; n++) {
      const sample = p5.Vector.random2D();
      const m = random(r, 2 * r);
      sample.setMag(m);
      sample.add(pos);

      const col = floor(sample.x / w);
      const row = floor(sample.y / w);

      if (
        col >= 0 &&
        row >= 0 &&
        col < cols &&
        row < rows &&
        !grid[col + row * cols]
      ) {
        let ok = true;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const idx = col + i + (row + j) * cols;
            const neighbor = grid[idx];
            if (neighbor) {
              const d = p5.Vector.dist(sample, neighbor);
              if (d < r) ok = false;
            }
          }
        }
        if (ok) {
          found = true;
          grid[col + row * cols] = sample;
          active.push(sample);
          ordered.push(sample);
          break;
        }
      }
    }
    if (!found) {
      active.splice(randIdx, 1);
    }
  }

  for (let i = 0; i < ordered.length; i++) {
    stroke(i / 10 % 360, 100, 100);
    strokeWeight(r * 0.5);
    point(ordered[i].x, ordered[i].y);
  }
}
