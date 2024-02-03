import { Theme } from "../../lib/types";
import { Vec3 } from "../webgl/vec";



export const defaultDark: Theme = {
    css: {
        primary: ["#666797", "#8585ac"],
        text: ["#BECDE6", "#EAE8FD"],
        backgrounds: ["#2F3135", "#4A545C", "#657B81"]
    },
    pen: [
        Vec3.fromHex("#e6e6e6"),
        Vec3.fromHex("#ffb4ba"),
        Vec3.fromHex("#ffdfbc"),
        Vec3.fromHex("#ffffbe"),
        Vec3.fromHex("#b0fecc"),
        Vec3.fromHex("#b4e1fe")
    ],
    paper: [
        Vec3.fromHex("#121212"),
        Vec3.fromHex("#4A545C"),
    ]
}