/** 
 * CookieJar makes managing cookies easier.
 * Just a small class with a few static methods for direct cookie manipulation. 
 */
export class CookieJar {
  static stripper = /^ /;
  
  /**
   * Gets a specific cookie from the cookie jar.
   * @param {string} name - The name of the cookie to get.
   * @returns {string|null} - Returns the value of the cookie if found and null if not.
   */
  static get(name) {

    // grab the current cookies and split them into an array of key=value pairs
    let current = decodeURIComponent(document.cookie);
    let cookies = current.split(';');

    // loop through the key=value pairs to find a match
    for (let i = 0; i < cookies.length; i++ ) {
      let cookieString = cookies[i];

      // any cookies after the first will start with a blank space
      cookieString = cookieString.replace(this.stripper, '');

      // return the value of matching cookie, if it exists
      if (cookieString.startsWith(name)) {
        let cookie = cookieString.split('=');
        return cookie[1];
      }
    }

    // if matching cookie isn't found, return null
    return null;
  }

  /** 
   * Sets a cookie to the specified value.
   * @param {*} name - The name of the cookie.
   * @param {*} value - The value of the cookie.
   * @param {*} [expires=7] - How many days before the cookie expires.
   */
  static set(name, value, expires) {

    // if no expiration time is supplied, default to 7
    if (!expires) {
      expires = 7;
    }

    // cookie expirations are set in UTC format, so build that out
    let today = new Date();
    let expireDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()+expires);

    // set the cookie
    document.cookie = `${name}=${value}; expires=${expireDate.toUTCString()}; path=/; SameSite=Strict`;
  }
}