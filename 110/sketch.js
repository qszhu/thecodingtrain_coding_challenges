const attackLevel = 1;
const releaseLevel = 0;
const attackTime = 0.01;
const decayTime = 0.1;
const susPercent = 0.5;
const releaseTime = 0.5;

const numbers = [];
let count = 1;
const sequence = [];
let index = 0;

let scl = 0;
const arcs = [];
let biggest = 0;

let env;
let osc;

class Arc {
  constructor(start, end, dir) {
    this.start = start;
    this.end = end;
    this.dir = dir;
  }

  show() {
    const diameter = abs(this.end - this.start);
    const x = (this.end + this.start) / 2;
    stroke(255);
    strokeWeight(0.5);
    noFill();
    if (this.dir === 0) {
      arc(x, 0, diameter, diameter, PI, 0);
    } else {
      arc(x, 0, diameter, diameter, 0, PI);
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(6);

  env = new p5.Env();
  env.setADSR(attackTime, decayTime, susPercent, releaseTime);
  env.setRange(attackLevel, releaseLevel);

  osc = new p5.Oscillator();
  osc.setType("sine");
  osc.amp(env);
  osc.start();

  numbers[index] = true;
  sequence.push(index);
}

function step() {
  let next = index - count;
  if (next < 0 || numbers[next]) {
    next = index + count;
  }
  numbers[next] = true;
  sequence.push(next);

  const a = new Arc(index, next, count % 2);
  arcs.push(a);
  index = next;

  const n = (index % 25) + 24;
  const freq = pow(2, (n - 49) / 12) * 440;
  osc.freq(freq);
  env.play();

  biggest = max(biggest, index);
  count++;
}

function draw() {
  step();
  translate(0, height / 2);
  scl = lerp(scl, width / biggest, 0.1);
  scale(scl);
  background(0);

  for (let a of arcs) {
    a.show();
  }

  if (count > windowWidth) {
    noLoop();
  }
}
