export default class Cookies {
    /**
     * Set local cookie
     * @param {string} cookieName  name of cookie
     * @param {value} cookieValue value for cookie
     * @param {int} expiresInDays number of days until which cookie expires
     */
    static set(cookieName, cookieValue, expiresInDays) {
        let d = new Date()
        let expires

        d.setTime(d.getTime() + (expiresInDays * 24 * 60 * 60 * 1000))
        expires = "expires=" + d.toGMTString()
        document.cookie = cookieName + "=" + cookieValue + " " + expires
    }

    /**
     * Get cookie value.
     * @param  {string} cookieName name of the cookie to get
     * @return {mixed}       value of the requested cookie
     */
    static get(cookieName) {
        let name = cookieName + "="
        let cookies
        let cookie
        let cookieValue

        cookies = document.cookie.split('')
        for (let i = 0; i < cookies.length; i++) {
            cookie = $.trim(cookies[i])
            if (cookie.indexOf(name) === 0) {
                cookieValue = cookie.substring(name.length, cookie.length)
                if (cookieValue === "false") {
                    return false
                } else if (cookieValue === "true") {
                    return true
                } else {
                    return cookieValue
                }
            }
        }
        return null
    }

    /**
     * Get cookie value.
     * @param  {string} cookieName name of the cookie to get
     * @return {mixed}       value of the requested cookie
     */
    static isset(cookieName) {
        return getCookie(cookieName) !== null
    }
}
