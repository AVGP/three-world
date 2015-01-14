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
  world.start();
```

You can also `pause` and `resume` the world, if you so wish:

```javascript
  world.start();
  ...
  world.pause();
  console.log(world.isPaused());
  world.resume();
```

In addition you can get the Camera, Scene and Renderer:

```javascript
  var cam      = world.getCamera(),
      scene    = world.getScene(),
      renderer = world.getRenderer();
```

## Available options

| Option | Description | Default |
| --- | --- | --- |
| ambientLightColor | Color of the ambient light. Optional. | 0xffffff (white) |
| camDistance | Position on the z-axis where the camera should initially be. Optional. | 100 |
| clearColor | Color that is used to clear the canvas. Optional. | 0 (black) |
| container | Element that the renderer should be appended to. Optional. | document.body |
| farPlane | Maximum distance from the camera that is still rendered. Optional. | 2000 |
| renderCallback | Callback function that is called right before rendering a new frame. Optional | undefined |
