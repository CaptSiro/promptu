import { Camera, ORIGIN } from "../../webgl/Camera";
import { Tool, ToolElement } from "./ToolElement"
import { Vec2 } from "../../webgl/vec";



export class Move implements Tool {
    private isDragging: boolean = false;
    private start: Vec2;
    private cameraPosition: Vec2;

    construct() {
        this.isDragging = false;
        this.start = ORIGIN;
        this.cameraPosition = ORIGIN;
    }

    down(evt: MouseEvent, camera: Camera): void {
        this.start = camera.toWorld(new Vec2(
            evt.clientX * devicePixelRatio,
            evt.clientY * devicePixelRatio,
        ), ORIGIN);
        this.cameraPosition = camera.position.clone();
        this.isDragging = true;
    }

    private moveCamera(evt: MouseEvent, camera: Camera) {
        const end = camera.toWorld(new Vec2(
            evt.clientX * devicePixelRatio,
            evt.clientY * devicePixelRatio
        ), ORIGIN);

        camera.moveTo(
            this.cameraPosition.x - (end.x - this.start.x),
            this.cameraPosition.y - (end.y - this.start.y)
        );
    }

    up(evt: MouseEvent, camera: Camera): void {
        if (this.isDragging === false) {
            return;
        }

        this.moveCamera(evt, camera);
        this.isDragging = false;
    }

    move(evt: MouseEvent, camera: Camera): void {
        if (this.isDragging === false) {
            return;
        }

        this.moveCamera(evt, camera);
    }

    icon(): HTMLElement {
        return ToolElement(Move.name);
    }
}