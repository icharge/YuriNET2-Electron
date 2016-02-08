/**
 * Configuration file
 *
 * @author iCharge
 * @since 0-Jan-16.
 */

// Routing provider config
app.config(function ($urlRouterProvider, $stateProvider) {
    // Set default for otherwise URL
    $urlRouterProvider.otherwise('/');

    // Setup state
    $stateProvider
        .state('index', {
            url: '/',
            templateUrl: 'view/blank.html',
            controller: 'LandingController'
        })
        .state('main', {
            url: '/main',
            templateUrl: 'view/main-menu.html',
            controller: 'MainController'
        })
        .state('main.play', {
            url: '/play',
            views: {
                '': {
                    templateUrl: 'view/play/play.html'
                }
            }
        })
        .state('main.play.online', {
            url: '/online',
            views: {
                '': {
                    templateUrl: 'view/play/online-lobby.html'
                }
            }
        })
        .state('login', {
            url: '/login',
            templateUrl: 'view/login.html',
            controller: 'LoginController'
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
