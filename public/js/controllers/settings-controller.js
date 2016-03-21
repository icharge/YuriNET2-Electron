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
            // miyuki.i4th.in.th:4434
            var yuriExec = spawn('C:\\Westwood\\Ra2\\RA2MD.exe', {
                env: {
                    'CNCNET_URL': 'ra2:v4serv=localhost:9000'
                }
            });
        } catch (e) {
            console.log('Exec Error, Maybe need Administrator privileges.', e);
        }
    };

    $scope.setMusic = function (value) {
        playMusic();
        setMusicVol(value ?.3:0);
        localStorage.setItem('Music', value);
    };
});
