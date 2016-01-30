/**
 * Script Manager class
 *
 * @author iCharge
 * @since 30-Jan-16.
 */

ScriptManager = new function () {
    // './'  is mean script current path.
    var prefixPath = './'; // './public/js/'
    var suffixPath = ''; // No need to specified '.js'
    var ctrlPrefix = 'controllers/';
    var ctrlSuffix = '-controller';

    return {

        /**
         * Require script -- Load script by name without full path.
         * @param scriptName Script name without '.js' suffix
         * @returns {ScriptManager}
         */
        require: function (scriptName) {
            require(prefixPath + scriptName + suffixPath);
            return this;
        },

        /**
         * Require controller -- Load controller by name without full path.
         * @param ctrlName Controller name without '-controller.js' suffix
         * @returns {ControllerManager}
         */
        requireController: function (ctrlName) {
            require(prefixPath + ctrlPrefix + ctrlName + ctrlSuffix + suffixPath);
            return this;
        }
    };
}();