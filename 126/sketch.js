let picks = [];
let minX, maxX;

function setup() {
  createCanvas(600, 600);
  minX = -width / 2;
  maxX = width / 2;
  picks.push(new Toothpick(0, 0, 1));
}

function draw() {
  background(255);
  translate(width / 2, height / 2);
  const factor = width / (maxX - minX);
  scale(factor);

  for (const p of picks) {
    p.show(factor);
    minX = min(minX, p.ax, p.bx);
    maxX = max(maxX, p.ax, p.bx);
  }

  const next = [];
  for (const p of picks) {
    if (!p.newPick) continue;
    const nextA = p.createA(picks);
    if (nextA) next.push(nextA);
    const nextB = p.createB(picks);
    if (nextB) next.push(nextB);
    p.newPick = false;
  }
  picks = picks.concat(next);
}
