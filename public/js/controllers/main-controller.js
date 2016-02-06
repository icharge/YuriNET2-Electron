/**
 * Main Controller
 *
 * @description A main menu
 *
 * @author iCharge
 * @since 30-Jan-16.
 */

app.controller('MainController', function ($scope, $location, Auth, Translator) {
    // Check Authentication
    if (null == Auth.user()) {
        // Goto login page
        $location.path('/login');
    } else {
        // Set Auth info
        $scope.user = Auth.user;
    }



    /**
     * Functions that buttons use.
     */

        // Logout
    $scope.logout = function () {
        Dialog.showMessageBox(remote.getCurrentWindow(), {
            type: 'question', // This shown as Info, need Native image
            buttons: [Translator.getText('YES'), Translator.getText('NO')],
            defaultId: 2, // Why not worked?
            title: Translator.getText('APP_NAME'),

            // This message body passed player-name as variable
            message: Translator.getText('ASK_LOGOUT',
                {playername: $scope.user.playername}),
            cancelId: 2 // No button for cancel action
        }, function (answer) {
            // Answer is a button index
            if (answer == 0) {
                // Say yes
                Auth.logout(); // TODO: This will return promise.
                $location.path('/login');
            }
        });
    };

});