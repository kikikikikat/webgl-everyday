
var camera, scene, renderer, light;
var mesh;
var sponge = new THREE.Group();
init();
animate();
function Box(posX, posY, posZ, s) {
  function generate() {
    var boxes = [];
    for (var x = -1; x < 2; x++) {
      for (var y = -1; y < 2; y++) {
        for (var z = -1; z < 2; z++) {
          var sum = Math.abs(x) + Math.abs(y) + Math.abs(z);
          var newR = (s / 3);
          if (sum > 1) {
            var b = new Box(posX + x * newR, posY + y * newR,posZ + z * newR, newR);
            boxes.push(b);
          }
        }
      }
    }
    return boxes;
  }
  function show() {
    var geometry = new THREE.BoxBufferGeometry( s, s, s );
    var material = new THREE.MeshPhongMaterial( {
      color: 0x156289,
      emissive: 0x072534,
      side: THREE.DoubleSide,
      flatShading: true
    } );
    var mesh = new THREE.Mesh( geometry, material );
    mesh.position.set(posX, posY, posZ);
    mesh.generate = generate;
    return mesh;
  }
  return {
    show: show
  }
}
function init() {
  camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.z = 400;
  scene = new THREE.Scene();
  var lights = [];
  lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
  lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
  lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

  lights[ 0 ].position.set( 0, 200, 0 );
  lights[ 1 ].position.set( 100, 200, 100 );
  lights[ 2 ].position.set( - 100, - 200, - 100 );

  scene.add( lights[ 0 ] );
  scene.add( lights[ 1 ] );
  scene.add( lights[ 2 ] );
/*   var geometry = new THREE.BoxBufferGeometry( 200, 200, 200 );
  var material = new THREE.MeshNormalMaterial();
  mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh ); */
  sponge.add(new Box(0, 0, 0, 200).show());
  scene.add(sponge);
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
  window.addEventListener( 'resize', onWindowResize, false );
  window.addEventListener( 'click', onClick, false );
}
function onClick() {
  var next = [];
  for (var i = 0; i < sponge.children.length; i++) {
    var b = sponge.children[i];
    var newBoxes = b.generate();
    next = next.concat(newBoxes);
  }
  // Individually removing objects from group is not clean
  scene.remove(sponge);
  sponge = null;
  sponge = new THREE.Group();
  next.forEach(function(n) {
    sponge.add(n.show());
  });
  scene.add(sponge);
}
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
function animate() {
  requestAnimationFrame( animate );
/*   sponge.children.forEach(function(c) {
    c.show();
  }) */
  sponge.rotation.x += 0.005;
  sponge.rotation.y += 0.01;
  renderer.render( scene, camera );
}