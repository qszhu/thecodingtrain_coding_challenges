let angle
const axiom = 'F'
let sentence = axiom
let len

const rules = {
  'F': 'FF+[+F-F-F]-[-F+F+F]'
}

function generate() {
  sentence = [...sentence].map(c => rules[c] || c).join('')
}

function turtle() {
  background(51)
  resetMatrix()
  translate(width / 2, height)
  stroke(255, 100)
  for (const c of sentence) {
    if (c === 'F') {
      line(0, 0, 0, -len)
      translate(0, -len)
    } else if (c === '+') {
      rotate(angle)
    } else if (c === '-') {
      rotate(-angle)
    } else if (c === '[') {
      push()
    } else if (c === ']') {
      pop()
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  background(51)
  angle = radians(25)
  len = height / 4
  turtle()
}

function mousePressed() {
  generate()
  len *= 0.5
  turtle()
}