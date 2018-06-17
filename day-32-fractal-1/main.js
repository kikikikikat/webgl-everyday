// Bezier curves
var camera, scene, renderer, controls;
var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;
var levelCounter = 0;
var MAX_LEVEL = 8;
var HALF_ANGLE = 30;

init();
animate();

function drawPath() {
  var path = new THREE.Path();

  path.lineTo( 0, 80 );
  drawBranches([path.currentPoint.x, path.currentPoint.y], HALF_ANGLE, 100, 0);

	var points = path.getPoints();

	var geometry = new THREE.BufferGeometry().setFromPoints( points );
	var material = new THREE.LineBasicMaterial( { color: 0xff0000 } );

	var line = new THREE.Line( geometry, material );
  scene.add( line );
}

function drawBranches(originPos, halfAngle, length, nestedLevel) {
  if (nestedLevel > MAX_LEVEL) return;
  var x = originPos[0];
  var y = originPos[1];

  var x1 = x + Math.sin(halfAngle * Math.PI / 180) * length;
  var y1 = y + Math.cos(halfAngle * Math.PI / 180) * length;
  var x2 = x - Math.sin(halfAngle * Math.PI / 180) * length;
  var y2 = y1;
  var path = new THREE.Path([{x: x, y: y}]);
  path.lineTo(x1, y1);
  nestedLevel++;
  path.moveTo(x, y);
  path.lineTo(x2, y2);
  var points = path.getPoints();

	var geometry = new THREE.BufferGeometry().setFromPoints( points );
	var material = new THREE.LineBasicMaterial( { color: 0xff0000 } );

	var line = new THREE.Line( geometry, material );
  scene.add( line );
  drawBranches([x1, y1], HALF_ANGLE, length * 0.6, nestedLevel);
  drawBranches([x2, y2], HALF_ANGLE, length * 0.6, nestedLevel);

}

function init() {
  camera = new THREE.PerspectiveCamera( 50, canvasWidth / canvasHeight, 1, 2000 );
  camera.position.set(0, 0, 1500);

  scene = new THREE.Scene();
  drawPath();

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( canvasWidth, canvasHeight );
  renderer.setClearColor(0xffffff); // grey
  controls = new THREE.OrbitControls(camera, renderer.domElememnt);
  document.body.appendChild( renderer.domElement );
}


function animate() {
  requestAnimationFrame( animate );
  controls.update();
  render();
}

function render() {
  renderer.render( scene, camera );
}
