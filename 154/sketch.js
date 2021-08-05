const board = [];
let w;
let h;

const ai = "X";
const human = "O";
let currentPlayer = human;

function setup() {
  createCanvas(400, 400);

  w = width / 3;
  h = height / 3;

  for (let i = 0; i < 3; i++) {
    const row = [];
    for (let j = 0; j < 3; j++) {
      row.push("");
    }
    board.push(row);
  }

  bestMove();
}

function equals3(a, b, c) {
  return a === b && b === c && a !== "";
}

function checkWinner() {
  let winner;

  // horizontal
  for (let i = 0; i < 3; i++) {
    if (equals3(...board[i])) winner = board[i][0];
  }

  // vertical
  for (let i = 0; i < 3; i++) {
    if (equals3(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
    }
  }

  // diagonal
  if (equals3(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
  }
  if (equals3(board[2][0], board[1][1], board[0][2])) {
    winner = board[2][0];
  }

  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === "") {
        openSpots++;
      }
    }
  }

  if (!winner && openSpots === 0) return "tie";
  return winner;
}

function mousePressed() {
  if (currentPlayer === human) {
    const j = floor(mouseX / w);
    const i = floor(mouseY / h);
    if (board[i][j] === "") {
      board[i][j] = human;
      currentPlayer = ai;
      bestMove();
    }
  }
}

function draw() {
  background(255);
  strokeWeight(4);

  // vertical
  line(w, 0, w, height);
  line(w * 2, 0, w * 2, height);
  // horizontal
  line(0, h, width, h);
  line(0, h * 2, width, h * 2);

  textSize(32);
  noFill();
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const x = w * j + w / 2;
      const y = h * i + h / 2;
      const spot = board[i][j];
      const r = w / 4;
      if (spot === human) {
        // O
        ellipse(x, y, r * 2);
      } else if (spot === ai) {
        // X
        // \
        line(x - r, y - r, x + r, y + r);
        // /
        line(x + r, y - r, x - r, y + r);
      }
    }
  }

  const result = checkWinner();
  if (result) {
    noLoop();
    const resultP = createP("");
    resultP.style("font-size", "32pt");
    if (result === "tie") {
      resultP.html("Tie!");
    } else {
      resultP.html(`${result} wins!`);
    }
  }
}
