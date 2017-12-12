import Ray from './Ray';
import Color from './Color';

export default class Raytracer {
  static isEnd = false;

  constructor(camera, canvas, scene) {
    this.camera = camera;
    this.canvas = canvas;
    this.scene  = scene;
  }

  getRay(x, y, width, height) {
    this.camera.calculateWUV();

    const fovy = 30;
    const fovx = Math.atan(width / height) * Math.tan(fovy * Math.PI / 180.0) * 180.0 / Math.PI;

    const dinvx = Math.tan((fovx / 2.0) * (Math.PI / 180.0));
    const dinvy = Math.tan((fovy / 2.0) * (Math.PI / 180.0));
    const alpha = dinvx * (x - (width / 2)) / (height / 2);
    const beta  = dinvy * ((height / 2) - y) / (height / 2);

    const u = this.camera.u.mulNum(alpha);
    const v = this.camera.v.mulNum(beta);

    return new Ray(this.camera.position, u.add(v).sub(this.camera.w).normalize());
  }

  trace(ray) {
    for (let obj of this.scene.objs) {
      let hit = obj.intersect(ray);

      if (hit) {

        for (let light of this.scene.lights) {
          return obj.material.calculate(hit, light, ray);
        }
      }
    }

    return new Color(.4, .4, .4);
  }

  startTimer() {
    const $time = document.getElementById('fulltime');
    const start  = new Date().getTime();

    const interval = () => {

      $time.innerText = `${(new Date()).getTime() - start} s`;

      if (!Raytracer.isEnd) setTimeout(interval, 1000);
    }

    interval();
  }

  render() {
    const ctx    = this.canvas.getContext('2d');
    const width  = this.canvas.width;
    const height = this.canvas.height;
    const image  = ctx.getImageData(0, 0, width, height);

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const ray   = this.getRay(x, y, width, height);
        const color = this.trace(ray);
        const index = (x * 4) + ((height - y) * width * 4);

        image.data[index]     = color.r < 1 ? color.r * 255 : 255;
        image.data[index + 1] = color.g < 1 ? color.g * 255 : 255;
        image.data[index + 2] = color.b < 1 ? color.b * 255 : 255;
        image.data[index + 3] = 255;
      }
    }

    ctx.putImageData(image, 0, 0);
  }
}