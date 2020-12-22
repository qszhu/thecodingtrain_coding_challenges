function diastic(seed, words) {
  const phrase = [];
  let lastIdx = -1;

  for (let i = 0; i < seed.length; i++) {
    const c = seed[i];
    for (let j = lastIdx + 1; j < words.length; j++) {
      if (words[j][i] === c) {
        phrase.push(words[j]);
        lastIdx = j;
        break;
      }
    }
  }
  return phrase.join(" ");
}

let srctxt;
let words;

function preload() {
  srctxt = loadStrings("rainbow.txt");
}

function setup() {
  noCanvas();
  srctxt = join(srctxt, " ");
  words = splitTokens(srctxt, " ,!.?");

  const seed = select("#seed");
  const submit = select("#submit");
  submit.mousePressed(() => {
    const phrase = diastic(seed.value(), words);
    createP(phrase);
  });
}
