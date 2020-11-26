const globe = [];
const r = 200;
const total = 25;
let cam;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  cam = createEasyCam({ distance: 500 });
  colorMode(HSB);
  strokeWeight(2);
  stroke(200);

  for (let i = 0; i < total + 1; i++) {
    globe[i] = [];
    const lat = map(i, 0, total, 0, PI);
    for (let j = 0; j < total + 1; j++) {
      const lon = map(j, 0, total, 0, TWO_PI);
      const x = r * sin(lat) * cos(lon);
      const y = r * sin(lat) * sin(lon);
      const z = r * cos(lat);
      globe[i][j] = createVector(x, y, z);
    }
  }
}

function draw() {
  background(0);

  for (let i = 0; i < total; i++) {
    const hu = map(i, 0, total, 0, 255);
    fill(hu % 256, 255, 255);
    beginShape(TRIANGLE_STRIP);
    for (let j = 0; j < total + 1; j++) {
      const v1 = globe[i][j];
      vertex(v1.x, v1.y, v1.z);
      const v2 = globe[i + 1][j];
      vertex(v2.x, v2.y, v2.z);
    }
    endShape();
  }
}
