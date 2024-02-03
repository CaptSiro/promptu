export interface Shape {
    draw(gl: WebGLRenderingContext, program: WebGLProgram): number;
}