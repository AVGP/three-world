var THREE = require('three');

var World = (function() {
  // Internals

  var camera, scene, renderer, frameCallback, self = {};

  function render() {
    if(frameCallback) frameCallback();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

	function onWindowResize() {

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );

	}

  // Exports

  self.init = function(options) {
    if(!options) options = {};

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, options.farPlane || 2000);
    camera.position.z = options.camDistance || 100;
    frameCallback = options.renderCallback;

    // scene

    scene = new THREE.Scene();

    var ambient = new THREE.AmbientLight(options.ambientLightColor || 0xffffff);
    scene.add(ambient);

    renderer = new THREE.WebGLRenderer(options.rendererOpts);
    renderer.setSize(window.innerWidth, window.innerHeight);

    var container = options.container || document.body;
    container.appendChild(renderer.domElement);

    window.addEventListener( 'resize', onWindowResize, false );
  }

  self.add = function(object) {
    scene.add(object);
  }

  self.startRenderLoop = function() {
    render();
  }

  self.getCamera = function() { return camera; };

  return self;
})();

module.exports = World;
