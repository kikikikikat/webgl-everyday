// Bezier curves
var camera, scene, renderer, controls;
var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;
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

function init() {
  camera = new THREE.PerspectiveCamera( 50, canvasWidth / canvasHeight, 1, 10000 );
	camera.position.x = 8;	
	camera.position.y = 10;
	camera.position.z = 400;
	camera.lookAt (new THREE.Vector3(0,0,0));

  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( canvasWidth, canvasHeight );
  renderer.setClearColor(0xc8c8c8); // grey

  controls = new THREE.OrbitControls(camera, renderer.domElememnt);
  document.body.appendChild( renderer.domElement );
}

var i = 0;
function animate() {
  requestAnimationFrame( animate );
  let curve = drawParametricCurve();
  i += 5;
  if (i < 360) {
    curve.rotation.y = i * Math.PI / 180;
  }
  controls.update();
  render();
}

function render() {
  renderer.render( scene, camera );
}
