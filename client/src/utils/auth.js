import decode from 'jwt-decode';


class AuthService {
  //retrieve data saved in token
  getProfile() {
    try {
      const decoded = decode(this.getToken());
      console.log(decoded);
      return decoded;
    } catch (error) {
      console.log(error);
    }
  }
  //check if user is still logged on
  loggedIn() {
    //checks if there is a saved token an it's still valid
    const token = this.getToken();
    //use type coersion to check if token is NOT underfiend and 
    // the token is NOT expired
    return !!token && !this.isTokenExpired(token);
  }
  //check if the token has already expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  //retrieve token from localstorage
  getToken() {
    //retrieves the user token from local storage
    const tokenString = localStorage.getItem('id_token');
    return tokenString;
  }
  //set token to local storage and reload page to homepage
  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }
  //clear token from localstorage and force logout with reload
  logout() {
    //clear user token and profile data from local storage
    localStorage.removeItem('id_token');
    //reload page and reset the state of the application
    window.location.assign('/');
  }
}

export default new AuthService();