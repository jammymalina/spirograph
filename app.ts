import {EventInterface} from "./event_interface";
import {Board, BoardSettings} from "./board";
import {mat3, vec3, vec2} from "./math2d";
import {Spirograph, generate_random_spirograph} from "./spirograph";
import {SliderTextComponent} from "./slider_text";
import {toggle_class, has_class, add_class, remove_class} from "./common";
import {GearSystem} from "./gear";

class SpinoGraphApp {
    private board: Board;
    private toggle_menu_btn: HTMLButtonElement;
    private settings_panel: HTMLElement;
    private R_component: SliderTextComponent;
    private r_component: SliderTextComponent;
    private spiro: Spirograph;
    private gear_system: GearSystem;

    constructor(canvas: HTMLCanvasElement) {
        this.gear_system = new GearSystem();
        this.board = new Board(canvas,
            {
                onresize: (sender: any, e: Event, w: number, h: number) => {
                    this.onboardresize(sender, e, w, h);
                },
                onrepaint: (sender: any) => {
                    this.onboardrepaint(sender);
                }
            } as EventInterface,
            {
                draw_axis: false,
                x_axis_offset: 10,
                y_axis_offset: 10
            } as BoardSettings
        );
        this.toggle_menu_btn = document.getElementById("toggle-menu-btn") as HTMLButtonElement;
        this.settings_panel = document.getElementById("settings-panel") as HTMLElement;
        this.toggle_menu_btn.addEventListener("click", () => {
            toggle_class(this.toggle_menu_btn, "is-active");
            if (has_class(this.toggle_menu_btn, "is-active")) {
                add_class(this.settings_panel, "appear-down");
                remove_class(this.settings_panel, "disappear-up");
            } else {
                remove_class(this.settings_panel, "appear-down");
                add_class(this.settings_panel, "disappear-up");
            }
        });
        this.R_component = new SliderTextComponent(document.getElementById("R-container"), 100, 10, 300, "R-label", "R", {
            onchange: (sender: any, val: any, old_val: any) => {
                let num = val as number;
                this.spiro.R = num;
                this.board.repaint();
            }
        } as EventInterface);
        this.r_component = new SliderTextComponent(document.getElementById("r-container"), 100, 10, 300, "r-label", "r", {
            onchange: (sender: any, val: any, old_val: any) => {
                let num = val as number;
                this.spiro.r = num;
                this.board.repaint();
            }
        } as EventInterface);
        this.toggle_menu_btn = document.getElementById("toggle-menu-btn") as HTMLButtonElement;
        this.spiro = generate_random_spirograph(this.board.width, this.board.height, 0, 0);
        this.board.repaint();
    }

    private onboardresize(sender: any, e: Event, w: number, h: number): void {}

    private onboardrepaint(sender: any): void {
        //this.spiro.draw(this.board.ctx);
        this.gear_system.draw(this.board.ctx);
    }
}


let app = new SpinoGraphApp(document.getElementById("board") as HTMLCanvasElement);
