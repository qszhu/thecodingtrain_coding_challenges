let bird;
let pipes = [];

function setup() {
  createCanvas(640, 480);
  bird = new Bird();
  pipes.push(new Pipe());
}

function draw() {
  background(0);

  for (const pipe of pipes) {
    pipe.show();
    pipe.update();
    pipe.highlight = pipe.hits(bird)
  }

  pipes = pipes.filter((p) => !p.offscreen);

  bird.update();
  bird.show();

  if (frameCount % 75 === 0) {
    pipes.push(new Pipe());
  }
}

function keyPressed() {
  bird.up();
}
