const vehicles = [];
const food = [];
const poison = [];

let debug = false;

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < 50; i++) {
    const x = random(width);
    const y = random(height);
    vehicles.push(new Vehicle(x, y));
  }

  for (let i = 0; i < 40; i++) {
    const x = random(width);
    const y = random(height);
    food.push(createVector(x, y));
  }

  for (let i = 0; i < 20; i++) {
    const x = random(width);
    const y = random(height);
    poison.push(createVector(x, y));
  }
}

function mouseReleased() {
  debug = !debug;
}

function draw() {
  background(51);

  if (random(1) < 0.1) {
    const x = random(width);
    const y = random(height);
    food.push(createVector(x, y));
  }

  if (random(1) < 0.01) {
    const x = random(width);
    const y = random(height);
    poison.push(createVector(x, y));
  }

  for (const f of food) {
    fill(0, 255, 0);
    noStroke();
    ellipse(f.x, f.y, 4, 4);
  }

  for (const p of poison) {
    fill(255, 0, 0);
    noStroke();
    ellipse(p.x, p.y, 4, 4);
  }

  for (let i = vehicles.length - 1; i >= 0; i--) {
    const v = vehicles[i];
    v.boundaries();
    v.behaviors(food, poison);
    v.update();
    v.display();

    const newVehicle = v.clone();
    if (newVehicle) vehicles.push(newVehicle);

    if (v.dead()) {
      const x = v.position.x;
      const y = v.position.y;
      food.push(createVector(x, y));
      vehicles.splice(i, 1);
    }
  }
}
