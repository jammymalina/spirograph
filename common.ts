export const ERROR_CLASS = "error-color";

export const is_normal_integer = (str: string): boolean => {
    return /^\+?(0|[1-9]\d*)$/.test(str);
}

export const str_to_int = (s: string, fail_return?: number) => {
    let num = parseInt(s);
    if (isNaN(num)) {
        return fail_return === undefined ? 0 : Math.round(fail_return);
    }
    return Math.round(num);
}

export const has_class = (el: HTMLElement, class_name: string): boolean => {
    if (el.classList)
        return el.classList.contains(class_name)
    else
        return !!el.className.match(new RegExp('(\\s|^)' + class_name + '(\\s|$)'));
}

export const add_class = (el: HTMLElement, ...class_names: Array<string>): void => {
    let class_name;
    for (let i = 0; i < class_names.length; i++) {
        class_name = class_names[i];
        if (el.classList)
            el.classList.add(class_name)
        else if (!has_class(el, class_name)) el.className += " " + class_name;
    }
}

export const remove_class = (el: HTMLElement, ...class_names: Array<string>): void => {
    let class_name;
    for (let i = 0; i < class_names.length; i++) {
        class_name = class_names[i];
        if (el.classList)
            el.classList.remove(class_name)
        else if (has_class(el, class_name)) {
            var reg = new RegExp('(\\s|^)' + class_name + '(\\s|$)')
            el.className = el.className.replace(reg, ' ')
        }
    }
}

export const toggle_class = (el: HTMLElement, ...class_names: Array<string>): void => {
    let class_name;
    for (let i = 0; i < class_names.length; i++) {
        class_name = class_names[i];
        if (el.classList) {
            el.classList.toggle(class_name);
        } else {
            if (has_class(el, class_name))
                remove_class(el, class_name);
            else
                add_class(el, class_name);
        }
    }
}
