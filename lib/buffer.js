

class Buffer {

    constructor (context) {
        this.gl = context.gl
        this.targetTexture = gl.createTexture()

        // gl.framebufferTexture2D(0, 0, 0, this.targetTexture, 0)
        // gl.texImage2D(0, 0, 0, 0, 0, 0, 0, 0, data)
    }
}

export class InputBuffer extends Buffer {
    constructor (context, data) {
        super(context) 
        
        this.buffer = this.gl.texImage2D()
    }
}

export class OutputBuffer extends Buffer {
    constructor (context) {
        super(context)

        this.buffer = this.gl.texStorage2D()
    }
}

