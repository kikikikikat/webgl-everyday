// This is an exercise for https://thebookofshaders.com/07/

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Reference to
// http://thndl.com/square-shaped-shaders.html

float getShapeDistance(in int n, vec2 st, in vec2 xy) {
    st -= xy;
    float delta = abs(cos(u_time )) * -0.376 + 0.876;
    float a = atan(st.x, st.y  + delta)+PI;
    float r = TWO_PI/float(n);
    float d = cos(floor(.5+a/r)*r-a)*length(st);
    return d;
}

void main(){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  st.x *= u_resolution.x/u_resolution.y;
  vec3 color = vec3(0.0);

  // Remap the space to -1. to 1.
  st = st *2.-1.;

  float d = getShapeDistance(3, st, vec2(0.0));

  color = vec3(1.0-smoothstep(.4,.41,d));

  gl_FragColor = vec4(color,1.0);
}