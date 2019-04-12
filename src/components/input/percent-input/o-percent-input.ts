import { DEFAULT_INPUTS_O_PERCENT_INPUT } from 'ontimize-web-ngx';

import { ODynamicFormEvents } from '../../../o-dynamic-form.events';
import { DFTemplate } from '../../../o-dynamic-form.template';
import { DFComponents } from '../../components';
import { InputComponent, InputOptions } from '../input';

export class PercentFieldComponent extends InputComponent<InputOptions> {

  constructor(settings: any, events?: ODynamicFormEvents, data?: any) {
    super(settings, events, data);
  }

  public getInputsProperties(): any[] {
    return DEFAULT_INPUTS_O_PERCENT_INPUT;
  }

}

export function OdfOPercentInput(template: DFTemplate): void {
  DFComponents.register('o-percent-input', PercentFieldComponent, template.components['o-percent-input']);
}
