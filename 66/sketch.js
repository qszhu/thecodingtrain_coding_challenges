let timeleft = 10;
let startTime = 0;
let currentTime = 0;

function convertSeconds(s) {
  const min = floor(s / 60);
  const sec = s % 60;
  return `${nf(min, 2)}:${nf(sec, 2)}`;
}

let ding;

function preload() {
  ding = loadSound("ding.mp3");
}

function setup() {
  noCanvas();
  startTime = millis();

  const params = getURLParams();
  if (params.minute) {
    const min = params.minute;
    timeleft = min * 60;
  }

  const timer = select("#timer");
  timer.html(convertSeconds(timeleft - currentTime));

  const interval = setInterval(timeIt, 1000);

  function timeIt() {
    currentTime = floor((millis() - startTime) / 1000);
    timer.html(convertSeconds(timeleft - currentTime));
    if (currentTime >= timeleft) {
      ding.play();
      clearInterval(interval);
    }
  }
}
