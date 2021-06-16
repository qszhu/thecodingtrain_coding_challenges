const totalFrames = 480;
let counter = 0;
let loopCount = 0

const particles = new Array(100);

function setup() {
  createCanvas(600, 600);
  for (let i = 0; i < particles.length; i++) {
    particles[i] = new Particle();
  }
  colorMode(HSB)
}

function draw() {
  let percent = (counter++ % totalFrames) / totalFrames;
  render(percent);
}

function render(percent) {
  if (percent === 0) console.log('loop', loopCount++)
  background(0);

  const a = percent * TWO_PI;
  for (const p of particles) {
    p.render(a);
  }
}
