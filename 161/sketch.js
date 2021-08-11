const MAX = Number.MAX_SAFE_INTEGER

let coprimeCount = 0;
let total = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  for (let n = 0; n < 500; n++) {
    const a = floor(random(0, MAX))
    const b = floor(random(0, MAX))
    if (gcd(a, b) === 1) coprimeCount++;
    total++;
  }

  const pie = sqrt((6 * total) / coprimeCount);

  background(0);
  textAlign(CENTER, CENTER);
  textSize(64);
  fill(255);
  textFont("Courier");
  text(nf(pie, 1, 10), width / 2, height / 2);
}

function gcd(a, b) {
  if (a < b) return gcd(b, a);

  if (b === 0) return a;

  return gcd(b, a % b);
}
