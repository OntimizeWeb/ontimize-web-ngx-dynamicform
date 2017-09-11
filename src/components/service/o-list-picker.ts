import { DFComponents } from '../components';
import { DFTemplate } from '../../o-dynamic-form.template';
import { BaseComponent, ComponentOptions } from '../base';
import { DEFAULT_INPUTS_O_LIST_PICKER, OListPickerComponent } from 'ontimize-web-ng2';

export class ListPickerComponent extends BaseComponent<ComponentOptions<string, any>> {

  constructor(settings: any, data?: any) {
    super(settings, data);
  }

  getInputsProperties(): Array<any> {
    return DEFAULT_INPUTS_O_LIST_PICKER;
  }

  getOntimizeComponentClass() {
    return OListPickerComponent;
  }

}

export function OdfOListPicker(template: DFTemplate) {
  DFComponents.register('o-list-picker', ListPickerComponent, template.components['o-list-picker']);
}
