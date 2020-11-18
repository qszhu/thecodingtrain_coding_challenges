var tree;
const min_dist = 35;
const max_dist = 200;
let cam;

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.elt.oncontextmenu = () => false;

  cam = createEasyCam({ distance: width / 2 });

  tree = new Tree();
}

function draw() {
  background(51);
  tree.show();
  tree.grow();
}
