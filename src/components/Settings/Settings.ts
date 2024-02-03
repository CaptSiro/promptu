import jsml, { _ } from "../../../lib/jsml/jsml";
import { Camera } from "../../webgl/Camera";



const { div, label, select, option } = jsml;



export default function Settings(camera: Camera) {
    const bgSelect = select({
        id: "background-texture",
        onInput: () => {
            camera.setBackground(bgSelect.value);
            camera.update();
        }
    }, camera.getBackgrounds().map((s, i) => option({ value: s, selected: i === 0 }, s)));

    window.addEventListener("load", () => {
        camera.setBackground(bgSelect.value);
        camera.update();
    });

    return div({ class: "settings" }, [
        div(_, [
            label({ for: "background-texture" }, "Background:"),
            bgSelect
        ]),
    ]);
}