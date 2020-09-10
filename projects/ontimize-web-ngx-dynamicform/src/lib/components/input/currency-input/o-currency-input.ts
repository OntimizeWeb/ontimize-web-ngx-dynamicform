import { DEFAULT_INPUTS_O_CURRENCY_INPUT } from 'ontimize-web-ngx';

import { DFTemplate } from '../../../interfaces/df-template.interface';
import { ODynamicFormEvents } from '../../../services/o-dynamic-form-events.service';
import { DFComponents } from '../../components';
import { InputComponent, InputOptions } from '../input';

export class CurrencyFieldComponent extends InputComponent<InputOptions> {

  constructor(settings: any, events?: ODynamicFormEvents, data?: any) {
    super(settings, events, data);
  }

  public getInputsProperties(): any[] {
    return DEFAULT_INPUTS_O_CURRENCY_INPUT;
  }

}

export function OdfOCurrencyInput(template: DFTemplate): void {
  DFComponents.register('o-currency-input', CurrencyFieldComponent, template.components['o-currency-input']);
}
