const wave = [];

let time = 0;
let slider;

function setup() {
  createCanvas(windowWidth, windowHeight - 20);
  slider = createSlider(1, 100, 5);
}

function draw() {
  background(0);
  translate(150, height / 2);

  let x = 0,
    y = 0;
  let prevX = x,
    prevY = y;
  for (let i = 0; i < slider.value(); i++) {
    const n = i * 2 + 1;
    const radius = 75 * (4 / (n * PI));
    x += radius * cos(n * time);
    y += radius * sin(n * time);

    stroke(255, 100);
    noFill();
    ellipse(prevX, prevY, radius * 2);

    stroke(255);
    line(prevX, prevY, x, y);

    prevX = x;
    prevY = y;
  }
  wave.unshift(y);
  if (wave.length > width) wave.pop();

  translate(200, 0);
  line(x - 200, y, 0, wave[0]);

  noFill();
  beginShape();
  for (let i = 0; i < wave.length; i++) {
    vertex(i, wave[i]);
  }
  endShape();

  time += 0.05;
}
