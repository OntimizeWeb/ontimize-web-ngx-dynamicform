import { DFComponents } from '../../components';
import { DFTemplate } from '../../../o-dynamic-form.template';
import { InputComponent, InputOptions } from '../input';
import { DEFAULT_INPUTS_O_TEXT_INPUT, OTextInputComponent } from 'ontimize-web-ng2';

export class TextFieldComponent extends InputComponent<InputOptions> {

  constructor(settings: any, data?: any) {
    super(settings, data);
  }

  getInputsProperties(): Array<any> {
    return DEFAULT_INPUTS_O_TEXT_INPUT;
  }

  getOntimizeComponentClass() {
    return OTextInputComponent;
  }

}

export function OdfOTextInput(template: DFTemplate) {
  DFComponents.register('o-text-input', TextFieldComponent, template.components['o-text-input']);
}
