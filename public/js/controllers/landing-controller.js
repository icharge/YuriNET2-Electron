/**
 * Landing Controller
 *
 * @description A Controller that has been access first one.
 *
 * @author iCharge
 * @since 30-Jan-16.
 */

app.controller('LandingController', function ($scope, $location, Auth) {
    if (null == Auth.user) {
        $location.path('/login');
    } else {
        $location.path('/main');
    }
})