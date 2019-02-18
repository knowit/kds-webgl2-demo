

export default context = (canvas) => {
    return {
        canvas,
        gl: canvas.getContext('webgl2', {
            alpha: false,
            antialias: false,
            depth: false,
            premultipliedAlpha: false
        })
    }
}
