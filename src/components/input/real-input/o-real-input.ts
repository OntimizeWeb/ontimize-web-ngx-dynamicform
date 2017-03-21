import { DFComponents } from '../../components';
import { DFTemplate } from '../../../o-dynamic-form.template';
import { InputComponent, InputOptions } from '../input';
import { DEFAULT_INPUTS_O_REAL_INPUT } from 'ontimize-web-ng2/ontimize';

export class RealFieldComponent extends InputComponent<InputOptions> {
  constructor(settings: any, data?: any) {
    super(settings, data);
  }

  getInputsProperties(): Array<any> {
    return DEFAULT_INPUTS_O_REAL_INPUT;
  }
}

export function OdfORealInput(template: DFTemplate) {
  DFComponents.register('o-real-input', RealFieldComponent, template.components['o-real-input']);
};
