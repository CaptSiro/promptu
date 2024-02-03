import { Buffer } from "../core";
import { Shape } from "./Shape";
import { Vec2 } from "../vec";



class Line implements Shape {
    private readonly buffer: Buffer;
    public vertexCount: number;



    /**
     * @param type
     * @param {Vec2[]} vertices
     */
    constructor(type: GLenum, vertices: Vec2[]) {
        this.buffer = new Buffer(type);
        for (let i = 0; i < vertices.length; i++) {
            this.buffer.addVec2(this.buffer[i]);
        }
        this.vertexCount = vertices.length;
    }

    draw(gl: WebGLRenderingContext, program: WebGLProgram): number {
        this.buffer.flush(gl, program, "pos");
        return this.vertexCount;
    }
}