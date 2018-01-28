// This is an exercise for https://thebookofshaders.com/07/

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 drawCircle(vec2 st, float radius, vec2 xy, vec3 color) {
    st -= xy;
    float pct = step(radius, distance(st, vec2(0.5)));
    return (1.0 - pct) * color;
}

vec3 drawFuzzyCircle(vec2 st, float radius, vec2 xy, vec3 color) {
    st -= xy;
    float pct = smoothstep(0.05, radius, distance(st, vec2(0.5)));
    return (1.0 - pct) * color;
}

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution;
    
    float r = abs(sin(u_time * 5.0));

    vec3 pct = drawFuzzyCircle(st, clamp(r, 0.1, 0.4), vec2(0.0), vec3(1.0, 0.0, 0.0));

	gl_FragColor = vec4(pct, 1.0 );
}