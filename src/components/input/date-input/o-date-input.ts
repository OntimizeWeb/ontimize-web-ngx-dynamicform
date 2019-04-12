import { DEFAULT_INPUTS_O_DATE_INPUT } from 'ontimize-web-ngx';

import { ODynamicFormEvents } from '../../../o-dynamic-form.events';
import { DFTemplate } from '../../../o-dynamic-form.template';
import { DFComponents } from '../../components';
import { InputComponent, InputOptions } from '../input';

export class DateFieldComponent extends InputComponent<InputOptions> {

  constructor(settings: any, events?: ODynamicFormEvents, data?: any) {
    super(settings, events, data);
  }

  public getInputsProperties(): any[] {
    return DEFAULT_INPUTS_O_DATE_INPUT;
  }

}

export function OdfODateInput(template: DFTemplate): void {
  DFComponents.register('o-date-input', DateFieldComponent, template.components['o-date-input']);
}
