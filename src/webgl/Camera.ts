import { Vec2, Vec3 } from "./vec";
import { webglCompile, webglCreateShader } from "./core";



export const SCALE = 32;
export const ORIGIN = new Vec2(0, 0);



export class Camera {
    public canvas: HTMLCanvasElement;
    public gl: WebGLRenderingContext;
    public position: Vec2;
    public zoom: number;
    public background: WebGLProgram;
    private doUpdate: boolean;
    public color: Vec3;
    public size: number;
    private backgrounds: Map<string, WebGLProgram>;



    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.gl = canvas.getContext('webgl', { premultipliedAlpha: false });
        this.position = new Vec2(0, 0);
        this.zoom = 20;
        this.size = 1;
        this.doUpdate = false;
        this.color = new Vec3(0x80, 0x80, 0x80);
        this.compileBackgroundShaders();

        requestAnimationFrame(this.frame.bind(this));
    }



    private compileBackgroundShaders(): void {
        const vertex = document.querySelector("#bgt-vert-base");
        const fragments = Array.from(document.querySelectorAll(".bgt-frag"));

        this.backgrounds = new Map<string, WebGLProgram>();
        const vertexShader = webglCreateShader(this.gl, this.gl.VERTEX_SHADER, vertex.textContent);

        if (vertexShader === undefined) {
            return;
        }

        for (const fragment of fragments) {
            const program = webglCompile(this.gl, vertexShader, fragment.textContent);

            if (program === undefined) {
                continue;
            }

            this.backgrounds.set(fragment.id.substring("bgt-frag-".length), program);
        }
    }



    setBackground(background: string): void {
        const bg = this.backgrounds.get(background);
        if (bg === null) {
            return;
        }

        this.background = bg;
        this.doUpdate = true;
    }

    getBackgrounds(): string[] {
        return Array.from(this.backgrounds.keys());
    }

    toWorld(mut_pixels: Vec2, anchor: Vec2 | undefined = undefined): Vec2 {
        const pixelRatio = 1 / (SCALE * this.zoomValue());
        anchor ??= this.position;

        mut_pixels.x = (mut_pixels.x - this.canvas.width / 2) * pixelRatio + anchor.x;
        mut_pixels.y = -(mut_pixels.y - this.canvas.height / 2) * pixelRatio + anchor.y;

        return mut_pixels;
    }

    moveBy(x: number, y: number): void {
        this.position.x += x;
        this.position.y += y;
        this.update();
    }

    moveTo(x: number, y: number): void {
        this.position.x = x;
        this.position.y = y;
        this.update();
    }

    zoomBy(z: number): void {
        this.zoom += z;
        this.update();
    }

    private zoomValue(): number {
        return Math.pow(1.1, this.zoom);
    }

    private redraw(): void {
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        this.gl.clearColor(0, 0, 0, 0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        this.gl.useProgram(this.background);

        const scale = this.gl.getUniformLocation(this.background, 'scale');
        this.gl.uniform1f(scale, 32); // Cell Size

        const res = this.gl.getUniformLocation(this.background, 'res');
        this.gl.uniform2f(res, this.canvas.width, this.canvas.height);

        const pos = this.gl.getUniformLocation(this.background, 'pos');
        this.gl.uniform2f(pos, this.position.x, this.position.y);

        const zoom = this.gl.getUniformLocation(this.background, 'zoom');
        this.gl.uniform1f(zoom, this.zoomValue());

        const size = this.gl.getUniformLocation(this.background, 'size');
        this.gl.uniform1f(size, this.size);

        const color = this.gl.getUniformLocation(this.background, 'color');
        this.gl.uniform3f(color, this.color.x / 255, this.color.y / 255, this.color.z / 255);

        const vertices = new Float32Array([
            1.0, 1.0, 0.0,
            -1.0, 1.0, 0.0,
            1.0, -1.0, 0.0,
            -1.0, -1.0, 0.0
        ]);

        const buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);

        const position = this.gl.getAttribLocation(this.background, 'position');

        this.gl.vertexAttribPointer(
            position, // target
            3, // x,y,z
            this.gl.FLOAT, // type
            false, // normalize
            0, // buffer offset
            0 // buffer offset
        );

        this.gl.enableVertexAttribArray(position);

        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
    }

    private frame(): void {
        if (this.doUpdate) {
            this.redraw();
        }

        requestAnimationFrame(this.frame.bind(this));
    }

    update(): void {
        this.doUpdate = document.readyState === "complete";
    }
}