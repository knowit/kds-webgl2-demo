
import { context, dummyCanvas, computeKernel } from '../../lib/context'
import { texture } from '../../lib/buffer'
import { textureUniform } from '../../lib/program'

const ctx = context(dummyCanvas({width: 1024, height: 1024}))
const matrixKernel = computeKernel(ctx, {
    fragmentShader: require('./multiply.frag.glsl')
})

const matrix1 = texture(ctx, 1024, 1024, new Float32Array(
    Array.from({length: 1024*1024}, () => 2.0)
))

const matrix2 = texture(ctx, 1024, 1024, new Float32Array(
    Array.from({length: 1024*1024}, () => 4.0)
))

document.querySelector('#computeButton').addEventListener('click', () => {
    const then = performance.now()
    matrixKernel.execute(0.0, {
        matrix1: textureUniform(0), 
        matrix2: textureUniform(1)
    }, [matrix1, matrix2])

    console.log(matrixKernel.result.read())
    console.log('compute time', performance.now() - then, 'ms')
})
