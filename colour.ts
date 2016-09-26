import {clamp, GOLDEN_RATIO_CONJUGATE} from "./math";

export interface Colour {
    r: number;
    g: number;
    b: number;
    a?: number;
}

export interface StrokeStyle {
    colour: Colour,
    line_width: number
}

export const colour_clamp = (col: Colour) => {
    col.r = clamp(col.r, 0, 255);
    col.g = clamp(col.g, 0, 255);
    col.b = clamp(col.b, 0, 255);
    if (col.a !== undefined) {
        col.a = clamp(col.a, 0, 255);
    }
}

export const colour_to_ctx_style = (colour: Colour): string => {
    if (colour.a !== undefined) {
        return `rgba(${colour.r}, ${colour.g}, ${colour.b}, ${colour.a})`;
    }
    return `rgb(${colour.r}, ${colour.g}, ${colour.b})`;
}

let grc_h: number = Math.random();
export const golden_ratio_colour_generation = (s: number = 0.99, v: number = 0.99): Colour => {
    grc_h += GOLDEN_RATIO_CONJUGATE;
    grc_h %= 1;
    return hsv_to_rgb(grc_h, s, v);
}

export const hsv_to_rgb = (h: number, s: number, v: number): Colour => {
    let r, g, b, i, f, p, q, t;
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: clamp(Math.round(r * 255), 0, 255),
        g: clamp(Math.round(g * 255), 0, 255),
        b: clamp(Math.round(b * 255), 0, 255)
    } as Colour;
}
