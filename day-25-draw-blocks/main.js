var renderer, scene, camera, controls;

var winHeight = window.innerHeight;
var winWidth = window.innerWidth;

var sampleBeats = [
	0, 1, 1, 0, 1, 0, 1, 0
];

init();
animate();

function drawBlock(positions, w, h) {
	var lastIndex = positions.length - 1;
	var x = positions[lastIndex - 2] || -10;
	var y = positions[lastIndex - 1] || 0;
	var z = 0; // 2D only
	positions.push(x, y, z);
	y += h;
	positions.push(x, y, z);
	x += w;
	positions.push(x, y, z);
	y -= h;
	positions.push(x, y, z);
}

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
	var x = - 10, y = 0, z = 0;
	var step = 2;
	var height = 4;
	for (var i = 1; i < sampleBeats.length; i += 2) {
		if (!sampleBeats[i - 1] && sampleBeats[i]) {
			// case: 01
			y = 0;
			positions.push(x, y, z);
			x += step;
			positions.push(x, y, z);
			y = 4;
			positions.push(x, y, z);
			x += step;
			positions.push(x, y, z);
		} else if (sampleBeats[i - 1] && !sampleBeats[i]) {
			// case: 10
			y = 4;
			positions.push(x, y, z);
			x += step;
			positions.push(x, y, z);
			y = 0;
			positions.push(x, y, z);
			x += step;
			positions.push(x, y, z);
		} else {
			x += step * 2;
			positions.push(x, y, z);
		}
	}

/* 	drawBlock(positions, 3, 4); */

	console.log(positions);

	geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
	geometry.addAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
	geometry.computeBoundingSphere();


	// material
	var material = new THREE.LineBasicMaterial({ color: 0xff0000 });

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
