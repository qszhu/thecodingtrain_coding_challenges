let frog;
let lanes;

const SAFETY = 0;
const CAR = 1;
const LOG = 2;

const grid = 50;

function resetGame() {
  frog = new Frog(width / 2 - grid / 2, height - grid, grid);
  frog.attach(null);
}

function setup() {
  createCanvas(500, 550);
  resetGame();

  lanes = new Array(11).fill();
  lanes[0] = Lane.newSafety(0, color(100));
  lanes[1] = Lane.newObstacles(1, LOG, 3, 1, 150, 3);
  lanes[2] = Lane.newObstacles(2, LOG, 2, 3, 350, -2.5);
  lanes[3] = Lane.newObstacles(3, LOG, 4, 1, 200, 1);
  lanes[4] = Lane.newObstacles(4, LOG, 3, 2, 250, -1.7);
  lanes[5] = Lane.newSafety(5, color(100));
  lanes[6] = Lane.newObstacles(6, CAR, 3, 1, 150, 2.4);
  lanes[7] = Lane.newObstacles(7, CAR, 2, 2, 150, -3.6);
  lanes[8] = Lane.newObstacles(8, CAR, 1, 3, 150, 2.3);
  lanes[9] = Lane.newObstacles(9, CAR, 4, 1, 150, -1);
  lanes[10] = Lane.newSafety(10, color(100));
}

function draw() {
  background(0);

  for (const lane of lanes) {
    lane.run();
  }

  const laneIdx = floor(frog.y / grid);
  lanes[laneIdx].check(frog);

  frog.update();
  frog.show();
}

function keyPressed() {
  if (keyCode === UP_ARROW) frog.move(0, -1);
  else if (keyCode === DOWN_ARROW) frog.move(0, 1);
  else if (keyCode === RIGHT_ARROW) frog.move(1, 0);
  else if (keyCode === LEFT_ARROW) frog.move(-1, 0);
}
