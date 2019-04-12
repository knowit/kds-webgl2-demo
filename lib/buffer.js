
export const textureTypes = {
    FLOAT: {
        internalFormat: [
            WebGL2RenderingContext.R32F,
            WebGL2RenderingContext.RG32F,
            WebGL2RenderingContext.RGB32F,
            WebGL2RenderingContext.RGBA32F
        ],
        format: [
            WebGL2RenderingContext.RED,
            WebGL2RenderingContext.RG,
            WebGL2RenderingContext.RGB,
            WebGL2RenderingContext.RGBA
        ],
        type: WebGL2RenderingContext.FLOAT
    },
    BYTE: {
        internalFormat: [
            WebGL2RenderingContext.R8,
            WebGL2RenderingContext.RG8,
            WebGL2RenderingContext.RGB8,
            WebGL2RenderingContext.RGBA8
        ],
        format: [
            WebGL2RenderingContext.RED,
            WebGL2RenderingContext.RG,
            WebGL2RenderingContext.RGB,
            WebGL2RenderingContext.RGBA
        ],
        type: WebGL2RenderingContext.UNSIGNED_BYTE
    }
}

export const texture = ({ gl }, width, height, data, components = 1, type = textureTypes.FLOAT, ) => {
    const texture = gl.createTexture()

    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

    gl.texImage2D(gl.TEXTURE_2D, 0, type.internalFormat[components-1], width, height, 0, type.format[components-1], type.type, data)

    return {
        use: () => gl.bindTexture(gl.TEXTURE_2D, texture),
        disuse: () => gl.bindTexture(gl.TEXTURE_2D, null),
        update: (data) => gl.texImage2D(gl.TEXTURE_2D, 0, type.internalFormat[components-1], width, height, 0, type.format[components-1], type.type, data),
        get handle() { return texture }
    }
}

export const framebuffer = ({ gl }, width, height, components = 1, type = textureTypes.FLOAT) => {
    const output = texture({ gl }, width, height, null, components, type)
    
    const fbo = gl.createFramebuffer()
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, output.handle, 0)

    return {
        use: () => gl.bindFramebuffer(gl.FRAMEBUFFER, fbo),
        disuse: () => gl.bindFramebuffer(gl.FRAMEBUFFER, null),
        get output() { return output },
        read: (buffer) => {
            buffer = buffer || (type.type === gl.FLOAT ? new Float32Array(width*height*components) : new Uint8Array(width*height*components))
            gl.readBuffer(0, 0, width, height, type.format[components-1], type.type, buffer)
            return buffer
        }
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

