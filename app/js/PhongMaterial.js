import Material from './Material';
import Color from './Color';

export default class PhongMaterial extends Material {
  constructor(color, ka, kd, shininess) {
    super(color, ka);

    this.kd = kd;
    this.shininess = shininess;
  }

  calculate(hit, light, ray) {
    const l = light.position.sub(hit.intersec).normalize();
    const n = hit.normal;
    const v = ray.origin.sub(hit.intersec).normalize();
    const r = l.reflect(n).normalize();
    const diffuseColor = new Color(0, 0, 0);
    const specColor = new Color(1, 1, 1);

    const diffuse = diffuseColor.add(this.color.mulNum(Math.max(n.dot(l), 0))).mulNum(light.intensity);

    return diffuse.add(specColor.mulNum(Math.pow(Math.max(v.dot(r), 0), this.shininess)));
  }
}