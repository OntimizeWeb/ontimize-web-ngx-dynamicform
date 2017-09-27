import { DFComponents } from '../../components';
import { DFTemplate } from '../../../o-dynamic-form.template';
import { ODynamicFormEvents } from '../../../o-dynamic-form.events';
import { InputComponent, InputOptions } from '../input';
import { DEFAULT_INPUTS_O_PERCENT_INPUT } from 'ontimize-web-ngx';

export class PercentFieldComponent extends InputComponent<InputOptions> {

  constructor(settings: any, events?: ODynamicFormEvents, data?: any) {
    super(settings, events, data);
  }

  getInputsProperties(): Array<any> {
    return DEFAULT_INPUTS_O_PERCENT_INPUT;
  }

}

export function OdfOPercentInput(template: DFTemplate) {
  DFComponents.register('o-percent-input', PercentFieldComponent, template.components['o-percent-input']);
}
