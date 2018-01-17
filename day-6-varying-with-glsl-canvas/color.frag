#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float getColor(vec2 coord) {
  return sin(coord.x);
}

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution;
  vec2 mouse = u_mouse/u_resolution;
  gl_FragColor = vec4(mouse.x, getColor(st), mouse.x, abs(sin(u_time)));
}