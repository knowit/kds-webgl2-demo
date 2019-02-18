

class Buffer {

    constructor ({ gl }) {
        this.targetTexture = gl.createTexture()

        // gl.framebufferTexture2D(0, 0, 0, this.targetTexture, 0)
        // gl.texImage2D(0, 0, 0, 0, 0, 0, 0, 0, data)
    }

}

export default buffer = ({ gl }, width, height, format = gl.RGBA32F) => {
    const texture = gl.createTexture()

    gl.bindTexture(texture)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

    gl.texImage2D(gl.TEXTURE_2D, 0, format, width, height, 0, gl.RGBA, gl.FLOAT, null)
    
    const fbo = gl.createFramebuffer()
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0)

    return {
        use: () => gl.bindFramebuffer(fbo),
        disuse: () => gl.bindFramebuffer(null)
    }
}

