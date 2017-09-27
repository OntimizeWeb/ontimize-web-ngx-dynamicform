import { DFComponents } from '../../components';
import { DFTemplate } from '../../../o-dynamic-form.template';
import { ODynamicFormEvents } from '../../../o-dynamic-form.events';
import { InputComponent, InputOptions } from '../input';
import { DEFAULT_INPUTS_O_CURRENCY_INPUT } from 'ontimize-web-ngx';

export class CurrencyFieldComponent extends InputComponent<InputOptions> {

  constructor(settings: any, events?: ODynamicFormEvents, data?: any) {
    super(settings, events, data);
  }

  getInputsProperties(): Array<any> {
    return DEFAULT_INPUTS_O_CURRENCY_INPUT;
  }

}

export function OdfOCurrencyInput(template: DFTemplate) {
  DFComponents.register('o-currency-input', CurrencyFieldComponent, template.components['o-currency-input']);
}
