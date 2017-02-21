import { DFComponents } from '../../components';
import { DFTemplate } from '../../../o-dynamic-form.template';
import { InputComponent, InputOptions } from '../input';
import { FormGroup } from '@angular/forms';

import { DEFAULT_INPUTS_O_INTEGER_INPUT } from 'ontimize-web-ng2/ontimize';

export class IntegerFieldComponent extends InputComponent<InputOptions> {
    constructor(form: FormGroup, settings: any, data?: any) {
        super(form, settings, data);
    }

    getInputsProperties(): Array<any> {
        return DEFAULT_INPUTS_O_INTEGER_INPUT;
    }
}

export function OIntegerInput(template: DFTemplate) {
    DFComponents.register('o-integer-input', IntegerFieldComponent, template.components['o-integer-input']);
};
