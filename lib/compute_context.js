

export default class ComputeContext {

    constructor () {
        this.offscreenCanvas = new HTMLCanvasElement()
        this.gl = this.offscreenCanvas.getContext('webgl2', {
            alpha: false,
            antialias: false,
            depth: false,
            premultipliedAlpha: false
        })
    }

    execute (program, ) {

    }

}

