let font;
let lines;
let txt;
let sound;

let y = 0;

function preload() {
  lines = loadStrings("space.txt");
  font = loadFont("AvenirNextLTPro-Demi.otf");
  sound = loadSound(
    "Star Wars - Main Theme [ Cover, midi mockup ]-_vsoDqyyYWs.mp3"
  );
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  txt = join(lines, "\n");
  y = height;
  sound.play();
}

function draw() {
  background(0);

  fill(238, 213, 75);
  textFont(font);
  textSize(width * 0.04);
  textAlign(LEFT);
  rotateX(PI / 4);
  let w = width * 0.6;
  text(txt, -w / 2, y, w, height * 10);

  y -= 1;
}
