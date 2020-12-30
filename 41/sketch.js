let bird;
let pipes = [];
let mic;
let sliderTop;
let sliderBottom;
let clapping = false;

function setup() {
  createCanvas(400, 600);

  mic = new p5.AudioIn();
  mic.start();

  bird = new Bird();
  pipes.push(new Pipe());

  sliderTop = createSlider(0, 1, 0.3, 0.01);
  sliderBottom = createSlider(0, 1, 0.1, 0.01);
}

function draw() {
  background(0);

  const vol = mic.getLevel();

  for (const pipe of pipes) {
    pipe.show();
    pipe.update();
    pipe.highlight = pipe.hits(bird);
  }

  pipes = pipes.filter((p) => !p.offscreen);

  bird.update();
  bird.show();

  if (frameCount % 100 === 0) {
    pipes.push(new Pipe());
  }

  const thresholdTop = sliderTop.value();
  const thresholdBottom = sliderBottom.value();

  if (vol > thresholdTop && !clapping) {
    bird.up();
    clapping = true;
  }

  if (vol < thresholdBottom) {
    clapping = false;
  }

  const y = map(vol, 0, 1, height, 0);
  fill(0, 255, 0);
  noStroke();
  rect(width - 50, y, 50, height - y);

  const ty = map(thresholdTop, 0, 1, height, 0);
  stroke(255, 0, 0);
  strokeWeight(4);
  line(width - 50, ty, width, ty);

  const by = map(thresholdBottom, 0, 1, height, 0);
  stroke(0, 0, 255);
  strokeWeight(4);
  line(width - 50, by, width, by);
}

function keyPressed() {
  bird.up();
}
