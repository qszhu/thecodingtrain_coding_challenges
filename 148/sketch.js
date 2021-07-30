const points = [];
const hull = [];

let leftMost;
let currentVertex;
let index;
let nextVertex;

function setup() {
  createCanvas(windowWidth, windowHeight);

  let buffer = 20;
  for (let i = 0; i < 50; i++) {
    const x = random(buffer, width - buffer);
    const y = random(buffer, height - buffer);
    points.push(createVector(x, y));
  }

  points.sort((a, b) => a.x - b.x);
  leftMost = points[0];

  currentVertex = leftMost;
  hull.push(currentVertex);
  nextVertex = points[1];
  index = 2;
}

function draw() {
  background(0);

  // draw points
  stroke(255);
  strokeWeight(8);
  for (const p of points) {
    point(p.x, p.y);
  }

  // draw hull
  stroke(0, 0, 255);
  fill(0, 0, 255, 50);
  beginShape();
  for (const p of hull) {
    vertex(p.x, p.y);
  }
  endShape(CLOSE);

  // draw start point
  stroke(0, 255, 0);
  strokeWeight(32);
  point(leftMost.x, leftMost.y);

  // draw current vertex
  stroke(200, 0, 255);
  strokeWeight(32);
  point(currentVertex.x, currentVertex.y);

  // draw current line
  stroke(0, 255, 0);
  strokeWeight(2);
  line(currentVertex.x, currentVertex.y, nextVertex.x, nextVertex.y);

  let checking = points[index];
  // draw checking line
  stroke(255);
  line(currentVertex.x, currentVertex.y, checking.x, checking.y);

  const a = p5.Vector.sub(nextVertex, currentVertex);
  const b = p5.Vector.sub(checking, currentVertex);
  if (a.cross(b).z < 0) {
    nextVertex = checking;
  }

  index++;
  if (index === points.length) {
    if (nextVertex === leftMost) {
      console.log("done");
      noLoop();
    } else {
      hull.push(nextVertex);
      currentVertex = nextVertex;
      index = 0;
      nextVertex = leftMost;
    }
  }
}
