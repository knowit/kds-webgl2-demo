#version 300 es
precision highp float;

in vec2 uv;
out float result;

uniform float zoom;

const float iterations = 512.0;

vec2 ComplexSq(vec2 a) {
	return vec2(a.x * a.x - a.y * a.y, 2.0 * a.x * a.y);
}

void main() {
	vec2 z = uv; //complex number

	// Iterate until the length of z is larger than two, or until we have reached max_iterations
	int i = 0;
	while (length(z) < 2.0 && i < int(iterations)) {
		// Update the value of z
		z = ComplexSq(z) + uv;
		++i;
	}

  // Check if we are inside the set
	if (i < int(iterations)) {
		result = float((float(i) - length(z)) / iterations);
	} else {
		result = 0.0;
	}
}