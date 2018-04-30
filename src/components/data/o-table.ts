import { DFComponents } from '../components';
import { DFTemplate } from '../../o-dynamic-form.template';
import { BaseComponent } from '../base';
import { InputOptions } from '../input/input';
import { DEFAULT_INPUTS_O_TABLE, OTableComponent } from 'ontimize-web-ngx';

export class TableComponent extends BaseComponent<InputOptions> {

  constructor(settings: any, data?: any) {
    super(settings, data);
  }

  getInputsProperties(): Array<any> {
    return DEFAULT_INPUTS_O_TABLE;
  }

  getOntimizeComponentClass() {
    return OTableComponent;
  }

}

export function OdfOTable(template: DFTemplate) {
  DFComponents.register('o-table', TableComponent, template.components['o-table']);
}
