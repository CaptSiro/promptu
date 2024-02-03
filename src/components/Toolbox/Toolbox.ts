import jsml from "../../../lib/jsml/jsml";
import { Move } from "../../plugins/tools/Move";
import { Tool } from "../../plugins/tools/ToolElement";
import Impulse from "../../../lib/Impulse";



const { div } = jsml;



export default function Toolbox(selected: Impulse<Tool>): HTMLElement {
    const tools: Tool[] = [
        new Move(),
    ];

    let selectedId = 0;
    selected.pulse(tools[selectedId]);

    const container = div({
        class: "toolbox",
        onClick: (evt: MouseEvent) => {
            const tool = (evt.target as Element).closest(".tool") as HTMLElement;
            if (tool === null) {
                return;
            }

            const id = Number(tool.dataset.id);
            if (selectedId === id || tools[id] === undefined) {
                return;
            }

            container.children[selectedId]?.classList.remove("selected");
            selectedId = id;
            container.children[selectedId]?.classList.add("selected");
            selected.pulse(tools[id]);
        }
    }, tools.map((t, i) => {
        const element = t.icon();
        element.dataset.id = String(i);
        return element;
    }));

    return container;
}