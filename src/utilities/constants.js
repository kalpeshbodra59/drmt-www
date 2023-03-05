const tokenKey = 'drmtToken';

class Constants {
    constructor() {
        this.authToken = sessionStorage.getItem(tokenKey);
    }

    setAuthTokenInSessionStorage(token) {
        sessionStorage.setItem(tokenKey, token);
        this.authToken = token;
    }

    getAuthTokenFromSessionStorage() {
        return this.authToken;
    }
}

const constants = new Constants();

export default constants;