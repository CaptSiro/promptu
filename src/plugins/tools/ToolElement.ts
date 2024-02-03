import { Camera } from "../../webgl/Camera";
import jsml, { Content } from "../../../lib/jsml/jsml";



export interface Tool {
    icon(): HTMLElement;
    down(evt: MouseEvent, camera: Camera): void;
    up(evt: MouseEvent, camera: Camera): void;
    move(evt: MouseEvent, camera: Camera): void;
}



export function ToolElement(content: Content) {
    return jsml.div({ class: "tool" }, content);
}