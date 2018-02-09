#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

#define PI 3.14159265358979323846

vec2 tile(vec2 _st, float _zoom){
    _st *= _zoom;
    return fract(_st);
}

float drawReflectiveVerticalLine(vec2 _st, vec2 pos, float width) {
    vec2 result = vec2(0.0);
    vec2 reflection = vec2(0.0);
    if (_st.x < pos.x || _st.x > pos.x + width) {
        result = vec2(1.0);
    }
    if (_st.x < 1.0 - pos.x - width || _st.x > 1.0 - pos.x) {
        reflection = vec2(1.0);
    }
    return 1.0 - result.x * result.y * reflection.x * reflection.y;
}

float drawReflectiveHorizontalLine(vec2 _st, vec2 pos, float width) {
    vec2 result = vec2(0.0);
    vec2 reflection = vec2(0.0);
    if (_st.y < pos.y || _st.y > pos.y + width) {
        result = vec2(1.0);
    }
    if (_st.y < 1.0 - pos.y - width || _st.y > 1.0 - pos.y) {
        reflection = vec2(1.0);
    }
    return 1.0 - result.x * result.y * reflection.x * reflection.y;
}

void main(void){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.317,0.181,1.000);

    // Divide the space in 4
    st = tile(st,4.);

    // Use a matrix to rotate the space 45 degrees
    
    vec3 ribbonColor =vec3(1.000,0.369,0.636);
    
    vec3 group1 = (vec3(drawReflectiveHorizontalLine(st, vec2(0.5), 0.02)) + vec3(drawReflectiveVerticalLine(st, vec2(0.5), 0.02))) * ribbonColor;
    vec3 group2 = (vec3(drawReflectiveHorizontalLine(st, vec2(0.45), 0.02)) + vec3(drawReflectiveVerticalLine(st, vec2(0.45), 0.02))) * ribbonColor;
    vec3 group3 = (vec3(drawReflectiveHorizontalLine(st, vec2(0), 0.05)) + vec3(drawReflectiveVerticalLine(st, vec2(0), 0.05))) * ribbonColor;
    vec3 group4 = (vec3(drawReflectiveHorizontalLine(st, vec2(0.1), 0.01)) + vec3(drawReflectiveVerticalLine(st, vec2(0.1), 0.01))) * ribbonColor;
    
    color += group1;
    color += group2;
    color += group3;
    color += group4;

    gl_FragColor = vec4(color, 1.0);
}
