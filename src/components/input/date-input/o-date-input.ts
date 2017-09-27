import { DFComponents } from '../../components';
import { DFTemplate } from '../../../o-dynamic-form.template';
import { ODynamicFormEvents } from '../../../o-dynamic-form.events';
import { InputComponent, InputOptions } from '../input';
import { DEFAULT_INPUTS_O_DATE_INPUT } from 'ontimize-web-ngx';

export class DateFieldComponent extends InputComponent<InputOptions> {

  constructor(settings: any, events?: ODynamicFormEvents, data?: any) {
    super(settings, events, data);
  }

  getInputsProperties(): Array<any> {
    return DEFAULT_INPUTS_O_DATE_INPUT;
  }

}

export function OdfODateInput(template: DFTemplate) {
  DFComponents.register('o-date-input', DateFieldComponent, template.components['o-date-input']);
}
