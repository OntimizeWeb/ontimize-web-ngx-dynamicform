import { DEFAULT_INPUTS_O_EMAIL_INPUT } from 'ontimize-web-ngx';

import { DFTemplate } from '../../../interfaces/df-template.interface';
import { ODynamicFormEvents } from '../../../services/o-dynamic-form-events.service';
import { DFComponents } from '../../components';
import { InputComponent, InputOptions } from '../input';

export class EmailFieldComponent extends InputComponent<InputOptions> {

  constructor(settings: any, events?: ODynamicFormEvents, data?: any) {
    super(settings, events, data);
  }

  public getInputsProperties(): any[] {
    return DEFAULT_INPUTS_O_EMAIL_INPUT;
  }

}

export function OdfOEmailInput(template: DFTemplate): void {
  DFComponents.register('o-email-input', EmailFieldComponent, template.components['o-email-input']);
}
