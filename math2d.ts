export interface NumericalFunction {
    (a: number): number;
}

function is_number(x: any): x is number {
    return typeof x === "number";
}

export const multiply_vec3_vec3 = (a: vec3, b: vec3): number => {
    return a.x * b.x + a.y * b.y + a.z * b.z;
}

export const multiply_vec2_vec2 = (a: vec2, b: vec2): number => {
    return a.x * b.x + a.y * b.y;
}

export const multiply_scalar_vec2 = (a: number, b: vec2, out?: vec2): vec2 => {
    if (!out) out = new vec2();
    out.set(a * b.x, a * b.y);
    return out;
}

export const multiply_scalar_vec3 = (a: number, b: vec3, out?: vec3): vec3 => {
    if (!out) out = new vec3();
    out.set(a * b.x, a * b.y, a * b.z);
    return out;
}

export const multiply_scalar_mat3 = (a: number, b: mat3, out?: mat3): mat3 => {
    if (!out) out = new mat3();
    out.set(
        a * b.m11, a * b.m12, a * b.m13,
        a * b.m31, a * b.m32, a * b.m33,
        a * b.m21, a * b.m22, a * b.m23
    );
    return out;
}

export const multiply_mat3_mat3 = (a: mat3, b: mat3, out?: mat3): mat3 => {
    if (!out) out = new mat3();
    out.set(
        a.m11 * b.m11 + a.m12 * b.m21 + a.m13 * b.m31, a.m11 * b.m12 + a.m12 * b.m22 + a.m13 * b.m32, a.m11 * b.m13 + a.m12 * b.m23 + a.m13 * b.m33,
        a.m21 * b.m11 + a.m22 * b.m21 + a.m23 * b.m31, a.m21 * b.m12 + a.m22 * b.m22 + a.m23 * b.m32, a.m21 * b.m13 + a.m22 * b.m23 + a.m23 * b.m33,
        a.m31 * b.m11 + a.m32 * b.m21 + a.m33 * b.m31, a.m31 * b.m12 + a.m32 * b.m22 + a.m33 * b.m32, a.m31 * b.m13 + a.m32 * b.m23 + a.m33 * b.m33
    );
    return out;
}

export const multiply_mat3_vec3 = (a: mat3, b: vec3, out?: vec3): vec3 => {
    if (!out) out = new vec3();
    out.set(
        b.x * a.m11 + b.y * a.m12 + b.z * a.m13,
        b.x * a.m21 + b.y * a.m22 + b.z * a.m23,
        b.x * a.m31 + b.y * a.m32 + b.z * a.m33
    );
    return out;
}

export const multiply_vec3_mat3 = (a: vec3, b: mat3, out?: vec3): vec3 => {
    if (!out) out = new vec3();
    out.set(
        b.m31 * a.z + b.m21 * a.y + b.m11 * a.x,
        b.m32 * a.z + b.m22 * a.y + b.m12 * a.x,
        b.m33 * a.z + b.m23 * a.y + b.m13 * a.x
    );
    return out;
}

export const multiply = (a: number | vec2 | vec3 | mat3, b: number | vec2 | vec3 | mat3, out?: vec2 | vec3 | mat3): any => {
    if (is_number(a) && is_number(b)) {
        return (a as number) * (b as number);
    }
    if (a instanceof vec2 && b instanceof vec2) {
        return multiply_vec2_vec2(a as vec2, b as vec2);
    }
    if (a instanceof vec3 && b instanceof vec3) {
        return multiply_vec3_vec3(a as vec3, b as vec3);
    }

    let o = null;
    if (is_number(a) && b instanceof vec2) {
        if (out && !(out instanceof vec2)) return null;
        if (!out) o = new vec2(); else o = out as vec2;
        multiply_scalar_vec2(a as number, b as vec2, o);
        return o;
    }
    if (a instanceof vec2 && is_number(b)) {
        if (out && !(out instanceof vec2)) return null;
        if (!out) o = new vec2(); else o = out as vec2;
        multiply_scalar_vec2(b as number, a as vec2, o);
        return o;
    }
    if (is_number(a) && b instanceof vec3) {
        if (out && !(out instanceof vec3)) return null;
        if (!out) o = new vec3(); else o = out as vec3;
        multiply_scalar_vec3(a as number, b as vec3, o);
        return o;
    }
    if (a instanceof vec3 && is_number(b)) {
        if (out && !(out instanceof vec3)) return null;
        if (!out) o = new vec3(); else o = out as vec3;
        multiply_scalar_vec3(b as number, a as vec3, o);
        return o;
    }
    if (is_number(a) && b instanceof mat3) {
        if (out && !(out instanceof mat3)) return null;
        if (!out) o = new mat3(); else o = out as mat3;
        multiply_scalar_mat3(a as number, b as mat3, o);
        return o;
    }
    if (a instanceof mat3 && is_number(b)) {
        if (out && !(out instanceof mat3)) return null;
        if (!out) o = new mat3(); else o = out as mat3;
        multiply_scalar_mat3(b as number, a as mat3, o);
        return o;
    }
    if (a instanceof vec3 && b instanceof mat3) {
        if (out && !(out instanceof vec3)) return null;
        if (!o) o = new vec3(); else o = out as vec3;
        multiply_vec3_mat3(a as vec3, b as mat3, o);
        return o;
    }
    if (a instanceof mat3 && b instanceof vec3) {
        if (out && !(out instanceof vec3)) return null;
        if (!out) o = new vec3(); else o = out as vec3;
        multiply_mat3_vec3(a as mat3, b as vec3, o);
        return o;
    }
    if (a instanceof mat3 && b instanceof mat3) {
        if (out && !(out instanceof mat3)) return null;
        if (!out) o = new mat3(); else o = out as mat3;
        multiply_mat3_mat3(a as mat3, b as mat3, o);
        return o;
    }
    return null;
}

