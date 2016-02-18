/**
 * ui-gameroom-table
 *
 * @author iCharge
 * @since 18-Feb-16.
 */

app.directive('gameroomTable', function () {
    return {
        restrict: 'E',
        templateUrl: 'view/ui/gameroom-table.html',
        replace: true,
        link: function (scope, element, attr) {
            // jQuery Datatable
            $(element).DataTable({
                //scrollY: 200,
                scrollCollapse: true,
                paging: false
            });
        }
    };
});