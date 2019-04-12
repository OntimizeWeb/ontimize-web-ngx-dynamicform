import { DEFAULT_INPUTS_O_TEXT_INPUT, OTextInputComponent } from 'ontimize-web-ngx';

import { DFTemplate } from '../../../o-dynamic-form.template';
import { DFComponents } from '../../components';
import { InputComponent, InputOptions } from '../input';

export class TextFieldComponent extends InputComponent<InputOptions> {

  constructor(settings: any, data?: any) {
    super(settings, data);
  }

  public getInputsProperties(): any[] {
    return DEFAULT_INPUTS_O_TEXT_INPUT;
  }

  public getOntimizeComponentClass(): typeof OTextInputComponent {
    return OTextInputComponent;
  }

}

export function OdfOTextInput(template: DFTemplate): void {
  DFComponents.register('o-text-input', TextFieldComponent, template.components['o-text-input']);
}
