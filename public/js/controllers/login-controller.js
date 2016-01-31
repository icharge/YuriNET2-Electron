/**
 * Login Controller
 *
 * @description Authentication on login page
 *
 * @author iCharge
 * @since 30-Jan-16.
 */

app.controller('LoginController', function ($scope, $location, Auth, Translator) {
    //Translator.changeLanguage('th');
    // jQuery Semantic-UI Form validation
    /*$('#loginForm').form({
     fields: {
     username: 'empty',
     password: ['minLength[6]', 'empty']
     }
     });*/

    // Clear Auth
    Auth.user(null);

    // Get Login form data
    try {
        $scope.formData = angular.fromJson(localStorage.getItem('loginForm')) || {};
    } catch (e) {
        $scope.formData = {};
    }

    var txtUser = document.forms['loginForm'].username,
        txtPass = document.forms['loginForm'].password;

    $scope.submitLogin = function () {
        $scope.submitted = true;

        // Store form data to LS
        if ($scope.formData.remember === true) {
            localStorage.setItem('loginForm', angular.toJson($scope.formData));
        }

        console.log('Logging in as ' + $scope.formData.username + '...');
        $scope.loading = true;
        // Logging in
        Auth.login({
            u: $scope.formData.username,
            p: $scope.formData.password,
            hds: ''
        }).then(function (response) {
            // Check result
            var data = Auth.user(response.data);
            if (data && data.result) {
                if (data.result.toLowerCase().indexOf('fail') < 0) {
                    console.log('Logged In : ' + data.playername);
                    sessionStorage.setItem('Auth', angular.toJson(data));

                    $location.path('/main');
                } else {
                    console.warn('Incorrect credential');
                    Dialog.showMessageBox(remote.getCurrentWindow(), {
                        type: 'warning',
                        title: Translator.getText('APP_NAME'),
                        buttons: [Translator.getText('OK')],
                        message: Translator.getText('LOGIN_INCORRECT')
                    });
                }
            } else {
                console.error('Data :', data);
                Dialog.showMessageBox(remote.getCurrentWindow(), {
                    type: 'error',
                    title: Translator.getText('APP_NAME'),
                    buttons: [Translator.getText('OK')],
                    message: Translator.getText('LOGIN_ERROR')
                });
            }

            $scope.loading = false;

            txtPass.focus();
            txtPass.setSelectionRange(0, txtPass.value.length);
        }, function () {
            Dialog.showMessageBox(remote.getCurrentWindow(), {
                type: 'error',
                title: Translator.getText('APP_NAME'),
                buttons: [Translator.getText('OK')],
                message: Translator.getText('LOGIN_FAILED')
            });
            $scope.loading = false;
        });
    };

    txtUser.focus();
});