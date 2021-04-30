let nn;
let model;

const resolution = 20;
let rows;
let cols;

let xs;

const train_xs = tf.tensor2d([
  [0, 0],
  [1, 0],
  [0, 1],
  [1, 1],
]);
const train_ys = tf.tensor2d([[0], [1], [1], [0]]);

function setup() {
  createCanvas(400, 400);
  rows = height / resolution;
  cols = width / resolution;

  const inputs = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      inputs.push([i / rows, j / cols]);
    }
  }
  xs = tf.tensor2d(inputs);

  model = tf.sequential();
  model.add(
    tf.layers.dense({ inputShape: [2], units: 16, activation: "sigmoid" })
  );
  model.add(tf.layers.dense({ units: 1, activate: "sigmoid" }));

  const optimizer = tf.train.adam(0.2);
  model.compile({ optimizer, loss: "meanSquaredError" });

  setTimeout(train, 100);
}

function train() {
  trainModel().then((result) => {
    setTimeout(train, 10);
  });
}

function trainModel() {
  return model.fit(train_xs, train_ys, { shuffle: true, epochs: 1 });
}

function draw() {
  background(0);

  tf.tidy(() => {
    const ys = model.predict(xs);
    const y_values = ys.dataSync();

    for (let i = 0, index = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++, index++) {
        const v = y_values[index];
        const br = v * 255;

        fill(br);
        rect(j * resolution, i * resolution, resolution, resolution);

        fill(255 - br);
        textSize(8);
        textAlign(CENTER, CENTER);
        text(
          nf(v, 1, 2),
          j * resolution + resolution / 2,
          i * resolution + resolution / 2
        );
      }
    }
  });
}
