// A three.js version of http://thecodingtrain.com/CodingChallenges/CC_001_StarField_p5.js/
var container;
var camera, scene, renderer, group, particle, line;
var winWidth = window.innerWidth;
var winHeight = window.innerHeight;
var speed = 40;
var groups = [];
init();
animate();
function init() {
  container = document.createElement( 'div' );
  document.body.appendChild( container );
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 3000 );
  camera.position.z = 1000;
  scene = new THREE.Scene();
  var PI2 = Math.PI * 2;
  let dotProgram = function ( context ) {
    context.beginPath();
    context.arc( 0, 0, 0.1, 0, PI2, true );
    context.fill();
  };
  let lineProgram = function(context) {
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(10, 10);
    context.stroke();
  }
/* 				group = new THREE.Group();
  scene.add( group ); */
  for ( var i = 0; i < 500; i++ ) {
    group = new THREE.Group();
    scene.add( group );
    groups.push(group);
    let x = randWithin(-winWidth, winWidth);
    let y = randWithin(-winHeight, winHeight);
    let z = randWithin(-1000, 1000);
    let color = Math.random() * 0x808008 + 0x808080;
    let dotMaterial = new THREE.SpriteCanvasMaterial( {
      color: color,
      program: dotProgram
    } );
    let lineMaterial = new THREE.SpriteCanvasMaterial({
      color: color,
      program: function(context) {
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(0, 0);
        context.stroke();
      }
    });
    line = new THREE.Sprite(lineMaterial);
    particle = new THREE.Sprite( dotMaterial );
    particle.scale.x = particle.scale.y = Math.random() * 20 + 10;
    group.add( particle );
    group.add(line);
    group.position.set(x, y, z);
  }
  renderer = new THREE.CanvasRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );
  console.log(group);
}
//
function animate() {
  requestAnimationFrame( animate );
  render();
}
function render() {

  groups.forEach(function(group) {
    group.position.z += speed;
    let prevPos = group.position;
    if (group.position.z > 1000) {
      let x = randWithin(-winWidth, winWidth);
      let y = randWithin(-winHeight, winHeight);
      let z = randWithin(-1000, 1000);
      group.position.set(x, y, z);
      group.children[1].material.program = function(context) {
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(0, 0);
        context.stroke();
      }
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