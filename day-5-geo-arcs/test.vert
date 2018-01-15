attribute vec3 position;

uniform mat4 projection;
uniform mat4 view;
uniform mat4 model;
varying vec4 v_color;



void main() {
	gl_Position = projection * view * model * vec4(position, 1.0);
  v_color = gl_Position * 0.5 + 0.5;
}