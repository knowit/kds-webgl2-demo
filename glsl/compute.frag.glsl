#version 300 es
precision highp float;

in vec2 uv;
out vec4 color;

uniform sampler2D tex;

void main () {
    vec4 dotp = vec4(0.0f, 0.0f, 0.0f, 0.0f); // Resulting dot project variable
    vec4 pixel = vec4(0.0f, 0.0f, 0.0f, 0.0f); // Variable for reading the pixel
    float sum = 0.0; // Sum of the pixels in the test region
    float meanVal = 0.0;
    float buff[4096]; // Local buffer to hold the mean

    for (int i = 0; i < 64; i++) { // Loop over every pixel in test region
        ivec2 coords;
        coords.y = myRow + i;
        for (int j = 0; j < 64; j++) {
            coords.x = myCol + j;
            // Read the pixel at coords, from the test image using the sampler
            pixel = texture(tex, uv)
            buff[i*64+j] = pixel.x;  // Take the first component as it is a single
                                    // float buffer
            sum += buff[i*64+j];     // Accumulate the sum
        } 
    }
    
    meanVal = sum / 256.;           // An intensity factor proportional to sum.
    for (int i= 0; i < 4096; i++){  // Remove from each pixel
      buff[i] -= meanVal;          // Per component subtract of intensity factor
    }

    // Perform the dot product
    for (int i= 0; i < 4096; i++){
      dotp.x += buff[i] * eigenFace[i]; // Do the component-wise dot product
    }

    color = dotp
}
