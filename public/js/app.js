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
 * for using
 */
const remote = require('electron').remote;
const BrowserWindow = remote.BrowserWindow;
const Dialog = remote.dialog;
const Session = remote.session;

function exitApplication() {
    remote.app.quit();
}

function resizeWindow(w,h) {
    var win = remote.getCurrentWindow();
    // now i have everything from BrowserWindow api...
    win.setSize(w, h);
}

/**
 * AngularJS scripts
 */
var app = angular.module('yuriNET', ['ngRoute']);

/**
 * Angular Configuration
 */
app
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'view/main.html',
                controller: 'MainController'
            })
            .when('/login', {
                templateUrl: 'view/login.html',
                controller: 'LoginController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }])

/**
 * Constant Configuration
 */
    .constant('CONST_URI', (function () {
        //var host = 'play.thaira2.com';
        var host = 'playthaira2.localhost';
        var useSecure = false;
        var protocol = function (isSecure) {
            return isSecure ? 'https://' : 'http://';
        };

        var hostname = function (isSecure) {
            return protocol(isSecure) + host + '/';
        };
        return {
            LoginUri: hostname(useSecure) + 'auth/loginyn/'
        }
    })())

/**
 * Factories
 */
    .factory('Auth', function ($http, CONST_URI) {
        return {
            login: function (data) {
                return $http({
                    method: 'POST',
                    url: CONST_URI.LoginUri,
                    data: $.param(data),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
            }
        }
    })

/**
 * Controllers
 */
    .controller('MainController', function ($scope, $location) {
        $location.path('/login');
    })
    .controller('LoginController', function ($scope, Auth) {
        $scope.formData = {};

        $scope.submitLogin = function () {
            console.log('Logging in as ' + $scope.formData.username + '...');

            $scope.loading = true;

            // Logging in
            Auth.login({
                u: $scope.formData.username,
                p: $scope.formData.password,
                hds: ''
            }).success(function (data) {
                // Check result
                if (data.result.toLowerCase().indexOf('fail') < 0) {
                    console.log('Logged In : ' + data.playername);
                    resizeWindow(1000,800);
                    Dialog.showMessageBox(remote.getCurrentWindow(), {
                        type: 'info',
                        title: 'YuriNET 2',
                        buttons: ['OK'],
                        message: 'You are logging in as ' + data.playername
                    });

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

            });

        };

        document.getElementsByName('username')[0].focus();
    });