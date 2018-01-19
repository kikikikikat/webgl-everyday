#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float zoom = 5.0;

	
float impulse( float k, float x ) {
  float h = k*x;
  return h*exp(1.0-h);
}


float plot(vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) -
          smoothstep( pct, pct+0.01, st.y);
}

	
float gain(float x, float k) {
  float a = 0.5*pow(2.0*((x<0.5)?x:1.0-x), k);
  return (x<0.5)?a:1.0-a;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    //st.y *= u_resolution.x/u_resolution.y;

    // Elastic impulse. See http://www.iquilezles.org/www/articles/functions/functions.htm
    // float y = impulse(abs(cos(u_time)) * 8.5, st.x);

    // Beacon light
    // float y = mod(cos(u_time)*st.x, 1.0);

    // Gain. See http://www.iquilezles.org/www/articles/functions/functions.htm
    float y = gain(st.x, (cos(u_time) + 1.0) * 10.0);

    vec3 color = vec3(y);

    float pct = plot(st,y);
    color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

    gl_FragColor = vec4(color,1.0);
}