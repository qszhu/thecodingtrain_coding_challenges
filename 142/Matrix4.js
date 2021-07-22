class Matrix4 {
  static identity() {
    return new Matrix4();
  }

  static translation(tx, ty, tz) {
    const res = new Matrix4();
    res.fromArray([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, tx, ty, tz, 1]);
    return res;
  }

  static xRotation(radians) {
    var c = Math.cos(radians);
    var s = Math.sin(radians);

    const res = new Matrix4();
    res.fromArray([1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1]);
    return res;
  }

  static yRotation(radians) {
    var c = Math.cos(radians);
    var s = Math.sin(radians);

    const res = new Matrix4();
    res.fromArray([c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1]);
    return res;
  }

  static zRotation(radians) {
    var c = Math.cos(radians);
    var s = Math.sin(radians);

    const res = new Matrix4();
    res.fromArray([c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    return res;
  }

  constructor() {
    this.reset();
  }

  reset() {
    this.data = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
  }

  fromArray(arr) {
    this.data = arr.slice();
    return this;
  }

  toArray() {
    return this.data.slice();
  }

  copy(m) {
    this.data = m.data.slice();
    return this;
  }

  get(i, j) {
    return this.data[i * 4 + j];
  }

  set(i, j, v) {
    this.data[i * 4 + j] = v;
  }

  translate(x, y, z) {
    return this.multiply(Matrix4.translation(x, y, z));
  }

  rotateX(radians) {
    return this.multiply(Matrix4.xRotation(radians));
  }

  rotateY(radians) {
    return this.multiply(Matrix4.yRotation(radians));
  }

  rotateZ(radians) {
    return this.multiply(Matrix4.zRotation(radians));
  }

  multiply(m) {
    const n = new Matrix4().copy(this);
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        let sum = 0;
        for (let k = 0; k < 4; k++) {
          sum += m.get(i, k) * n.get(k, j);
        }
        this.set(i, j, sum);
      }
    }
    return this;
  }

  multiplyVector(x, y, z) {
    const [a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p] = this.data;
    const [x1, y1, z1, w1] = [
      a * x + b * y + c * z + d,
      e * x + f * y + g * z + h,
      i * x + j * y + k * z + l,
      m * x + n * y + o * z + p,
    ];
    return [x1 / w1, y1 / w1, z1 / w1];
  }
}
