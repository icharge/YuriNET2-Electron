/**
 * Sound System
 *
 * @author iCharge
 * @since 31-Jan-16.
 */


SoundController = new function () {
    var prefixPath = 'public/sounds/';

    /**
     * Play Audio from file name in sounds folder.
     * @param src
     * @param volume [optional]
     * @returns {Audio}
     */
    this.play = function (src, volume) {
        if (null == volume) {
            volume = 1;
        }

        var audio = new Audio();
        audio.src = prefixPath + src;
        audio.volume = volume;
        audio.currentTime = 0;
        audio.play();

        return audio;
    };


    return this;
}();


// Music
var music = null;

playMusic = function () {
    if (null == music) {
        music = SoundController.play('indeep.mp3', .4);
        music.loop = true;
    }
};

stopMusic = function() {
    if (null != music) {
        music.stop();
        music = null;
    }
};