// Bezier curves
var camera, scene, renderer, controls;
var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;

var leftWing, rightWing;
var butterfly;

function CustomCurve(scale) {
  THREE.Curve.call(this);
  this.scale = scale ? scale : 1;
}

CustomCurve.prototype = Object.create(THREE.Curve.prototype);
CustomCurve.prototype.constructor = CustomCurve;
CustomCurve.prototype.getPoint = function(t) {
/*   var tx = t * 3 - 1.5;
  var ty = Math.sin( 2 * Math.PI * t ); */
  // Folium of Descartes
  // http://mathworld.wolfram.com/FoliumofDescartes.html
  var t = t * 100;
  var tx = 3 * t / (1 + Math.pow(t, 3));
  var ty = 3 * Math.pow(t, 2) / (1 + Math.pow(t, 3));

  var tz = 0;

  return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
}
init();
animate();

function drawParametricCurve() {
  var path = new CustomCurve( 100 );
  var geometry = new THREE.TubeGeometry( path, 128, 2, 16, false );
  var material = new THREE.MeshNormalMaterial( { side: THREE.DoubleSide } );
  var mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );
  return mesh;
}

function drawHalfWing() {
  var halfWing = new THREE.Group();
  var n = 5;
  for (let i = 0; i < n; i++) {
    let ring = drawParametricCurve();
    let scaleFactor = i * (1 / n);
    ring.scale.set(scaleFactor, scaleFactor, scaleFactor);
    halfWing.add(ring);
  }
  scene.add(halfWing);
  return halfWing;
}

function drawWing() {
  var wing = new THREE.Group();
  var top = drawHalfWing();
  var bottom = drawHalfWing();
  bottom.scale.set(0.6, 0.6, 0.6);
  bottom.rotation.z = -90 * Math.PI / 180;
  wing.add(top);
  wing.add(bottom);
  scene.add(wing);
  return wing;
}

function drawButterfly() {
  butterfly = new THREE.Group();
  leftWing = drawWing();
  rightWing = drawWing();
  leftWing.rotation.y = 180 * Math.PI / 180;
  butterfly.add(leftWing);
  butterfly.add(rightWing);
  scene.add(butterfly);
  leftWing.rotation.y = 135 * Math.PI / 180;
  rightWing.rotation.y = -315 * Math.PI / 180; 
}

function init() {
  camera = new THREE.PerspectiveCamera( 50, canvasWidth / canvasHeight, 1, 10000 );
	camera.position.z = 400;

  scene = new THREE.Scene();

  drawButterfly();

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( canvasWidth, canvasHeight );
  renderer.setClearColor(0xc8c8c8); // grey

  controls = new THREE.OrbitControls(camera, renderer.domElememnt);
  document.body.appendChild( renderer.domElement );
}

function animate() {
  requestAnimationFrame( animate );
  controls.update();
  counter += 0.05;
  leftWing.rotation.y = getFromRange(100, 150) * Math.PI / 180;
  rightWing.rotation.y = getFromRange(80, 30) * Math.PI / 180;
  render();
}
var counter = 0;

function getFromRange(low, high) {
  var n = Math.sin(counter); // from -1 to 1
  n = (n + 1) / 2 // from 0 to 1
  return low + n * (high - low);
}


function render() {
  renderer.render( scene, camera );
}
