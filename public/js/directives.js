/**
 * Directive Collection.
 *
 * @description
 * https://docs.angularjs.org/guide/directive
 *
 * The restrict option is typically set to:
 *   'A' - only matches attribute name
 *   'E' - only matches element name
 *   'C' - only matches class name
 *   'M' - only matches comment
 *
 *   These restrictions can all be combined as needed:
 *     'AEC' - matches either attribute or element or class name
 *
 * The scope option:
 *   scope: {
 *     customerInfo: '=info',
 *     // same as '=customer'
 *     customer: '='
 *   }
 *
 *   The scope option is an object that contains a property for each isolate scope binding.
 *   In this case it has just one property:
 *     - Its name (customerInfo) corresponds to the directive's isolate scope property customerInfo.
 *     - Its value (=info) tells $compile to bind to the info attribute.
 *
 *   Note: Note: These =attr attributes in the scope option of directives are normalized just like directive names.
 *   To bind to the attribute in <div bind-to-this="thing">, you'd specify a binding of =bindToThis.
 *
 * @author iCharge
 * @since 06-Feb-16.
 */

ScriptManager
    .requireDirective('ui-nav-header')
    .requireDirective('ui-gameroom-table')
;
