// Bezier curves
var camera, scene, renderer, controls;
var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;
var curveWidth = canvasWidth * 0.8;

var time = 0;
var magentaHalo;
var blueHalo;
var goldenHalo;
var bluePetals;

init();
animate();

function getControlPoints(w, h) {
  var result = [];
  var controlPoint1 = new THREE.Vector2(-w / 2, h);
  var controlPoint2 = new THREE.Vector2(w/2, h);
  result.push(controlPoint1);
  result.push(controlPoint2);
  return result;
}

function getShape(centerWidth, centerHeight, width, color, opacity, isPetalSplit) {
  var ctlPts = getControlPoints(centerWidth, centerHeight);
  var controlPoint1 = ctlPts[0];
  var controlPoint2 = ctlPts[1];
  var startPoint = new THREE.Vector2(-width/2, 0);
  var endPoint = new THREE.Vector2(width/2, 0);
  var shape = new THREE.Shape();
  shape.moveTo(startPoint.x, startPoint.y);
  if (!isPetalSplit) {
    shape.bezierCurveTo(
      controlPoint1.x,
      controlPoint1.y,
      controlPoint2.x,
      controlPoint2.y,
      endPoint.x,
      endPoint.y
    );
  } else {
    shape.bezierCurveTo(
      -centerWidth/2,
      centerHeight,
      -centerWidth/2,
      centerHeight,
      endPoint.x,
      endPoint.y
    );
    shape.moveTo(startPoint.x, startPoint.y);
    shape.bezierCurveTo(
      centerWidth/2,
      centerHeight,
      centerWidth/2,
      centerHeight,
      endPoint.x,
      endPoint.y
    );
  }
  var extrudeSettings = { 
    curveSegments: 30,
    bevelEnabled: true, 
    bevelSegments: 2, 
    steps: 2, 
    bevelSize: 1, 
    bevelThickness: 1 
  };
  var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
  var mesh = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { color: color, transparent: true, opacity: opacity } ) );
  return mesh;
}

function drawCorona(opts) {
  var n = opts.number;
  var isPetalSplit = !!opts.isPetalSplit;
  var corona = new THREE.Group();
  for (let i = 0; i < n; i++) {
    let petal = getShape(
      opts.petal.centerWidth,
      opts.petal.centerHeight,
      opts.petal.width,
      opts.petal.color,
      opts.petal.opacity,
      isPetalSplit
    );
    let petalWrapper = new THREE.Group().add(petal);
    petalWrapper.rotation.z = THREE.Math.degToRad(i * (360 / n));
    petal.position.y += opts.compactFactor;
    
    corona.add(petalWrapper);
  }
  scene.add(corona);
  return corona;
}


function init() {
  camera = new THREE.PerspectiveCamera( 50, canvasWidth / canvasHeight, 1, 2000 );
  camera.position.set(0, 0, 1000);

  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( canvasWidth, canvasHeight );
  renderer.setClearColor(0x090001);
/*   controls = new THREE.OrbitControls(camera, renderer.domElememnt); */
  drawCentralCoronaGroup();
  drawReddishCoronaGroup();
  drawYellowCoronaGroup();
  drawOrangeCoronaGroup();
  drawBlueishCoronaGroup();
  document.body.appendChild( renderer.domElement );
}

function drawCentralCoronaGroup() {
  drawCorona({
    petal: {
      centerWidth: 20,
      centerHeight: 20,
      width: 20,
      color: 0xBAE0F2,
      opacity: 0.9
    },
    number: 10,
    compactFactor: 5
  });
  drawCorona({
    petal: {
      centerWidth: 5,
      centerHeight: 14,
      width: 20,
      color: 0xF82B7E,
      opacity: 0.35
    },
    number: 10,
    compactFactor: 3
  });
  drawCorona({
    petal: {
      centerWidth: 3,
      centerHeight: 1,
      width: 10,
      color: 0x5A80CC,
      opacity: 0.9
    },
    number: 20,
    compactFactor: 25
  });
  drawCorona({
    petal: {
      centerWidth: 3,
      centerHeight: 1,
      width: 10,
      color: 0x851F68,
      opacity: 0.9
    },
    number: 20,
    compactFactor: 28
  });
  drawCorona({
    petal: {
      centerWidth: 3,
      centerHeight: 1,
      width: 10,
      color: 0xFF6963,
      opacity: 0.9
    },
    number: 20,
    compactFactor: 30
  });
}

function drawReddishCoronaGroup(number) {
  magentaHalo = new THREE.Group();
  magentaHalo.add(drawCorona({
    petal: {
      centerWidth: 100,
      centerHeight: 120,
      width: 30,
      color: 0xCF1BC5,
      opacity: 0.6
    },
    number: 20,
    compactFactor: 40
  }));
  magentaHalo.add(drawCorona({
    petal: {
      centerWidth: 20,
      centerHeight: 100,
      width: 20,
      color: 0xCD2430,
      opacity: 0.4
    },
    number: 20,
    compactFactor: 40
  }));
  scene.add(magentaHalo);
}


function drawBlueishCoronaGroup(number) {
  blueHalo = new THREE.Group();
  bluePetals = drawCorona({
    petal: {
      centerWidth: 100,
      centerHeight: 120,
      width: 30,
      color: 0x301FA4,
      opacity: 0.7
    },
    isPetalSplit: true,
    number: 20,
    compactFactor: 140
  });
  blueHalo.add(bluePetals);
  blueHalo.add(drawCorona({
    petal: {
      centerWidth: 80,
      centerHeight: 80,
      width: 20,
      color: 0x58A488,
      opacity: 0.4
    },
    isPetalSplit: true,
    number: 20,
    compactFactor: 140
  }));
  drawCorona({
    petal: {
      centerWidth: 30,
      centerHeight: 10,
      width: 20,
      color: 0xDBD976,
      opacity: 0.6
    },
    isPetalSplit: true,
    number: 30,
    compactFactor: 130
  });
  scene.add(blueHalo);
}

function drawOrangeCoronaGroup() {
  drawCorona({
    petal: {
      centerWidth: 80,
      centerHeight: 40,
      width: 120,
      color: 0xCF5034,
      opacity: 0.2
    },
    number: 60,
    compactFactor: 200
  });
}

function drawYellowCoronaGroup() {
  goldenHalo = new THREE.Group();
  goldenHalo.add(drawCorona({
    petal: {
      centerWidth: 0,
      centerHeight: 120,
      width: 30,
      color: 0xF5E43B,
      opacity: 0.1
    },
    number: 200,
    compactFactor: 220
  }));
  scene.add(goldenHalo);
}


function animate() {
  requestAnimationFrame( animate );
/*   controls.update(); */
 /*  corona.rotation.z -= 0.02; */
  time += 1;
  magentaHalo.rotation.z -= 0.01;
  blueHalo.rotation.z += 0.01;
  goldenHalo.rotation.z -= 0.005
  var rand = THREE.Math.randFloat(0.98, 1.01);

  render();
}

function render() {
  renderer.render( scene, camera );
}




