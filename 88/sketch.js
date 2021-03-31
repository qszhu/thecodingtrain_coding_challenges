const snow = [];
let gravity;
let zOff = 0;

let spritesheet;
const textures = [];

function preload() {
  spritesheet = loadImage("flakes32.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  gravity = createVector(0, 0.3);

  for (let x = 0; x < spritesheet.width; x += 32) {
    for (let y = 0; y < spritesheet.height; y += 32) {
      const img = spritesheet.get(x, y, 32, 32);
      textures.push(img);
    }
  }

  for (let i = 0; i < 400; i++) {
    const x = random(width);
    const y = random(height);
    const design = random(textures);
    snow.push(new Snowflake(x, y, design));
  }
}

function draw() {
  background(0);

  zOff += 0.1;

  for (const flake of snow) {
    const xOff = flake.pos.x / width;
    const yOff = flake.pos.y / height;
    const wAngle = noise(xOff, yOff, zOff) * TWO_PI;
    const wind = p5.Vector.fromAngle(wAngle);
    wind.mult(0.1);

    flake.applyForce(gravity);
    flake.applyForce(wind);
    flake.update();
    flake.render();
  }
}
