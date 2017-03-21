import { DFComponents } from '../../components';
import { DFTemplate } from '../../../o-dynamic-form.template';
import { ODynamicFormEvents } from '../../../o-dynamic-form.events';
import { InputComponent, InputOptions } from '../input';
import { DEFAULT_INPUTS_O_EMAIL_INPUT } from 'ontimize-web-ng2/ontimize';

export class EmailFieldComponent extends InputComponent<InputOptions> {
  constructor(settings: any, events?: ODynamicFormEvents, data?: any) {
    super(settings, events, data);
  }

  getInputsProperties(): Array<any> {
    return DEFAULT_INPUTS_O_EMAIL_INPUT;
  }
}

export function OdfOEmailInput(template: DFTemplate) {
  DFComponents.register('o-email-input', EmailFieldComponent, template.components['o-email-input']);
};
