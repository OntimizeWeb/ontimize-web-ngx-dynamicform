import { DFComponents } from '../../components';
import { DFTemplate } from '../../../o-dynamic-form.template';
import { ODynamicFormEvents } from '../../../o-dynamic-form.events';
import { InputComponent, InputOptions } from '../input';
import { DEFAULT_INPUTS_O_NIF_INPUT } from 'ontimize-web-ng2';

export class NifFieldComponent extends InputComponent<InputOptions> {

  constructor(settings: any, events?: ODynamicFormEvents, data?: any) {
    super(settings, events, data);
  }

  getInputsProperties(): Array<any> {
    return DEFAULT_INPUTS_O_NIF_INPUT;
  }

}

export function OdfONifInput(template: DFTemplate) {
  DFComponents.register('o-nif-input', NifFieldComponent, template.components['o-nif-input']);
}
