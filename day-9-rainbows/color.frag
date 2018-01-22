// This is an exercise for https://thebookofshaders.com/06
// The William Turner gradient

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.141592653589793
#define HALF_PI 1.5707963267948966

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 red = vec3(1.0, 0.0, 0.0); 
vec3 org = vec3(1.0, 0.5, 0.0);
vec3 ylo = vec3(1.0, 1.0, 0.0);
vec3 grn = vec3(0.0, 1.0, 0.0);
vec3 blu = vec3(0.0, 0.0, 1.0);
vec3 prp = vec3(0.5, 0.0, 0.5);

float plot (vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) -
          smoothstep( pct, pct+0.01, st.y);
}

float n = 6.0;
float size = 1.0 / 6.0;

float getRed(float x) {
  return x > size * 5.0 // should be purple
    ? 0.5
    : 1.0 - step(0.5, x);
}

float getGreen(float x) {
  if (x < size * 2.0) {
    return x < size * 1.0 ? 0.0 : 0.5;
  } else {
    return 1.0 - step(size * 4.0, x);
  }
}

float getBlue(float x) {
  if (x < size * 4.0) {
    return 0.0;
  } else if (x > size * 6.0) {
    return 0.5;
  } else {
    return 1.0;
  }
}


void main() {  
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  vec3 color = vec3(getRed(st.x), getGreen(st.x), getBlue(st.x));

  gl_FragColor = vec4(color,1.0);
}