class vector32 {
    protected data: Float32Array;

    constructor(n: number) {
        n = Math.round(Math.abs(n));
        this.data = new Float32Array(n);
    }

    public apply(f: NumericalFunction) {
        for (let i = 0; i < this.data.length; i++) {
            this.data[i] = f(this.data[i]);
        }
    }

    public abs() {
        this.apply(Math.abs);
    }
}

export class vec2 extends vector32 {
    constructor(...data: Array<number>) {
        super(2);
        if (data.length == 0) this.set(0); else this.set(...data);
    }

    public set(...data: Array<number>) {
        if (data.length == 1) {
            this.x = data[0];
            this.y = data[0];
        } else if (data.length == 2) {
            this.x = data[0];
            this.y = data[1];
        }
    }

    public static add(...v: Array<vec2>): vec2 {
        if (v.length <= 0) return new vec2(0);

        let result: vec2 = new vec2(v[0].x, v[0].y);
        for (let i = 1; i < v.length; i++) {
            result.x += v[i].x;
            result.y += v[i].y;
        }
        return result;
    }

    public static sub(...v: Array<vec2>): vec2 {
        if (v.length <= 0) return new vec2(0);

        let result: vec2 = new vec2(v[0].x, v[0].y);
        for (let i = 1; i < v.length; i++) {
            result.x -= v[i].x;
            result.y -= v[i].y;
        }
        return result;
    }


    public static min(...v: Array<vec2>): vec2 {
        if (v.length <= 0) return new vec2(0);

        let result: vec2 = new vec2(v[0].x, v[0].y);
        for (let i = 1; i < v.length; i++) {
            result.x = Math.min(result.x, v[i].x);
            result.y = Math.min(result.y, v[i].y);
        }
        return result;
    }

    public static max(...v: Array<vec2>): vec2 {
        if (v.length <= 0) return new vec2(0);

        let result: vec2 = new vec2(v[0].x, v[0].y);
        for (let i = 1; i < v.length; i++) {
            result.x = Math.max(result.x, v[i].x);
            result.y = Math.max(result.y, v[i].y);
        }
        return result;
    }

    get x(): number {
        return this.data[0];
    }
    set x(val: number) {
        this.data[0] = val;
    }
    get y(): number {
        return this.data[1];
    }
    set y(val: number) {
        this.data[1] = val;
    }
}

export class vec3 extends vector32 {
    constructor(...data: Array<number>) {
        super(3);
        if (data.length == 0) this.set(0); else this.set(...data);
    }

    public set(...data: Array<number>) {
        if (data.length == 1) {
            this.x = data[0];
            this.y = data[0];
            this.z = data[0];
        } else if (data.length == 2) {
            this.x = data[0];
            this.y = data[1];
            this.z = 0;
        } else if (data.length == 3) {
            this.x = data[0];
            this.y = data[1];
            this.z = data[2];
        }
    }

    public static add(...v: Array<vec3>): vec3 {
        if (v.length <= 0) return new vec3(0);

        let result: vec3 = new vec3(v[0].x, v[0].y);
        for (let i = 1; i < v.length; i++) {
            result.x += v[i].x;
            result.y += v[i].y;
            result.z += v[i].z;
        }
        return result;
    }

