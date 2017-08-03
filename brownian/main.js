function getRandomRange(min, max) {
  return Math.random() * (max - min) + min;
};

function getRandomRangeInt(min, max) {
  return Math.floor(getRandomRange(min, max));
};

function getRandomColors() {
  var colors = [1, 1, 1, 1];
  colors = colors.map(function(c) {
    return getRandomRange(0, 1).toFixed(4);
  });
  return colors;
}

var gl,
    shaderProgram,
    vertices,
    vertexCount = getRandomRangeInt(20, 500);

initGL();
createShaders();
createVertices();
draw();

var reloadButton = top.document.getElementById('reload-button');
reloadButton.addEventListener('click', function(e) {
  initGL();
});

function initGL() {
  var canvas = document.getElementById("canvas");
  gl = canvas.getContext("webgl");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  gl.viewport(0, 0, canvas.width, canvas.height);
  var colors = getRandomColors();
  colors[colors.length - 1] += 0.3;
  gl.clearColor.apply(gl, colors);
}

function createShaders() {
  var vertexShader = getShader(gl, "shader-vs");
  var fragmentShader = getShader(gl, "shader-fs");

  shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);
  gl.useProgram(shaderProgram);
}

function createVertices() {
  vertices = [];
  for(var i = 0; i < vertexCount; i++) {
    vertices.push(getRandomRange(-1, 1));
    vertices.push(getRandomRange(-1, 1));
  }

  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);

  var coords = gl.getAttribLocation(shaderProgram, "coords");
  gl.vertexAttribPointer(coords, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(coords);

  var pointSize = gl.getAttribLocation(shaderProgram, "pointSize");
  gl.vertexAttrib1f(pointSize, getRandomRangeInt(1, 8));

  var color = gl.getUniformLocation(shaderProgram, "color");
  var colors = getRandomColors();
  colors[colors.length - 1] = 1;
  colors.unshift(color);
  gl.uniform4f.apply(gl, colors);
}

function draw() {
  for(var i = 0; i < vertexCount * 2; i += 2) {
    vertices[i] += getRandomRange(-0.02, 0.02);
    vertices[i + 1] += getRandomRange(-0.02, 0.02);
  }
  gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(vertices));
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.POINTS, 0, vertexCount);

  requestAnimationFrame(draw);
}

  /*
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Adding_2D_content_to_a_WebGL_context
   */
  function getShader(gl, id) {
    var shaderScript, theSource, currentChild, shader;

    shaderScript = document.getElementById(id);

    if (!shaderScript) {
      return null;
    }

    theSource = "";
    currentChild = shaderScript.firstChild;

    while (currentChild) {
      if (currentChild.nodeType == currentChild.TEXT_NODE) {
        theSource += currentChild.textContent;
      }

      currentChild = currentChild.nextSibling;
    }
    if (shaderScript.type == "x-shader/x-fragment") {
      shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (shaderScript.type == "x-shader/x-vertex") {
      shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
      // Unknown shader type
      return null;
    }
    gl.shaderSource(shader, theSource);

// Compile the shader program
    gl.compileShader(shader);

// See if it compiled successfully
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
      return null;
    }

    return shader;
  }
