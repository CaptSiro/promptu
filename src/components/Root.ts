import jsml from "../../lib/jsml/jsml";
import { Pointer } from "../../lib/types";
import { Camera } from "../webgl/Camera";
import Viewport from "./Viewport/Viewport";
import Toolbox from "./Toolbox/Toolbox";
import Impulse from "../../lib/Impulse";
import { Tool } from "../plugins/tools/ToolElement";
import Settings from "./Settings/Settings";
import getThemeSwitcher from "../theme/Theme";



export default function Root(): HTMLDivElement {
    const camera: Pointer<Camera> = {};
    const tool = new Impulse<Tool>();

    const themes = getThemeSwitcher();
    themes.selected.listen(name => {
        const theme = themes.map.get(name);
        const paper = theme?.paper;
        if (paper.length < 1) {
            return;
        }

        const paperColor = paper[0];
        document.body.style.backgroundColor = `rgb(${paperColor.x}, ${paperColor.y}, ${paperColor.z})`;

        if (camera.deref === undefined || paper.length < 2) {
            return;
        }

        camera.deref.color = paper[1];
        camera.deref.size = theme.size ?? 1;
    });
    window.addEventListener("load", () => themes.select(themes.themeNames()[0]));

    return jsml.div({ class: "root" }, [
        Viewport(tool, camera),
        Toolbox(tool),
        Settings(camera.deref, themes),
    ]);
}