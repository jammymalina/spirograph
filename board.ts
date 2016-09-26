import {Colour, colour_to_ctx_style} from "./colour";
import {DEG_TO_RAD} from "./math";
import {EventInterface} from "./event_interface";
import {vec2, vec3, mat3} from "./math2d";

function canvas_arrow(ctx: CanvasRenderingContext2D, from_point: vec2, to_point: vec2, headlen: number) {
    let angle: number = Math.atan2(to_point.y - from_point.y, to_point.x - from_point.x);
    ctx.beginPath();
    ctx.moveTo(from_point.x, from_point.y);
    ctx.lineTo(to_point.x, to_point.y);
    ctx.lineTo(to_point.x - headlen * Math.cos(angle - Math.PI / 6), to_point.y - headlen * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(to_point.x, to_point.y);
    ctx.lineTo(to_point.x - headlen * Math.cos(angle + Math.PI / 6), to_point.y - headlen * Math.sin(angle + Math.PI / 6));
    ctx.stroke();
}

export interface BoardSettings {
    draw_axis?: boolean;
    x_axis_col?: Colour;
    y_axis_col?: Colour;
    x_axis_offset?: number;
    y_axis_offset?: number;
    [prop_name: string]: any;
}

export class Board {
    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;
    private event_interface: EventInterface;
    private options: BoardSettings;
    private transformation_matrix: mat3;

    constructor(canvas: HTMLCanvasElement, event_interface?: EventInterface, options?: BoardSettings) {
        this._canvas = canvas;
        this._ctx = this.canvas.getContext("2d");
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.transformation_matrix = mat3.transformation_matrix(new vec2(this.canvas.width * 0.5, this.canvas.height * 0.5), 0, new vec2(1, -1), "st");
        if (event_interface) {
            this.event_interface = event_interface;
        } else {
            this.event_interface = {} as EventInterface;
        }
        this.options = {} as BoardSettings;
        if (options) this.options = options;
        window.addEventListener('resize', (e) => {
            this.resize_canvas(e, window.innerWidth, window.innerHeight);
        });
    }

    public clear_screen(): void {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private draw_axis(): void {
        if (this.options.draw_axis) {
            let x_colour: string = this.options.x_axis_col ? colour_to_ctx_style(this.options.x_axis_col) : "#a7414a";
            let y_colour: string = this.options.y_axis_col ? colour_to_ctx_style(this.options.y_axis_col) : "#282726";
            let x_offset: number = this.options.x_axis_offset !== undefined ? this.options.x_axis_offset : 0;
            let y_offset: number = this.options.y_axis_offset !== undefined ? this.options.y_axis_offset : 0;
            this.ctx.lineWidth = 1;
            this.ctx.strokeStyle = x_colour;
            canvas_arrow(this.ctx, new vec2(-this.middle.x + x_offset, 0), new vec2(this.middle.x - x_offset, 0), 10);
            this.ctx.strokeStyle = y_colour;
            canvas_arrow(this.ctx, new vec2(0, -this.middle.y + y_offset), new vec2(0, this.middle.y - y_offset), 10);
        }
    }

    private resize_canvas(e: Event, w: number, h: number): void {
        this.width = w;
        this.height = h;
        this.transformation_matrix.set_translate(this.middle);
        this.repaint();
        if (this.event_interface.onresize)
            this.event_interface.onresize(this, e, w, h);
    }

    public repaint(): void {
        this.clear_screen();
        this.ctx.setTransform.apply(this.ctx, this.transformation_matrix.ctx_transform);
        this.draw_axis();
        if (this.event_interface.onrepaint)
            this.event_interface.onrepaint(this);
    }

    get canvas(): HTMLCanvasElement {
        return this._canvas;
    }
    get ctx(): CanvasRenderingContext2D {
        return this._ctx;
    }

    get width(): number {
        return this.canvas.width;
    }
    set width(w: number) {
        this.canvas.width = w;
    }

    get height(): number {
        return this.canvas.height;
    }
    set height(h: number) {
        this.canvas.height = h;
    }

    get middle(): vec2 {
        return new vec2(
            this.canvas.width * 0.5,
            this.canvas.height * 0.5
        );
    }
}
