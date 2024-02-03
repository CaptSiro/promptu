import jsml from "../../lib/jsml/jsml";
import { Pointer } from "../../lib/types";
import { Camera } from "../webgl/Camera";
import Viewport from "./Viewport/Viewport";
import Toolbox from "./Toolbox/Toolbox";
import Impulse from "../../lib/Impulse";
import { Tool } from "../plugins/tools/ToolElement";
import Settings from "./Settings/Settings";



export default function Root(): HTMLDivElement {
    const camera: Pointer<Camera> = {};
    const tool = new Impulse<Tool>();

    return jsml.div({ class: "root" }, [
        Viewport(tool, camera),
        Toolbox(tool),
        Settings(camera.deref),
    ]);
}