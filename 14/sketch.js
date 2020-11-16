let angle = 0

function setup() {
  createCanvas(windowWidth, windowHeight)
}

function draw() {
  background(51)
  angle = map(mouseX, 0, width, 0, TWO_PI);
  stroke(255)
  translate(width / 2, height)
  branch(height / 4)
}

function branch(len) {
  line(0, 0, 0, -len)
  translate(0, -len)
  if (len > 4) {
    push()
    rotate(angle)
    branch(len * 2 / 3)
    pop()

    push()
    rotate(-angle)
    branch(len * 2 / 3)
    pop()
  }
}