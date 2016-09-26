import {vec2} from "./math2d";
import {MATH_PI_TWO, MATH_PI_HALF} from "./math";
import {Colour, StrokeStyle, colour_clamp, colour_to_ctx_style} from "./colour";

declare const Path2D;

export class Gear {
    private _center: vec2;
    private _radius_offset: vec2;
    private stroke_style: StrokeStyle;
    private fill_style: Colour;

    constructor(center: vec2, public teeth: number, public radius: number, public annulus: boolean = false, radius_offset: vec2 = new vec2(8, 8),
        stroke_style: StrokeStyle = { colour: { r: 0, g: 0, b: 0 } as Colour, line_width: 1 } as StrokeStyle, fill_style: Colour = null) {
        this._center = new vec2(center.x, center.y);
        this._radius_offset = new vec2(Math.abs(radius_offset.x), Math.abs(radius_offset.y));
        this.stroke_style = {
            colour: { r: 0, g: 0, b: 0 } as Colour,
            line_width: 1
        } as StrokeStyle;
        this.stroke_colour = stroke_style.colour;
        this.stroke_width = stroke_style.line_width;
        this.fill_colour = fill_style;
    }

    public draw(ctx: any, rot: number): void {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(rot);
        ctx.beginPath();

        let n = this.teeth;
        let r2 = Math.abs(this.radius);
        let r0 = r2 - this.radius_offset.x;
        let r1 = r2 + this.radius_offset.y;
        let r3 = 20;
        if (this.annulus) {
            let tmp = r0;
            r0 = r1;
            r1 = tmp;
            r3 = r2 + 20;
        }
        let da = Math.PI / n;
        let a0 = -MATH_PI_HALF + (this.annulus ? da : 0);

        let path = `
            M ${r0 * Math.cos(a0)}, ${r0 * Math.sin(a0)}
        `;
        for (let i = 0; i < n; i++) {
            path += `
                A ${r0}, ${r0} 0 0, 1 ${r0 * Math.cos(a0 += da)}, ${r0 * Math.sin(a0)}
                L ${r2 * Math.cos(a0)}, ${r2 * Math.sin(a0)}
                L ${r1 * Math.cos(a0 += da / 3)}, ${r1 * Math.sin(a0)}
                A ${r1}, ${r1} 0 0,1 ${r1 * Math.cos(a0 += da / 3)}, ${r1 * Math.sin(a0)}
                L ${r2 * Math.cos(a0 += da / 3)}, ${r2 * Math.sin(a0)}
                L ${r0 * Math.cos(a0)}, ${r0 * Math.sin(a0)}
            `;
        }
        path += `
            M0 ${-r3} A ${r3}, ${r3} 0 0, 0 0, ${r3} A ${r3}, ${r3} 0 0, 0 0, ${-r3} Z
        `;
        let gear = new Path2D(path);
        if (this.fill_colour) {
            ctx.fillStyle = colour_to_ctx_style(this.fill_colour);
            ctx.fill(gear);
        }
        if (this.stroke_style && this.stroke_colour) {
            ctx.strokeStyle = colour_to_ctx_style(this.stroke_colour);
            ctx.lineWidth = this.stroke_width;
            ctx.stroke(gear);
        }
        ctx.restore();
    }

    get center(): vec2 {
        return this._center;
    }
    set center(val: vec2) {
        this._center.set(val.x, val.y);
    }

    get x(): number {
        return this.center.x;
    }
    set x(val: number) {
        this.center.x = val;
    }

    get y(): number {
        return this.center.y;
    }
    set y(val: number) {
        this.center.y = val;
    }

    get radius_offset() {
        return this._radius_offset;
    }
    set radius_offset(val: vec2) {
        this._radius_offset = new vec2(Math.abs(val.x), Math.abs(val.y));
    }

    get stroke_colour(): Colour {
        return this.stroke_style.colour;
    }
    set stroke_colour(val: Colour) {
        if (val) colour_clamp(val);
        this.stroke_style.colour = val;
    }

    get stroke_width(): number {
        return this.stroke_style.line_width;
    }
    set stroke_width(val: number) {
        this.stroke_style.line_width = Math.abs(val);
    }

    get fill_colour(): Colour {
        return this.fill_style;
    }
    set fill_colour(val: Colour) {
        if (val) colour_clamp(val);
        this.fill_style = val;
    }
}

export class GearAnimation {
    private annual: Gear;
    private planet: Gear;

    constructor({
        center = new vec2(0, 0), annual_radius = 200, planet_radius = 0,
        annual_teeth = 80, planet_teeth = 32,
        annual_stroke_style = { colour: { r: 0, g: 0, b: 0 } as Colour, line_width: 1 } as StrokeStyle,
        planet_stroke_style = { colour: { r: 0, g: 0, b: 0 } as Colour, line_width: 1 },
        annual_fill_style = null, planet_fill_style = null
    }: {
            center: vec2, annual_radius: number, planet_radius: number,
            annual_teeth: number, planet_teeth: number,
            annual_stroke_style: StrokeStyle,
            planet_stroke_style: StrokeStyle,
            annual_fill_style: Colour, planet_fill_style: Colour
        }) {
        annual_radius = Math.abs(annual_radius);
        if (!annual_radius) annual_radius = 1;
        this.annual = new Gear(new vec2(center.x, center.y), annual_teeth, annual_radius, true);
        this.
    }
}
