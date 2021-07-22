class Face {
  constructor(normal, color, i) {
    this.normal = normal;
    this.color = color;
    this.text = "BCDEFGJKLNPQRSZabcdefghjklpqrstyz2345679".charAt(i);
  }

  turnX(angle) {
    const { x, y, z } = this.normal;
    const v = createVector();
    v.x = round(x);
    v.y = round(y * cos(angle) - z * sin(angle));
    v.z = round(y * sin(angle) + z * cos(angle));
    this.normal = v;
  }

  turnY(angle) {
    const { x, y, z } = this.normal;
    const v = createVector();
    v.x = round(x * cos(angle) - z * sin(angle));
    v.y = round(y);
    v.z = round(x * sin(angle) + z * cos(angle));
    this.normal = v;
  }

  turnZ(angle) {
    const { x, y, z } = this.normal;
    const v = createVector();
    v.x = round(x * cos(angle) - y * sin(angle));
    v.y = round(x * sin(angle) + y * cos(angle));
    v.z = round(z);
    this.normal = v;
  }

  show() {
    push();

    fill(this.color);
    noStroke();

    translate(this.normal.x / 2, this.normal.y / 2, this.normal.z / 2);

    if (this.normal.z < 0) {
      rotateY(PI);
    }
    if (this.normal.x > 0) {
      rotateY(HALF_PI);
    }
    if (this.normal.x < 0) {
      rotateY(-HALF_PI);
    }
    if (this.normal.y > 0) {
      rotateX(-HALF_PI);
    }
    if (this.normal.y < 0) {
      rotateX(HALF_PI);
    }

    rectMode(CENTER);
    square(0, 0, 1);

    // textFont(font);
    // textSize(1)
    // textAlign(CENTER, CENTER)
    // text(this.text, 0, 0)

    pop();
  }
}
