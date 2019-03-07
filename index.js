
import { context } from './lib/context'

const canvas = document.querySelector("#canvasElement")
navigator.mediaDevices.getUserMedia({video: true})
    .then(stream => {
        const ctx = context(canvas)
        //video.srcObject = stream;
    })
    .catch(console.error)

