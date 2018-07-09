// Bezier curves
var camera, scene, renderer, controls;
var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;
var curveWidth = canvasWidth * 0.8;

var angle = 0.0;
var speed = 0.02;

var x0 = 0;
var y0 = -250;
var x1 = 250;
var y1 = -250;
var x2 = -250;
var y2 = 250;
var x3 = 0;
var y3 = 250;
init();
animate();

function getCurve(pts, color) {
  const x0 = pts[0][0];
  const y0 = pts[0][1];
  const x1 = pts[1][0];
  const y1 = pts[1][1];
  const x2 = pts[2][0];
  const y2 = pts[2][1];
  const x3 = pts[3][0];
  const y3 = pts[3][1];
  const curve = new THREE.CubicBezierCurve(
    new THREE.Vector2( x0, y0 ),
    new THREE.Vector2( x1, y1 ),
    new THREE.Vector2( x2, y2 ),
    new THREE.Vector2( x3, y3 )
  );
  var points = curve.getPoints( 500 );
  var geometry = new THREE.BufferGeometry().setFromPoints( points );
  
  var material = new THREE.LineBasicMaterial( { color : (color || 0x000000), opacity: 1.0, transparent: true } );
  var mesh = new THREE.Line( geometry, material );
  var tween = new TWEEN.Tween(mesh.material).to({ opacity: 0.0 },100).start();
  return mesh;
}

function drawCurve(angle) {
  x1 = 0 + Math.sin(angle) * 500;
  x2 = 0 - Math.cos(angle) * 500;

  var curveLeft = getCurve([
    [x0, y0],
    [x1, y1],
    [x2, y2],
    [x3, y3]
  ]);

  x1 = 0 - Math.sin(angle) * 500;
  x2 = 0 + Math.cos(angle) * 500;

  var curveRight = getCurve([
    [x0, y0],
    [x1, y1],
    [x2, y2],
    [x3, y3]
  ]);

  scene.add(curveLeft);
  scene.add(curveRight);
  cleanUp(curveLeft);
  cleanUp(curveRight);
}

function cleanUp(curve) {
  setTimeout(function() {
    scene.remove(curve);
  }, 2000);
}


function init() {
  camera = new THREE.PerspectiveCamera( 50, canvasWidth / canvasHeight, 1, 2000 );
  camera.position.set(0, 0, 1000);

  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( canvasWidth, canvasHeight );
  renderer.setClearColor(0xffffff); // grey
/*   controls = new THREE.OrbitControls(camera, renderer.domElememnt); */
  document.body.appendChild( renderer.domElement );
  var tweenObj = { x: 100, y: 2 };
  var tween = new TWEEN.Tween(tweenObj);
  tween.to({x: 200}, 2000);
  tween.start();
  tween.onUpdate(function(obj) {
    console.log(obj);
  });
}


function animate() {
  requestAnimationFrame( animate );
/*   controls.update(); */
  TWEEN.update();
  render();
}

function render() {
  drawCurve(angle);
  angle += speed;
  renderer.render( scene, camera );
}




