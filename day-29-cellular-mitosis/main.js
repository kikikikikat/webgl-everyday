// my own version of http://thecodingtrain.com/CodingChallenges/CC_006_Mitosis_p5.js/ in three.js
var camera, scene, raycaster, renderer;
var cells = [];
var canvasWidth = 600;
var canvasHeight = 600;
var mouse = new THREE.Vector2(), INTERSECTED;
init();
animate();

function Cell(size, position) {
  var geometry = new THREE.CircleBufferGeometry(size, 64);
  var material = new THREE.MeshBasicMaterial({ color: 0xc20078, opacity: 0.5, transparent: true }) // magenta
  var circle = new THREE.Mesh(geometry, material);
  circle.position.set.apply(circle.position, position);
  circle.scale.set(1, 1, 1);
  function getNewPos(old) {
    return THREE.Math.randInt(old - 1, old + 1);
  }
  circle.move = function() {
    circle.position.set(getNewPos(circle.position.x), getNewPos(circle.position.y), getNewPos(circle.position.z));
  };
  circle.mitosis = function() {
    cells.push(new Cell(size / 1.5, [circle.position.x, circle.position.y, circle.position.z]));
    cells.push(new Cell(size / 1.5, [circle.position.x, circle.position.y, circle.position.z]));
    scene.remove(circle);
  }
  scene.add(circle)
  return circle;
}

function init() {
  camera = new THREE.PerspectiveCamera( 50, canvasWidth / canvasHeight, 1, 1000 );
  camera.position.set( 0, 0, 500 );

  scene = new THREE.Scene();

  cells.push(new Cell(50, [0, 0, 0]));

  raycaster = new THREE.Raycaster();

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( canvasWidth, canvasHeight );
  renderer.setClearColor(0xc8c8c8); // grey
  document.body.appendChild( renderer.domElement );
  document.addEventListener('click', onClick, false);
}

function getPosition() {
  let x = randWithin(-winWidth, winWidth);
  let y = randWithin(winWidth, winWidth * 5);
  let z = randWithin(0, 600);
  return [x, y, z];
}

function onClick(event) {
  event.preventDefault();
  mouse.x = (event.clientX / canvasWidth) * 2 - 1;
  mouse.y = - (event.clientY / canvasHeight) * 2 + 1;
  console.log('x: ' + mouse.x + ' ' + 'y: ' + mouse.y);
  findIntersections();
}

function animate() {
  requestAnimationFrame( animate );
  cells[0].move();
  cells.forEach(c => {
    c.move();
  });
  render();
}

function findIntersections() {
  raycaster.setFromCamera( mouse, camera );
  var intersects = raycaster.intersectObjects(scene.children);
  if (intersects.length > 0) {
    if (INTERSECTED != intersects[0].object) {
      INTERSECTED = intersects[0].object;
      console.log(INTERSECTED);
      INTERSECTED.mitosis();
      
    }
  } else {
    INTERSECTED = null;
  }
}
function render() {
  renderer.render( scene, camera );
}
function randWithin(min, max) {
  var len = max - min;
  var result = Math.random() * len + min;
  result = result > max ? max : result;
  result = result < min ? min : result;
  return result;
}