const polys = [];

const MAX_DELTA = 25;
const MAX_ANGLE = 90;

let deltaSlider;
let angleSlider;

function setup() {
  createCanvas(windowWidth, windowHeight);

  const inc = 100;
  for (let x = 0; x < width; x += inc) {
    for (let y = 0; y < height; y += inc) {
      const poly = new Polygon(4);
      poly.addVertex(x, y);
      poly.addVertex(x + inc, y);
      poly.addVertex(x + inc, y + inc);
      poly.addVertex(x, y + inc);
      poly.close();
      polys.push(poly);
    }
  }
}

function draw() {
  background(51);

  delta = map(mouseX, 0, width, 0, MAX_DELTA);
  angle = map(mouseY, 0, height, 0, MAX_ANGLE);

  for (const poly of polys) {
    poly.hankin();
    poly.show();
  }
}
