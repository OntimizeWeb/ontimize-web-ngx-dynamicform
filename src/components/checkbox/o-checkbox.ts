import { DEFAULT_INPUTS_O_CHECKBOX, OCheckboxComponent } from 'ontimize-web-ngx';

import { DFTemplate } from '../../o-dynamic-form.template';
import { BaseComponent, ComponentOptions } from '../base';
import { DFComponents } from '../components';

export class CheckboxComponent extends BaseComponent<ComponentOptions<string, any>> {

  constructor(settings: any, data?: any) {
    super(settings, data);
  }

  public getInputsProperties(): any[] {
    return DEFAULT_INPUTS_O_CHECKBOX;
  }

  public getOntimizeComponentClass(): typeof OCheckboxComponent {
    return OCheckboxComponent;
  }

}

export function OdfOCheckbox(template: DFTemplate): void {
  DFComponents.register('o-checkbox', CheckboxComponent, template.components['o-checkbox']);
}
