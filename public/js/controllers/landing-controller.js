/**
 * Landing Controller
 *
 * @description A Controller that has been access first one.
 *
 * @author iCharge
 * @since 30-Jan-16.
 */

app.controller('LandingController', function ($scope, $location, Auth) {

    // Read and play music.
    var isMusic = localStorage.getItem('Music') == "false" ? false : true; // Load config.
    if (isMusic)
        playMusic();
    localStorage.setItem('Music', isMusic); // save config.

    if (null == Auth.user()) {
        $location.path('/login');
    } else {
        $location.path('/main');
    }
})