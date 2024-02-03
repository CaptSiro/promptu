import { Buffer } from "../core";
import { Shape } from "./Shape";
import { Vec2 } from "../vec";



export class Ellipsoid implements Shape {
    public origin: Vec2;
    public r1: number;
    public r2: number;
    public subdivision: number;



    constructor(origin: Vec2, r1: number, r2: Opt<number>, subdivision: number = 32) {
        this.origin = origin;
        this.r1 = r1;
        this.r2 = r2 ?? r1;
        this.subdivision = subdivision;
    }

    draw(gl: WebGLRenderingContext, program: WebGLProgram): number {
        const buffer = new Buffer(gl.FLOAT);
        buffer.addVec2(this.origin);

        for (let i = 0; i < this.subdivision + 1; i++) {
            const angle = (2 * Math.PI / this.subdivision) * i;
            buffer.addVec2(new Vec2(
                this.origin.x + Math.cos(angle) * this.r1,
                this.origin.y + Math.sin(angle) * this.r2,
            ));
        }

        buffer.flush(gl, program, "pos");
        return 2 + this.subdivision;
    }
}