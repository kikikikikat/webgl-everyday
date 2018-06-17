// Bezier curves
var camera, scene, renderer, controls;
var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;
var curveWidth = canvasWidth * 0.8;

var angle = 0.0;
var speed = 0.02;
init();
animate();

var randX = THREE.Math.randFloat(0, 5.0);
var randY = THREE.Math.randFloat(0, 5.0);

function drawCurve(angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle / randX);
  const radian = canvasHeight;

  const x1 = 0 + c * radian;
  const y1 = 0 + s * radian;

  const x2 = 0 + Math.cos(angle / randY ) * radian;
  const y2 = 0 + Math.sin(angle) * radian;

  const x0 = - curveWidth / 2;
  const y0 = 0;

  const x3 = curveWidth / 2;
  const y3 = 0;

  var curve = new THREE.CubicBezierCurve(
    new THREE.Vector2( x0, y0 ),
    new THREE.Vector2( x1, y1 ),
    new THREE.Vector2( x2, y2 ),
    new THREE.Vector2( x3, y3 )
  );
  
  var points = curve.getPoints( 500 );
  var geometry = new THREE.BufferGeometry().setFromPoints( points );
  
  var material = new THREE.LineBasicMaterial( { color : 0x000000, opacity: 0.1, transparent: true } );
  
  // Create the final object to add to the scene
  var curveObject = new THREE.Line( geometry, material );
  scene.add(curveObject);
}

/* function drawBox() {
  var geometry = new THREE.BoxGeometry( 100, 100, 100 );
  var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
  var cube = new THREE.Mesh( geometry, material );
  cube.position.set(-300, 0, 0);
  console.log(cube.position);
  scene.add( cube );
} */

function init() {
  camera = new THREE.PerspectiveCamera( 50, canvasWidth / canvasHeight, 1, 2000 );
  camera.position.set(0, 0, 1500);

  scene = new THREE.Scene();
/*   drawBox(); */

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
  drawCurve(angle);
  angle += speed;
  renderer.render( scene, camera );
}
