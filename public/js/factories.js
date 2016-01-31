/**
 * Factories script
 *
 * @author iCharge
 * @since 30-Jan-16.
 */

// Translator helper
app.factory('Translator', function ($translate, $rootScope) {
    // Translator script

    var currentLanguage = $translate.use();

    /**
     * Get a current language that application using.
     */
    this.getCurrent = currentLanguage;

    /**
     * Change language to specified.
     * @param lang Language Code
     */
    this.changeLanguage = function (lang) {
        $translate.use(lang);
    };

    /**
     * Get a Message or Text by KEY
     * @param key
     * @param replacement [optional] text that can replace on variable (passed as object key-value)
     */
    this.getText = function (key, replacement) {
        return $translate.instant(key, replacement);
    };

    // Callback on change language successful.
    $rootScope.$on('$translateChangeSuccess', function (e, data) {
        currentLanguage = data.language;
        localStorage.setItem('language', currentLanguage);
    });

    return this;
});

// Authentication
app.factory('Auth', function ($http, CONST_URI) {
    // User object structure
    var userObj = {
        uid: '',
        name: '',
        email: '',
        playername: '',
        passpvpgn: '',
        hdserial: '',
        prefer_country: '',
        cdkey: '',
        status: '',
        specialname: '',
        role: '',
        joindate: '',
        logged: false
    };
    //userObj = angular.fromJson(sessionStorage.getItem('Auth')) || null;

    return {
        user: function (userObj) {
            if (userObj) {
                var data = userObj;
                if (typeof userObj == "object")
                    data = angular.toJson(userObj);

                sessionStorage.setItem('Auth', data);
                return userObj;
            } else {
                return angular.fromJson(sessionStorage.getItem('Auth')) || null;
            }
        },
        login: function (data) {
            return $http({
                method: 'POST',
                url: CONST_URI.LOGIN_URI,
                data: $.param(data),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
        },
        logout: function () {
            userObj = null;
            $http({
                method: 'POST',
                url: CONST_URI.LOGOUT_URI
            });
        }
    }
});