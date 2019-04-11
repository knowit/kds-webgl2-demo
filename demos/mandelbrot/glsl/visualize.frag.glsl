#version 300 es
precision highp float;

in vec2 uv;
out vec4 color;

uniform sampler2D tex;
uniform float zoom;

const float iterations = 256.0;

vec4 HSV2RGB(vec4 hsva) { 
  vec4 rgba; 
  float h = hsva.x, s = hsva.y, v = hsva.z, m, n, f; 
  float i;   
  if( h == 0.0 ) 
    rgba = vec4(v, v, v, hsva.a); 
  else { 
    i = floor(h); 
    f = h - i; 
    float t = i / 2.0; 
    if( t - floor( t ) <  0.1 ) 
      f = 1.0 - f; // if i is even 
    m = v * (1.0 - s); 
    n = v * (1.0 - s * f); 
    if(i == 0.0 )       rgba = vec4(v, n, m, hsva.a); 
    else if( i == 1.0 ) rgba = vec4(n, v, m, hsva.a); 
    else if( i == 2.0 ) rgba = vec4(m, v, n, hsva.a); 
    else if( i == 3.0 ) rgba = vec4(m, n, v, hsva.a); 
    else if( i == 4.0 ) rgba = vec4(n, m, v, hsva.a); 
    else                rgba = vec4(v, m, n, hsva.a); 
  }
  return rgba; 
}

void main () {
    float value = texture(tex, uv).x;

    color = HSV2RGB(
        mix(
            vec4(1.85 * 3.14, 1.0, 1.0, 1.0), vec4(0.0, 0.0, 0.0, 1.0), value
        )
    );
}
