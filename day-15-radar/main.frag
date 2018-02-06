// This is an exercise for https://thebookofshaders.com/08/
// Reference: https://www.shadertoy.com/view/4s2SRt

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float smooth(float r, float R) {
    return smoothstep(R - 0.001, R + 0.001, r);
}

float circle(vec2 uv, vec2 center, float radius, float width) {
    float r = length(uv - center);
    float outer = smooth(r + width / 2.0, radius);
    float inner = smooth(r - width / 2.0, radius);
    return (1. - inner) - (1. - outer);
}

float movingLine(vec2 uv, vec2 center, float radius) {
  float theta0 = 90.0 * u_time;
  vec2 d = uv - center;
  float r = length(uv - center);
  if (r < radius) {
    vec2 p = radius * vec2(cos(theta0 * PI / 180.0), -sin(theta0*PI / 180.0));
    // what is it doing here
    float l = length(d - p*clamp(dot(d, p) / dot(p, p), 0.0, 1.0));
    // Compute gradient
    float theta = mod(180.0*atan(d.y,d.x)/PI+theta0, 360.0);
    float gradient = clamp(theta/60.0, 0.0, 1.0);
    return 1.0 - smooth(l, 0.002) * gradient;
  } else {
    return 0.0;
  }
}




void main(){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  vec4 color = vec4(0.0);


 /*  float d1 = smoothstep(0.2, 0.2, length(.5 - st));
  float d2 = 1.0 - smoothstep(0.2, 0.23, length(.5 - st));
  float d = d1 * d2; */
  vec2 center = vec2(0.5);
  color += circle(st, center, 0.348, 0.005) * vec4(1.0, .0, .0, 1.0);
  color += circle(st, center, 0.164, 0.002) * vec4(1.0, .0, .0, 1.0);
  color += movingLine(st, center, 0.768) * vec4(1.0, .0, .0, 1.0);
  

  gl_FragColor = color;
}