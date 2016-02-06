/**
 * UI Header for Main Page.
 *
 * @author iCharge
 * @since 06-Feb-16.
 */

app.directive('navHeader', function () {
    return {
        restrict: 'E',
        templateUrl: 'view/ui/nav-header.html',
        link: function (scope, element, attr) {
            // jQuery Dropdown
            $('.ui.menu .ui.dropdown').dropdown({
                on: 'hover',
                action: 'hide'
            });
        }
    };
});