    public static sub(...v: Array<vec3>): vec3 {
        if (v.length <= 0) return new vec3(0);

        let result: vec3 = new vec3(v[0].x, v[0].y);
        for (let i = 1; i < v.length; i++) {
            result.x -= v[i].x;
            result.y -= v[i].y;
            result.z -= v[i].z;
        }
        return result;
    }

    public static min(...v: Array<vec3>): vec3 {
        if (v.length <= 0) return new vec3(0);

        let result: vec3 = new vec3(v[0].x, v[0].y, v[0].z);
        for (let i = 1; i < v.length; i++) {
            result.x = Math.min(result.x, v[i].x);
            result.y = Math.min(result.y, v[i].y);
            result.z = Math.min(result.y, v[i].z);
        }
        return result;
    }

    public static max(...v: Array<vec3>): vec3 {
        if (v.length <= 0) return new vec3(0);

        let result: vec3 = new vec3(v[0].x, v[0].y, v[0].z);
        for (let i = 1; i < v.length; i++) {
            result.x = Math.max(result.x, v[i].x);
            result.y = Math.max(result.y, v[i].y);
            result.z = Math.max(result.y, v[i].z);
        }
        return result;
    }

    get x(): number {
        return this.data[0];
    }
    set x(val: number) {
        this.data[0] = val;
    }
    get y(): number {
        return this.data[1];
    }
    set y(val: number) {
        this.data[1] = val;
    }
    get z(): number {
        return this.data[2];
    }
    set z(val: number) {
        this.data[2] = val;
    }
}

export class mat3 extends vector32 {
    /*
        |0  3  6|
        |1  4  7|
        |2  5  8|
    */
    constructor(...data: Array<number>) {
        super(9);
        if (data.length == 0) this.set(0); else this.set(...data);
    }

    public set(...data: Array<number>): void {
        if (data.length == 1) {
            for (let i = 0; i < this.data.length; i++)
                this.data[i] = data[0];
        } else if (data.length == 6) {
            this.m11 = data[0];
            this.m12 = data[1];
            this.m13 = data[2];
            this.m21 = data[3];
            this.m22 = data[4];
            this.m23 = data[5];
            this.m31 = 0;
            this.m32 = 0;
            this.m33 = 1;
        } else if (data.length == 9) {
            this.m11 = data[0];
            this.m12 = data[1];
            this.m13 = data[2];
            this.m21 = data[3];
            this.m22 = data[4];
            this.m23 = data[5];
            this.m31 = data[6];
            this.m32 = data[7];
            this.m33 = data[8];
        }
    }

    public set_translate(t: number | vec2): void {
        let tx: number = t instanceof vec2 ? (t as vec2).x : t as number;
        let ty: number = t instanceof vec2 ? (t as vec2).y : t as number;
        this.m13 = tx;
        this.m23 = ty;
    }

    public set_rotate(rad: number): void {
        let s = Math.sin(rad);
        let c = Math.cos(rad);
        this.m11 = c;
        this.m12 = -s;
        this.m21 = s;
        this.m22 = c;
    }

    public set_scale(s: number | vec2): void {
        let sx: number = s instanceof vec2 ? (s as vec2).x : s as number;
        let sy: number = s instanceof vec2 ? (s as vec2).y : s as number;
        this.m11 = sx;
        this.m22 = sy;
    }

    public multiply(a: number | vec3 | mat3, out?: vec3 | mat3): any {
        multiply(this, a, out);
        return out;
    }

    public reverse_mutliply(a: number | vec3 | mat3, out?: vec3 | mat3): any {
        multiply(a, this, out);
        return out;
    }

    public static identity(out?: mat3): mat3 {
        if (!out) out = new mat3();
        out.set(
            1, 0, 0,
            0, 1, 0,
            0, 0, 1
        );
        return out;
    }

    public static transformation_matrix(t: vec2 | number = 0, rad: number = 0, s: vec2 | number = 1, order: string = "srt", out?: mat3) {
        if (!out) out = new mat3();
        mat3.identity(out);
        if (!order || order == "") return out;

        let mats = {};
        mats["t"] = order.indexOf("t") != -1 ? mat3.translation_matrix(t) : null;
        mats["r"] = order.indexOf("r") != -1 ? mat3.rotation_matrix(rad) : null;
        mats["s"] = order.indexOf("s") != -1 ? mat3.scale_matrix(s) : null;


        if (mats["t"] != null || mats["r"] != null || mats["s"] != null) {
            for (let i = order.length - 1; i >= 0; i--) {
                if (order[i] == "t" || order[i] == "r" || order[i] == "s")
                    multiply_mat3_mat3(out, mats[order[i]], out);
            }
        }
        return out;
    }

