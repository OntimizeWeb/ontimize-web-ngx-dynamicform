import { DEFAULT_INPUTS_O_TEXTAREA_INPUT } from 'ontimize-web-ngx';

import { DFTemplate } from '../../../o-dynamic-form.template';
import { DFComponents } from '../../components';
import { InputComponent, InputOptions } from '../input';

export class TextareaFieldComponent extends InputComponent<InputOptions> {

  constructor(settings: any, data?: any) {
    super(settings, data);
  }

  public getInputsProperties(): any[] {
    return DEFAULT_INPUTS_O_TEXTAREA_INPUT;
  }

}

export function OdfOTextareaInput(template: DFTemplate): void {
  DFComponents.register('o-textarea-input', TextareaFieldComponent, template.components['o-textarea-input']);
}
