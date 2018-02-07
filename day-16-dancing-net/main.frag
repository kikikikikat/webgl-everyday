#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

vec3 circle(in vec2 _st, in float _radius, in vec2 _uv){
    _uv /= 10.0;
    vec2 translate = vec2(cos(u_time * 5.0)*_uv.x,sin(u_time * 5.0)*_uv.y);
    _st += translate * 0.25;
    vec2 len = _st-vec2(0.5);
    float time_factor = abs(cos(u_time));
    vec3 color = vec3(vec2(_uv), 1.0);
    
    return color * (1.-smoothstep(_radius-(_radius*0.01),
                         _radius+(_radius*0.01),
                         dot(len,len)*4.0));
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.0);
    vec2 uv = vec2(.0);
    st -= 0.5;
    st *= 2.0;

    st *= 10.0;      // Scale up the space by 3
    uv = floor(st); 
    st = fract(st); // Wrap arround 1.0

    color = vec3(st, 0.0);
    color = vec3(circle(st, 0.228, uv));

	gl_FragColor = vec4(color,1.0);
}