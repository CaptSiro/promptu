import { Theme } from "../../lib/types";
import Impulse from "../../lib/Impulse";
import { defaultDark } from "./default-dark";
import { defaultLight } from "./default-light";



export class ThemeSwitcher {
    public map: Map<string, Theme>;
    public selected: Impulse<string>;

    constructor() {
        this.map = new Map<string, Theme>();

        this.selected = new Impulse<string>();
        this.selected.listen(key => {
            const theme = this.map.get(key);

            this.setVariables("--primary-", theme.css.primary);
            this.setVariables("--text-", theme.css.text);
            this.setVariables("--background-", theme.css.backgrounds);
        });
    }

    themeNames(): string[] {
        return Array.from(this.map.keys());
    }

    select(name: string) {
        if (!this.map.has(name)) {
            return;
        }

        this.selected.pulse(name);
    }

    private setVariables(name: string, variables: string[]) {
        for (let i = 0; i < variables.length; i++) {
            document.documentElement.style.setProperty(name + String(i), variables[i]);
        }
    }

    load(theme: Theme, name: string) {
        this.map.set(name, theme);
    }
}



export default function getThemeSwitcher(): ThemeSwitcher {
    const ts = new ThemeSwitcher();

    ts.load(defaultDark, "Default Dark");
    ts.load(defaultLight, "Default Light");

    return ts;
}