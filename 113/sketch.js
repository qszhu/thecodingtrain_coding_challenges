const hyperCube = [
  [0, 0, 0, 0],
  [1, 0, 0, 0],
  [1, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [1, 0, 1, 0],
  [1, 1, 1, 0],
  [0, 1, 1, 0],
  [0, 0, 0, 1],
  [1, 0, 0, 1],
  [1, 1, 0, 1],
  [0, 1, 0, 1],
  [0, 0, 1, 1],
  [1, 0, 1, 1],
  [1, 1, 1, 1],
  [0, 1, 1, 1],
].map(([x, y, z, w]) => [[x - 0.5], [y - 0.5], [z - 0.5], [w - 0.5]]);

const cameraDistance = 2;
let cubeSize;

let angle = 0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  cubeSize = windowWidth / 4;
}

function draw() {
  background(0);
  rotateX(-PI / 2);

  const rotationXY = [
    [cos(angle), -sin(angle), 0, 0],
    [sin(angle), cos(angle), 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ];

  const rotationZW = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, cos(angle), -sin(angle)],
    [0, 0, sin(angle), cos(angle)],
  ];

  const projected = hyperCube.map((point) => {
    const rotated = matmul(rotationXY, matmul(rotationZW, point));
    const w = 1 / (cameraDistance - rotated[3][0]);

    const projection = [
      [w, 0, 0, 0],
      [0, w, 0, 0],
      [0, 0, w, 0],
    ];
    const [[x], [y], [z]] = matmul(projection, rotated);
    return createVector(x * cubeSize, y * cubeSize, z * cubeSize);
  });

  stroke(255);
  strokeWeight(16);
  noFill();
  for (const v of projected) {
    point(v.x, v.y, v.z);
  }

  const connect = (o, i, j) => {
    const a = projected[i + o];
    const b = projected[j + o];
    line(a.x, a.y, a.z, b.x, b.y, b.z);
  };

  strokeWeight(4);
  stroke(255);
  for (let i = 0; i < 4; i++) {
    connect(0, i, (i + 1) % 4);
    connect(0, i + 4, ((i + 1) % 4) + 4);
    connect(0, i, i + 4);
    connect(8, i, (i + 1) % 4);
    connect(8, i + 4, ((i + 1) % 4) + 4);
    connect(8, i, i + 4);
  }
  for (let i = 0; i < 8; i++) {
    connect(0, i, i + 8);
  }

  angle += 0.02;
}

function matmul(a, b) {
  const aRows = a.length;
  const aCols = a[0].length;
  const bRows = b.length;
  const bCols = b[0].length;
  if (aCols !== bRows)
    throw `matrices not match: ${aRows}x${aCols}, ${bRows}x${bCols}`;

  const H = aCols;
  const rows = aRows;
  const cols = bCols;
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
