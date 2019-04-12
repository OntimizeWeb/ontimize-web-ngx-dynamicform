import { DEFAULT_INPUTS_O_PASSWORD_INPUT } from 'ontimize-web-ngx';

import { ODynamicFormEvents } from '../../../o-dynamic-form.events';
import { DFTemplate } from '../../../o-dynamic-form.template';
import { DFComponents } from '../../components';
import { InputComponent, InputOptions } from '../input';

export class PasswordFieldComponent extends InputComponent<InputOptions> {

  constructor(settings: any, events?: ODynamicFormEvents, data?: any) {
    super(settings, events, data);
  }

  public getInputsProperties(): any[] {
    return DEFAULT_INPUTS_O_PASSWORD_INPUT;
  }

}

export function OdfOPasswordInput(template: DFTemplate): void {
  DFComponents.register('o-password-input', PasswordFieldComponent, template.components['o-password-input']);
}
