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

/**
 * Require application scripts.
 */
var ScriptManager = new function () {
    var prefixPath = './public/js/';
    var suffixPath = '.js';
    var ctrlPrefix = 'controllers/';
    var ctrlSuffix = '-controller';

    return {

        /**
         * Require script -- Load script by name without full path.
         * @param scriptName Script name without '.js' suffix
         * @returns {ScriptManager}
         */
        require: function (scriptName) {
            require(prefixPath + scriptName + suffixPath);
            return this;
        },

        /**
         * Require controller -- Load controller by name without full path.
         * @param ctrlName Controller name without '-controller.js' suffix
         * @returns {ControllerManager}
         */
        requireController: function (ctrlName) {
            require(prefixPath + ctrlPrefix + ctrlName + ctrlSuffix + suffixPath);
            return this;
        }
    };
}();


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