    public static translation_matrix(t: number | vec2, out?: mat3): mat3 {
        if (!out) out = new mat3();
        let tx: number = t instanceof vec2 ? (t as vec2).x : t as number;
        let ty: number = t instanceof vec2 ? (t as vec2).y : t as number;

        out.m11 = 1;
        out.m12 = 0;
        out.m13 = tx;

        out.m21 = 0;
        out.m22 = 1;
        out.m23 = ty;

        out.m31 = 0;
        out.m32 = 0;
        out.m33 = 1;
        return out;
    }

    public static rotation_matrix(rad: number, out?: mat3): mat3 {
        if (!out) out = new mat3();
        let s = Math.sin(rad);
        let c = Math.cos(rad);

        out.m11 = c;
        out.m12 = -s;
        out.m13 = 0;

        out.m21 = s;
        out.m22 = c;
        out.m23 = 0;

        out.m31 = 0;
        out.m32 = 0;
        out.m33 = 1;

        return out;
    }

    public static scale_matrix(s: number | vec2, out?: mat3): mat3 {
        if (!out) out = new mat3();
        let sx: number = s instanceof vec2 ? (s as vec2).x : s as number;
        let sy: number = s instanceof vec2 ? (s as vec2).y : s as number;

        out.m11 = sx;
        out.m12 = 0;
        out.m13 = 0;

        out.m21 = 0;
        out.m22 = sy;
        out.m23 = 0;

        out.m31 = 0;
        out.m32 = 0;
        out.m33 = 1;

        return out;
    }

    public static inverse(a: mat3, out?: mat3): mat3 {
        let d: number = a.determinant;
        if (d == 0) return mat3.identity(out);
        if (!out) out = new mat3();
        d = 1.0 / d;

        out.m11 = (a.m22 * a.m33 - a.m23 * a.m32) * d;
        out.m12 = (a.m13 * a.m32 - a.m12 * a.m33) * d;
        out.m13 = (a.m12 * a.m23 - a.m13 * a.m22) * d;

        out.m21 = (a.m23 * a.m31 - a.m21 * a.m33) * d;
        out.m22 = (a.m11 * a.m33 - a.m13 * a.m31) * d;
        out.m23 = (a.m13 * a.m21 - a.m11 * a.m23) * d;

        out.m31 = (a.m21 * a.m32 - a.m22 * a.m31) * d;
        out.m32 = (a.m12 * a.m31 - a.m11 * a.m32) * d;
        out.m33 = (a.m11 * a.m22 - a.m12 * a.m21) * d;

        return out;
    }

    get determinant(): number {
        return this.m11 * (this.m33 * this.m22 - this.m32 * this.m23) + this.m21 * (-this.m33 * this.m12 + this.m32 * this.m13) + this.m31 * (this.m23 * this.m12 - this.m22 * this.m13);
    }

    /*
        |m11  m12  m13|
        |m21  m22  m23|
        |m31  m32  m33|
    */
    get m11(): number {
        return this.data[0];
    }
    set m11(val: number) {
        this.data[0] = val;
    }
    get m12(): number {
        return this.data[3];
    }
    set m12(val: number) {
        this.data[3] = val;
    }
    get m13(): number {
        return this.data[6];
    }
    set m13(val: number) {
        this.data[6] = val;
    }
    get m21(): number {
        return this.data[1];
    }
    set m21(val: number) {
        this.data[1] = val;
    }
    get m22(): number {
        return this.data[4];
    }
    set m22(val: number) {
        this.data[4] = val;
    }
    get m23(): number {
        return this.data[7];
    }
    set m23(val: number) {
        this.data[7] = val;
    }
    get m31(): number {
        return this.data[2];
    }
    set m31(val: number) {
        this.data[2] = val;
    }
    get m32(): number {
        return this.data[5];
    }
    set m32(val: number) {
        this.data[5] = val;
    }
    get m33(): number {
        return this.data[8];
    }
    set m33(val: number) {
        this.data[8] = val;
    }

    get ctx_transform(): Array<number> {
        return [this.m11, this.m21, this.m12, this.m22, this.m13, this.m23];
    }
}
