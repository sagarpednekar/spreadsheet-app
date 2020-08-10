import auth0 from 'auth0-js';
export default class Auth {

    auth0 = new auth0.WebAuth({
        domain: "testronak.auth0.com",
        clientID: "fVz4JeCGAY3rgVEUilp8il1IZ5btB39p",
        redirectUri: "http://localhost:3000/callback",
        audience: "https://www.googleapis.com/auth/spreadsheets",
        responseType: "token id_token",
        scope: "read:spreadsheet write:spreadsheet offline_access"
    })
    constructor(cookies) {
        this.authResult = {};
        this.cookies = cookies;
    }
    login() {
        this.auth0.authorize()
    }

    handleAuthentication(history) {
        this.auth0.parseHash((err, authResult) => {
            console.log(authResult);
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.authResult = authResult;
                this.setSession(authResult, history);
                history.replace('/');
            } else 
                console.log(err );
                //history.replace('/');
                //console.log(err);
                //alert(`Error: ${err.error}. Check the console for further details.`);
        });
    }

    setSession(authResult, history) {
        console.log("Setting Session");
        let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
        this.cookies.set('access_token', authResult.accessToken);
        this.cookies.set('expires_at', expiresAt);  

        // navigate to the home route
        history.replace('/');
    }

    logout(history) {
        // Clear access token and ID token from local storage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        // navigate to the home route
    }

    isAuthenticated() {
        // Check whether the current time is past the
        // access token's expiry time
        let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }
}