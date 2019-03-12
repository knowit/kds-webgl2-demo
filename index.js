
import { context, textureRenderer } from './lib/context'

const canvas = document.querySelector('#canvasElement')
const video = document.querySelector('#videoElement')

navigator.mediaDevices.getUserMedia({video: true})
    .then(stream => {
        video.srcObject = stream
        const ctx = context(canvas)

        const renderer = textureRenderer(ctx, video)
        
        const renderFrame = ctx.getRenderLoop(ctx, (dt) => {
            renderer.render(dt)
            window.requestAnimationFrame(renderFrame)
        })
        window.requestAnimationFrame(renderFrame)
    })
    .catch(console.error)

