import { DEFAULT_INPUTS_O_REAL_INPUT } from 'ontimize-web-ngx';

import { DFTemplate } from '../../../o-dynamic-form.template';
import { DFComponents } from '../../components';
import { InputComponent, InputOptions } from '../input';

export class RealFieldComponent extends InputComponent<InputOptions> {

  constructor(settings: any, data?: any) {
    super(settings, data);
  }

  public getInputsProperties(): any[] {
    return DEFAULT_INPUTS_O_REAL_INPUT;
  }

}

export function OdfORealInput(template: DFTemplate): void {
  DFComponents.register('o-real-input', RealFieldComponent, template.components['o-real-input']);
}
