

const attachShader = (gl, program, type, source) => {
    var shader = gl.createShader(type)

    gl.shaderSource(shader, source)
    gl.compileShader(shader)

    const status = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
    if (status) {
        throw new Error(gl.getShaderInfoLog(shader))
    }

    gl.attachShader(program, shader)
    return shader
}

export default program = ({ gl }, vertexSource, fragmentSource) => {
    const program = gl.createProgram()
    attachShader(gl, program, gl.VERTEX_SHADER, require(vertexSource))
    attachShader(gl, program, gl.FRAGMENT_SHADER, require(fragmentSource))

    gl.linkProgram(program)
    const status = gl.getProgramParameter(program, gl.LINK_STATUS)
    if (status) {
        throw new Error(gl.getProgramInfoLog(program))
    }

    return {
        use: () => gl.useProgram(program),
        disuse: () => gl.useProgram(null) 
    }
}

