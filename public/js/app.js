/**
 * Thai RA2 Lovers
 * A main Javascript Application.
 *
 * @author iCharge
 * @since 11-Jan-16.
 * @copyright 2015 Thai RA2 Lovers All Reserved
 */
"use strict";

/**
 * Electron scripts
 */
const remote = require('electron').remote;
const BrowserWindow = remote.BrowserWindow;
const Dialog = remote.dialog;
const Session = remote.session;

const child = require('child_process');
const spawn = child.spawn;

function exitApplication() {
    remote.app.quit();
}

function resizeWindow(w, h) {
    var win = remote.getCurrentWindow();
    // now i have everything from BrowserWindow api...
    win.setSize(w, h);
}


// Load Script Manager
require('./public/js/script-manager');

ScriptManager
// Load all Angular scripts
    .require('angular/angular.min')
    .require('angular/angular-sanitize')
    .require('angular/angular-animate.min')
    .require('angular/angular-ui-router.min')
    .require('angular/angular-translate.min')
    .require('angular/angular-translate-handler-log.min')
    .require('angular/angular-translate-loader-static-files.min');

// Load jQuery
window.$ = window.jQuery = require('./public/js/plugins/jquery.min.js');

// Load theme
ScriptManager
    .require('plugins/semantic.min')
    .require('plugins/dropdown.min')
    .require('custom')
    .require('sound-system');


/**
 * AngularJS scripts
 */

// Initial Application
var app = angular.module('yuriNET', [
    'ngSanitize', // Angular Sanitize
    'ui.router', // Angular Routing
    'ngAnimate', // Angular Animate
    'pascalprecht.translate' // Angular Translator
]);


// Script Manager will load scripts below.
ScriptManager
    .require('config') // Configuration
    .require('constants') // Constants
    .require('factories') // Factories
    .require('controllers') // Controllers
;

/**
 * Root scope
 */
app.run(['$rootScope', function ($rootScope) {

}]);