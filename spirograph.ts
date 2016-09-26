import {DEG_TO_RAD, BIAS, clamp, gcd} from "./math";
import {Colour, colour_to_ctx_style, golden_ratio_colour_generation} from "./colour";
import {random_int, random_float} from "./random";
import {vec2} from "./math2d";

export const generate_random_spirograph = (canvas_width: number = 4000, canvas_height: number = 2000, x?: number, y?: number): Spirograph => {
    let R:  number = random_int(50, Math.floor(Math.min(canvas_width, canvas_height) * 0.5));
    let r:  number = random_int(10, Math.floor(9 * R / 10));
    let l:  number = random_float(0.1, 0.9);
    let xc: number = x !== undefined ? x : random_int(-canvas_width * 0.5 + R, canvas_width * 0.5 - R);
    let yc: number = y !== undefined ? y : random_int(-canvas_height * 0.5 + R, canvas_height * 0.5 - R);

    return new Spirograph(xc, yc, R, r, l, golden_ratio_colour_generation());
}

export class Spirograph {
    private _colour: Colour;
    private _center: vec2;
    private _R: number; // radius big circle
    private _r: number; // radius small circle
    private _l: number; // distance pen-small_circle
    private _num_rot: number;

    constructor(x_center: number, y_center: number, R: number, r: number, l: number, colour: Colour = {r: 0, g: 0, b: 0} as Colour) {
        this._center = new vec2();
        this.x = x_center;
        this.y = y_center;
        this.R = R;
        this.r = r;
        this.l = l;
        this.set_num_rotations();
        this.colour = colour;
    }

    public to_string(): string {
        return `center:[${this.x}, ${this.y}], R: ${this.R}, r: ${this.r}, l: ${this.l}`;
    }

    public draw(c: HTMLCanvasElement | CanvasRenderingContext2D, step: number = 1): void {
        let ctx: CanvasRenderingContext2D = c instanceof HTMLCanvasElement ? (c as HTMLCanvasElement).getContext("2d") : c as CanvasRenderingContext2D;
        let k = this.k;
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = colour_to_ctx_style(this.colour);
        /*for (let i = 0; i < 360 * this.num_rotations; i += step) {
            let a = i * DEG_TO_RAD;
            let x = this.x + this.R * ((1 - k) * Math.cos(a) + this.l * k * Math.cos((1 - k) * a / k));
            let y = this.y + this.R * ((1 - k) * Math.sin(a) - this.l * k * Math.sin((1 - k) * a / k));
            if (i == 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }*/
        
        ctx.closePath();
        ctx.stroke();
    }

    get x(): number {
        return this._center.x;
    }
    set x(val: number) {
        this._center.x = val;
    }
    get y(): number {
        return this._center.y;
    }
    set y(val: number) {
        this._center.y = val;
    }

    get r(): number {
        return this._r;
    }
    set r(r: number) {
        this._r = Math.round(Math.abs(r));
        if (this._r == 0) this._r = 1;
        this.set_num_rotations();
    }

    get R(): number {
        return this._R;
    }
    set R(r: number) {
        this._R = Math.round(Math.abs(r));
        if (this._R == 0) this._R = 1;
        this.set_num_rotations();
    }

    get l(): number {
        return this._l;
    }
    set l(l: number) {
        this._l = Math.abs(l);
        while (this._l == 0) this._l += BIAS;
    }

    get num_rotations(): number {
        return this._num_rot;
    }
    private set_num_rotations(): void {
        this._num_rot = this.r /  gcd(this.r, this.R);
    }

    get k(): number {
        return this.r / this.R;
    }

    get colour(): Colour {
        return this._colour;
    }
    set colour(col: Colour) {
        col.r = clamp(col.r, 0, 255);
        col.g = clamp(col.g, 0, 255);
        col.b = clamp(col.b, 0, 255);
        if (col.a !== undefined) {
            col.a = clamp(col.a, 0, 255);
        }
        this._colour = col;
    }

}
