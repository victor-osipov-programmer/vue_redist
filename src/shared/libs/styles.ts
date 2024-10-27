import type { IStyles } from "../types/styles" 

export class Styles {
    styles: IStyles = {}

    add(name: string, values: object) {
        this.styles[name] = {
            ...this.styles[name],
            ...values
        }
    }
    get() {
        return this.styles
    }
}