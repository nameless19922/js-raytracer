export default class Color {
  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  add(other) {
    return new Color(
      this.r + other.r,
      this.g + other.g,
      this.b + other.b
    );
  }

  sub(other) {
    return new Color(
      this.r - other.r,
      this.g - other.g,
      this.b - other.b
    );
  }

  mul(other) {
    return new Color(
      this.r * other.r,
      this.g * other.g,
      this.b * other.b
    );
  }

  mulNum(amount) {
    return new Color(
      this.r * amount,
      this.g * amount,
      this.b * amount
    );
  }
}