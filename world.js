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
    var width  = options.container ? options.container.clientWidth  : window.innerWidth,
        height = options.container ? options.container.clientHeight : window.innerHeight;

		camera.aspect = width / height;
		camera.updateProjectionMatrix();

		renderer.setSize( width, height );

	}

  // Exports

  self.init = function(options) {
    if(!options) options = {};

    var width  = options.container ? options.container.clientWidth  : window.innerWidth,
        height = options.container ? options.container.clientHeight : window.innerHeight;

    camera = new THREE.PerspectiveCamera(45, width/height, 1, options.farPlane || 2000);
    camera.position.z = options.camDistance || 100;
    frameCallback = options.renderCallback;

    // scene

    scene = new THREE.Scene();

    var ambient = new THREE.AmbientLight(options.ambientLightColor === undefined ? 0xffffff : options.ambientLightColor);
    scene.add(ambient);

    renderer = new THREE.WebGLRenderer(options.rendererOpts);
    renderer.setSize(width, height);
    if(options.clearColor) renderer.setClearColor(options.clearColor);

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
