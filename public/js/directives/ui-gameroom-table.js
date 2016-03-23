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
                scrollY: '50vh',
                scrollCollapse: true,
                paging: false,
                searching: false,
                //ordering: false
                order: []
            });

            setTimeout(function () {
                $.fn.dataTable.tables( {visible: true, api: true} ).columns.adjust();
            }, 0);

        }
    };
});