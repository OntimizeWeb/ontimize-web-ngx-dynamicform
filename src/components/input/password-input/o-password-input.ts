import { DFComponents } from '../../components';
import { DFTemplate } from '../../../o-dynamic-form.template';
import { ODynamicFormEvents } from '../../../o-dynamic-form.events';
import { InputComponent, InputOptions } from '../input';
import { DEFAULT_INPUTS_O_PASSWORD_INPUT } from 'ontimize-web-ngx';

export class PasswordFieldComponent extends InputComponent<InputOptions> {

  constructor(settings: any, events?: ODynamicFormEvents, data?: any) {
    super(settings, events, data);
  }

  getInputsProperties(): Array<any> {
    return DEFAULT_INPUTS_O_PASSWORD_INPUT;
  }

}

export function OdfOPasswordInput(template: DFTemplate) {
  DFComponents.register('o-password-input', PasswordFieldComponent, template.components['o-password-input']);
}
