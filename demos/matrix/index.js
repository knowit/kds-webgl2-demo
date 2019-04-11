
import { context, dummyCanvas, computeKernel } from '../../lib/context'

const ctx = context(dummyCanvas({width: 1024, height: 1024}))

const matrixKernel = computeKernel(ctx, {
    fragmentShader: require('./multiply.frag.glsl')
})

matrixKernel.execute(0.0)
console.log(matrixKernel.result.read())