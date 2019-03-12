#version 300 es
precision highp float;

in vec2 uv;
out vec4 color;

uniform sampler2D tex;

void main () {
    color = vec4(texture(tex, uv).rgb, 1.0);
}
