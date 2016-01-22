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
 * AngularJS scripts
 */

// Initial
var app = angular.module('yuriNET', ['ngRoute', 'ngAnimate']);

/**
 * Angular Configuration
 */
app
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

    /**
     * Controllers
     */
    .controller('MainController', function ($scope, $location, Auth) {
        if (null == Auth.user) {
            $location.path('/login');
        }

    })
    .controller('LoginController', function ($scope, $location, Auth) {

        // jQuery Semantic-UI Form validation
        /*$('#loginForm').form({
         fields: {
         username: 'empty',
         password: ['minLength[6]', 'empty']
         }
         });*/

        // Clear Auth
        Auth.user = null;

        $scope.formData = {};
        var txtUser = document.forms['loginForm'].username,
            txtPass = document.forms['loginForm'].password;

        $scope.submitLogin = function () {

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
                        title: 'YuriNET 2',
                        buttons: ['OK'],
                        message: 'Username or Password is incorrect.'
                    });
                }
                $scope.loading = false;

                txtPass.focus();
                txtPass.setSelectionRange(0, txtPass.value.length);
            }, function (response) {
                Dialog.showMessageBox(remote.getCurrentWindow(), {
                    type: 'error',
                    title: 'YuriNET 2',
                    buttons: ['OK'],
                    message: 'Error can\'t talk to the server.'
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