import 'babel-polyfill';

import Vector from './Vector';

export default class Camera {
  constructor(opts) {
    this.position = new Vector(0, 0, 0);
    this.lookAt   = new Vector(0, 0, 1);
    this.up       = new Vector(0, 1, 0);

    Object.assign(this, opts);
  }

  calculateWUV() {
    this.w = this.lookAt.sub(this.position).normalize();
    this.u = this.up.cross(this.w).normalize();
    this.v = this.w.cross(this.u);
  }
}