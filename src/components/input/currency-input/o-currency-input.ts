import { DFComponents } from '../../components';
import { DFTemplate } from '../../../o-dynamic-form.template';
import { InputComponent, InputOptions } from '../input';
import { FormGroup } from '@angular/forms';
import { DEFAULT_INPUTS_O_CURRENCY_INPUT } from 'ontimize-web-ng2/ontimize';

export class CurrencyFieldComponent extends InputComponent<InputOptions> {
  constructor(form: FormGroup, settings: any, data?: any) {
    super(form, settings, data);
  }

  getInputsProperties(): Array<any> {
    return DEFAULT_INPUTS_O_CURRENCY_INPUT;
  }
}

export function OCurrencyInput(template: DFTemplate) {
  DFComponents.register('o-currency-input', CurrencyFieldComponent, template.components['o-currency-input']);
};
