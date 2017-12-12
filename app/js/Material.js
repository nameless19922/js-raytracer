export default class Material {
  constructor(color, ka) {
    this.color = color;
    this.ka = ka;
  }

  calculate() {
    return this.color.mulNum(this.ka);
  }
}