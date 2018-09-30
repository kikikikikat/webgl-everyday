// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

#define halfPhase 6.0
#define speed_modifier 1.5

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

vec2 kaleido(vec2 uv)
{
	float th = atan(uv.y, uv.x);
	float r = pow(length(uv), .9);
	float f = 3.14159 / 3.5;

	th = abs(mod(th + f/4.0, f) - f/2.0) / (1.0 + r);
	//th = sin(th * 6.283 / f);

	return vec2(cos(th), sin(th)) * r * .1;
}

vec2 transform(vec2 at)
{
	vec2 v;
	float th = .02 * u_time;
	v.x = at.x * cos(th) - at.y * sin(th) - .2 * sin(th);
	v.y = at.x * sin(th) + at.y * cos(th) + .2 * cos(th);
	return v;
}

const vec3 inkColor = vec3(0.061,0.028,0.100);
const vec3 inkColor2 = vec3(0.820,0.292,0.766);
const vec3 paperColor = vec3(1.000,0.670,0.670);


const float shadeContrast = 0.590;
float time = (sin(u_time) + 1.0) * .5;

void main() {
//     vec2 st = gl_FragCoord.xy/u_resolution.xy;
//     st.x *= u_resolution.x/u_resolution.y;
//     st.x = 0.864 - abs(1.0 - st.x * 2.0);
//     st.y += -0.380;
//     st.y *= 1.580;
//     st.x *= 0.964;
    
//     float shade = fbm(st * 2.0 + 16.0);
    
//     // blot = (blot + (sqrt(st.x) - abs(0.668 - st.y)));
    
//     //blot = smoothstep(0.554 + (time * 0.2), 0.755, blot) * max(1.0 - shade * shadeContrast, 0.0) * smoothstep(0.554, 0.71, blot2);
//     blot = smoothstep(0.554, 0.755, blot) * max(1.0 - shade * shadeContrast, 0.0);
//     blot2 = smoothstep(0.498, 0.755, blot2) * max(1.0 - shade * -0.864, 0.0);
    

//     vec3 color = mix(paperColor, inkColor, blot);
//     color *= mix(paperColor, inkColor2, blot2);

//     gl_FragColor = vec4(color,1.0);
    vec2 st = -1.0 + 2.0 * gl_FragCoord.xy / u_resolution.xy;
    //st *= 2.104;
    float activeTime = u_time *3.0;
    float timeMorph = 0.0;
    float a = 0.5 * atan(st.y, st.x);
	float r = sqrt(dot(st, st));
	
	if(mod(activeTime, 2.0 * halfPhase) < halfPhase)
		timeMorph = mod(activeTime, halfPhase);
	else
		timeMorph = (halfPhase - mod(activeTime, halfPhase));	
		
	timeMorph = 2.*timeMorph + .96;
    
    float blot = fbm(st * 4.568 + 7.544);
    float blot2 = fbm(st * 4.256 + 1.936);
    float shade = fbm(st * 2.0 + 16.0);
    blot = smoothstep(0.682, 2.835, blot);
    blot2 = smoothstep(-0.174, 0.923, blot2) * max(1.0 - shade * -0.664, 0.0);
	
	float w = 0.25 + 1.024*(sin(activeTime + 1.0*r)+ 3.0*cos(activeTime + 4.336*a)/timeMorph);
	float x = 0.8 + 3.0*(sin(activeTime + 1.0*r)+ 3.192*cos(activeTime + 5.0*a)/timeMorph);
	
	// vec3 col = inkColor2*0.9;
    vec3 col = mix(paperColor, inkColor, blot*w);
    col *= mix(paperColor, inkColor2, blot2*w);


	gl_FragColor = vec4(col,1.0);
}











