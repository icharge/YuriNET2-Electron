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
const electron = require('electron');
const remote = electron.remote;
const ipcRenderer = electron.ipcRenderer;
const BrowserWindow = remote.BrowserWindow;
const Dialog = remote.dialog;
const Session = remote.session;
const child = require('child_process');
const spawn = child.spawn;

// Debug info.
var DEBUG = remote.getGlobal('DEBUG');
console.log('Application was started on ' + (DEBUG ? 'Debug' : 'Production') + ' mode.');

// Functions that must use.
function exitApplication() {
    remote.app.quit();
}

function resizeWindow(w, h) {
    var win = remote.getCurrentWindow();
    // now i have everything from BrowserWindow api...
    win.setSize(w, h);
}

function getWindow() {
    return remote.getCurrentWindow();
}

/** Event handler */
// Before unloading event.
var canClose = false;
window.onbeforeunload = function (e) {
    // Fade out music before close.
    if (!canClose) {
        setMusicVol(0, function () {
            canClose = true;
            exitApplication();
        });
    } else {
        // Do some stuff.

    }
    e.returnValue = canClose;
};

// On minimized.
getWindow().on('minimize', function () {
    //setMusicVol(0);
});

// On restored.
getWindow().on('restore', function () {
    /*if (localStorage.getItem('Music') == "true") {
        setMusicVol(.3);
    }*/
});

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
    .require('directives') // Directives
    .require('controllers') // Controllers
;

/**
 * Root scope
 */
app.run(['$rootScope', '$state', '$stateParams', 'Translator',
    function ($rootScope, $state, $stateParams, Translator) {

        // Change title to Application name with version
        $rootScope.$on('$translateChangeSuccess', function (e, data) {
            window.document.title = Translator.getText('APP_NAME') + ' (Alpha)';
        });


        /**
         It's very handy to add references to $state and $stateParams to the $rootScope
         so that you can access them from any scope within your applications.For example,
         <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
         to active whenever 'contacts.list' or one of its decendents is active.
         */
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }
]);