import {vec2, vec3} from "./math2d";
import {MATH_PI_TWO, MATH_PI_HALF} from "./math";
import {Colour, StrokeStyle, colour_clamp, colour_to_ctx_style} from "./colour";

declare const Path2D;

export class Gear {
    private _center: vec2;
    private _radius_offset: vec3;
    private _radius: number;
    private _teeth: number;
    private stroke_style: StrokeStyle;
    private fill_style: Colour;
    private gear: any;

    constructor(center: vec2, teeth: number, radius: number, public annulus: boolean = false, radius_offset: vec3 = new vec3(8, 8, 20),
        stroke_style: StrokeStyle = { colour: { r: 0, g: 0, b: 0 } as Colour, line_width: 1 } as StrokeStyle, fill_style: Colour = null) {
        this._center = new vec2(center.x, center.y);
        this.teeth = teeth;
        this.radius = radius;
        this._radius_offset = new vec3(Math.abs(radius_offset.x), Math.abs(radius_offset.y), Math.abs(radius_offset.z));
        this.stroke_style = {
            colour: { r: 0, g: 0, b: 0 } as Colour,
            line_width: 1
        } as StrokeStyle;
        this.stroke_colour = stroke_style.colour;
        this.stroke_width = stroke_style.line_width;
        this.fill_colour = fill_style;
        this.generate_gear();
    }

    public reload(): void {
        this.generate_gear();
    }

    public generate_gear(): void {
        let n = this.teeth;
        let r2 = Math.abs(this.radius);
        let r0 = r2 - this.radius_offset.x;
        let r1 = r2 + this.radius_offset.y;
        let r3 = this.radius - this.radius_offset.z;
        if (this.annulus) {
            let tmp = r0;
            r0 = r1;
            r1 = tmp;
            r3 = r2 + this.radius_offset.z;
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
        this.gear = new Path2D(path);
    }

    public draw(ctx: any, rot: number, transform_order: string = "tr"): void {
        ctx.save();
        if (transform_order == "tr") {
            ctx.translate(this.x, this.y);
            ctx.rotate(rot);
        } else if (transform_order == "rt") {
            ctx.translate(this.x, this.y);
            ctx.rotate(rot);
        }
        ctx.beginPath();
        if (this.fill_colour) {
            ctx.fillStyle = colour_to_ctx_style(this.fill_colour);
            ctx.fill(this.gear);
        }
        if (this.stroke_style && this.stroke_colour) {
            ctx.strokeStyle = colour_to_ctx_style(this.stroke_colour);
            ctx.lineWidth = this.stroke_width;
            ctx.stroke(this.gear);
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

    get teeth(): number {
        return this._teeth;
    }
    set teeth(val: number) {
        this._teeth = Math.round(Math.abs(val));
    }

    get radius(): number {
        return this._radius;
    }
    set radius(val: number) {
        this._radius = Math.abs(val);
    }

    get radius_offset(): vec3 {
        return this._radius_offset;
    }
    set radius_offset(val: vec3) {
        this._radius_offset = new vec3(Math.abs(val.x), Math.abs(val.y), Math.abs(val.z));
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

export class GearSystem {
    private annulus: Gear;
    private planet: Gear;
    public planet_rotation: number;

    constructor({
        center,
        annulus,
        planet,
        planet_rotation
    } = {
        center: new vec2(0, 0),
        annulus: new Gear(new vec2(0, 0), 80, 300, true, new vec3(8, 8, 20), { colour: { r: 104, g: 59, b: 183 } as Colour, line_width: 1 } as StrokeStyle),
        planet: new Gear(new vec2(0, 0), 32, 100, false, new vec3(8, 8, 15), { colour: { r: 255, g: 152, b: 0 } as Colour, line_width: 1 } as StrokeStyle),
        planet_rotation: 0
    }) {
        this.annulus = annulus;
        this.annulus.center = center;
        this.planet = planet;
        this.planet.center = center;
        this.planet_rotation = planet_rotation;
    }

    public draw(ctx: any) {
        this.annulus.draw(ctx, 0);
        this.planet.draw(ctx, this.planet_rotation);
    }
}
