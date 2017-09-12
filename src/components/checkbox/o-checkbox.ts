import { DFComponents } from '../components';
import { DFTemplate } from '../../o-dynamic-form.template';
import { BaseComponent, ComponentOptions } from '../base';
import { DEFAULT_INPUTS_O_CHECKBOX, OCheckboxComponent } from 'ontimize-web-ng2';

export class CheckboxComponent extends BaseComponent<ComponentOptions<string, any>> {

  constructor(settings: any, data?: any) {
    super(settings, data);
  }

  getInputsProperties(): Array<any> {
    return DEFAULT_INPUTS_O_CHECKBOX;
  }

  getOntimizeComponentClass() {
    return OCheckboxComponent;
  }

}

export function OdfOCheckbox(template: DFTemplate) {
  DFComponents.register('o-checkbox', CheckboxComponent, template.components['o-checkbox']);
}
