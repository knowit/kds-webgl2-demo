
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
            gl.viewport(0, 0, width, height)
            return (ct) => {
                const dt = (ct - pt) / 1000.0
                renderFunc(dt)
                pt = ct
            }
        }
    }
}

export const computeKernel = (ctx, name) => {
    const shader = program(ctx, name, name)
    const geo = rect(ctx, shader)
    
    return {
        render: (dt, uniforms) => {
            
            geo.render(() => {
                for (const key in uniforms) {
                    shader.setUniform(key, uniforms[key])
                }
            })
        }
    }
}

export const textureRenderer = (ctx, data) => {
    const { gl, canvas: { width, height }} = ctx

    const textureBuffer = texture(ctx, width, height, data, textureTypes.BYTE)
    const shader = program(ctx, 'kernel', 'texture')
    const geo = rect(ctx, shader)
    
    return {
        render: (dt) => {

            textureBuffer.use()
            textureBuffer.update(data)

            geo.render()
            textureBuffer.disuse()
        
        }
    }
} 