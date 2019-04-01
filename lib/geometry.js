
import { arrayBuffer, elementArrayBuffer } from './buffer'

export const rect = (ctx, shader) => {
    const { gl } = ctx

    const vertexBuffer = arrayBuffer(ctx, new Float32Array([
        -1.0, -1.0,
        1.0, -1.0,
        1.0,  1.0,
        -1.0,  1.0,
    ]))

    const indexBuffer = elementArrayBuffer(ctx, new Uint8Array([
        0, 1, 2, //triangle 1
        2, 3, 0, //triangle 2
    ]))

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao)
    
    vertexBuffer.use()
    shader.setAttributePointer('position', 2)

    indexBuffer.use()
    gl.bindVertexArray(null)

    return {
        render: (preRender) => {
            shader.use()
            gl.bindVertexArray(vao);
            preRender()
            gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_BYTE, 0)
            shader.disuse()
        }
    }
}

