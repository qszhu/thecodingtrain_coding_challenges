let editor;
let goBtn;
let turtle;
let cmdIter;
const speedup = 1//00

const commandLookup = {
  fd(amt) {
    turtle.forward(amt);
  },
  bd(amt) {
    turtle.forward(-amt);
  },
  rt(angle) {
    turtle.right(angle);
  },
  lt(angle) {
    turtle.right(-angle);
  },
  pu() {
    turtle.pen = false;
  },
  pd() {
    turtle.pen = true;
  },
};

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  background(0);

  editor = select("#code");
  goBtn = select("#go");
  goBtn.mousePressed(goTurtle);

  push()
}

function* nextCommand(commands) {
  for (const command of commands) {
    const { name, arg } = command;
    // if (name === "repeat") {
    //   for (let i = 0; i < arg; i++) {
    //     yield* nextCommand(command.commands);
    //   }
    // } else {
      yield { name, arg };
    // }
  }
}

function goTurtle() {
  const code = editor.value();
  const parser = new Parser(code);
  const commands = parser.parse();

  turtle = new Turtle(0, 60, 0, 0.5);
  turtle.reset();
  push()

  cmdIter = nextCommand(commands);
}

function draw() {
  pop();

  for (let i = 0; i < speedup; i++) {
    if (cmdIter) {
      const { value, done } = cmdIter.next();
      if (!done) {
        const { name, arg } = value;
        commandLookup[name](arg);
        push();
      }
    }
  }

  push();
}
