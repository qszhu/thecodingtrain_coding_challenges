const r = 200;
const total = 25;
const globe = new Array(total + 1)
  .fill()
  .map((_) => new Array(total + 1).fill());
let cam;

let offset = 0;
let m = 0;
let mchange = 0;

const a = 1;
const b = 1;

function supershape(theta, m, n1, n2, n3) {
  let t1 = abs((1 / a) * cos((m * theta) / 4));
  t1 = pow(t1, n2);
  let t2 = abs((1 / b) * sin((m * theta) / 4));
  t2 = pow(t2, n3);
  let t3 = t1 + t2;
  return pow(t3, -1 / n1);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  cam = createEasyCam({ distance: 500 });
  colorMode(HSB);
  strokeWeight(2);
  stroke(200);
}

function draw() {
  background(0);

  m = map(sin(mchange), -1, 1, 0, 7);
  mchange += 0.02;

  for (let i = 0; i < total + 1; i++) {
    const lat = map(i, 0, total, -HALF_PI, HALF_PI);
    const r2 = supershape(lat, m, 0.2, 1.7, 1.7);
    for (let j = 0; j < total + 1; j++) {
      const lon = map(j, 0, total, -PI, PI);
      const r1 = supershape(lon, m, 0.2, 1.7, 1.7);
      const x = r * r1 * cos(lon) * r2 * cos(lat);
      const y = r * r1 * sin(lon) * r2 * cos(lat);
      const z = r * r2 * sin(lat);
      globe[i][j] = createVector(x, y, z);
    }
  }

  offset += 5;
  for (let i = 0; i < total; i++) {
    const hu = map(i, 0, total, 0, 255);
    fill((hu + offset) % 256, 255, 255);
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
