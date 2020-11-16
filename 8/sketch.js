let sun;
let cam;

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.elt.oncontextmenu = () => false;

  cam = createEasyCam({ distance: 500 });

  sun = new Planet(50, 0, 0);
  sun.spawnMoons(4, 1);
}

function draw() {
  background(0);
  lights();
  sun.orbit();
  sun.show();
}
