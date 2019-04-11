import { framebuffer } from './buffer'
import { rect } from './geometry'
import { program } from './program'

export const dummyCanvas = ({ width, height }) => {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    return canvas
}

export const context = (canvas) => {
    const gl = canvas.getContext('webgl2', {
        alpha: false,
        antialias: false,
        depth: false,
        premultipliedAlpha: false
    })
    const extensions = {
        ...gl.getExtension('EXT_color_buffer_float'),
        ...gl.getExtension('OES_texture_float_linear')
    }
    return {
        canvas,
        gl: Object.assign(gl, extensions),
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

export const computeKernel = (ctx, shaders) => {
    const { vertexShader, fragmentShader } = {
        vertexShader: shaders.vertexShader || require('./glsl/kernel.vert.glsl'), 
        fragmentShader: shaders.fragmentShader
    }
    const shader = program(ctx, vertexShader, fragmentShader)
    const geo = rect(ctx, shader)

    const { canvas: { width, height } } = ctx
    const buffer = framebuffer(ctx, width, height)
    
    return {
        execute: (dt, uniforms) => {
            buffer.use()
            geo.render(() => {
                for (const key in uniforms) {
                    shader.setUniform(key, uniforms[key])
                }
            })
            buffer.disuse()
        },
        get result() { return buffer }
    }
}

export const framebufferRenderer = (ctx, shaders) => {
    const { vertexShader, fragmentShader } = {
        vertexShader: shaders.vertexShader || require('./glsl/kernel.vert.glsl'), 
        fragmentShader: shaders.fragmentShader || require('./glsl/texture.frag.glsl')
    }
    const shader = program(ctx, vertexShader, fragmentShader)
    const geo = rect(ctx, shader)
    
    return {
        render: (dt, framebuffer, uniforms) => {
            framebuffer.output.use()
            geo.render(() => {
                for (const key in uniforms) {
                    shader.setUniform(key, uniforms[key])
                }
            })
            framebuffer.output.disuse()
        }
    }
} 