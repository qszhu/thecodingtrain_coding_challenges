let table;
let r = 200;
let earth;
let cam;

function preload() {
  earth = loadImage("earth.jpg");
  table = loadTable("earthquake.csv", "header");
}

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.elt.oncontextmenu = () => false;

  cam = createEasyCam({ distance: 500 });
}

function draw() {
  background(51);

  lights();
  fill(200);
  noStroke();
  texture(earth);
  sphere(r);

  for (const row of table.rows) {
    const lat = row.getNum("latitude");
    const lon = row.getNum("longitude");
    const mag = row.getNum("mag");

    const theta = radians(lat);
    const phi = radians(lon) + PI - HALF_PI;

    const x = r * cos(theta) * cos(phi);
    const y = -r * sin(theta);
    const z = -r * cos(theta) * sin(phi);

    const pos = createVector(x, y, z);

    let h = pow(10, mag);
    const maxh = pow(10, 7);
    h = map(h, 0, maxh, 10, 100);
    const xaxis = createVector(1, 0, 0);

    const angleb = abs(xaxis.angleBetween(pos));
    const raxis = xaxis.cross(pos);

    push();
    translate(x, y, z);
    rotate(angleb, raxis);
    fill(255);
    box(h, 5, 5);
    pop();
  }
}
