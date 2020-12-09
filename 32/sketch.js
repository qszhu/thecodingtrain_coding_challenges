let blob;
let blobs = [];
let zoom = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  blob = new Blob(0, 0, 64);
  for (let i = 0; i < 200; i++) {
    const x = random(-width, width);
    const y = random(-height, height);
    blobs.push(new Blob(x, y, 16));
  }
}

function draw() {
  background(0);

  translate(width / 2, height / 2);
  const newzoom = 64 / blob.r;
  zoom = lerp(zoom, newzoom, 0.1);
  scale(zoom);
  translate(-blob.pos.x, -blob.pos.y);

  for (const b of blobs) {
    b.show();
  }

  blobs = blobs.filter((b) => !blob.eats(b));

  blob.show();
  blob.update();
}
