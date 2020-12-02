const blobs = new Array(10).fill();

function setup() {
  createCanvas(400, 200);
  colorMode(HSB);
  for (let i = 0; i < blobs.length; i++) {
    blobs[i] = new Blob(random(width), random(height));
  }
}

function draw() {
  loadPixels();
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let sum = 0;
      for (const b of blobs) {
        const dx = x - b.pos.x;
        const dy = y - b.pos.y;
        const d = sqrt(dx * dx + dy * dy);
        sum += (10 * b.r) / d;
      }
      set(x, y, color(sum, 255, 255));
    }
  }
  updatePixels();

  for (const b of blobs) {
    b.update();
  }
}
