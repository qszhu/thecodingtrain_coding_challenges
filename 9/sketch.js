let sun;
let cam;

let sunTexture
const textures = []

function preload() {
  sunTexture = loadImage('/9/data/sun.jpg')
  textures[0] = loadImage('/9/data/mars.jpg')
  textures[1] = loadImage('/9/data/earth.jpg')
  textures[2] = loadImage('/9/data/mercury.jpg')
}

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.elt.oncontextmenu = () => false;

  cam = createEasyCam({ distance: 500 });

  sun = new Planet(50, 0, 0, sunTexture);
  sun.spawnMoons(4, 1);
}

function draw() {
  background(0);
  ambientLight(255, 255,255)
  pointLight(255, 255, 255, 0, 0, 0)
  sun.orbit();
  sun.show();
}
