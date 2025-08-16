import { html } from "lit";
import LitWithoutShadowDom from "./base/LitWithoutShadowDom";


class NavLink extends LitWithoutShadowDom {
    static properties = { 
        content: { type: String, reflect: true},
        to: { type: String, reflect: true},
    };

    constructor() {
        super();

        this._checkAvailableProperty()
    }

    _checkAvailableProperty() {
        if(!this.hasAttribute('to')) {
            throw new Error(`Atribut "to" harus diterapkan pada elemen ${this.localName}`);
        }
    }

    render() {
        return html`
            <li class="nav-item">
                <a href="${this.to}" class="nav-link">${this.content}</a>
            </li>
        `;
    }
}

customElements.define('nav-link', NavLink);