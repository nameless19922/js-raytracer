import Obj from './Obj';
import Hit from './Hit';

export default class Sphere extends Obj {
  constructor(center, radius, material) {
    super(material);

    this.center = center;
    this.radius = radius;
  }

  intersect(ray) {
    let k = ray.origin.sub(this.center);
    let a = ray.direction.dot(ray.direction);
    let b = 2 * k.dot(ray.direction);
    let c = k.dot(k) - this.radius ** 2;
    let d = b ** 2 - 4.0 * a * c;

    if (d < 0) {
      return false;
    }

    d = Math.sqrt(d);

    let q;
    if (b < 0) {
      q = (-b - d) * 0.5;
    } else {
      q = (-b + d) * 0.5;
    }
    let rootOne = q / a;
    let rootTwo = c / q;

    if (rootOne > rootTwo) {
      let tmp = rootOne;

      rootOne = rootTwo;
      rootTwo = tmp;
    }

    let distance = rootOne;

    if (distance < 0) {
      distance = rootTwo;
    }

    if (distance < 0.0001) {
      return false;
    }

    let intersec = ray.origin.add(ray.direction).mulNum(distance);
    let normal = intersec.sub(this.center).normalize();

    if (ray.direction.dot(normal) > 0) {
      normal = normal * -1;
    }

    return new Hit(intersec, normal);
  }

  get color() {
    return this.material.color;
  }
}