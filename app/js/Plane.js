import Obj from './Obj';
import Vector from './Vector';
import Hit from './Hit';

export default class Plane extends Obj {
  constructor(opts, material) {
    super(material)

    this.a = 0;
    this.b = 1;
    this.c = 0;
    this.d = 0;

    Object.assign(this, opts);
  }

  intersect(ray) {
    const normal = new Vector(this.a, this.b, this.c);
    const nrd = normal.dot(ray.direction);
    const nro = normal.dot(ray.origin);
    const distance = (-this.d - nro) / nrd;

    console.log(-this.d, nro, nrd);

    if (distance < 0.0001) {
      return false;
    } else {
      return new Hit(
        ray.origin.add(ray.direction.mulNum(distance)),
        normal
      );
    }
  }
}