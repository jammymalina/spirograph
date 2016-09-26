import {random_string} from "./random";
import {vec2} from "./math2d";

export class Shape {
    protected _id: string;

    constructor(id: string = random_string()) {
        this._id = id;
    }

    get id(): string {
        return this._id;
    }
    set id(val: string) {
        this._id = val;
    }

    get center(): vec2 {
        return new vec2(0, 0);
    }
}

export class Ellipse extends Shape {
    protected _center: vec2;
    protected a: number;
    protected b: number;

    get center(): vec2 {
        return this._center;
    }
    set center(val: vec2) {
        this._center.set(val.x, val.y);
    }
}

export class Polygon extends Shape {
    protected _closed: boolean;

    constructor(id: string = random_string()) {
        super(id);
    }
}
