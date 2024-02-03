import addContent from "./add-content.js";
import addProps from "./add-props.js";



export type JSML = {
    [key in keyof HTMLElementTagNameMap]: (props?: any, content?: any) => HTMLElementTagNameMap[key];
};

export type Content = string | Node | ArrayLike<HTMLElement | Node | string> | HTMLElement[] | HTMLCollection | undefined;
export type Props = ({
    [key: string]: ((event: Event) => any) | any
} & {
    style?: Partial<CSSStyleDeclaration>
}) | undefined



export const _ = undefined;



const jsml = new Proxy({}, {
    get(_, tag) {
        return (props: Props, content: Content) => {
            if (props instanceof HTMLElement) {
                console.error(`Can not use HTMLElement as options. Caught at: ${String(tag)}`);
                return document.createElement(String(tag));
            }

            const element = document.createElement(tag as keyof HTMLElementTagNameMap);

            if (props !== undefined && "class" in props) {
                element.className = String(props.class);
            }

            addProps(element, props);

            addContent(element, content);

            return element;
        }
    }
}) as JSML;



export default jsml;