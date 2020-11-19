let sun;
let cam;

let sunTexture
const textures = []

function preload() {
  sunTexture = loadImage('data/sun.jpg')
  textures[0] = loadImage('data/mars.jpg')
  textures[1] = loadImage('data/earth.jpg')
  textures[2] = loadImage('data/mercury.jpg')
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
