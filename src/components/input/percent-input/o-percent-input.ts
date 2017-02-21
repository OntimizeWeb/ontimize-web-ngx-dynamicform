import { DFComponents } from '../../components';
import { DFTemplate } from '../../../o-dynamic-form.template';
import { InputComponent, InputOptions } from '../input';
import { FormGroup } from '@angular/forms';
import { DEFAULT_INPUTS_O_PERCENT_INPUT } from 'ontimize-web-ng2/ontimize';

export class PercentFieldComponent extends InputComponent<InputOptions> {
  constructor(form: FormGroup, settings: any, data?: any) {
    super(form, settings, data);
  }

  getInputsProperties(): Array<any> {
    return DEFAULT_INPUTS_O_PERCENT_INPUT;
  }
}

export function OPercentInput(template: DFTemplate) {
  DFComponents.register('o-percent-input', PercentFieldComponent, template.components['o-percent-input']);
};
