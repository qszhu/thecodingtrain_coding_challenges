let trees = [];
let walkers = [];
const maxWalkers = 200;
const iterations = 200;
const radius = 8;

function setup() {
  createCanvas(400, 400);

  trees[0] = new Walker(width / 2, height / 2);
  for (let i = 0; i < maxWalkers; i++) {
    walkers[i] = new Walker();
  }
}

function draw() {
  background(0);

  for (const tree of trees) {
    tree.show();
  }

  for (const walker of walkers) {
    walker.show();
  }

  for (let n = 0; n < iterations; n++) {
    for (const walker of walkers) {
      walker.walk();
      walker.checkStuck(trees);
    }
    trees = trees.concat(walkers.filter((w) => w.stuck));
    walkers = walkers.filter((w) => !w.stuck);
  }
}
