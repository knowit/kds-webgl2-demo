
import { context, textureRenderer } from '../lib/context'

const canvas = document.querySelector('#canvasElement')
const video = document.createElement('video')

navigator.mediaDevices.getUserMedia({video: true})
    .then(stream => {

        video.srcObject = stream
        video.width = 480
        video.height = 360
        video.play()
  
        const startRender = () => {
            const ctx = context(canvas)
            const renderer = textureRenderer(ctx, video)
        
            const renderFrame = ctx.getRenderLoop(ctx, (dt) => {
                renderer.render(dt)
                window.requestAnimationFrame(renderFrame)
            })
            window.requestAnimationFrame(renderFrame)

            video.removeEventListener('playing', startRender)
        }
        video.addEventListener('playing', startRender)     
    })
    .catch(console.error)

