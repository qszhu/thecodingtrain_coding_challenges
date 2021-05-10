const cube = [
  [0, 0, 0],
  [1, 0, 0],
  [1, 1, 0],
  [0, 1, 0],
  [0, 0, 1],
  [1, 0, 1],
  [1, 1, 1],
  [0, 1, 1],
].map(([x, y, z]) => [[x - 0.5], [y - 0.5], [z - 0.5]]);

const cameraDistance = 2;
const cubeSize = 300;

let angle = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  translate(width / 2, height / 2);

  const rotationX = [
    [1, 0, 0],
    [0, cos(angle), -sin(angle)],
    [0, sin(angle), cos(angle)],
  ];

  const rotationY = [
    [cos(angle), 0, sin(angle)],
    [0, 1, 0],
    [-sin(angle), 0, cos(angle)],
  ];

  const rotationZ = [
    [cos(angle), -sin(angle), 0],
    [sin(angle), cos(angle), 0],
    [0, 0, 1],
  ];

  const projected = cube.map((point) => {
    const rotated = matmul(
      rotationX,
      matmul(rotationY, matmul(rotationZ, point))
    );
    const z = 1 / (cameraDistance - rotated[2][0]);

    const projection = [
      [z, 0, 0],
      [0, z, 0],
    ];
    const [[x], [y]] = matmul(projection, rotated);
    return createVector(x * cubeSize, y * cubeSize);
  });

  stroke(255);
  strokeWeight(16);
  noFill();
  for (const v of projected) {
    point(v.x, v.y);
  }

  const connect = (i, j) => {
    const a = projected[i];
    const b = projected[j];
    line(a.x, a.y, b.x, b.y);
  };

  strokeWeight(1);
  stroke(255);
  for (let i = 0; i < 4; i++) {
    connect(i, (i + 1) % 4, projected);
    connect(i + 4, ((i + 1) % 4) + 4, projected);
    connect(i, i + 4, projected);
  }

  angle += 0.03;
}

function matmul(a, b) {
  if (a[0].length !== b.length) return;

  const H = b.length;
  const rows = a.length;
  const cols = b[0].length;
  const res = new Array(rows).fill().map(() => new Array(cols).fill(0));
  for (let i = 0; i < res.length; i++) {
    for (let j = 0; j < res[i].length; j++) {
      let sum = 0;
      for (let k = 0; k < H; k++) {
        sum += a[i][k] * b[k][j];
      }
      res[i][j] = sum;
    }
  }
  return res;
}
