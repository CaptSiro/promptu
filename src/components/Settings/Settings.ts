import jsml, { _ } from "../../../lib/jsml/jsml";
import { Camera } from "../../webgl/Camera";
import { ThemeSwitcher } from "../../theme/Theme";



const { div, label, select, option } = jsml;



export default function Settings(camera: Camera, themes: ThemeSwitcher) {
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


    const themeSelect = select({
        id: "theme",
        onInput: () => {
            themes.select(themeSelect.value);
        }
    }, themes.themeNames().map((s, i) => option({ value: s, selected: i === 0}, s)));


    return div({ class: "settings" }, [
        div(_, [
            label({ for: "background-texture" }, "Background:"),
            bgSelect
        ]),
        div(_, [
            label({ for: "theme" }, "Theme:"),
            themeSelect
        ]),
    ]);
}