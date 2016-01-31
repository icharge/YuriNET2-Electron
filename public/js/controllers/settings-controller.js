/**
 * Settings Controller
 *
 * @description Manage settings all in here.
 *
 * @author iCharge
 * @since 30-Jan-16.
 */

app.controller('SettingController', function ($scope, Translator) {
    $('.ui.dropdown').dropdown({
        on: 'hover',
        action: 'hide'
    });

    $scope.changeLanguage = function (lang) {
        Translator.changeLanguage(lang);
    };

    $scope.launch = function () {
        try {
            var yuriExec = spawn('C:\\Westwood\\Ra2\\RA2MD.exe', {
                env: {
                    'CNCNET_URL': 'ra2:v4serv=miyuki.i4th.in.th:4434'
                }
            });
        } catch (e) {
            console.log('Exec Error, Maybe need Administrator privileges.', e);
        }


    };
});