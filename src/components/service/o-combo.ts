import { DFComponents } from '../components';
import { DFTemplate } from '../../o-dynamic-form.template';
import { BaseComponent, ComponentOptions } from '../base';
import { DEFAULT_INPUTS_O_COMBO, OComboComponent } from 'ontimize-web-ng2';

export class ComboComponent extends BaseComponent<ComponentOptions<string, any>> {

  constructor(settings: any, data?: any) {
    super(settings, data);
  }

  getInputsProperties(): Array<any> {
    return DEFAULT_INPUTS_O_COMBO;
  }

  getOntimizeComponentClass() {
    return OComboComponent;
  }

}

export function OdfOCombo(template: DFTemplate) {
  DFComponents.register('o-combo', ComboComponent, template.components['o-combo']);
}
