const NDROPS = 500;
const drops = [];

let sound

function preload() {
  sound = loadSound('/4/1.mp3')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < NDROPS; i++) drops.push(new Drop());
  sound.loop()
}

function draw() {
  background(0, 0, 0);
  for (const drop of drops) {
    drop.fall();
    drop.show();
  }
}
