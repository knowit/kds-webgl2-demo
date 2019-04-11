#version 300 es
precision highp float;

uniform vec2 pos;
uniform float zoom;

in vec2 position;
out vec2 uv;

void main() {
    uv = pos + position * zoom;
    gl_Position = vec4(position, 0.0, 1.0);
}