var tree;
const min_dist = 25;
const max_dist = 100;

function setup() {
  createCanvas(windowWidth, windowHeight);
  tree = new Tree();
}

function draw() {
  background(51);
  tree.show();
  tree.grow();
}
