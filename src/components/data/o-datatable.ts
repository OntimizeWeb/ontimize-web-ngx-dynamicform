import { DFComponents } from '../components';
import { DFTemplate } from '../../o-dynamic-form.template';
import { BaseComponent, ComponentOptions } from '../base';
import { /*DEFAULT_INPUTS_O_DATATABLE,*/ ODataTableComponent } from 'ontimize-web-ngx-datatable';

export class DataTableComponent extends BaseComponent<ComponentOptions<string, any>> {

  constructor(settings: any, data?: any) {
    super(settings, data);
  }

  getInputsProperties(): Array<any> {
    // return DEFAULT_INPUTS_O_DATATABLE;
    // TODO: investigate why DEFAULT_INPUTS_O_DATATABLE is not imported properly
    return [
      'oattr: attr',
      'title',
      'cssClass: css-class',
      'ovisible: visible',
      'oenabled: enabled',
      'controls',
      'service',
      'entity',
      'queryMethod: query-method',
      'paginatedQueryMethod : paginated-query-method',
      'deleteMethod: delete-method',
      'queryOnInit: query-on-init',
      'queryOnBind: query-on-bind',
      'pageable',
      'columns',
      'keys',
      'parentKeys: parent-keys',
      'staticData: static-data',
      'detailMode: detail-mode',
      'detailFormRoute: detail-form-route',
      'recursiveDetail: recursive-detail',
      'detailButtonInRow: detail-button-in-row',
      'detailButtonInRowIcon: detail-button-in-row-icon',
      'editFormRoute: edit-form-route',
      'recursiveEdit: recursive-edit',
      'editButtonInRow: edit-button-in-row',
      'editButtonInRowIcon: edit-button-in-row-icon',
      'queryRows: query-rows',
      'insertButton: insert-button',
      'rowHeight : row-height',
      'serviceType : service-type',
      'insertMethod: insert-method',
      'updateMethod: update-method',
      'visibleColumns: visible-columns',
      'editableColumns: editable-columns',
      'editOnFocus: edit-on-focus',
      'sortColumns: sort-columns',
      'quickFilter: quick-filter',
      'deleteButton: delete-button',
      'refreshButton: refresh-button',
      'columnsVisibilityButton: columns-visibility-button',
      'columnsResizeButton: columns-resize-button',
      'columnsGroupButton: columns-group-button',
      'exportButton: export-button',
      'insertTable: insert-table',
      'editionMode: edition-mode',
      'showTableButtonsText: show-table-buttons-text',
      'selectAllCheckbox: select-all-checkbox',
      'singlePageMode : single-page-mode',
      'paginationControls : pagination-controls'
    ];
  }

  getOntimizeComponentClass() {
    return ODataTableComponent;
  }

}

export function OdfODataTable(template: DFTemplate) {
  DFComponents.register('o-datatable', DataTableComponent, template.components['o-datatable']);
}
