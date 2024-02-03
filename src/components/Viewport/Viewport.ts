import jsml from "../../../lib/jsml/jsml";
import { Camera } from "../../webgl/Camera";
import { Pointer } from "../../../lib/types";
import { Tool } from "../../plugins/tools/ToolElement";
import Impulse from "../../../lib/Impulse";



const { canvas } = jsml;
const cameras: Camera[] = [];
const resizeObserver = new ResizeObserver(entries => {
    for (let i = 0; i < entries.length; i++) {
        if (resizeCanvas(entries[i].target as HTMLCanvasElement)) {
            cameras[Number((entries[i].target as HTMLCanvasElement).dataset.cameraId)].update();
        }
    }
});



export default function Viewport(tool: Impulse<Tool>, camera: Pointer<Camera>): HTMLCanvasElement {
    const element = canvas({
        class: "viewport",
        onPointerDown: (evt: MouseEvent) => tool.value().down(evt, camera.deref),
        onPointerUp: (evt: MouseEvent) => tool.value().up(evt, camera.deref),
        onPointerMove: (evt: MouseEvent) => tool.value().move(evt, camera.deref),
    });
    window.addEventListener("load", () => resizeCanvas(element));

    camera.deref = new Camera(element);

    element.dataset.cameraId = String(cameras.length);
    cameras.push(camera.deref);

    resizeObserver.observe(element);

    return element;
}



function resizeCanvas(canvas: HTMLCanvasElement): boolean {
    const { width, height } = canvas.getBoundingClientRect();
    const displayWidth = Math.round(width * devicePixelRatio);
    const displayHeight = Math.round(height * devicePixelRatio);

    const needsResize = canvas.width !== width || canvas.width !== height;
    if (needsResize) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
    }

    return needsResize;
}
