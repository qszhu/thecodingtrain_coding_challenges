const tree = [];
const leaves = [];

let count = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  const a = createVector(width / 2, height);
  const b = createVector(width / 2, height - height / 4);
  tree[0] = new Branch(a, b);
}

function mousePressed() {
  for (let i = tree.length - 1; i >= 0 && !tree[i].finished; i--) {
    tree.push(tree[i].branchA());
    tree.push(tree[i].branchB());
    tree[i].finished = true;
  }

  count++;
  if (count === 6) {
    for (const b of tree) {
      if (!b.finished) {
        leaves.push(b.end.copy());
      }
    }
  }
}

function draw() {
  background(51);

  for (const b of tree) {
    b.show();
    // b.jitter();
  }

  for (const l of leaves) {
    fill(255, 0, 100, 100);
    noStroke();
    ellipse(l.x, l.y, 8, 8);
    l.y += random(0, 2);
  }
}
