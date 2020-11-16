let x = 0.01
let y = 0
let z = 0

const a = 10
const b = 28
const c = 8 / 3

const points = []

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL)
  colorMode(HSB)
}

function draw() {
  background(0)

  const dx = a * (y - x)
  const dy = x * (b - z) - y
  const dz = x * y - c * z

  const dt = 0.01
  x += dx * dt
  y += dy * dt
  z += dz * dt

  points.push(new p5.Vector(x, y, z))

  translate(0, 0, -80)
  const camX = map(mouseX, 0, width, -200, 200)
  const camY = map(mouseY, 0, height, -200, 200)
  camera(camX, camY, height / 2.0 / tan((PI * 30) / 180), 0, 0, 0, 0, 1, 0)

  scale(5)
  stroke(255)
  noFill()

  let hu = 0
  beginShape()
  for (const v of points) {
    stroke(hu, 255, 255)

    // const offset = p5.Vector.random3D()
    // offset.mult(0.1)
    // v.add(offset)

    vertex(v.x, v.y, v.z)

    hu = (hu + 1) % 256
  }
  endShape()
}