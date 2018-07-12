// Bezier curves
var camera, scene, renderer, controls;
var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;
var curveWidth = canvasWidth * 0.8;

var time = 0;
init();
animate();

function getCurve(pts, color) {
  const x0 = pts[0][0];
  const y0 = pts[0][1];
  const x1 = pts[1][0];
  const y1 = pts[1][1];
  const x2 = pts[2][0];
  const y2 = pts[2][1];
  const curve = new THREE.QuadraticBezierCurve(
    new THREE.Vector2( x0, y0 ),
    new THREE.Vector2( x1, y1 ),
    new THREE.Vector2( x2, y2 )
  );
  var points = curve.getPoints( 500 );
  var geometry = new THREE.BufferGeometry().setFromPoints( points );
  
  var material = new THREE.LineBasicMaterial( { color : (color || 0x000000), opacity: 0.8, transparent: true } );
  var mesh = new THREE.Line( geometry, material );
  var tween = new TWEEN.Tween(mesh.material).to({ opacity: 0.0 },1000).start();
  return mesh;
}

function drawCurve(i) {
  var angle = Math.sin(i + time); 
  var radians = THREE.Math.degToRad;
  var max = 100;
  var x = Math.sin(radians(i)) * (max + angle * 30);
  var y = Math.cos(radians(i)) * (max + angle * 30);

  var deltaX = Math.sin(radians(i + time * 50)) * (max + angle * 60);
  var deltaY = Math.cos(radians(i + time * 50)) * (max + angle * 60);

/*   var r = 100 + Math.floor((Math.sin(angle) + 1) / 2 * 155);
  var g = 100 + Math.floor((Math.cos(angle) + 1) / 2 * 155);
  var b = 0;

  

  var color = 'rgb(' + [r, g, b].join(',') + ')'; */

  var curve = getCurve([
    [x, y],
    [x + x, y + y],
    [x + deltaX, y + deltaY],
    [x + deltaX, y + deltaY]
  ]);

  scene.add(curve);
  cleanUp(curve);
}

function cleanUp(curve) {
  setTimeout(function() {
    scene.remove(curve);
    curve = null;
  }, 0);
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
}


function animate() {
  requestAnimationFrame( animate );
/*   controls.update(); */
  TWEEN.update();
  render();
}

function render() {
  for (let i = 0; i < 360; i+=2) {
    drawCurve(i);
  }
  time += .1;
  renderer.render( scene, camera );
}




