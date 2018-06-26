// Bezier curves
var camera, scene, renderer, controls;
var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;
var curveWidth = canvasWidth * 0.8;

var angle = 0.0;
var speed = 0.02;
init();
setupGUI();
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
    new THREE.Vector2( effectController.x0, effectController.y0 ),
    new THREE.Vector2( effectController.x1, effectController.y1 ),
    new THREE.Vector2( effectController.x2, effectController.y2 ),
    new THREE.Vector2( effectController.x3, effectController.y3 )
  );
  
  var points = curve.getPoints( 500 );
  var geometry = new THREE.BufferGeometry().setFromPoints( points );
  
  var material = new THREE.LineBasicMaterial( { color : 0x000000, opacity: 0.1, transparent: true } );
  
  // Create the final object to add to the scene
  var curveObject = new THREE.Line( geometry, material );
  scene.add(curveObject);
}


function init() {
  camera = new THREE.PerspectiveCamera( 50, canvasWidth / canvasHeight, 1, 2000 );
  camera.position.set(0, 0, 1500);

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
  render();
}

function render() {
  drawCurve(angle);
  angle += speed;
  renderer.render( scene, camera );
}

var effectController;

function setupGUI() {
  effectController = {
    x0: -canvasWidth / 2,
    y0: -canvasHeight / 2,
    x1: 0,
    y1: 0,
    x2: canvasWidth / 4,
    y2: canvasHeight / 4,
    x3: canvasWidth / 2,
    y3: canvasHeight / 2
  };
  var gui = new dat.GUI();
  gui.add(effectController, 'x0', -canvasWidth/2, canvasWidth/2, 1).name('x0');
  gui.add(effectController, 'y0', -canvasHeight/2, canvasHeight/2, 1).name('y0');
  gui.add(effectController, 'x1', -canvasWidth/2, canvasWidth/2, 1).name('x1');
  gui.add(effectController, 'y1', -canvasHeight/2, canvasHeight/2, 1).name('y1');
  gui.add(effectController, 'x2', -canvasWidth/2, canvasWidth/2, 1).name('x2');
  gui.add(effectController, 'y2', -canvasHeight/2, canvasHeight/2, 1).name('y2');
  gui.add(effectController, 'x3', -canvasWidth/2, canvasWidth/2, 1).name('x3');
  gui.add(effectController, 'y3', -canvasHeight/2, canvasHeight/2, 1).name('y3');
}


