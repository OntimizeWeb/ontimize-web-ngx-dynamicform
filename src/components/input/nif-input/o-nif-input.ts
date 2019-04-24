import { DEFAULT_INPUTS_O_NIF_INPUT } from 'ontimize-web-ngx';

import { ODynamicFormEvents } from '../../../o-dynamic-form.events';
import { DFTemplate } from '../../../o-dynamic-form.template';
import { DFComponents } from '../../components';
import { InputComponent, InputOptions } from '../input';

export class NifFieldComponent extends InputComponent<InputOptions> {

  constructor(settings: any, events?: ODynamicFormEvents, data?: any) {
    super(settings, events, data);
  }

  public getInputsProperties(): any[] {
    return DEFAULT_INPUTS_O_NIF_INPUT;
  }

}

export function OdfONifInput(template: DFTemplate): void {
  DFComponents.register('o-nif-input', NifFieldComponent, template.components['o-nif-input']);
}
