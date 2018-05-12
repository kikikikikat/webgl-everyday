var renderer, scene, camera, controls;

var winHeight = window.innerHeight;
var winWidth = window.innerWidth;

init();
animate();

function init() {
	// renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(winWidth, winHeight);
	document.body.appendChild(renderer.domElement);

	// scene
	scene = new THREE.Scene();

	// camera
	camera = new THREE.PerspectiveCamera(20, winWidth / winHeight, 1, 1000);
  camera.position.set(0, 0, 100);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  
  // controls
  controls = new THREE.TrackballControls(camera, renderer.domElememnt);


	var geometry = new THREE.BufferGeometry();

	var positions = []; 
	var colors =  [];

	var numberOfLines = 100;
	for (var i = 0; i < numberOfLines; i ++) {
    
    var x = randWithin(-12, 12);
		var y = randWithin(-12, 12);
		var z = randWithin(-12, 12);

		positions.push(x, y, z);

		colors.push(Math.random(), Math.random(), Math.random());
	}

	geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
	geometry.addAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
	geometry.computeBoundingSphere();


	// material
	var material = new THREE.LineBasicMaterial({ vertexColors: THREE.VertexColors });

	// line
	line = new THREE.Line(geometry,  material);
	scene.add(line);

}

function randWithin(min, max) {
	var len = max - min;
	var result = Math.random() * len - (len / 2);
	result = result > max ? max : result;
	result = result < min ? min : result;
	return result;
}

// render
function render() {

	renderer.render(scene, camera);

}

// animate
function animate() {
	requestAnimationFrame(animate);
	controls.update();
	render();

}
