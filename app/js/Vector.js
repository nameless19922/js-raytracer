export default class Vector {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  length() {
    return Math.sqrt(this.x ** 2 +  this.y ** 2 + this.z ** 2);
  }

  dot(other) {
    return this.x * other.x + this.y * other.y + this.z * other.z;
  }

  cross(other) {
    return new Vector(
      this.y * other.z - this.z * other.y,
      this.z * other.x - this.x * other.z,
      this.x * other.y - this.y * other.x
    )
  }

  normalize() {
    const length = this.length();

    return new Vector(
      this.x / length,
      this.y / length,
      this.z / length
    );
  }

  add(other) {
    return new Vector(
      this.x + other.x,
      this.y + other.y,
      this.z + other.z
    );
  }

  sub(other) {
    return new Vector(
      this.x - other.x,
      this.y - other.y,
      this.z - other.z
    );
  }

  mul(other) {
    return new Vector(
      this.x * other.x,
      this.y * other.y,
      this.z * other.z
    );
  }

  mulNum(num) {
    return new Vector(
      this.x * num,
      this.y * num,
      this.z * num
    );
  }

  div(other) {
    return new Vector(
      this.x / other.x,
      this.y / other.y,
      this.z / other.z
    );
  }

  divNum(num) {
    return new Vector(
      this.x / num,
      this.y / num,
      this.z / num
    );
  }

  neg() {
    return new Vector(
      -this.x,
      -this.y,
      -this.z
    );
  }

  reflect(normal) {
    return normal.mulNum(2).mulNum(this.dot(normal)).sub(this);
  }
}