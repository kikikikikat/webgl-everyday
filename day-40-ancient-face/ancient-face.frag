// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

// Based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

#define OCTAVES 9
float fbm (in vec2 st) {
    // Initial values
    float value = 0.0;
    float amplitude = .5;
    float frequency = 0.;
    //
    // Loop of octaves
    for (int i = 0; i < OCTAVES; i++) {
        value += amplitude * noise(st);
        st *= 2.;
        amplitude *= .5;
    }
    return value;
}

const vec3 inkColor = vec3(0.01, 0.01, 0.1);
const vec3 paperColor = vec3(1.0, 0.98, 0.94);


const float shadeContrast = 0.590;
float time = (sin(u_time) + 1.0) * .5;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    st.x = 0.864 - abs(1.0 - st.x * 2.0);
    st.y += -0.380;
    st.y *= 1.580;
    st.x *= 0.964;
    
    float blot = fbm(st * 3.0 + 7.936);
    float blot2 = fbm(st * (time + 1.148) + (3.648+ time * 0.4));
    float shade = fbm(st * 2.0 + 16.0);
    
    // blot = (blot + (sqrt(st.x) - abs(0.668 - st.y)));
    
    blot = smoothstep(0.554 + (time * 0.2), 0.755, blot) * max(1.0 - shade * shadeContrast, 0.0) * smoothstep(0.554, 0.71, blot2);
    

    vec3 color = mix(paperColor, inkColor, blot);

    gl_FragColor = vec4(color,1.0);
}
