import {EventInterface} from "./event_interface";
import {str_to_int, add_class, remove_class, ERROR_CLASS, is_normal_integer} from "./common";

declare var componentHandler: any;

export class SliderTextComponent {
    private slider: any;
    private textfield_div: any;
    private textfield: any;
    private event_interface: EventInterface;
    private val: number;
    private _min: number;
    private _max: number;

    constructor(container: HTMLElement, value: number, min: number, max: number, label_id: string, label_string: string, event_interface?: EventInterface) {
        if (min > max) {
            let tmp = min;
            min = max;
            max = tmp;
        }
        this._min = min;
        this._max = max;
        this.create_interface(container, value, min, max, label_id, label_string);
        this.event_interface = event_interface ? event_interface : {} as EventInterface;
        this.set_value(str_to_int(this.slider.value, this.min));

        this.textfield.addEventListener('keyup', (e: KeyboardEvent) => {
            if (this.check_value(this.textfield.value)) {
                console.log('ok: ' + this.textfield.value);
                remove_class(this.textfield, ERROR_CLASS);
                this.change(str_to_int(this.textfield.value));
            } else {
                add_class(this.textfield, ERROR_CLASS);
            }
        });
        this.textfield.addEventListener("blur", () => {
            if (!this.check_value(this.textfield.value)) {
                this.set_value(this.val);
                remove_class(this.textfield, ERROR_CLASS);
            }
        });
        this.slider.addEventListener("change", () => {
            if (this.check_value(this.slider.value)) {
                this.change(str_to_int(this.slider.value));
            }
        });
        this.slider.addEventListener("input", () => {
            if (this.check_value(this.slider.value)) {
                this.change(str_to_int(this.slider.value));
            }
        });
    }

    private create_interface(container: HTMLElement, value: number, min: number, max: number, label_id: string, label_string: string) {
        /*<label for="R-input">R</label>
        <span class="range"><input class="mdl-slider mdl-js-slider" id="R-slider" type="range" min="10" max="300" value="100" tabindex="0"></span>
        <div class="mdl-textfield mdl-js-textfield">
            <input class="mdl-textfield__input" type="text" id="R-input">
            <label class="mdl-textfield__label" for="R-input">R</label>
        </div>*/
        let label_1 = document.createElement("label");
        label_1.htmlFor = label_id;
        label_1.innerHTML = label_string;
        container.appendChild(label_1);

        let span_range = document.createElement("span");
        add_class(span_range, "range");
        this.slider = document.createElement("input");
        this.slider.type = "range";
        add_class(this.slider, "mdl-slider", "mdl-js-slider");
        this.slider.min = min;
        this.slider.max = max;
        this.slider.value = value;
        this.slider.tabIndex = 0;
        span_range.appendChild(this.slider);
        container.appendChild(span_range);

        this.textfield_div = document.createElement("div");
        add_class(this.textfield_div, "mdl-textfield", "mdl-js-textfield");
        this.textfield = document.createElement("input");
        this.textfield.type = "text";
        add_class(this.textfield, "mdl-textfield__input");
        this.textfield.id = label_id;
        let label_2 = document.createElement("label");
        label_2.htmlFor = label_id;
        label_2.innerHTML = label_string;
        add_class(label_2, "mdl-textfield__label");
        this.textfield_div.appendChild(this.textfield);
        this.textfield_div.appendChild(label_2);
        container.appendChild(this.textfield_div);

        componentHandler.upgradeDom();
    }

    private set_value(val: number): boolean {
        if (val < this.min || val > this.max)
            return false;
        this.textfield_div.MaterialTextfield.change(val);
        this.slider.MaterialSlider.change(val);
        this.val = val;
        return true;
    }

    private change(val: number): void {
        let old_val: number = this.val;
        if (this.val != val && this.set_value(val)) {
            if (this.event_interface.onchange) this.event_interface.onchange(this, val, old_val);
        }
    }

    private check_value(val: string): boolean {
        if (!is_normal_integer(val)) return false;
        let num = str_to_int(val);
        return num >= this.min && num <= this.max;
    }

    get min(): number {
        return this._min;
    }
    get max(): number {
        return this._max;
    }
}
