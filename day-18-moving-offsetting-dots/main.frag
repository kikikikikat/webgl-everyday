// This is an exercise for https://thebookofshaders.com/09/

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

vec2 brickTile(vec2 _st, float _zoom){
    _st *= _zoom;

    float speed = 2.0;
    float time = step(1.0,mod(u_time * speed,2.0));

    // Here is where the offset is happening
    if (time > 0.0) {
        _st.y += step(1., mod(_st.x,2.0)) * mod(u_time, 1.) * speed;
    } else {
       _st.x += step(1., mod(_st.y,2.0)) * mod(u_time, 1.) * speed;
    }


    return fract(_st);
}

float box(vec2 _st, vec2 _size){
    _size = vec2(0.5)-_size*0.5;
    vec2 uv = smoothstep(_size,_size+vec2(1e-4),_st);
    uv *= smoothstep(_size,_size+vec2(1e-4),vec2(1.0)-_st);
    return uv.x*uv.y;
}

float circle(vec2 st, float radius) {
    float pct = smoothstep(radius, radius + 0.01, distance(st, vec2(0.5)));
    return pct;
}

void main(void){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    st = brickTile(st,15.0);

    color = vec3(circle(st, 0.2));

    // Uncomment to see the space coordinates
    //color = vec3(st,0.0);

    gl_FragColor = vec4(color,1.0);
}