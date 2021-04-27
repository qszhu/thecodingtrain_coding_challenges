class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toScreen() {
    const x = map(this.x, 0, 1, 0, width);
    const y = map(this.y, 0, 1, height, 0);
    return new Point(x, y);
  }
  static fromScreen(x, y) {
    return new Point(map(x, 0, width, 0, 1), map(y, 0, height, 1, 0));
  }
}

const points = [];

let m, b;

const learningRate = 0.5;
const optimizer = tf.train.sgd(learningRate);

function setup() {
  createCanvas(windowWidth, windowHeight);
  m = tf.variable(tf.scalar(random(1)));
  b = tf.variable(tf.scalar(random(1)));
}

function loss(preds, labels) {
  return preds.sub(labels).square().mean();
}

function predict(xs) {
  const tx = tf.tensor1d(xs);
  const ty = tx.mul(m).add(b);
  return ty;
}

function mousePressed() {
  points.push(Point.fromScreen(mouseX, mouseY));
}

function draw() {
  tf.tidy(() => {
    if (points.length > 0) {
      const xs = points.map((p) => p.x);
      const ys = points.map((p) => p.y);
      const ty = tf.tensor1d(ys);
      optimizer.minimize(() => loss(predict(xs), ty));
    }
  });

  background(0);

  stroke(255);
  strokeWeight(8);

  for (const p of points) {
    const { x, y } = p.toScreen();
    point(x, y);
  }

  let lineX, lineY;
  tf.tidy(() => {
    lineX = [0, 1];
    const ty = predict(lineX);
    lineY = ty.dataSync();
  });

  const { x: x1, y: y1 } = new Point(lineX[0], lineY[0]).toScreen();
  const { x: x2, y: y2 } = new Point(lineX[1], lineY[1]).toScreen();

  strokeWeight(2);
  line(x1, y1, x2, y2);
}
