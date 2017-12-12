import Material from './Material';
import Color from './Color';

export default class LambertMaterial extends Material {
  constructor(color, ka, kd) {
    super(color, ka);

    this.kd = kd;
  }

  calculate(hit, light) {
    const l = light.position.sub(hit.intersec).normalize();
    const n = hit.normal;
    const factor = .5;
    const diffuseColor = new Color(0, 0, 0);

    return diffuseColor.add(this.color.mulNum(Math.max(n.dot(l) + factor, 0) / (1 + factor))).mulNum(light.intensity);
  }
}