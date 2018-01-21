// Easing functions come from Robert Penner and http://easings.net/

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.141592653589793
#define HALF_PI 1.5707963267948966

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 colorA = vec3(1.0,0.0,0.0);
vec3 colorB = vec3(0.0,1.0,0.0);

float linear(float t) {
  return t;
}

float exponentialIn(float t) {
  return t == 0.0 ? t : pow(2.0, 10.0 * (t - 1.0));
}

float exponentialOut(float t) {
  return t == 1.0 ? t : 1.0 - pow(2.0, -10.0 * t);
}

float elasticIn(float t) {
  return sin(13.0 * t * HALF_PI) * pow(2.0, 10.0 * (t - 1.0));
}

float bounceOut(float t) {
  const float a = 4.0 / 11.0;
  const float b = 8.0 / 11.0;
  const float c = 9.0 / 10.0;

  const float ca = 4356.0 / 361.0;
  const float cb = 35442.0 / 1805.0;
  const float cc = 16061.0 / 1805.0;

  float t2 = t * t;

  return t < a
    ? 7.5625 * t2
    : t < b
      ? 9.075 * t2 - 9.9 * t + 3.4
      : t < c
        ? ca * t2 - cb * t + cc
        : 10.8 * t * t - 20.52 * t + 10.72;
}

float random(float t) {
  return t == 0.0 
    ? 0.0
    : t == 1.0 
      ? 1.0 
      : fract(sin(t) * 999.9);
}

float stepRandom(float t) {
  return random(floor(t / 0.2));
}

float possibleAnotherOut(float t) {
  return 0.43 * log(t * 10.0);
}



void main() {
  vec3 color = vec3(0.0);
  
  // Make it slower or faster
  float t = u_time*0.5;

  // Makes time oscillate linearly between 0 and 1
  t = abs(fract(t) * 2.0 - 1.0);


  // Apply easing function
  float pct = possibleAnotherOut(t);

  color = mix(colorA, colorB, pct);
  gl_FragColor = vec4(color, 1.0);
}