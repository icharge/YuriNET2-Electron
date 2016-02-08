/**
 * Sound System
 *
 * @author iCharge
 * @since 31-Jan-16.
 * @requires jQuery
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
var musicVol = .3;

playMusic = function () {
    if (null == music) {
        try {
            music = SoundController.play('drok.mp3', musicVol);
            music.loop = true;
        } catch (e) {
            console.error('Can\'t play music. ', e);
        }
    }
};

setMusicVol = function (vol, callback) {
    if (null != music) {
        musicVol = vol;
        //music.volume = musicVol;
        // Using jQuery to fade.
        $(music).animate({volume: vol}, 300, callback);
    } else {
        if (typeof callback == 'function')
            callback();
    }
};

stopMusic = function() {
    if (null != music) {
        music.stop();
        music = null;
    }
};