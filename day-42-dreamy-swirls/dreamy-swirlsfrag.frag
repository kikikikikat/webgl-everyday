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

#define KALEIDOSCOPE_SPEED_X    9.0 * 0.2
#define KALEIDOSCOPE_SPEED_Y  -2.832*0.1
#define KALEIDOSCOPE_SPLITS     1.

#define PI 3.14159265359

vec2 kaleidoscope(vec2 uv, vec2 offset, float splits)
{
    // XY coord to angle
    float angle = atan(uv.y, uv.x);
    // Normalize angle (0 - 1)
    angle = ((angle / PI) + 1.0) * 0.5;
    // Rotate by 90°
    angle = angle + 0.25 * u_time * 0.05;
    // Split angle 
    angle = mod(angle, 1.0 / splits) * splits;
    
    // Warp angle
    angle = -abs(2.0*angle - 1.0) + 1.0;
    
    angle = angle*0.1;
    
    // y is just dist from center
    float y = length(uv);
    
    angle = angle * (y*3.0);
    
    return vec2(angle, y) + offset;
}

// const vec3 inkColor = vec3(0.107,0.895,0.886);
// const vec3 inkColor2 = vec3(0.990,0.945,0.001);
// const vec3 inkColor3 = vec3(0.546,0.026,0.940);
const vec3 paperColor = vec3(1.000,0.968,0.928);
const vec3 inkColor3 = vec3(0.107,0.895,0.886);
const vec3 inkColor2 = vec3(0.990,0.945,0.001);
const vec3 inkColor = vec3(0.546,0.026,0.940);


const float shadeContrast = 0.590;
float time = (sin(u_time) + 1.0) * .5;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    //st.x = 1.0 - abs(1.0 - st.x * 2.0);
    st.x += -0.5;
    st.x *= 2.0;
    st.y += -0.5;
    st.y *= 2.0;
    st *= 1.0;

    
    vec2 A = vec2(time * KALEIDOSCOPE_SPEED_X * 0.01, 
              time * KALEIDOSCOPE_SPEED_Y * 0.01);
    st = kaleidoscope(st, A, KALEIDOSCOPE_SPLITS);
    
    float blot = fbm(st * 2.776 + .096 * (u_time * -1.) );
    float blot2 = fbm(st * 8.112 + .296 * (u_time * -0.284));
    float blot3 = fbm(st * 1.931 + -0.208 * (u_time * -0.284));
    float shade = fbm(st * 2.0 + 16.0);
    
    // blot = (blot + (sqrt(st.x) - abs(0.668 - st.y)));
    
    blot = smoothstep(0.202 , 0.867, blot) * max(1.0 - shade * shadeContrast, 0.0);
    blot2 = smoothstep(0.410 , 0.795, blot2) * max(1.0 - shade * shadeContrast, 0.0);
    blot3 = smoothstep(0.226 , -0.213, blot2) * max(1.0 - shade * 0.8, 0.0);
    

    vec3 color = mix(paperColor, inkColor, blot);
    color *= mix(paperColor, inkColor2, blot2);
    color *= mix(paperColor, inkColor3, blot3);

    gl_FragColor = vec4(color,1.0);
}
