import { DEFAULT_INPUTS_O_TABLE, OTableComponent } from 'ontimize-web-ngx';

import { DFTemplate } from '../../interfaces/df-template.interface';
import { BaseComponent } from '../base';
import { DFComponents } from '../components';
import { InputOptions } from '../input/input';

export class TableComponent extends BaseComponent<InputOptions> {

  constructor(settings: any, data?: any) {
    super(settings, data);
  }

  public getInputsProperties(): any[] {
    return DEFAULT_INPUTS_O_TABLE;
  }

  public getOntimizeComponentClass(): typeof OTableComponent {
    return OTableComponent;
  }

}

export function OdfOTable(template: DFTemplate): void {
  DFComponents.register('o-table', TableComponent, template.components['o-table']);
}
