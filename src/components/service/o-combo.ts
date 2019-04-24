import { DEFAULT_INPUTS_O_COMBO, OComboComponent } from 'ontimize-web-ngx';

import { DFTemplate } from '../../o-dynamic-form.template';
import { BaseComponent, ComponentOptions } from '../base';
import { DFComponents } from '../components';

export class ComboComponent extends BaseComponent<ComponentOptions<string, any>> {

  constructor(settings: any, data?: any) {
    super(settings, data);
  }

  public getInputsProperties(): any[] {
    return DEFAULT_INPUTS_O_COMBO;
  }

  public getOntimizeComponentClass(): typeof OComboComponent {
    return OComboComponent;
  }

}

export function OdfOCombo(template: DFTemplate): void {
  DFComponents.register('o-combo', ComboComponent, template.components['o-combo']);
}
