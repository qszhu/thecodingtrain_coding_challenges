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

class Points {
  constructor() {
    this.points = [];
  }
  add(p) {
    this.points.push(p);
  }
  get length() {
    return this.points.length;
  }
  get xs() {
    return this.points.map((p) => p.x);
  }
  get ys() {
    return this.points.map((p) => p.y);
  }
  [Symbol.iterator]() {
    return this.points.values();
  }
}

const points = new Points();

let a, b, c, d;
let dragging = false;

const learningRate = 0.2;
const optimizer = tf.train.adam(learningRate);

function setup() {
  createCanvas(windowWidth, windowHeight);
  a = tf.variable(tf.scalar(random(-1, 1)));
  b = tf.variable(tf.scalar(random(-1, 1)));
  c = tf.variable(tf.scalar(random(-1, 1)));
  d = tf.variable(tf.scalar(random(-1, 1)));
}

function loss(preds, labels) {
  return preds.sub(labels).square().mean();
}

function predict(xs) {
  const tx = tf.tensor1d(xs);
  const ty = tx
    .pow(tf.scalar(3))
    .mul(a)
    .add(tx.square().mul(b))
    .add(tx.mul(c))
    .add(d);
  return ty;
}

function mousePressed() {
  dragging = true;
}

function mouseReleased() {
  dragging = false;
}

function draw() {
  if (dragging) {
    points.add(Point.fromScreen(mouseX, mouseY));
  }

  tf.tidy(() => {
    if (points.length > 0) {
      const ty = tf.tensor1d(points.ys);
      optimizer.minimize(() => loss(predict(points.xs), ty));
    }
  });

  background(0);

  stroke(255);
  strokeWeight(8);

  // draw points
  for (const p of points) {
    const { x, y } = p.toScreen();
    point(x, y);
  }

  // draw fit curve
  const xs = [];
  for (let x = -1; x <= 1; x += 0.05) {
    xs.push(x);
  }

  let ys;
  tf.tidy(() => {
    ys = predict(xs).dataSync();
  });

  noFill();
  stroke(255);
  strokeWeight(2);

  beginShape();
  for (let i = 0; i < xs.length; i++) {
    const { x, y } = new Point(xs[i], ys[i]).toScreen();
    vertex(x, y);
  }
  endShape();
}
