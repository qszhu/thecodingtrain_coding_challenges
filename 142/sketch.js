let cam;

const speed = 0.05;
const dim = 3;
const cubes = [];

const allMoves = [
  new Move(0, 1, 0, 1),
  new Move(0, 1, 0, -1),

  new Move(0, -1, 0, 1),
  new Move(0, -1, 0, -1),

  new Move(1, 0, 0, 1),
  new Move(1, 0, 0, -1),

  new Move(-1, 0, 0, 1),
  new Move(-1, 0, 0, -1),

  new Move(0, 0, 1, 1),
  new Move(0, 0, 1, -1),

  new Move(0, 0, -1, 1),
  new Move(0, 0, -1, -1),
];

const sequence = [];
let counter = 0;
let currentMove;

function getMove(move) {
  if (move === "D") return allMoves[0].copy();
  if (move === "d") return allMoves[1].copy();

  if (move === "u") return allMoves[2].copy();
  if (move === "U") return allMoves[3].copy();

  if (move === "r") return allMoves[4].copy();
  if (move === "R") return allMoves[5].copy();

  if (move === "L") return allMoves[6].copy();
  if (move === "l") return allMoves[7].copy();

  if (move === "f") return allMoves[8].copy();
  if (move === "F") return allMoves[9].copy();

  if (move === "B") return allMoves[10].copy();
  if (move === "b") return allMoves[11].copy();
}

let font;

function preload() {
  font = loadFont("AvenirNextLTPro-Demi.otf");
}

function setup() {
  const cavnas = createCanvas(600, 600, WEBGL);
  cavnas.elt.oncontextmenu = () => false;

  cam = createEasyCam({ distance: 400 });

  let idx = 0;
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        const mat = new Matrix4();
        mat.translate(x, y, z);
        cubes[idx++] = new Cubie(mat, x, y, z, idx);
      }
    }
  }

  for (let i = 0; i < 25; i++) {
    const r = floor(random(allMoves.length));
    sequence.push(allMoves[r].copy());
  }

  for (let i = sequence.length - 1; i >= 0; i--) {
    const nextMove = sequence[i].copy();
    nextMove.reverse();
    sequence.push(nextMove);
  }

  currentMove = sequence[counter];
  currentMove.start();
}

function turnX(idx, dir) {
  cubes
    .filter((c) => c.x === idx)
    .forEach((c) => {
      const mat = new Matrix4();
      mat.rotateX(dir * HALF_PI);
      mat.translate(0, c.y, c.z);
      const [x, y, z] = mat.multiplyVector(c.x, c.y, c.z);
      c.updatePos(c.x, round(y), round(z));

      c.turnFacesX(dir);
    });
}

function turnY(idx, dir) {
  cubes
    .filter((c) => c.y === idx)
    .forEach((c) => {
      const mat = new Matrix4();
      mat.rotateY(dir * HALF_PI);
      mat.translate(c.x, 0, c.z);
      const [x, y, z] = mat.multiplyVector(c.x, c.y, c.z);
      c.updatePos(round(x), c.y, round(z));

      c.turnFacesY(dir);
    });
}

function turnZ(idx, dir) {
  cubes
    .filter((c) => c.z === idx)
    .forEach((c) => {
      const mat = new Matrix4();
      mat.rotateZ(dir * HALF_PI);
      mat.translate(c.x, c.y, 0);
      const [x, y, z] = mat.multiplyVector(c.x, c.y, c.z);
      c.updatePos(round(x), round(y), c.z);

      c.turnFacesZ(dir);
    });
}

function keyPressed() {
  /*
  if (key === "f") {
    turnZ(1, -1);
  }
  if (key === "F") {
    turnZ(1, 1);
  }
  if (key === "b") {
    turnZ(-1, 1);
  }
  if (key === "B") {
    turnZ(-1, -1);
  }

  if (key === "l") {
    turnX(-1, 1);
  }
  if (key === "L") {
    turnX(-1, -1);
  }
  if (key === "r") {
    turnX(1, -1);
  }
  if (key === "R") {
    turnX(1, 1);
  }

  if (key === "u") {
    turnY(-1, 1);
  }
  if (key === "U") {
    turnY(-1, -1);
  }
  if (key === "d") {
    turnY(1, -1);
  }
  if (key === "D") {
    turnY(1, 1);
  }
  */
  // if (!currentMove || currentMove.finished) {
  //   currentMove = getMove(key)
  //   if (currentMove) {
  //     currentMove.start()
  //   }
  // }
}

function draw() {
  background(51);

  rotateX(-0.5);
  rotateY(0.4);
  rotateZ(0.1);

  if (currentMove) {
    currentMove.update();
  }

  if (currentMove.finished) {
    if (counter + 1 < sequence.length) {
      currentMove = sequence[++counter];
      currentMove.start();
    }
  }

  scale(50);
  for (const qb of cubes) {
    push();

    if (currentMove) {
      // animating
      if (abs(qb.z) > 0 && qb.z === currentMove.z) {
        rotateZ(currentMove.angle);
      } else if (abs(qb.x) > 0 && qb.x === currentMove.x) {
        rotateX(currentMove.angle);
      } else if (abs(qb.y) > 0 && qb.y === currentMove.y) {
        rotateY(-currentMove.angle);
      }
    }

    qb.show();

    pop();
  }
}
