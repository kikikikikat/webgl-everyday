// This is an exercise for https://thebookofshaders.com/10/

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define RAND_FACTOR 43245.5453123

float random2D (in vec2 _st) {
    return fract(sin(dot(_st.xy,
                         vec2(12.9898,78.233)))*
        RAND_FACTOR);
}

float random (in float n) {
    return fract(sin(n) * RAND_FACTOR);
}

vec3 drawRandomCell(in vec2 _st, in float freq) {
    float draw = step(freq, random(_st.x));
    return 1.0 - vec3(draw);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    float zoomFactor = 50.0;
    float halfVal = zoomFactor / 2.0;
    float movingSpeed = 20.0 * u_time;
    st *= zoomFactor;
    
    if (st.y > halfVal) {
        st.x += movingSpeed;
    } else {
        st.x -= movingSpeed;
    }
    
    vec2 ipos = floor(st);  // get the integer coords
    vec2 fpos = fract(st);  // get the fractional coords
    
    vec3 color;
    
    float freq = 0.95 - mod(u_time, 5.0) * 0.1;
    color = drawRandomCell(ipos, freq);
    
    //color = vec3(ipos,0.0);
    


    gl_FragColor = vec4(color,1.0);
}