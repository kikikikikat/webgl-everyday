// This is an exercise for https://thebookofshaders.com/07/

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 darkRed = vec3(0.674, 0.121, 0.133);
vec3 cream = vec3(0.952, 0.925, 0.858);
vec3 blue = vec3(0.015, 0.360, 0.6);
vec3 yellow = vec3(0.984, 0.776, 0.301);

vec3 drawRectangle(vec2 st, vec2 wh, vec2 xy, vec3 color) {
    st -= xy;
    vec2 deltaWH = (1.0 - wh) / 2.0;
    vec2 bl = step(vec2(deltaWH.x, deltaWH.y), st);
    vec2 tr = step(vec2(deltaWH.x, deltaWH.y), (vec2(1.0) - st));
    float pct = bl.x * bl.y * tr.x * tr.y;
    return pct * color;
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    vec3 red1 = drawRectangle(
        st,
        vec2(0.090,0.200),
        vec2(-0.450,0.400),
        darkRed
    );
    vec3 red2 = drawRectangle(
        st,
        vec2(0.090,0.200),
        vec2(-0.450,0.160),
        darkRed
    );
    vec3 red3 = drawRectangle(
        st,
        vec2(0.250,0.200),
        vec2(-0.240,0.400),
        darkRed
    );
    
    vec3 red4 = drawRectangle(
        st,
        vec2(0.250,0.200),
        vec2(-0.240,0.160),
        darkRed
    );
    
    vec3 white1 = drawRectangle(
        st,
        vec2(0.370,0.200),
        vec2(0.110,0.400),
        cream
    );
    
    vec3 white2 = drawRectangle(
        st,
        vec2(0.370,0.200),
        vec2(0.110,0.160),
        cream
    );
    
    vec3 white3 = drawRectangle(
        st,
        vec2(0.390,0.610),
        vec2(-0.310,-0.280),
        cream
    );
    
    vec3 white4 = drawRectangle(
        st,
        vec2(0.370,0.360),
        vec2(0.110,-0.160),
        cream
    );
    
    vec3 white5 = drawRectangle(
        st,
        vec2(0.370,0.360),
        vec2(0.110,-0.560),
        cream
    );
    
    vec3 white6 = drawRectangle(
        st,
        vec2(0.370,0.360),
        vec2(0.520,-0.160),
        cream
    );
    
    vec3 blue1 = drawRectangle(
        st,
        vec2(0.370,0.360),
        vec2(0.520,-0.560),
        blue
    );
    
    vec3 yellow1 = drawRectangle(
        st,
        vec2(0.370,0.200),
        vec2(0.520,0.400),
        yellow
    );
    
    vec3 yellow2 = drawRectangle(
        st,
        vec2(0.370,0.200),
        vec2(0.520,0.160),
        yellow
    );
    
    color = red1 + red2 + red3 + red4;
    color += white1 + white2 + white3 + white4 + white5 + white6;
    color += yellow1 + yellow2;
    color += blue1;


    gl_FragColor = vec4(color,1.0);
}