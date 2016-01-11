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

/**
 * AngularJS scripts
 */
var app = angular.module('yuriNET', ['ngRoute']);

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
    .controller('MainController', function ($scope, $location) {
        $location.path('/login');
    })
    .controller('LoginController', function ($scope) {
        $scope.formData = {};

        $scope.submitLogin = function () {
            Dialog.showMessageBox(remote.getCurrentWindow(), {
                type: 'info',
                title: 'YuriNET 2',
                buttons: ['OK'],
                message: 'You are logging in as ' + $scope.formData.username
            });
        }

        document.getElementsByName('username')[0].focus();
    });