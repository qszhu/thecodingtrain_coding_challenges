let current;
let r
const snowflake = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  r = min(width, height) / 2
  current = new Particle(r, 0);
}

function draw() {
  translate(width / 2, height / 2);
  rotate(PI / 6);
  background(0);

  let count = 0;
  while (!current.finished() && !current.intersects(snowflake)) {
    current.update();
    count++;
  }

  if (count === 0) {
    noLoop();
  }

  snowflake.push(current);
  current = new Particle(r, 0);

  for (let i = 0; i < 6; i++) {
    rotate(PI / 3);
    current.show();
    for (const s of snowflake) {
      s.show();
    }

    push();
    scale(1, -1);
    current.show();
    for (const s of snowflake) {
      s.show();
    }
    pop();
  }
}
