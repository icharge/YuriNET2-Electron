/**
 * Constants
 *
 * @author iCharge
 * @since 30-Jan-16.
 */

app.constant('CONST_URI', (function () {
    var host = 'play.thaira2.com';
    //var host = 'playthaira2.localhost';

    var protocol = 'http://';
    var hostname = protocol + host + '/';
    return {
        LOGIN_URI: hostname + 'auth/loginyn/',
        LOGOUT_URI: hostname + 'auth/loghout/'
    }
})());

