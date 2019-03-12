

const attachShader = (gl, program, type, source) => {
    var shader = gl.createShader(type)

    gl.shaderSource(shader, source)
    gl.compileShader(shader)

    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
    if (!success) {
        throw new Error(gl.getShaderInfoLog(shader))
    }

    gl.attachShader(program, shader)
    return shader
}

export const program = ({ gl }, vertexSource, fragmentSource) => {
    const program = gl.createProgram()
    attachShader(gl, program, gl.VERTEX_SHADER, require(`../glsl/${vertexSource}.vert.glsl`))
    attachShader(gl, program, gl.FRAGMENT_SHADER, require(`../glsl/${fragmentSource}.frag.glsl`))

    gl.linkProgram(program)
    const success = gl.getProgramParameter(program, gl.LINK_STATUS)
    if (!success) {
        throw new Error(gl.getProgramInfoLog(program))
    }

    return {
        use: () => gl.useProgram(program),
        disuse: () => gl.useProgram(null),
        setAttributePointer: (name, size) => {
            const loc = gl.getAttribLocation(program, name);
            gl.vertexAttribPointer(loc, size, gl.FLOAT, gl.FALSE, 0, 0);
            gl.enableVertexAttribArray(loc);
        }
    }
}
