
export const textureTypes = {
    FLOAT: {
        internalFormat: WebGL2RenderingContext.RGBA32F,
        format: WebGL2RenderingContext.RGBA,
        type: WebGL2RenderingContext.FLOAT
    },
    BYTE: {
        internalFormat: WebGL2RenderingContext.RGBA,
        format: WebGL2RenderingContext.RGBA,
        type: WebGL2RenderingContext.UNSIGNED_BYTE
    }
}

export const texture = ({ gl }, width, height, data, type = textureTypes.FLOAT, ) => {
    const texture = gl.createTexture()

    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

    gl.texImage2D(gl.TEXTURE_2D, 0, type.internalFormat, width, height, 0, type.format, type.type, data)

    return {
        use: () => gl.bindTexture(gl.TEXTURE_2D, texture),
        disuse: () => gl.bindTexture(gl.TEXTURE_2D, null)
    }
}

export const framebuffer = ({ gl }, width, height, format = gl.RGBA32F) => {
    const texture = gl.createTexture()

    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

    gl.texImage2D(gl.TEXTURE_2D, 0, format, width, height, 0, gl.RGBA, gl.FLOAT, null)
    
    const fbo = gl.createFramebuffer()
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0)

    return {
        use: () => gl.bindFramebuffer(gl.FRAMEBUFFER, fbo),
        disuse: () => gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    }
}

export const dataBuffer = ({ gl }, data, bound, type = WebGL2RenderingContext.STATIC_READ) => {
    const vertexBuffer = gl.createBuffer()

    gl.bindBuffer(bound, vertexBuffer)
    gl.bufferData(bound, data, type)

    return {
        use: () => gl.bindBuffer(bound, vertexBuffer),
        disuse: () => gl.bindBuffer(bound, null)
    }
}

export const arrayBuffer = (ctx, data) => dataBuffer(ctx, data, WebGL2RenderingContext.ARRAY_BUFFER)
export const elementArrayBuffer = (ctx, data) => dataBuffer(ctx, data, WebGL2RenderingContext.ELEMENT_ARRAY_BUFFER)

