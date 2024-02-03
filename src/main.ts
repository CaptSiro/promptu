import Root from "./components/Root";



function main() {
    document.body.append(Root());
}

main();



// function main(): void {
//     const canvas = document.querySelector<HTMLCanvasElement>("#viewport");
//     const camera = new Camera(canvas);
//
//     window.addEventListener("resize", () => {
//         resizeCanvas(canvas);
//         camera.update();
//     });
//
//     const gl = canvas.getContext("webgl");
//     const backgrounds = getBackgroundShaders(
//         gl,
//         document.querySelector("#bgt-vert-base"),
//         Array.from(document.querySelectorAll(".bgt-frag"))
//     );
//
//     const select = document.querySelector<HTMLSelectElement>("#background-type");
//
//     let i = 0;
//     for (const id of backgrounds.keys()) {
//         if (!id.startsWith("bgt-frag-")) {
//             continue;
//         }
//
//         select.appendChild(
//             new Option(id.substring("bgt-frag-".length), id, i++ === 0)
//         );
//     }
//
//     select.addEventListener("input", () => {
//         camera.setBackground(backgrounds.get(select.value));
//         camera.update();
//     });
//
//     resizeCanvas(canvas);
//     camera.setBackground(backgrounds.get(Array.from(backgrounds.keys())[0]));
//     camera.update();
//
//     window.addEventListener("resize", camera.update.bind(camera));
//
//     const origin = new Vec2(0, 0);
//     let start;
//     let cameraStart = undefined;
//     window.addEventListener("mousedown", evt => {
//         start = camera.toWorld(new Vec2(
//             evt.clientX * devicePixelRatio,
//             evt.clientY * devicePixelRatio
//         ), origin);
//         cameraStart = camera.position.clone();
//     });
//     window.addEventListener("mousemove", evt => {
//         if (start === undefined) {
//             return;
//         }
//
//         const end = camera.toWorld(new Vec2(
//             evt.clientX * devicePixelRatio,
//             evt.clientY * devicePixelRatio
//         ), origin);
//
//         camera.moveTo(cameraStart.x - (end.x - start.x), cameraStart.y - (end.y - start.y));
//     });
//     window.addEventListener("mouseup", evt => {
//         if (start === undefined) {
//             return;
//         }
//
//         const end = camera.toWorld(new Vec2(
//             evt.clientX * devicePixelRatio,
//             evt.clientY * devicePixelRatio
//         ), origin);
//
//         camera.moveTo(cameraStart.x - (end.x - start.x), cameraStart.y - (end.y - start.y));
//
//         start = undefined;
//         cameraStart = undefined;
//     });
//     window.addEventListener("wheel", evt => {
//         camera.zoomBy(evt.deltaY / -100);
//     });
// }

// webglCompile(gl, "vertex.glsl", "fragment.glsl").then(program => {
//     if (program === undefined) {
//         return;
//     }
//
//     const circle = new Ellipsoid(new Vec2(300, 300), 100, 200);
//     const vertexCount = circle.draw(gl, program);
//
//     const res = gl.getUniformLocation(program, "res");
//     gl.uniform2f(res, canvas.width, canvas.height);
//
//     const color = gl.getUniformLocation(program, "color");
//     gl.uniform4f(color, 0, 0, 0, 1);
//
//     gl.drawArrays(gl.TRIANGLE_FAN, 0, vertexCount);
// });






// Promise.all([vertex, fragment]).then((awaited) => {
//     const program = createProgram(gl, awaited[0], awaited[1]);
//
//     const positions = gl.createBuffer();
//     gl.bindBuffer(gl.ARRAY_BUFFER, positions);
//     const positionData = [
//         100, 20,
//         200, 40,
//         300, 80,
//         400, 160
//     ];
//     gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positionData), gl.STATIC_DRAW);
//
//     gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
//     gl.clearColor(0, 0, 0, 0);
//     gl.clear(gl.COLOR_BUFFER_BIT);
//
//     gl.useProgram(program);
//
//     const pos = gl.getAttribLocation(program, "pos");
//     gl.enableVertexAttribArray(pos);
//     gl.bindBuffer(gl.ARRAY_BUFFER, positions);
//     gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
//
//     const res = gl.getUniformLocation(program, "res");
//     gl.uniform2f(res, canvas.width, canvas.height);
//
//     const color = gl.getUniformLocation(program, "color");
//     gl.uniform4f(color, 0, 0, 0, 1);
//
//     const vertexDataCost = 2;
//     gl.drawArrays(gl.LINE_STRIP, 0, positionData.length / vertexDataCost);
// });



// function resizeCanvas(canvas: HTMLCanvasElement): boolean {
//     const { width, height } = canvas.getBoundingClientRect();
//     const displayWidth = Math.round(width * devicePixelRatio);
//     const displayHeight = Math.round(height * devicePixelRatio);
//
//     const needsResize = canvas.width !== width || canvas.width !== height;
//     if (needsResize) {
//         canvas.width = displayWidth;
//         canvas.height = displayHeight;
//     }
//
//     return needsResize;
// }
//
//
//
// function getBackgroundShaders(gl: WebGLRenderingContext, vertex: HTMLScriptElement, fragments: HTMLScriptElement[]): Map<string, WebGLProgram> {
//     const map = new Map<string, WebGLProgram>();
//     const vertexShader = webglCreateShader(gl, gl.VERTEX_SHADER, vertex.textContent);
//
//     if (vertexShader === undefined) {
//         return map;
//     }
//
//     for (const fragment of fragments) {
//         const program = webglCompile(gl, vertexShader, fragment.textContent);
//
//         if (program === undefined) {
//             continue;
//         }
//
//         map.set(fragment.id, program);
//     }
//
//     return map;
// }



// main();
