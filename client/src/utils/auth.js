import decode from 'jwt-decode';

//creating new javascript class
class AuthService {
    //retrieve data saved in token
    getProfile(){
        return decode(this.getToken())
    }

    //check if user is still logged in
    loggedIn(){
        //check for saved token
        const token = this.getToken()

        //use type coersion to check is token is not undefined and not expired
        return !!token && !this.isTokenExpired(token);
    }

    //check if token is expires
    isTokenExpired(token){
        try {
            const decoded = decode(token)
            if(decoded.exp < Date.now()/1000){
                return true
            } else {
                return false
            }
        }
        catch (err) {
            return false
        }
    }

    //retrieve token from localStorage
    getToken(){
        return localStorage.getItem('id_token')
    }

    //set token to localStorage and reload page to homepage
    login(idToken){
        localStorage.setItem('id_token', idToken)
        window.location.assign('/')
    }

    //clear token from localStorage and force logout with reload
    logout(){
        localStorage.removeItem('id_token')
        window.location.assign('/')
    }
}


// create new instance each time a component imports it
export default new AuthService();