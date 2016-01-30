/**
 * Configuration file
 *
 * @author iCharge
 * @since 0-Jan-16.
 */

// Routing provider config
app.config(function ($routeProvider, $httpProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'view/blank.html',
            controller: 'LandingController'
        })
        .when('/main', {
            templateUrl: 'view/main-menu.html',
            controller: 'MainController'
        })
        .when('/login', {
            templateUrl: 'view/login.html',
            controller: 'LoginController'
        })
        .otherwise({
            redirectTo: '/'
        });

});

// Translator config
app.config(function ($translateProvider) {
    $translateProvider
        .useStaticFilesLoader({
            prefix: 'public/lang/',
            suffix: '.json'
        })
        .preferredLanguage(localStorage.getItem('language') || 'en')
        .useMissingTranslationHandlerLog();

    // For security, Use sanitize
    // Detail : http://angular-translate.github.io/docs/#/guide/19_security
    $translateProvider.useSanitizeValueStrategy('escape');
});