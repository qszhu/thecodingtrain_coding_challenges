let spriteSheet;
let spriteData;

const animation = [];
const horses = [];

function preload() {
  spriteData = loadJSON("horse/horse.json");
  spriteSheet = loadImage("horse/horse.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (const frame of spriteData.frames) {
    const {
      position: { x, y, w, h },
    } = frame;
    const img = spriteSheet.get(x, y, w, h);
    animation.push(img);
  }

  for (let i = 0; i < height / 72; i++) {
    horses[i] = new Sprite(animation, 0, i * 72, random(-1, 1));
  }
}

function draw() {
  background(0);

  horses.forEach((horse) => {
    horse.show();
    horse.animate();
  });
}
