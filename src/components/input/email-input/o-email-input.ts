import { DFComponents } from '../../components';
import { DFTemplate } from '../../../o-dynamic-form.template';
import { InputComponent, InputOptions } from '../input';
import { FormGroup } from '@angular/forms';
import { DEFAULT_INPUTS_O_EMAIL_INPUT } from 'ontimize-web-ng2/ontimize';

export class EmailFieldComponent extends InputComponent<InputOptions> {
  constructor(form: FormGroup, settings: any, data?: any) {
    super(form, settings, data);
  }

  getInputsProperties(): Array<any> {
    return DEFAULT_INPUTS_O_EMAIL_INPUT;
  }
}

export function OEmailInput(template: DFTemplate) {
  DFComponents.register('o-email-input', EmailFieldComponent, template.components['o-email-input']);
};
