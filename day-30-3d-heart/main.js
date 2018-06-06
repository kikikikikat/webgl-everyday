// functions are adjusted based on:
// https://www.youtube.com/watch?v=aNR4n0i2ZlM&list=PL0EpikNmjs2CYUMePMGh3IjjP4tQlYqji

var camera, scene, renderer, controls;
var cells = [];
var winWidth = window.innerWidth;
var winHeight = window.innerHeight;
var mesh;
init();
animate();

function getHeartGeometry(size) {
  return function(u, v, target) {
		u *= Math.PI;
    v *= 2 * Math.PI;

		var x = size * Math.sin( u ) * Math.cos( v );
		var y = size * Math.sin( u ) * Math.sin( v );
    var z = size * Math.cos( u );
    y = 4 + 0.9 * y - Math.abs(x) * Math.sqrt(((150 -  Math.abs(x)) / 90));
    z = 0.5 * z - y / 2;
		target.set( x, y, z );
  }
}

function init() {
  camera = new THREE.PerspectiveCamera( 45, winWidth / winHeight, 1, 2000 );
  camera.position.set( 0, 400, 0 );

  scene = new THREE.Scene();
  var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
  scene.add( ambientLight );
  var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
  scene.add(camera);


  var geometry = new THREE.ParametricGeometry(getHeartGeometry(80), 25, 25);

  var material = new THREE.MeshNormalMaterial();
  mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = 90 * Math.PI / 180;
  mesh.rotation.y = 180 * Math.PI / 180;
  scene.add(mesh);


  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( winWidth, winHeight );
  renderer.setClearColor(0xc8c8c8); // grey
  controls = new THREE.OrbitControls(camera, renderer.domElememnt);
  document.body.appendChild( renderer.domElement );
}
var fakeTime = 0;
function animate() {
  fakeTime++;
  var factor = Math.sin(0.08 * fakeTime) + 2;
  var size = 1 + 0.1 * factor;
  mesh.scale.set(size + 0.2, size, size);
  requestAnimationFrame( animate );
  render();
  controls.update();
}

function render() {
  renderer.render( scene, camera );
}
