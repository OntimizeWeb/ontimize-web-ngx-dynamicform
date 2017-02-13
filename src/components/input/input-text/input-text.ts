import { DFComponents } from '../../components';
import { DFTemplate } from '../../../o-dynamic-form.template';
import { BaseElement } from '../../base';
// import { InputComponent, InputOptions } from '../input/input';
// import { FormGroup } from '@angular/forms';

import { OTextInputComponent } from 'ontimize-web-ng2/ontimize';

// export class TextFieldComponent extends InputComponent<InputOptions> {
//     constructor(form: FormGroup, settings:any, data?:any) {
//         super('text', form, settings, data);
//     }
// }

export class TextElement extends BaseElement<OTextInputComponent> {}

export function InputText(template:DFTemplate) {
    DFComponents.register('o-text-input', OTextInputComponent, TextElement, template.components['o-text-input']);
    return TextElement;
};
