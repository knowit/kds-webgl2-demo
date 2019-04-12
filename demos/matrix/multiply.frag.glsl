#version 300 es
precision highp float;

in vec2 uv;
out float res;

void main () {
    res = uv.x;
}
