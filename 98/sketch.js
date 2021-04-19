const particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < 1000; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
}

function draw() {
  background(0);

  const boundary = new Rectangle(width / 2, height / 2, width / 2, height / 2);
  const qtree = new QuadTree(boundary, 4);

  for (const p of particles) {
    p.update();
    p.highlight = false;

    const point = new Point(p.x, p.y, p);
    qtree.insert(point);
  }

  for (const p of particles) {
    const rect = new Rectangle(p.x, p.y, p.r * 2, p.r * 2);
    const points = qtree.query(rect);
    for (const point of points) {
      const other = point.userData;
      if (p !== other && p.intersects(other)) {
        p.highlight = true;
      }
    }
  }

  for (const p of particles) {
    p.draw();
  }
}
