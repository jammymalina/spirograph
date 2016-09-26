export const BIAS = 0.00001;
export const GOLDEN_RATIO_CONJUGATE = 0.618033988749895;

export const MATH_PI_TWO = 2 * Math.PI;
export const MATH_PI_HALF = 0.5 * Math.PI;
export const DEG_TO_RAD = Math.PI / 180;
export const RAD_TO_DEG = 180 / Math.PI;

export const mod = (val, n) => {
    return ((val % n) + n) % n;
}

export const clamp = (val, min, max) => {
    if (min > max) {
        let tmp = min;
        min = max;
        max = min;
    }
    return val > max ? max : val < min ? min : val;
}

export const gcd = (a: number, b: number): number => {
    if (!a) return b;
    if (!b) return a;

    while (true) {
        a %= b;
        if (!a) return b;
        b %= a;
        if (!b) return a;
    }
}
