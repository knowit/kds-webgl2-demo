#version 300 es
precision highp float;

in vec2 uv;
out float res;

uniform sampler2D matrix1;
uniform sampler2D matrix2;

void main () {
    float res0 = 0.0;
    for (int i = 0; i < 1024; i++){
        float k = float(i)/1024.0;

        float cell1 = texture(matrix1, vec2(uv.x, k)).x;
        float cell2 = texture(matrix2, vec2(k, uv.y)).x;

        res0 += cell1*cell2;
    }
    res = res0;
}
