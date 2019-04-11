
import { context, computeKernel, framebufferRenderer } from '../../lib/context'

const canvas = document.querySelector('#canvasElement')

const ctx = context(canvas)
const mandelbrotKernel = computeKernel(ctx, {
    vertexShader: require('./glsl/mandelbrot.vert.glsl'),
    fragmentShader: require('./glsl/mandelbrot.frag.glsl')
})
const renderer = framebufferRenderer(ctx, {
    fragmentShader: require('./glsl/visualize.frag.glsl')
})

let pos = [0.0,0.0]
let zoom = 1.0

let drag = false

canvas.addEventListener('mousemove', (e) => {
    if (drag) {
        pos[0] += (e.movementX/canvas.width)*zoom
        pos[1] -= (e.movementY/canvas.height)*zoom
    }
})

canvas.addEventListener('mousewheel', (e) => {
    if (e.deltaY > 0) {
        zoom *= 1.0/1.1;
    }
    else {
        zoom *= 1.1;
    }
})

canvas.addEventListener('mousedown', (e) => {
    drag = true
})

canvas.addEventListener('mouseup', (e) => {
    drag = false
})

const renderFrame = ctx.getRenderLoop(ctx, (dt) => {
    mandelbrotKernel.execute(dt, {
        pos: new Float32Array(pos),
        zoom: new Float32Array([zoom])
    })

    renderer.render(dt, mandelbrotKernel.result, {
        zoom: new Float32Array([zoom])
    })

    window.requestAnimationFrame(renderFrame)
})
window.requestAnimationFrame(renderFrame)
