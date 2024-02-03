import { Vec2 } from "./vec";



export function webglCompile(gl: WebGLRenderingContext, vertex: string | WebGLShader, fragment: string | WebGLShader): WebGLProgram | undefined {
    const program = gl.createProgram();
    const vertexShader = webglCreateShader(gl, gl.VERTEX_SHADER, vertex);
    const fragmentShader = webglCreateShader(gl, gl.FRAGMENT_SHADER, fragment);

    if (program === null || vertexShader === undefined || fragmentShader === undefined) {
        return;
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.log(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return;
    }

    return program;
}



export function webglCreateShader(gl: WebGLRenderingContext, type: GLenum, shader: string | WebGLShader): WebGLShader | undefined {
    if (shader instanceof WebGLShader) {
        return shader;
    }

    const s = gl.createShader(type);

    if (s == null) {
        return;
    }

    gl.shaderSource(s, shader);
    gl.compileShader(s);

    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.log(gl.getShaderInfoLog(s));
        gl.deleteShader(s);
        return;
    }

    return s;
}



export class Buffer {
    private readonly buffer: number[];
    size: number;
    type: GLenum;
    normalized: GLboolean;
    stride: GLsizei;
    offset: GLintptr;

    constructor(type: GLenum, size: number = 2, normalized: boolean = false, stride: number = 0, offset: number = 0) {
        this.buffer = [];
        this.size = size;
        this.type = type;
        this.normalized = normalized;
        this.stride = stride;
        this.offset = offset;
    }

    addVec2(vec: Vec2) {
        this.buffer.push(vec.x, vec.y);
    }

    flush(gl: WebGLRenderingContext, program: WebGLProgram, attribute: string) {
        const glBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, glBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.buffer), gl.STATIC_DRAW);

        gl.useProgram(program)
        const attrLocation = gl.getAttribLocation(program, attribute);

        gl.enableVertexAttribArray(attrLocation);
        gl.vertexAttribPointer(attrLocation, this.size, this.type, this.normalized, this.stride, this.offset);
    }
}