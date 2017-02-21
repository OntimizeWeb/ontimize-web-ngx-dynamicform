import { DFComponents } from '../../components';
import { DFTemplate } from '../../../o-dynamic-form.template';
import { InputComponent, InputOptions } from '../input';
import { FormGroup } from '@angular/forms';
import { DEFAULT_INPUTS_O_DATE_INPUT } from 'ontimize-web-ng2/ontimize';

export class DateFieldComponent extends InputComponent<InputOptions> {
  constructor(form: FormGroup, settings: any, data?: any) {
    super(form, settings, data);
  }

  getInputsProperties(): Array<any> {
    return DEFAULT_INPUTS_O_DATE_INPUT;
  }
}

export function ODateInput(template: DFTemplate) {
  DFComponents.register('o-date-input', DateFieldComponent, template.components['o-date-input']);
};
