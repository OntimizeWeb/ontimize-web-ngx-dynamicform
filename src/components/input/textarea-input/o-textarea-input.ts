import { DFComponents } from '../../components';
import { DFTemplate } from '../../../o-dynamic-form.template';
import { InputComponent, InputOptions } from '../input';
import { DEFAULT_INPUTS_O_TEXTAREA_INPUT } from 'ontimize-web-ngx';

export class TextareaFieldComponent extends InputComponent<InputOptions> {

  constructor(settings: any, data?: any) {
    super(settings, data);
  }

  getInputsProperties(): Array<any> {
    return DEFAULT_INPUTS_O_TEXTAREA_INPUT;
  }

}

export function OdfOTextareaInput(template: DFTemplate) {
  DFComponents.register('o-textarea-input', TextareaFieldComponent, template.components['o-textarea-input']);
}
