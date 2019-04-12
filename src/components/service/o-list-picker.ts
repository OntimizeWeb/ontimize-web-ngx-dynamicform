import { DEFAULT_INPUTS_O_LIST_PICKER, OListPickerComponent } from 'ontimize-web-ngx';

import { DFTemplate } from '../../o-dynamic-form.template';
import { BaseComponent, ComponentOptions } from '../base';
import { DFComponents } from '../components';

export class ListPickerComponent extends BaseComponent<ComponentOptions<string, any>> {

  constructor(settings: any, data?: any) {
    super(settings, data);
  }

  public getInputsProperties(): any[] {
    return DEFAULT_INPUTS_O_LIST_PICKER;
  }

  public getOntimizeComponentClass(): typeof OListPickerComponent {
    return OListPickerComponent;
  }

}

export function OdfOListPicker(template: DFTemplate): void {
  DFComponents.register('o-list-picker', ListPickerComponent, template.components['o-list-picker']);
}
