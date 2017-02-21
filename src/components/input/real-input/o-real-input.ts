import { DFComponents } from '../../components';
import { DFTemplate } from '../../../o-dynamic-form.template';
import { InputComponent, InputOptions } from '../input';
import { FormGroup } from '@angular/forms';
import { DEFAULT_INPUTS_O_REAL_INPUT } from 'ontimize-web-ng2/ontimize';

export class RealFieldComponent extends InputComponent<InputOptions> {
  constructor(form: FormGroup, settings: any, data?: any) {
    super(form, settings, data);
  }

  getInputsProperties(): Array<any> {
    return DEFAULT_INPUTS_O_REAL_INPUT;
  }
}

export function ORealInput(template: DFTemplate) {
  DFComponents.register('o-real-input', RealFieldComponent, template.components['o-real-input']);
};
