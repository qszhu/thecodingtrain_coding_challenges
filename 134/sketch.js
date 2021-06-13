let a = 0

function heart(r) {
  const res = []
  for (let a = 0; a < TWO_PI; a += 0.1) {
    const x = r * 16 * pow(sin(a), 3)
    const y = -r * (13 * cos(a) - 5 * cos(2 * a) - 2 * cos(3 * a) - cos(4 * a))
    res.push(createVector(x, y))
  }
  return res
}

function setup() {
  createCanvas(windowWidth, windowHeight)
}

function draw() {
  background(0)
  translate(width / 2, height / 2)

  stroke(255, 0, 200)
  strokeWeight(4)
  fill(150, 0, 100)

  const r = map(sin(a), -1, 1, height / 80, height / 40)
  beginShape()
  for (const v of heart(r)) {
    vertex(v.x, v.y)
  }
  endShape()

  a += 0.1
}