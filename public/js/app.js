/**
 * Thai RA2 Lovers [Javascript Application]
 * Copyright @ 2015 Thai RA2 Lovers All Reserved.
 *
 * @author iCharge
 * Created by iCharge on 11-Jan-16.
 */
"use strict";

/**
 * Electron scripts
 */
const remote = require('electron').remote;
const BrowserWindow = remote.BrowserWindow;
const Dialog = remote.dialog;
const Session = remote.session;

function exitApplication() {
    remote.app.quit();
}

function resizeWindow(w, h) {
    var win = remote.getCurrentWindow();
    // now i have everything from BrowserWindow api...
    win.setSize(w, h);
}


/**
 * Theme Scripts
 */
// On document ready
$(function () {


});


/**
 * AngularJS scripts
 */

// Initial Application
var app = angular.module('yuriNET', [
    'ngSanitize', // Angular Sanitize
    'ngRoute', // Angular Routing
    'ngAnimate', // Angular Animate
    'pascalprecht.translate' // Angular Translator
]);

// Using app
app

/**
 * Angular Configuration
 */

// Routing provider config
    .config(function ($routeProvider, $httpProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'view/main.html',
                controller: 'MainController'
            })
            .when('/login', {
                templateUrl: 'view/login.html',
                controller: 'LoginController'
            })
            .when('/lobby', {
                templateUrl: 'view/lobby.html',
                controller: 'LobbyController'
            })
            .otherwise({
                redirectTo: '/'
            });

    })

    // Translator config
    .config(function ($translateProvider) {
        $translateProvider
            .useStaticFilesLoader({
                prefix: 'public/lang/',
                suffix: '.json'
            })
            .preferredLanguage('en')
            .useMissingTranslationHandlerLog();

        // For security, Use sanitize
        // Detail : http://angular-translate.github.io/docs/#/guide/19_security
        $translateProvider.useSanitizeValueStrategy('escape');
    })

    /**
     * Constants
     */
    .constant('CONST_URI', (function () {
        var host = 'play.thaira2.com';
        //var host = 'playthaira2.localhost';

        var protocol = 'http://';
        var hostname = protocol + host + '/';
        return {
            LOGIN_URI: hostname + 'auth/loginyn/',
            LOGOUT_URI: hostname + 'auth/loghout/'
        }
    })())

    /**
     * Factories
     */
    // Authentication
    .factory('Auth', function ($http, CONST_URI) {
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
        userObj = null;

        return {
            user: userObj,
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
    })

    // Translator
    .factory('Translator', function ($translate, $rootScope) {
        // Translator script
        var currentLanguage = $translate.use();
        var changeLanguage = function (lang) {
            $translate.use(lang);
        };

        $rootScope.$on('$translateChangeSuccess', function (e, data) {
            currentLanguage = data.language;
        });

        return {
            getCurrent: currentLanguage,
            changeLanguage: changeLanguage,
            getText: function (key) {
                return $translate.instant(key);
            }
        };
    })

    /**
     * Root scope
     */
    .run(['$rootScope', function ($rootScope, Translator) {

    }])

    /**
     * Controllers
     */
    .controller('MainController', function ($scope, $location, Auth) {
        if (null == Auth.user) {
            $location.path('/login');
        }

    })

    .controller('SettingController', function ($scope, Translator) {
        $('.ui.dropdown').dropdown({
            action: 'hide'
        });

        $scope.changeLanguage = function (lang) {
            Translator.changeLanguage(lang);
        };
    })

    .controller('LoginController', function ($scope, $location, Auth, Translator) {
        //Translator.changeLanguage('th');
        // jQuery Semantic-UI Form validation
        /*$('#loginForm').form({
         fields: {
         username: 'empty',
         password: ['minLength[6]', 'empty']
         }
         });*/

        // Clear Auth
        Auth.user = null;

        // Get Login form data
        try {
            $scope.formData = angular.fromJson(localStorage.getItem('loginForm')) || {};
        } catch (e) {
            $scope.formData = {};
        }

        var txtUser = document.forms['loginForm'].username,
            txtPass = document.forms['loginForm'].password;

        $scope.submitLogin = function () {
            $scope.submitted = true;

            // Store form data to LS
            if ($scope.formData.remember === true) {
                localStorage.setItem('loginForm', angular.toJson($scope.formData));
            }

            console.log('Logging in as ' + $scope.formData.username + '...');
            $scope.loading = true;
            // Logging in
            Auth.login({
                u: $scope.formData.username,
                p: $scope.formData.password,
                hds: ''
            }).then(function (response) {
                // Check result
                var data = Auth.user = response.data;
                if (data.result.toLowerCase().indexOf('fail') < 0) {
                    console.log('Logged In : ' + data.playername);
                    /*
                     Dialog.showMessageBox(remote.getCurrentWindow(), {
                     type: 'info',
                     title: 'YuriNET 2',
                     buttons: ['OK'],
                     message: 'You are logging in as ' + Auth.user.playername
                     });
                     */
                    $location.path('/lobby');
                } else {
                    console.warn('Incorrect credential');
                    Dialog.showMessageBox(remote.getCurrentWindow(), {
                        type: 'warning',
                        title: Translator.getText('APP_NAME'),
                        buttons: [Translator.getText('OK')],
                        message: Translator.getText('LOGIN_INCORRECT')
                    });
                }
                $scope.loading = false;

                txtPass.focus();
                txtPass.setSelectionRange(0, txtPass.value.length);
            }, function (response) {
                Dialog.showMessageBox(remote.getCurrentWindow(), {
                    type: 'error',
                    title: Translator.getText('APP_NAME'),
                    buttons: [Translator.getText('OK')],
                    message: Translator.getText('LOGIN_FAILED')
                });
                $scope.loading = false;
            });
        };

        txtUser.focus();
    })
    .controller('LobbyController', function ($scope, $location, Auth) {
        if (null == Auth.user) {
            $location.path('/login');
        }

        $scope.foobar = 'Hello Lobby';
        $scope.Auth = Auth;
    })
;