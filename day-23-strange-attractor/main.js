var renderer, scene, camera, controls;

var line;
var MAX_POINTS = 50000;
var drawCount;

// attractor's initials
var x = -12.1;
var y = -22;
var z = 0;
var thomas_b = 0.1998;

var dt, dx, dy, dz;

init();
animate();

function init() {
	// renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	// scene
	scene = new THREE.Scene();

	// camera
	camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.set(0, 0, 100);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  
  // controls
  controls = new THREE.TrackballControls(camera, renderer.domElememnt);


	var geometry = new THREE.BufferGeometry();

	var positions = new Float32Array(MAX_POINTS * 3); // 3 vertices per point
	geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));

	// drawcalls
	drawCount = 2; // draw the first 2 points, only
	geometry.setDrawRange(0, drawCount);

	// material
	var material = new THREE.LineBasicMaterial({ color: 0xff0000 });

	// line
	line = new THREE.Line(geometry,  material);
	scene.add(line);

	// update positions
	updatePositions();

}

// update positions
function updatePositions() {

	var positions = line.geometry.attributes.position.array;

	var index = 0;

	for (var i = 0, l = MAX_POINTS; i < l; i ++) {

		positions[ index ++ ] = x;
		positions[ index ++ ] = y;
		positions[ index ++ ] = z;
		
    // https://en.wikipedia.org/wiki/Thomas%27_cyclically_symmetric_attractor
		dt = 0.2;
    
    dx = (Math.sin(y) - thomas_b * x) * dt;
    dy = (Math.sin(z) - thomas_b * y) * dt;
    dz = (Math.sin(x) - thomas_b * z) * dt;
    
    x = x + dx;
    y = y + dy;
    z = z + dz;

	}

}

// render
function render() {

	renderer.render(scene, camera);

}

// animate
function animate() {
	requestAnimationFrame(animate);
	drawCount = (drawCount + 1) % MAX_POINTS;
	line.geometry.setDrawRange(0, drawCount);
	if (drawCount === 0) {
		updatePositions();
		line.geometry.attributes.position.needsUpdate = true; // required after the first render
		line.material.color.setHSL(Math.random(), 1, 0.5);
	}
	controls.update();
	render();

}
