import { Theme } from "../../lib/types";
import { Vec3 } from "../webgl/vec";



export const defaultLight: Theme = {
    css: {
        primary: ["#666797", "#8585ac"],
        text: ["#2F3135", "#121212"],
        backgrounds: ["#f8f8f8", "#ededed", "#d5d5d5"]
    },
    pen: [
        Vec3.fromHex("#e6e6e6"),
        Vec3.fromHex("#ffb4ba"),
        Vec3.fromHex("#ffdfbc"),
        Vec3.fromHex("#ffffbe"),
        Vec3.fromHex("#b0fecc"),
        Vec3.fromHex("#b4e1fe"),
    ],
    paper: [
        Vec3.fromHex("#ededed"),
        Vec3.fromHex("#92989d"),
    ],
    size: 2
}