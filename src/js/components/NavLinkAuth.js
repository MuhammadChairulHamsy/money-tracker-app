import { html, nothing } from 'lit';
import LitWithoutShadowDom from "./base/LitWithoutShadowDom";

class NavLinkAuth extends LitWithoutShadowDom {
  render() {
    return html`
      <li class="nav-item dropdown">
        <a
          href="#"
          class="nav-link dropdown-toggle text-nowrap"
          role="button"
          data-bs-toggle="dropdown"
        >
          <div class="me-2 d-inline-block">
            <img
              id="imgUserLogged"
              src="https://ui-avatars.com/api/?name=User%20Name&background=random"
              alt="User Name"
              style="width: 30px; height: 30px;"
              class="img-fluid rounded-fill"
            />
          </div>
          <span id="nameUserLogged"></span>
        </a>
        <ul class="dropdown-menu">
          <a id="userLogOut" class="dropdown-item">Log Out</a>
        </ul>
      </li>
    `;
  }
}

customElements.define('nav-link-auth', NavLinkAuth);