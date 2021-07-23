const w = 10;
const STATE_PIVOT = 0;
const STATE_PARTITION = 1;
const STATE_NORMAL = -1;
const COLOR_PIVOT = "#E0777D";
const COLOR_PARTITION = "#D6FFB7";
const COLOR_NORMAL = "#FFFFFF";

let values;
let states;

function setup() {
  createCanvas(windowWidth, windowHeight);

  values = new Array(floor(width / w));
  for (let i = 0; i < values.length; i++) {
    values[i] = random(height);
  }
  states = new Array(values.length).fill(STATE_NORMAL);

  quickSort(values, 0, values.length - 1);
}

async function quickSort(arr, start, end) {
  if (start >= end) return;

  const idx = await partition(arr, start, end);

  await Promise.all([
    quickSort(arr, start, idx - 1),
    quickSort(arr, idx + 1, end),
  ]);
}

async function partition(arr, start, end) {
  for (let i = start; i <= end; i++) {
    states[i] = STATE_PARTITION;
  }

  let pVal = arr[end];
  let pIdx = start;
  states[pIdx] = STATE_PIVOT;

  for (let i = start; i < end; i++) {
    if (arr[i] < pVal) {
      await swap(arr, i, pIdx);
      states[pIdx] = STATE_NORMAL;
      pIdx++;
      states[pIdx] = STATE_PIVOT;
    }
  }

  await swap(arr, pIdx, end);

  for (let i = start; i <= end; i++) {
    states[i] = STATE_NORMAL;
  }

  return pIdx;
}

async function swap(arr, a, b) {
  await sleep(50);
  [arr[a], arr[b]] = [arr[b], arr[a]];
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function draw() {
  background(0);

  noStroke();
  for (let i = 0; i < values.length; i++) {
    if (states[i] === STATE_PIVOT) fill(COLOR_PIVOT);
    else if (states[i] === STATE_PARTITION) fill(COLOR_PARTITION);
    else fill(COLOR_NORMAL);

    rect(i * w, height - values[i], w, values[i]);
  }
}
