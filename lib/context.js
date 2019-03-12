
import { texture, textureTypes } from './buffer'
import { rect } from './geometry'
import { program } from './program'

export const context = (canvas) => {
    return {
        canvas,
        gl: canvas.getContext('webgl2', {
            alpha: false,
            antialias: false,
            depth: false,
            premultipliedAlpha: false
        }),
        getRenderLoop: (ctx, renderFunc) => {
            const { gl, canvas: { width, height }} = ctx
            let pt = 0

            gl.disable(gl.DEPTH_TEST)
            return (ct) => {
                const dt = (ct - pt) / 1000.0

                gl.viewport(0, 0, width, height);
                gl.clearColor(0.8, 0.9, 1.0, 1.0);
                gl.clear(gl.COLOR_BUFFER_BIT);

                renderFunc(dt)
                pt = ct
            }
        }
    }
}

export const textureRenderer = (ctx, data) => {
    const { gl, canvas: { width, height }} = ctx

    //const textureBuffer = texture(ctx, width, height, data, textureTypes.BYTE)
    const shader = program(ctx, 'kernel', 'copy')
    const geo = rect(ctx, shader)
    
    return {
        render: (dt) => {

            geo.render()

            //textureBuffer.use()
            //textureBuffer.disuse()
        }
    }
} 