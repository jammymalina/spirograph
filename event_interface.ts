export interface EventInterface {
    onresize?(sender: any, e: Event, w: number, h: number, ...args: Array<any>): void;
    onrepaint?(sender: any, ...args: Array<any>): void;
    onchange?(sender: any, val: any, old_val?: any, ...args: Array<any>);
}
