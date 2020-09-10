import { DEFAULT_INPUTS_O_CHECKBOX, OCheckboxComponent } from 'ontimize-web-ngx';

import { ComponentOptions } from '../../interfaces/component-options.interface';

import { BaseComponent } from '../base';
import { DFComponents } from '../components';
import { DFTemplate } from '../../interfaces/df-template.interface';

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
