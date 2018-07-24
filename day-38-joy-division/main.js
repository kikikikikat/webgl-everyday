// Joy Division paths
var camera, scene, renderer, controls;
var canvasWidth = 800;
var canvasHeight = 800;

init();
animate();

var step = 10;
var lines = [];
var time = 0;
var varianceFactor = 3;

function getRandom(y, x) {
  var centralDist = Math.abs(y - (x % 4 * 30));
  var variance = Math.max(0, canvasWidth / 2 - THREE.Math.randInt(100, 500) - centralDist);
  return Math.random() * variance / varianceFactor ;
}

function drawLines() {
  var step = 15;
  var lines = [];
  for (var i = - canvasHeight / 2; i < canvasHeight / 2; i += step) {
    let points = [];
    for (var j = - canvasWidth / 2; j < canvasWidth / 2; j += step) {
      let point = new THREE.Vector3(j, i + getRandom(j, i));
      points.push(point);
    }
    lines.push(points);
  }
  lines.forEach((points) => {
    let path = new THREE.Path();
    path.currentPoint = new THREE.Vector2(points[0].x, points[0].y);
    for (var i = 0; i < points.length - 2; i++) {
      let x = points[i].x;
      let y = points[i].y;
      let controlX = (x + points[i + 1].x) / 2;
      let controlY = (y + points[i + 1].y) / 2;
      path.quadraticCurveTo(x, y, controlX, controlY);
    }
    let geo = new THREE.BufferGeometry().setFromPoints( path.getPoints() );
    let material = new THREE.LineBasicMaterial( { 
      color: 0xffffff
    } );
    let line = new THREE.Line( geo, material );
    line.computeLineDistances();
    scene.add( line);
  })
}



function init() {
  camera = new THREE.PerspectiveCamera( 50, canvasWidth / canvasHeight, 1, 2000 );
  camera.position.set(0, 0, 1000);

  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( canvasWidth, canvasHeight );
  renderer.setClearColor(0x000000); // grey
  controls = new THREE.OrbitControls(camera, renderer.domElememnt);
  setTimeout(drawLines, 0);
  
  document.body.appendChild( renderer.domElement );
}

function cleanUp(curve) {
  while(scene.children.length > 0){ 
    scene.remove(scene.children[0]); 
  }
}


function animate() {
  time += 1;
  requestAnimationFrame( animate );
  controls.update();
  if (time % 5 === 0) {
    cleanUp();
    drawLines();
  }
  render();
}

function render() {
  renderer.render( scene, camera );
}




