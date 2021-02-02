let font;
const vehicles = [];
const text = "DEADBEAF";
const fontSize = 256;

function preload() {
  font = loadFont("AvenirNextLTPro-Demi.otf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  const bbox = font.textBounds(text, 0, 0, fontSize);
  const left = floor((width - bbox.w) / 2);
  const top = floor((height + bbox.h) / 2);

  const points = font.textToPoints(text, left, top, fontSize, {
    // sampleFactor: 0.25,
  });

  for (const pt of points) {
    const vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
  }
}

function draw() {
  background(51);
  for (const v of vehicles) {
    v.behaviors();
    v.update();
    v.show();
  }
}
