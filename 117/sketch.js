const nums = [
  0x7e, 0x30, 0x6d, 0x79, 0x33, 0x5b, 0x5f, 0x70, 0x7f, 0x7b, 0x77, 0x1f, 0x4e,
  0x3d, 0x4f, 0x47,
];
let index = 0;

function setup() {
  createCanvas(400, 400);
  frameRate(3);
}

function draw() {
  background(0);
  sevenSegment(40, 40, nums[index]);
  index = (index + 1) % nums.length;
}

function sevenSegment(x, y, val) {
  const width = 20;
  const length = 80;
  const height = 100;
  const onColor = color(255, 0, 0, 255);
  const offColor = color(255, 0, 0, 40);

  const getColor = (val, shift) => ((val >> shift) & 1 ? onColor : offColor);
  const hBar = (x, y) => rect(x, y, length, width);
  const vBar = (x, y) => rect(x, y, width, height);

  // A
  fill(getColor(val, 6));
  hBar(x + width, y);

  // B
  fill(getColor(val, 5));
  vBar(x + width + length, y + width);

  // C
  fill(getColor(val, 4));
  vBar(x + width + length, y + width * 2 + height);

  // D
  fill(getColor(val, 3));
  hBar(x + width, y + width * 2 + height * 2);

  // E
  fill(getColor(val, 2));
  vBar(x, y + width * 2 + height);

  // F
  fill(getColor(val, 1));
  vBar(x, y + width);

  // G
  fill(getColor(val, 0));
  hBar(x + width, y + width + height);
}
