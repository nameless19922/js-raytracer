import Camera from './Camera';
import Sphere from './Sphere';
import Plane from './Plane';
import Vector from './Vector';
import Color from './Color';
import PhongMaterial from './PhongMaterial';
import Light from './Light';
import Raytracer from './Raytracer';

try {
  new Raytracer(
    new Camera(),
    document.getElementById('output'),
    {
      objs: [
        new Plane(
          { a: 0, b: -1, c: 0, d: 50 },
          new PhongMaterial(
            new Color(1, 0, 0),
            .9,
            .8,
            30
          )
        )
      ],
      lights: [
        new Light(
          new Vector(2, 10, 10),
          1
        )
      ]
    }
  ).render();
} catch (err) {
  console.log(err);
}

