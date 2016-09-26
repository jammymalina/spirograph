const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export const random_int = (min: number = 0, max: number = 1): number => {
    return Math.floor(Math.random() * (max - min) + min);
}

export const random_float = (min: number = 0, max: number = 1): number => {
    return Math.random() * (max - min) + min;
}

export const random_string = (n: number = 8): string => {
    let text = "";
    for (let i = 0; i < n; i++)
        text += alphabet.charAt(random_int(0, alphabet.length));
    return text;
}
