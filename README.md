three-world
===========

Convenience wrapper around Three.js to create a scene, camera and renderer quickly

## Simple sample

```javascript
  var world = require('three-world'),
      geometry = new THREE.CubeGeometry(10, 10, 10),
      material = new THREE.MeshBasicMaterial({ color: 0xff0000 }),
      mesh     = new THREE.Mesh(geometry, material);

  function onRendered() {
    mesh.rotation.y += 0.05;
  }

  world.init({ camDistance: 50, renderCallback: onRendered });
  world.add(mesh);
  world.startRenderLoop();
```
