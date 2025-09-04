

const Utils = {
    setUserToken(key, value) {
        return sessionStorage.setItem(key, value);
    },

    getUserToken(key) {
        return sessionStorage.getItem(key);
    },

    destoryUserToken(key) {
        return sessionStorage.removeItem(key);
    },
};

export default Utils;