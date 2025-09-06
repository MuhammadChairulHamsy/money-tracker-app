import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../utils/firebase";

const CheckUserAuth = {
  excludeRedirectPage: ['login.html', 'register.html'],
 
 checkLoginState(finallyCallback = null) {
  if (finallyCallback !== null && typeof finallyCallback !== "function") {
    throw new Error("Parameter finallyCallback should be a callback function");
  }

  const isUserOnAuthPage = this._isUserOnAuthPage(this.excludeRedirectPage);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const isUserSignedIn = Boolean(user);

      if (isUserOnAuthPage) {
        window.location.replace("/");
      } else {
        this._showLoginMenuOrUserLogMenu(isUserSignedIn);
      }
    } else {
      if (!isUserOnAuthPage) {
        window.location.replace("/auth/login.html");
      }
    }

    if (typeof finallyCallback === "function") {
      finallyCallback();
    }
  });
},

    _showLoginMenuOrUserLogMenu(userLoginState) {
        const loginMenu = document.querySelector('#loginMenu');
        const userLoggedMenu = document.querySelector('#userLoggedMenu');

        if(!userLoginState) {
            loginMenu?.classList.add('d-block');
            userLoggedMenu?.classList.add('d-none');

            loginMenu?.classList.remove('d-none');
            userLoggedMenu?.classList.remove('d-block');

            return;
        }

        loginMenu?.classList.add('d-none');
        userLoggedMenu?.classList.add('d-block');

        loginMenu?.classList.remove('d-block');
        userLoggedMenu?.classList.remove('d-none');
    },


    _isUserOnAuthPage(pages) {
        const filteredPages = pages.filter((item) => window.location.pathname.endsWith(item));
        return Boolean(filteredPages.length);
    },
};

export default CheckUserAuth;

