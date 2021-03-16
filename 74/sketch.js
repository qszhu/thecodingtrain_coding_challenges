function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}

function draw() {
  background(0);
  translate(width / 2, height / 2);
  rotate(-90);

  const hr = hour();
  const mn = minute();
  const sc = second();
  const ml = new Date().getMilliseconds();

  strokeWeight(8);
  noFill();

  stroke(255, 100, 150);
  const secondAngle = map(sc * 1000 + ml, 0, 60 * 1000, 0, 360);
  arc(0, 0, 300, 300, 0, secondAngle);

  stroke(150, 100, 255);
  const minuteAngle = map(mn * 60 + sc, 0, 60 * 60, 0, 360);
  arc(0, 0, 280, 280, 0, minuteAngle);

  stroke(150, 255, 100);
  const hourAngle = map(
    ((hr % 12) * 60 + mn) * 60 + sc,
    0,
    12 * 60 * 60,
    0,
    360
  );
  arc(0, 0, 260, 260, 0, hourAngle);
}
