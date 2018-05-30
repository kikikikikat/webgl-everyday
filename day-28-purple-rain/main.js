// my own version of http://thecodingtrain.com/CodingChallenges/CC_004_PurpleRain_p5.js/
var container;
var camera, scene, renderer, rains;
var winWidth = window.innerWidth;
var winHeight = window.innerHeight;
init();
animate();
function init() {
  container = document.createElement( 'div' );
  document.body.appendChild( container );
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 3000 );
  camera.position.z = 1000;
  scene = new THREE.Scene();
  var PI2 = Math.PI * 2;
  let rainDropProgram = function(context) {
    context.fillRect(0, 0, 3, 25);
  }
	rains = new THREE.Group();
  scene.add( rains );
  for ( var i = 0; i < 1000; i++ ) {
    let color = 0x9a0eea;
    let rainDropMaterial = new THREE.SpriteCanvasMaterial( {
      color: color,
      program: rainDropProgram
    } );
    let rainDrop = new THREE.Sprite( rainDropMaterial );
    let pos = getPosition();
    rainDrop.position.set.apply(rainDrop.position, pos);
    rains.add( rainDrop );
  }
  console.log(rains);
  renderer = new THREE.CanvasRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColorHex(0xe4cbff);
  container.appendChild( renderer.domElement );
}

function getPosition() {
  let x = randWithin(-winWidth, winWidth);
  let y = randWithin(winWidth, winWidth * 5);
  let z = randWithin(0, 600);
  return [x, y, z];
}
//
function animate() {
  requestAnimationFrame( animate );
  render();
}
function render() {

  rains.children.forEach(function(rainDrop) {
/*     let speed = rainDrop.position.z * 0.01; */
    let speed = 45;
    rainDrop.position.y -= speed;
    if (rainDrop.position.y < -winHeight) {
      let pos = getPosition();
      rainDrop.position.set.apply(rainDrop.position, pos);
    }
  });
  
  renderer.render( scene, camera );
}
function randWithin(min, max) {
  var len = max - min;
  var result = Math.random() * len + min;
  result = result > max ? max : result;
  result = result < min ? min : result;
  return result;
}