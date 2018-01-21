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

vec3 colorA = vec3(0.149,0.141,0.912); // Grey blue of the sky
vec3 colorB = vec3(1.000,0.833,0.224); // Reddish orange of the sun

float plot (vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) -
          smoothstep( pct, pct+0.01, st.y);
}

void main() {
    // Make it slower or faster
  float t = u_time*0.5;

  // Makes time oscillate linearly between 0 and 1
  t = abs(fract(t) * 2.0 - 1.0);
  
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  vec3 color = vec3(0.0);

  vec3 pct = vec3(st.x);
  
  pct.r = smoothstep(-0.168 + t * 0.2,(1.104 - t), st.x);
  pct.g = sin(st.x*PI*0.760 + t * 0.3);
  pct.b = pow(st.x, (5.908 - t * 2.0));

  color = mix(colorA, colorB, pct);

  // Plot transition lines for each channel
  color = mix(color,vec3(1.0,0.0,0.0),plot(st,pct.r));
  color = mix(color,vec3(0.0,1.0,0.0),plot(st,pct.g));
  color = mix(color,vec3(0.0,0.0,1.0),plot(st,pct.b));

  gl_FragColor = vec4(color,1.0);
}